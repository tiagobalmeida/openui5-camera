/*!
 * ${copyright}
 */

sap.ui.define([],
	function() {
	"use strict";

	/**
	 * Example renderer.
	 * @namespace
	 */
	var CameraRenderer = {};

	/**
	 * Renders the HTML for the control, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} oRm RenderManager object
	 * @param {sap.ui.core.Control} oControl An object representation of the control that will be rendered
	 */
	CameraRenderer.render = function(oRm, oControl) {
		oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.writeClasses();

		//oRm.addStyle("width", "320px");
		//oRm.addStyle("height", "100px");
		oRm.writeStyles();

		oRm.write(">");
		oRm.write("<video></video>");
		oRm.write("<canvas></canvas>");

		oRm.write("</div>");

	};

	return CameraRenderer;

}, /* bExport= */ true);
