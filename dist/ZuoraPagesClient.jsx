// https://knowledgecenter.zuora.com/Zuora_Payments/Payment_Page_and_Payment_Link/Payment_Pages_2.0/F_Client_Parameters_for_Payment_Pages_2.0
import React, { useEffect } from 'react';
export var ZuoraPagesClient = function (Props) {
    var renderForm = function () {
        if (!window)
            return;
        window.Z.render(Props.renderParams, Props.prePopulateFields, Props.callback);
    };
    useEffect(function () {
        var script = document.createElement('script');
        script.src = '//static.zuora.com/Resources/libs/hosted/1.3.1/zuora-min.js';
        script.async = true;
        script.onload = function () {
            renderForm();
        };
        document.body.appendChild(script);
        return function () {
            document.body.removeChild(script);
        };
    }, []);
    useEffect(function () {
        if (!window.Z)
            return;
        renderForm();
    }, [
        Props.renderParams,
        Props.prePopulateFields,
        Props.callback,
        Props.signature
    ]);
    return (<>
      <div id="zuora_payment"></div>
    </>);
};
export default ZuoraPagesClient;
