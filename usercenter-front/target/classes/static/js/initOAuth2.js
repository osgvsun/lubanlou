// if (!localStorage['oauth2']) {
//     localStorage['oauth2'] = oauth2;
// }
// var OAuth2Js = localStorage['oauth2'] + '/oauth/OAuth2.js';
// var OAuth2Script = document.createElement("script");
// OAuth2Script.type = "text/javascript";
// OAuth2Script.src = OAuth2Js;
// OAuth2Script.onload = function () {
//     OAuth2.initOAuth2({
//         oauth2Host: localStorage['oauth2'],
//         clientDetail: {
//             clientId: currentsiteEnName,
//             clientSecret: currentsiteSecret
//         },
//         needToken: function (url) {
//             if (url === 'http://localhost:8765/uaa/enabled/20189190') {
//                 console.log('不带令牌');
//                 return false;
//             }
//             return true;
//         }
//
//     })
// };
// document.getElementsByTagName("head")[0].appendChild(OAuth2Script);
$(document).ready(function () {
    if (!localStorage['oauth2']) {
        localStorage['oauth2'] = oauth2;
    }
    OAuth2.initOAuth2({
        oauth2Host: localStorage['oauth2'],
        clientDetail: {
            clientId: currentsiteEnName,
            clientSecret: currentsiteSecret
        },
        needToken: function (url) {
            if (url === 'http://localhost:8765/uaa/enabled/20189190') {
                console.log('不带令牌');
                return false;
            }
            return true;
        }

    })
})
function getAccessToken() {
    let access_token = OAuth2.getJwtToken();
    return "Bearer " + access_token;
}

