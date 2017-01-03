
"use strict";

var dexie = require ('dexie');
var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:library');

var _ = require ('lodash');

var db = new dexie ("WyliodrinApp");

db.version(6).stores ({
	applications:"++id,name,date,main,dashboard,firmware,visualproject,language,schematics",
	settings:"key,value",
	deployments:"name, network"
});

db.version(5).stores ({
	applications:"++id,name,date,main,dashboard,firmware,visualproject,language,schematics",
	settings:"key,value"
});


db.version(4).stores ({
	applications:"++id,name,date,main,dashboard,firmware,visualproject,language",
	settings:"key,value"
});

db.version(3).stores ({
	applications:"++id,name,date,main,dashboard,firmware,visualproject,language",
	settings:"key,value"
});

db.version(2).stores ({
	applications:"++id,name,date,main,dashboard,firmware,visualproject,language",
	settings:"&key,value"
});

db.version(1).stores ({
	applications:"++id,name,date,main,dashboard,firmware,visualproject,language"
});

db.open ();

function add (value, language, done, devicecategory)
{
	if (_.isString (value))
	{
		var title = value;
		debug ('Adding project with title '+title+' in '+language);
		var startproject = null;
		if (devicecategory && settings.EXAMPLE.start[devicecategory])
		{
			debug ('Start '+devicecategory);
			startproject = _.clone (settings.EXAMPLE.start[devicecategory][language]);
		}
		if (!startproject)
		{
			startproject = {
				main: '',
				language: language
			};
		}
		startproject.title = title;
		startproject.date = new Date().getTime();
		db.applications.add (startproject).then (function (id)
		{
			debug ('Added project with id '+id);
			if (done) done (null, id);
		}).catch (function (err)
		{
			console.log (err);
			debug (err);
			if (done) done (err);
		});
	}
	else
	{
		var project = value;
		debug ('Adding project with title '+project.title+' in '+project.language);
		db.applications.add (project).then (function (id)
		{
			debug ('Added project with id '+id);
			debug (done);
			if (done) done (null, id);
		});
	}
}

function addDeployment (name, data)
{
	data.name = name;
	db.deployments.add (data). then (function (){
	});
}

function erase (id)
{
	debug ('Erasing project '+id);
	db.applications.delete (id);
}

function retrieveProject (id, done)
{
	debug ('Retrieving project '+id);
	db.applications.get (id).then(function (project)
	{
		debug ('Retrieved project '+project);
		done (project);
	}).catch (function (error)
	{
		done (null);
	});
}

function rename (id, title)
{
	debug ('Store project main '+id);
	db.applications.update (id, {title:title});
}

function storeMain (id, main)
{
	debug ('Store project main '+id);
	db.applications.update (id, {main:main});
}

function storeFirmware (id, firmware)
{
	debug ('Store project firmware '+id);
	db.applications.update (id, {firmware:firmware});
}

function storeWorkingProject (projectid)
{
	debug ('Store working project '+projectid);
	db.settings.put ({key:'project', value:projectid}).then (function (result)
		{
			// console.log (result);
		}).catch (function (error)
		{
			console.log (error);
		});
}

function storeDashboard (id, dashboard)
{
	debug ('Store project dashboard '+id);
	db.applications.update (id, {dashboard:dashboard});
}

function storeSchematics (id, schematics)
{
	debug ('Store project schematics '+id);
	db.applications.update (id, {schematics:schematics});
}

function retrieveWorkingProject (done)
{
	debug ('Retrieving working project');
	db.settings.get ('project').then (function (settings)
	{
		// console.log (projectid);
		debug ('Working project '+settings.value);
		done (settings.value);
	}).catch (function (error)
	{
		done (null);
	});
}

function storeValue (key, value, done)
{
	debug ('Storing '+key);
	db.settings.put ({key:key, value:value}).then (function ()
	{
		if (done) done (value);
	}).catch (function (error)
	{
		debug (key+' '+error);
		if (done) done (null);
	});
}

function retrieveValue (key, defvalue, done)
{
	debug ('Retrieving '+key);
	db.settings.get (key).then (function (settings)
	{
		// console.log (projectid);
		debug (key+' '+settings.value);
		done (settings.value);
	}).catch (function (error)
	{
		debug ('Using '+defvalue);
		if (defvalue)
		{
			db.settings.put ({key:key, value:defvalue}).then (function ()
			{
				done (defvalue);
			}).catch (function (error)
			{
				debug (key+' '+error);
				done (null);
			});
		}
	});
}

function storeVisualProject (id, visualproject)
{
	debug ('Store project '+id);
	db.applications.update (id, {visualproject:visualproject});
}

function listProjects (done)
{
	debug ('List projects');
	db.applications.toArray (function (list)
	{
		debug ('List projects '+list);
		done (null, list);
	});
}

function listDeployments (done)
{
	debug ('List deployments');
	db.deployments.toArray (function (list){
		console.log ('list depls');
		console.log (list);
		debug ('List deployments '+list);
		done (null, list);
	});
}

module.exports.addDeployment = addDeployment;
module.exports.listProjects = listProjects;
module.exports.listDeployments = listDeployments;
module.exports.erase = erase;
module.exports.retrieveProject = retrieveProject;
module.exports.storeMain = storeMain;
module.exports.retrieveValue = retrieveValue;
module.exports.storeValue = storeValue;
module.exports.storeFirmware = storeFirmware;
module.exports.storeVisualProject = storeVisualProject;
module.exports.storeWorkingProject = storeWorkingProject;
module.exports.retrieveWorkingProject = retrieveWorkingProject;
module.exports.storeDashboard = storeDashboard;
module.exports.storeSchematics = storeSchematics;
module.exports.add = add;
module.exports.rename = rename;
