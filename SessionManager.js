// utils/configManager.js
class ConfigManager {
    constructor() {
        this.config = {
            userEmail: '',
            profileId: '',
            serverURL: 'https://smart.29ayx.life',
            profileName: '',
            dietGoals:''
        };
    }

    get(key) {
        return this.config[key];
    }

    set(key, value) {
        this.config[key] = value;
    }

    getAll() {
        return this.config;
    }

    setAll(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }
}

const instance = new ConfigManager();
Object.freeze(instance);

export default instance;
