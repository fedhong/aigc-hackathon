const URL = 'https://clipdrop-api.co/text-to-image/v1'
const X_API_KEY = '' //TODO YOUR KEY

const NEGATIVE_PROMPT = 'ugly,tiling,poorly drawn hands,poorly drawn feet,poorly drawn face,out of frame,extra limbs,disfigured,deformed,body out of frame,bad anatomy,watermark,signature,cut off,low contrast,underexposed,overexposed,bad art,beginner,amateur,distorted face.'

function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

const aigcOnce = async (prompt) => {

    const form = new FormData()
    form.append('prompt', prompt)

    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'x-api-key': X_API_KEY,
        },
        body: form,
    })

    if (!response.ok) {
        throw new Error(`Non-200 response: ${await response.text()}`)
    }
    const buffer = await response.arrayBuffer()
    return `data:image/png;base64,${_arrayBufferToBase64(buffer)}`
}


const aigc = async (prompt) => {

    const base64List = await Promise.all([
        aigcOnce(prompt),
        aigcOnce(prompt),
        aigcOnce(prompt),
    ])

    return base64List
}

export default aigc