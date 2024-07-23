import * as http from 'https';

function httprequest(url) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 400) {
        return reject(new Error('statusCode=' + res.statusCode));
      }
      var body = [];
      res.on('data', function (chunk) {
        body.push(chunk);
      });
      res.on('end', function () {
        try {
          body = JSON.parse(Buffer.concat(body).toString());
        } catch (e) {
          reject(e);
        }
        resolve(body);
      });
    });
    req.on('error', (e) => {
      reject(e.message);
    });
    // send the request
    req.end();
  });
}

function algoliaRequest(request) {
  var post_data = JSON.stringify(request);
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: `AWTOV2ONSQ-dsn.algolia.net`,
        path: '/1/indexes/ecommerce/query',
        method: 'POST',
        headers: {
          'Content-Length': Buffer.byteLength(post_data),
          'X-Algolia-API-Key': 'a1bb46ee8f5c00b28a9c8c8b31530965',
          'X-Algolia-Application-Id': 'AWTOV2ONSQ',
          'Content-Type': 'application/json',
        },
      },
      (res) => {
        if (res.statusCode < 200 || res.statusCode >= 400) {
          return reject(new Error('statusCode=' + res.statusCode));
        }
        var body = [];
        res.on('data', function (chunk) {
          body.push(chunk);
        });
        res.on('end', function () {
          try {
            body = JSON.parse(Buffer.concat(body).toString());
          } catch (e) {
            reject(e);
          }
          resolve(body);
        });
      },
    );

    req.write(post_data);
    req.on('error', (e) => {
      reject(e.message);
    });
    // send the request
    req.end();
  });
}

function prepareResponse(event, txtMessage) {
  const res = {
    sessionState: {
      dialogAction: {
        type: 'Close',
      },
      intent: {
        name: event.sessionState.intent.name,
        state: 'Fulfilled',
      },
    },
    messages: [
      {
        contentType: 'PlainText',
        content: txtMessage,
      },
    ],
  };
  return res;
}

function prepareConfirmResponse(event, slots, txtMessage) {
  const res = {
    sessionState: {
      dialogAction: {
        type: 'ConfirmIntent',
      },
      intent: {
        name: event.sessionState.intent.name,
        state: 'Fulfilled',
        slots: slots,
      },
    },
    messages: [
      {
        contentType: 'PlainText',
        content: txtMessage,
      },
    ],
  };
  return res;
}

function prepareRichTextResponse(event, message) {
  const res = {
    sessionState: {
      dialogAction: {
        type: 'Close',
      },
      intent: {
        name: event.sessionState.intent.name,
        state: 'Fulfilled',
      },
    },
    messages: [
      {
        contentType: 'CustomPayload',
        content: JSON.stringify(message),
      },
    ],
  };
  return res;
}

async function showCategory(event) {
  try {
    const { data } = await httprequest(
      'https://ecommerce-beta-roan-83.vercel.app/api/home/categories',
    );

    const payload = data.map((v) => ({
      title: v.name,
      header: {
        imgSrc: v.product.assets.length > 0 ? v.product.assets[0].url : '',
      },
      buttons: [
        {
          name: 'Open the link',
          action: {
            type: 'link',
            payload: {
              url: `https://ecommerce-beta-roan-83.vercel.app/shop?category=${v.id}`,
            },
          },
        },
        {
          name: 'Show some products',
          action: {
            type: 'quickReply',
            payload: {
              name: 'Show some products',
              message: `Show me some products in ${v.name}`,
            },
          },
        },
      ],
    }));

    return prepareRichTextResponse(event, {
      platform: 'kommunicate',
      metadata: {
        contentType: '300',
        templateId: '10',
        payload: payload,
      },
    });
  } catch (e) {
    console.log(e);
    return prepareResponse(event, 'We have some error');
  }
}

async function showProductInCategory(event) {
  try {
    let category = event.sessionState.intent.slots.category.value.originalValue;
    const { hits } = await algoliaRequest({
      params: `facetFilters=${encodeURIComponent(
        `[["category.name:${category}"]]`,
      )}&&hitsPerPage=5`,
    });

    const payload = hits.map((v) => ({
      title: v.name,
      header: {
        imgSrc: v.assets.length > 0 ? v.assets[0].url : '',
      },
      buttons: [
        {
          name: 'Open the link',
          action: {
            type: 'link',
            payload: {
              url: `https://ecommerce-beta-roan-83.vercel.app/shop/${v.id}`,
              openLinkInNewTab: false,
            },
          },
        },
        {
          name: 'View detail',
          action: {
            type: 'quickReply',
            payload: {
              title: 'View detail',
              message: `Show detail ${v.name}`,
            },
          },
        },
      ],
    }));

    return prepareRichTextResponse(event, {
      platform: 'kommunicate',
      metadata: {
        contentType: '300',
        templateId: '10',
        payload: payload,
      },
    });
  } catch (e) {
    console.log(e);
    return prepareResponse(event, 'We have some error');
  }
}

