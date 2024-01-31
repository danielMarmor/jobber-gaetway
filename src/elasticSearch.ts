import { winstonLogger } from "@danielmarmor/jobber-shared";
import { Logger, info } from "winston";
import { config } from "@gateway/config";
import { Client } from "@elastic/elasticsearch";


const logger: Logger = winstonLogger(config.ELASTIC_SEARCH_URL!, "gateway server", "debug");

class Elasticsearch {
    private elasticSearchClient: Client;
    constructor() {
        this.elasticSearchClient = new Client({
            node: config.ELASTIC_SEARCH_URL!
        });
    }
    public async CheckConnction() {
        let isConnected = false;
        while (!isConnected) {
            logger.info(`gateway server is connecting to elastic search`)
            try {
                const health = await this.elasticSearchClient.cluster.health({});
                logger.info(`gateway server is elasticSearchClient health=${health.status}`);
                isConnected = true;
            } catch (error) {
                logger.log('error', "connection to elastic search failed, retriyng.....");
                logger.log('error', `gateway server elasticSearchClient method CheckConnction()`, error);
            }
        }
    }
}

export const elasticSearch: Elasticsearch = new Elasticsearch();