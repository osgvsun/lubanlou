// var currentUsername = "20180224";
var oauth2 = oauth2;
var resourceContainerHost = resourceContainerHost;
var resourceContainerHostForUpload = resourceContainerHost;
resourceContainer.initResourceContainer({
    oauth2Host: oauth2,
    resourceContainerHost: resourceContainerHost + "/gvsunResource",
    directoryEngineHost: resourceContainerHost + "/gvsunDirectory",
    siteName: "用户中心",
    authorizationURL: resourceContainerHost + "/shareApi/getAuthorization",
    resourceContainerHostForUpload: resourceContainerHostForUpload + '/gvsunResource',
    unfixed: true
});