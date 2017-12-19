sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("Camera.controller.Home", {

		onInit  : function() {
			this.getView().setModel( new JSONModel({
                photos: []
            }) );
		},

		/////////////////////////////////////////////
		//  EVENTS
		/////////////////////////////////////////////
        onSnapshot: function (oEvent) {
            // The image is inside oEvent, on the image parameter,
            // let's grab it.
            var oModel = this.getView().getModel();
            var aPhotos = oModel.getProperty("/photos");
            aPhotos.push({src: oEvent.getParameter("image")});
            oModel.setProperty("/photos", aPhotos);
            oModel.refresh(true);
        },

        /**
         * Stop the camera when the tab is not visible.
         * @param {object} name
         * @returns {object}
         */
        onTabSelect: function (oEvent) {
            var oTab = oEvent.getParameter("key");
            var oCamera = this.getView().byId("idCamera");
            if (oTab !== "demo") {
                oCamera.stopCamera();
            } else {
                oCamera.rerender();
            }
        }



	});
});
