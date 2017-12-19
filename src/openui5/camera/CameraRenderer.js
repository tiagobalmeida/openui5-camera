sap.ui.define([],
	          function() {
	              "use strict";

	              /**
	               * @namespace openui5.camera
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
		              oRm.writeStyles();
		              oRm.write(">");
                      oRm.write("<div style='display: flex; flex-direction: row; align-items: center; justify-content: space-around;'>");
                      oRm.write(
                          "<video width='%w' height='%h' style='width: %pwpx; height: %phpx;'></video>"
                              .replace("%w", oControl.getVideoWidth())
                              .replace("%h", oControl.getVideoHeight())
                              .replace("%pw", oControl.getWidth())
                              .replace("%ph", oControl.getHeight())
                      );
                      oRm.write(
                          "<canvas width='%w' height='%h' style='display: none; width: %pwpx; height: %phpx;'></canvas>"
                              .replace("%w", oControl.getVideoWidth())
                              .replace("%h", oControl.getVideoHeight())
                              .replace("%pw", oControl.getWidth())
                              .replace("%ph", oControl.getHeight()));
		              oRm.write("</div>");
		              oRm.write("</div>");
	              };

	              return CameraRenderer;

              }, /* bExport= */ true);
