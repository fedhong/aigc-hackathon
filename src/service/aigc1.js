const engineId = 'stable-diffusion-v1-5'
const apiHost = 'https://api.stability.ai'
const apiKey = '' //TODO YOUR KEY

const account = async () => {
    const url = `${apiHost}/v1/user/account`

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    })

    if (!response.ok) {
        throw new Error(`Non-200 response: ${await response.text()}`)
    }
    const json = await response.json()
    console.log('json', json)
}

const balance = async () => {
    const url = `${apiHost}/v1/user/balance`

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    })

    if (!response.ok) {
        throw new Error(`Non-200 response: ${await response.text()}`)
    }
    const json = await response.json()
    console.log('json', json)
}

const aigc1 = async (prompt) => {

    const response = await fetch(`${apiHost}/v1/generation/${engineId}/text-to-image`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                text_prompts: [
                    {
                        text: prompt,
                    },
                ],
                cfg_scale: 7,
                clip_guidance_preset: 'FAST_BLUE',
                height: 512,
                width: 512,
                samples: 3,
                steps: 30,
            }),
        }
    )

    if (!response.ok) {
        throw new Error(`Non-200 response: ${await response.text()}`)
    }
    const responseJSON = await response.json()
    const base64List = responseJSON.artifacts.map(item => `data:image/png;base64,${item.base64}`)
    return base64List
}

export default aigc1
export { account, balance }