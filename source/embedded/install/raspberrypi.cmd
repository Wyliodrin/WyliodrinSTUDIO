$ErrorActionPreference = "Stop"

# Nano server does not include Invoke-WebRequest
function Invoke-FastWebRequest
{
    [CmdletBinding()]
    Param(
    [Parameter(Mandatory=$True,ValueFromPipeline=$true,Position=0)]
    [System.Uri]$Uri,
    [Parameter(Position=1)]
    [string]$OutFile
    )
    PROCESS
    {
        if(!([System.Management.Automation.PSTypeName]'System.Net.Http.HttpClient').Type)
        {
            $assembly = [System.Reflection.Assembly]::LoadWithPartialName("System.Net.Http")
        }

        [Environment]::CurrentDirectory = (pwd).Path

        if(!$OutFile)
        {
            $OutFile = $Uri.PathAndQuery.Substring($Uri.PathAndQuery.LastIndexOf("/") + 1)
            if(!$OutFile)
            {
                throw "The ""OutFile"" parameter needs to be specified"
            }
        }

        $client = new-object System.Net.Http.HttpClient
        $task = $client.GetAsync($Uri)
        $task.wait()
        $response = $task.Result
        $status = $response.EnsureSuccessStatusCode()

        $outStream = New-Object IO.FileStream $OutFile, Create, Write, None

        try
        {
            $task = $response.Content.ReadAsStreamAsync()
            $task.Wait()
            $inStream = $task.Result

            $contentLength = $response.Content.Headers.ContentLength

            $totRead = 0
            $buffer = New-Object Byte[] 1MB
            while (($read = $inStream.Read($buffer, 0, $buffer.Length)) -gt 0)
            {
                $totRead += $read
                $outStream.Write($buffer, 0, $read);

                if($contentLength)
                {
                    $percComplete = $totRead * 100 / $contentLength
                    Write-Progress -Activity "Downloading: $Uri" -PercentComplete $percComplete
                }
            }
        }
        finally
        {
            $outStream.Close()
        }
    }
}

mkdir C:\wyliodrin\projects\build -force
mkdir C:\wyliodrin\download -force

cd c:\wyliodrin\download

$url = "https://www.wyliodrin.com/public/scripts/wyliodrin_windows.zip"
$output = "wyliodrin_windows.zip"

Invoke-FastWebRequest -Uri $url -OutFile $output 
Expand-Archive $output -Force -dest 'tmp'




cd tmp\wyliodrin_windows

xcopy /e /i /y node "C:\Program Files\node"
xcopy /e /i /y wyliodrin-app-server-master C:\wyliodrin\wyliodrin-app-server-master

xcopy /e /i /y serialport c:\Users\Default\AppData\Roaming\node_modules\serialport
xcopy /e /i /y serialport C:\wyliodrin\wyliodrin-app-server-master\node_modules\serialport
xcopy /e /i /y wyliodrin c:\Users\Default\AppData\Roaming\node_modules\wyliodrin

setx PATH "%PATH%;C:\Program Files\node" /M
setx APPDATA c:\Users\Default\AppData\Roaming /M
set NODE_PATH=%APPDATA%\node_modules /M
setx NODE_PATH %APPDATA%\node_modules /M

cd c:\wyliodrin
"raspberrypi" | Out-File -Encoding ASCII -NoNewline boardtype.txt

'cd c:\wyliodrin\wyliodrin-app-server-master' | Out-File -Encoding ASCII wyliodrin.bat
'"C:\Program Files\node\node.exe" startup.js' | Add-Content -Encoding ASCII wyliodrin.bat

copy wyliodrin-app-server-master\setup\windows\settings_raspberrypi.json settings_raspberrypi.json


schtasks /create /tn "wyliodrin-app-server" /tr c:\wyliodrin\wyliodrin.bat /sc onstart

shutdown /r /t 0



