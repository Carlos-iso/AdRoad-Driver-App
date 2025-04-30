// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
module.exports = (async () => {
    const config = await getDefaultConfig(__dirname);
    // Configuração para o react-native-svg-transformer
    const { assetExts, sourceExts } = config.resolver;
    config.transformer = {
        // Se já existir alguma configuração em transformer, preserva-a
        ...config.transformer,
        babelTransformerPath: require.resolve("react-native-svg-transformer")
    };
    config.resolver.assetExts = assetExts.filter((ext: string) => ext !== "svg");
    config.resolver.sourceExts = [...sourceExts, "svg"];
    // Sua configuração já existente para mapear "missing-asset-registry-path"
    config.resolver.extraNodeModules = {
        ...(config.resolver.extraNodeModules || {}),
        "missing-asset-registry-path": require.resolve("./shim/emptyModule.js")
    };
    return config;
})();
