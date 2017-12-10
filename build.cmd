@ECHO OFF

TITLE Build Wyliodrin!

SETLOCAL ENABLEEXTENSIONS
SETLOCAL ENABLEDELAYEDEXPANSION

REM Existing verification commands
SET "node_version_cmd=node -v"
SET "git_version_cmd=git --version"
SET "grunt_npmlist_cmd=npm list -g grunt-cli | findstr grunt-cli"

REM Errors
SET "git_notFound_error=ERROR: 'git' is not installed"
SET "node_notFound_error=ERROR: NodeJS not found"
SET "node_version_error=ERROR: NodeJS version has to be >= 6"
SET "grunt_notFound_error=ERROR: npm 'grunt-cli' package is not installed"

SET "errorFound=false"

REM If 'git' was not found
%git_version_cmd% > NUL 2> NUL
IF %ERRORLEVEL% NEQ 0 (
    ECHO !git_notFound_error!
    SET "errorFound=true"
)

REM If 'node' was not found
%node_version_cmd% > NUL 2> NUL
IF %ERRORLEVEL% NEQ 0 (
    ECHO !node_notfound_error!
    SET "errorFound=true"
) ELSE (
    REM Gets 'node' major version number
    FOR /F "delims=v." %%V IN ('%node_version_cmd%') DO SET "node_majorVersionNumber=%%V"
    REM If 'node' major version number is less than 4 => version error
    IF !node_majorVersionNumber! LSS 4 (
        FOR /F %%V IN ('%node_version_cmd%') DO SET "node_version=%%V"
        SET "node_version_error=!node_version_error!. Your NodeJS version is !node_version!"
        ECHO !node_version_error!
        SET "errorFound=true"
    )
)

REM If 'grunt-cli' was not found
%grunt_npmlist_cmd% > NUL 2> NUL
IF %ERRORLEVEL% NEQ 0 (
    ECHO !grunt_notFound_error!
    SET "errorFound=true"
)

REM If no errors were found
IF %errorFound% == false (
    
    SET "errors=false"

    cmd /C npm install
    IF %ERRORLEVEL% NEQ 0 SET "errors=true"

    SETLOCAL
    SET __COMPAT_LAYER=RunAsInvoker 

    cd patches

    patch.exe ../node_modules/highcharts-ng/dist/highcharts-ng.js highcharts-ng.patch
    IF %ERRORLEVEL% NEQ 0 SET "errors=true"

    patch.exe ../node_modules/angular-tree-control/css/tree-control-attribute.css tree-control-attribute.patch
    IF %ERRORLEVEL% NEQ 0 SET "errors=true"

    patch.exe ../node_modules/8fold-marked/lib/marked.js marked.patch
    IF %ERRORLEVEL% NEQ 0 SET "errors=true"

    patch.exe ../node_modules/angular-ui-ace/src/ui-ace.js angular-ui-ace.patch
    IF %ERRORLEVEL% NEQ 0 SET "errors=true"

    cd ..

    cmd /C grunt
    IF %ERRORLEVEL% NEQ 0 SET "errors=true"
    
    TITLE Build Wyliodrin!

    IF !errors! == false (
        ECHO SUCCESSFULLY BUILT!
    ) ELSE (
        ECHO ERRORS FOUND!
    )
)

PAUSE