async function showProductDetail(event) {
  try {
    if (event.invocationSource == 'DialogCodeHook') {
      let product = event.sessionState.intent.slots.product.value.originalValue;
      const { hits } = await algoliaRequest({
        params: `query=${encodeURIComponent(product)}&&hitsPerPage=1`,
      });
      if (hits.length == 0) {
        return prepareResponse(event, 'Sorry, your product is not found');
      }
      const hit = hits[0];
      switch (event.sessionState.intent.confirmationState) {
        case 'Confirmed':
          return prepareRichTextResponse(event, {
            platform: 'kommunicate',
            metadata: {
              contentType: '300',
              templateId: '10',
              payload: [
                {
                  title: hit.name,
                  subtitle: hit.price + ' vnd',
                  header: {
                    imgSrc: hit.assets.length > 0 ? hit.assets[0].url : '',
                  },
                  buttons: [
                    {
                      name: 'Open the link',
                      action: {
                        type: 'link',
                        payload: {
                          url: `https://ecommerce-beta-roan-83.vercel.app/shop/${hit.id}`,
                          openLinkInNewTab: false,
                        },
                      },
                    },
                    {
                      name: 'Add to cart',
                      action: {
                        type: 'quickReply',
                        payload: {
                          title: 'Add to cart',
                          message: `Add ${hit.name} to cart`,
                        },
                      },
                    },
                  ],
                },
              ],
            },
          });

        case 'None':
          return prepareConfirmResponse(
            event,
            {
              product: {
                value: {
                  originalValue: product,
                  interpretedValue: hit.name,
                  resolvedValues: [hit.name],
                },
              },
            },
            `Are you looking for ${hit.name}?`,
          );
        default:
          return prepareResponse(event, 'May I help you something else?');
      }
    }
  } catch (e) {
    console.log(e);
    return prepareResponse(event, 'We have some error');
  }
}

async function addProductToCart(event) {
  try {
    if (event.invocationSource == 'DialogCodeHook') {
      let product = event.sessionState.intent.slots.product.value.originalValue;
      const { hits } = await algoliaRequest({
        params: `query=${encodeURIComponent(product)}&&hitsPerPage=1`,
      });
      if (hits.length == 0) {
        return prepareResponse(event, 'Sorry, your product is not found');
      }
      const hit = hits[0];
      switch (event.sessionState.intent.confirmationState) {
        case 'Confirmed':
          return prepareRichTextResponse(event, {
            message: `Click this link to add ${hit.name} to your cart`,
            platform: 'kommunicate',
            metadata: {
              contentType: '300',
              templateId: '3',
              payload: [
                {
                  type: 'link',
                  url: `https://ecommerce-beta-roan-83.vercel.app/cart/callback?item=${hit.id}`,
                  name: 'Add to cart',
                  openLinkInNewTab: false,
                },
              ],
            },
          });

        case 'None':
          return prepareConfirmResponse(
            event,
            {
              product: {
                value: {
                  originalValue: product,
                  interpretedValue: hit.name,
                  resolvedValues: [hit.name],
                },
              },
            },
            `Do you want to add ${hit.name} to your cart?`,
          );
        default:
          return prepareResponse(event, 'May I help you something else?');
      }
    }
  } catch (e) {
    console.log(e);
    return prepareResponse(event, 'We have some error');
  }
}

export const handler = async (event) => {
  try {
    console.log(event);
    // handle base on intent name
    switch (event.sessionState.intent.name) {
      case 'ShowCategory':
        return await showCategory(event);
      case 'ShowProductDetail':
        return await showProductDetail(event);
      case 'ShowProductInCategory':
        return await showProductInCategory(event);
      case 'AddCart':
        return await addProductToCart(event);
      default:
    }
  } catch (e) {
    return prepareResponse(event, 'There some error');
  }
};
