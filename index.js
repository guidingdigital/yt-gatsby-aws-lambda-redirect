'use strict';

exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const uri = request.uri;
    const host = request.headers.host[0].value;
    const querystring = request.querystring;

    if (!host.startsWith('www.')) {
        let newUrl = 'https://www.guidingdevelopers.com';
        
        // Add path
        if (uri) newUrl += uri;

        // Add trailing slash
        if (!newUrl.endsWith('/')) newUrl += '/';

        // Add query string
        if (querystring && querystring != '') newUrl += "?" + querystring;

        const response = {
            status: '301',
            statusDescription: '301 Redirect for root domain',
            headers: {
                location: [{
                    key: 'Location',
                    value: newUrl
                }]
            }
        };
        
        callback(null, response);
    }
    
    callback(null, request);
};