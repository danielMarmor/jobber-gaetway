import dotenv from 'dotenv'

dotenv.config({});

class Config {
    public ENABLE_APM: string | undefined
    public JWT_TOKEN: string | undefined
    public GATEWAY_JWT_TOKEN: string | undefined
    public NODE_ENV: string | undefined
    public SECRET_KEY_ONE: string | undefined
    public SECRET_KEY_TWO: string | undefined
    public CLIENT_URL: string | undefined
    public AUTH_BASE_URL: string | undefined
    public USERS_BASE_URL: string | undefined
    public GIG_BASE_URL: string | undefined
    public MESSAGE_BASE_URL: string | undefined
    public ORDER_BASE_URL: string | undefined
    public REVIEW_BASE_URL: string | undefined
    public ELASTIC_SEARCH_URL: string | undefined
    public ELASTIC_APM_SERVER_URL: string | undefined
    public ELASTIC_APM_CONFIG_TOKEN: string | undefined

    constructor() {
        this.ENABLE_APM = process.env.ENABLE_APM || '';
        this.JWT_TOKEN = process.env.JWT_TOKEN || '';
        this.GATEWAY_JWT_TOKEN = process.env.GATEWAY_JWT_TOKEN || '';
        this.NODE_ENV = process.env.NODE_ENV || '';
        this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
        this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
        this.CLIENT_URL = process.env.CLIENT_URL || '';
        this.AUTH_BASE_URL = process.env.AUTH_BASE_URL || '';
        this.USERS_BASE_URL = process.env.USERS_BASE_URL || '';
        this.GIG_BASE_URL = process.env.GIG_BASE_URL || '';
        this.MESSAGE_BASE_URL = process.env.MESSAGE_BASE_URL || '';
        this.ORDER_BASE_URL = process.env.ORDER_BASE_URL || '';
        this.REVIEW_BASE_URL = process.env.REVIEW_BASE_URL || '';
        this.ELASTIC_SEARCH_URL = process.env.ELASTIC_SEARCH_URL || '';
        this.ELASTIC_APM_SERVER_URL = process.env.ELASTIC_APM_SERVER_URL || '';
        this.ELASTIC_APM_CONFIG_TOKEN = process.env.ELASTIC_APM_CONFIG_TOKEN || '';
    }
}

export const config: Config = new Config();
