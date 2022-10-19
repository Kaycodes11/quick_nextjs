import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: '76q7p0j0',
    dataset: 'production',
    apiVersion: "2022-10-18",
    useCdn: true,
    token: 'skVwL2G6OnREsQIlnc9Z2mH8o8JIyg1h5ce8zGywsvriy0J1R6LivPGK20kxlyDqiMjL7WJ3nsXzlLVvSJuvU93yJyVkdaqosMqNPUktMtA8ptfA695XNSu4icyfUiWikixjKQgHPS0M3dBg7ggC1fZPWgYId0j9oSPszsP2BirRhcwmMKSi',
});

const builder = ImageUrlBuilder(client);
export const urlFor = source => builder.image(source);

