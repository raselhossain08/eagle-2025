// MongoDB Import Script for Eagle Investors Contract Data
// Run this script to import all contract types and related data into your database

const contractSeedData = require('./contract-seed-data.json');

// MongoDB Connection (adjust connection string as needed)
const { MongoClient } = require('mongodb');

const DB_CONNECTION_STRING = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DATABASE_NAME = 'eagle_investors';

async function importContractData() {
    const client = new MongoClient(DB_CONNECTION_STRING);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(DATABASE_NAME);

        // Import Contract Types
        const contractTypesCollection = db.collection('contract_types');

        // Clear existing data (optional - remove if you want to keep existing data)
        // await contractTypesCollection.deleteMany({});
        // console.log('Cleared existing contract types');

        // Insert contract types
        const contractTypes = contractSeedData.contractTypes;
        const insertResult = await contractTypesCollection.insertMany(contractTypes);
        console.log(`Inserted ${insertResult.insertedCount} contract types`);

        // Import Contract Terms and Conditions
        const termsCollection = db.collection('contract_terms');
        const termsData = {
            _id: 'standard_terms_v2025_1',
            version: contractSeedData.contractMetadata.version,
            effectiveDate: new Date(contractSeedData.contractMetadata.effectiveDate),
            terms: contractSeedData.contractTermsAndConditions,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await termsCollection.replaceOne(
            { _id: termsData._id },
            termsData,
            { upsert: true }
        );
        console.log('Updated contract terms and conditions');

        // Import Regulatory Compliance Data
        const complianceCollection = db.collection('regulatory_compliance');
        const complianceData = {
            _id: 'compliance_requirements_2025',
            version: contractSeedData.contractMetadata.version,
            effectiveDate: new Date(contractSeedData.contractMetadata.effectiveDate),
            requirements: contractSeedData.regulatoryCompliance,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await complianceCollection.replaceOne(
            { _id: complianceData._id },
            complianceData,
            { upsert: true }
        );
        console.log('Updated regulatory compliance data');

        // Create indexes for better performance
        await contractTypesCollection.createIndex({ "id": 1 }, { unique: true });
        await contractTypesCollection.createIndex({ "category": 1 });
        await contractTypesCollection.createIndex({ "planType": 1 });
        await contractTypesCollection.createIndex({ "name": 1 });

        console.log('Created database indexes');

        // Import sample contracts (optional)
        await importSampleContracts(db);

        console.log('Contract data import completed successfully!');

    } catch (error) {
        console.error('Error importing contract data:', error);
    } finally {
        await client.close();
    }
}

// Import sample signed contracts for testing
async function importSampleContracts(db) {
    const contractsCollection = db.collection('contracts');

    const sampleContracts = [
        {
            _id: 'sample_basic_001',
            contractTypeId: 'basic-contract',
            customerName: 'John Doe',
            customerEmail: 'john.doe@example.com',
            contractDate: new Date('2025-11-01'),
            price: '$0',
            status: 'active',
            subscriptionType: 'monthly',
            productType: 'basic-subscription',
            subscriptionStartDate: new Date('2025-11-01'),
            subscriptionEndDate: null, // Basic is free, no end date
            signature: 'data:image/png;base64,sample_signature_data',
            pdfPath: '/contracts/basic_001.pdf',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            _id: 'sample_diamond_001',
            contractTypeId: 'diamond-contract',
            customerName: 'Jane Smith',
            customerEmail: 'jane.smith@example.com',
            contractDate: new Date('2025-11-02'),
            price: '$70',
            amount: 70,
            status: 'active',
            subscriptionType: 'monthly',
            productType: 'diamond-subscription',
            subscriptionStartDate: new Date('2025-11-02'),
            subscriptionEndDate: new Date('2025-12-02'),
            signature: 'data:image/png;base64,sample_signature_data_2',
            pdfPath: '/contracts/diamond_001.pdf',
            paymentStatus: 'completed',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            _id: 'sample_infinity_001',
            contractTypeId: 'infinity-contract',
            customerName: 'Mike Johnson',
            customerEmail: 'mike.johnson@example.com',
            contractDate: new Date('2025-11-03'),
            price: '$127',
            amount: 127,
            status: 'active',
            subscriptionType: 'monthly',
            productType: 'infinity-subscription',
            subscriptionStartDate: new Date('2025-11-03'),
            subscriptionEndDate: new Date('2025-12-03'),
            signature: 'data:image/png;base64,sample_signature_data_3',
            pdfPath: '/contracts/infinity_001.pdf',
            paymentStatus: 'completed',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            _id: 'sample_investment_advising_001',
            contractTypeId: 'investment-advising-contract',
            customerName: 'Sarah Wilson',
            customerEmail: 'sarah.wilson@example.com',
            contractDate: new Date('2025-11-04'),
            price: '$786',
            amount: 786,
            status: 'active',
            subscriptionType: 'one-time',
            productType: 'investment-advising',
            subscriptionStartDate: new Date('2025-11-04'),
            subscriptionEndDate: new Date('2026-11-04'), // 12 months from start
            signature: 'data:image/png;base64,sample_signature_data_4',
            pdfPath: '/contracts/investment_advising_001.pdf',
            paymentStatus: 'completed',
            sessionsRemaining: 3,
            diamondMembershipEndDate: new Date('2026-02-04'), // 3 months
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            _id: 'sample_trading_tutor_001',
            contractTypeId: 'trading-tutor-contract',
            customerName: 'David Brown',
            customerEmail: 'david.brown@example.com',
            contractDate: new Date('2025-11-05'),
            price: '$786',
            amount: 786,
            status: 'active',
            subscriptionType: 'one-time',
            productType: 'trading-tutor',
            subscriptionStartDate: new Date('2025-11-05'),
            subscriptionEndDate: null, // One-time service
            signature: 'data:image/png;base64,sample_signature_data_5',
            pdfPath: '/contracts/trading_tutor_001.pdf',
            paymentStatus: 'completed',
            sessionsRemaining: 3,
            diamondMembershipEndDate: new Date('2026-02-05'), // 3 months
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            _id: 'sample_ultimate_001',
            contractTypeId: 'ultimate-contract',
            customerName: 'Lisa Garcia',
            customerEmail: 'lisa.garcia@example.com',
            contractDate: new Date('2025-11-01'),
            price: '$1,820',
            amount: 1820,
            status: 'active',
            subscriptionType: 'one-time',
            productType: 'ultimate-mentorship',
            subscriptionStartDate: new Date('2025-11-01'),
            subscriptionEndDate: null, // One-time service
            signature: 'data:image/png;base64,sample_signature_data_6',
            pdfPath: '/contracts/ultimate_001.pdf',
            paymentStatus: 'completed',
            sessionsRemaining: 8,
            diamondMembershipEndDate: new Date('2026-11-01'), // 1 year
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            _id: 'sample_script_001',
            contractTypeId: 'script-contract',
            customerName: 'Tom Anderson',
            customerEmail: 'tom.anderson@example.com',
            contractDate: new Date('2025-11-02'),
            price: '$99',
            amount: 99,
            status: 'active',
            subscriptionType: 'monthly',
            productType: 'script-subscription',
            subscriptionStartDate: new Date('2025-11-02'),
            subscriptionEndDate: new Date('2025-12-02'),
            signature: 'data:image/png;base64,sample_signature_data_7',
            pdfPath: '/contracts/script_001.pdf',
            paymentStatus: 'completed',
            tradingViewAccess: {
                inviteSent: true,
                accessGranted: true,
                scriptId: 'momentum_scalper_pro_v1'
            },
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    // Insert sample contracts
    const contractResult = await contractsCollection.insertMany(sampleContracts);
    console.log(`Inserted ${contractResult.insertedCount} sample contracts`);

    // Create indexes for contracts collection
    await contractsCollection.createIndex({ "customerEmail": 1 });
    await contractsCollection.createIndex({ "contractTypeId": 1 });
    await contractsCollection.createIndex({ "status": 1 });
    await contractsCollection.createIndex({ "subscriptionType": 1 });
    await contractsCollection.createIndex({ "productType": 1 });
    await contractsCollection.createIndex({ "subscriptionEndDate": 1 });
    await contractsCollection.createIndex({ "createdAt": -1 });

    console.log('Created contract indexes');
}

// Run the import
if (require.main === module) {
    importContractData();
}

module.exports = { importContractData };