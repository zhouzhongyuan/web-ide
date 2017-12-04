import publicIp from 'public-ip';

async function getPublicIp() {
    const ip = await publicIp.v4();
    return ip;
}

export default {
    server: '',
    previewURL: getPublicIp(),
};
