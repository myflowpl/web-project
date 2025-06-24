"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeEnv = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Initialize environment configuration
 * If .env file doesn't exist, create it from .env-tpl template
 */
const initializeEnv = () => {
    const envPath = path_1.default.resolve(process.cwd(), '.env');
    let envTplPath = path_1.default.resolve(process.cwd(), '.env-tpl');
    // For production builds, look for template in dist directory if not found in root
    if (!fs_1.default.existsSync(envTplPath)) {
        const distEnvTplPath = path_1.default.resolve(__dirname, '../.env-tpl');
        if (fs_1.default.existsSync(distEnvTplPath)) {
            envTplPath = distEnvTplPath;
        }
    }
    // Check if .env file exists
    if (!fs_1.default.existsSync(envPath)) {
        console.log('.env file not found, creating from template...');
        // Check if template exists
        if (fs_1.default.existsSync(envTplPath)) {
            try {
                // Copy template to .env
                const templateContent = fs_1.default.readFileSync(envTplPath, 'utf8');
                fs_1.default.writeFileSync(envPath, templateContent, 'utf8');
                console.log('✅ .env file created from .env-tpl template');
                console.log('📝 Please review and update the .env file with your specific configuration');
            }
            catch (error) {
                console.error('❌ Error creating .env file from template:', error);
                process.exit(1);
            }
        }
        else {
            console.error('❌ .env-tpl template file not found');
            console.log('Please create .env-tpl file with your environment variables');
            console.log('Expected locations:');
            console.log(`  - ${path_1.default.resolve(process.cwd(), '.env-tpl')}`);
            console.log(`  - ${path_1.default.resolve(__dirname, '../.env-tpl')}`);
            process.exit(1);
        }
    }
};
exports.initializeEnv = initializeEnv;
