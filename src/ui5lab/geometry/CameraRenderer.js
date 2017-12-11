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

        // Create a flex with 2 rows. The bottom row divided in two columns

        oRm.write("<div style='display: flex; flex-direction: column;'>");
        // First row
        oRm.write("<video width='%w' height='%h'></video>"
                  .replace("%w", oControl.getPreviewwidth())
                  .replace("%h", oControl.getPreviewheight())
                 );
        oRm.write("<canvas width='640' height='480' style='display: none;'></canvas>");
        // Second row
        oRm.write("<div style='display: flex; flex-direction: row; justify-content: space-around;'>");
        oRm.renderControl(oControl._snapshotButton);
        oRm.renderControl(oControl._confirmButton);
		oRm.write("</div>");
		oRm.write("</div>");

		oRm.write("</div>");

	};

	return CameraRenderer;

}, /* bExport= */ true);
