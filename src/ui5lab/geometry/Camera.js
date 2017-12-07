/*!
 * ${copyright}
 */

// Provides control ui5lab.geometry.Camera.
sap.ui.define(['jquery.sap.global', './library', 'sap/ui/core/Control'],
	          function(jQuery, library, Control) {
	"use strict";

	/**
	 * Constructor for a new Camea control.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 *
	 * @public
	 * @alias ui5lab.geometry.Camera
	 */
	var oCamera = Control.extend("ui5lab.geometry.Camera", /** @lends ui5lab.geometry.Camera.prototype */ {
		/**
		 * Control API
		 */
		metadata: {
			library : "ui5lab.geometry"
		},

		/**
		 * Lifecycle hook to initialize the control
		 */
		init: function () {
            //var that = this;

		},


        onAfterRendering: function() {
            // grab the canvas inside my rendered DOM element
            var oVideo = jQuery("video", jQuery("#" + this.getId())).get(0);
            if (oVideo) {
                // set the camera stream on the canvas.
                // Ask the user for camera access.
                navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                    .then(function(stream) {
                        // We have a camera. Let's store the stream for later use
                        //that._stream = stream;
                        oVideo.srcObject = stream;
                        oVideo.play();
                    })
                    .catch(function(err) {
                        console.log("An error occured! " + err);
                    });
            }
            debugger;
        }

	});

	return oCamera;

});
