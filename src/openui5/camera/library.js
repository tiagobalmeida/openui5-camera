/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library it.designfuture.qrcode.
 */
sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/library' // library dependency
],  function(jQuery, library) {

	"use strict";

	/**
	 * Suite controls library.
	 *
	 * @namespace
	 * @name openui5.camera
	 * @author Tiago Almeida <jumpifzero@gmail.com>
	 * @version ${version}
	 * @public
	 */

	// delegate further initialization of this library to the Core
	sap.ui.getCore().initLibrary({
		name : "openui5.camera",
		noLibraryCSS: true,
		version: "${version}",
		dependencies : ["sap.ui.core", "sap.m"],
		types: [],
		interfaces: [],
		controls: [
			"openui5.camera.Camera"
		],
		elements: []
	});

	return openui5.camera;

}, /* bExport= */ false);
