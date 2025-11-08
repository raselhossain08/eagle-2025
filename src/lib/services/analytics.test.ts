/**
 * Analytics Service Test Suite
 * Test all analytics endpoints and functionality
 */

import { analyticsService } from '@/lib/services/analytics.service';

// Test configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

console.log('🧪 Starting Analytics Tests...');
console.log('API URL:', API_URL);

// Wait for service to initialize
setTimeout(async () => {
    await runTests();
}, 1000);

async function runTests() {
    console.log('\n📊 Analytics Service Test Suite\n');

    // Test 1: Track Page View
    await testPageView();

    // Test 2: Track Event
    await testEvent();

    // Test 3: Track Session
    await testSession();

    // Test 4: Batch Events
    await testBatchEvents();

    // Test 5: Single Event
    await testSingleEvent();

    // Test 6: Convenience Methods
    await testConvenienceMethods();

    // Test 7: Queue and Flush
    await testQueueAndFlush();

    console.log('\n✅ All tests completed!');
}

async function testPageView() {
    console.log('Test 1: Track Page View');
    console.log('------------------------');

    try {
        const result = await analyticsService.trackPageView('/test-page', 30);

        if (result.success) {
            console.log('✅ Page view tracked successfully');
            console.log('   Session ID:', result.data?.sessionId);
            console.log('   Page:', result.data?.page);
        } else {
            console.log('❌ Failed:', result.message);
        }
    } catch (error) {
        console.log('❌ Error:', error);
    }
    console.log('');
}

async function testEvent() {
    console.log('Test 2: Track Event');
    console.log('-------------------');

    try {
        const result = await analyticsService.trackEvent(
            'button_click',
            'user_interaction',
            'click',
            {
                eventLabel: 'test_button',
                eventValue: 100,
                properties: {
                    location: 'test_page',
                    variant: 'primary'
                }
            }
        );

        if (result.success) {
            console.log('✅ Event tracked successfully');
            console.log('   Event Type:', result.data?.eventType);
            console.log('   Category:', result.data?.eventCategory);
        } else {
            console.log('❌ Failed:', result.message);
        }
    } catch (error) {
        console.log('❌ Error:', error);
    }
    console.log('');
}

async function testSession() {
    console.log('Test 3: Track Session');
    console.log('---------------------');

    try {
        const result = await analyticsService.updateSession({
            startTime: new Date(),
            duration: 300,
            deviceInfo: {
                type: 'desktop',
                browser: 'Chrome',
                os: 'Windows',
                screenResolution: '1920x1080'
            }
        });

        if (result.success) {
            console.log('✅ Session updated successfully');
            console.log('   Session ID:', result.data?.sessionId);
            console.log('   Duration:', result.data?.duration);
        } else {
            console.log('❌ Failed:', result.message);
        }
    } catch (error) {
        console.log('❌ Error:', error);
    }
    console.log('');
}

async function testBatchEvents() {
    console.log('Test 4: Batch Events');
    console.log('--------------------');

    try {
        const events = [
            {
                type: 'page_view',
                properties: {
                    page: '/test-1',
                    referrer: 'https://google.com'
                }
            },
            {
                type: 'button_click',
                properties: {
                    button: 'cta',
                    location: 'hero'
                }
            },
            {
                type: 'form_submit',
                properties: {
                    form: 'contact',
                    fields: ['name', 'email']
                }
            }
        ];

        const result = await analyticsService.sendBatchEvents(events);

        if (result.success) {
            console.log('✅ Batch events sent successfully');
            console.log('   Processed:', result.data?.processed);
            console.log('   Event IDs:', result.data?.eventIds?.length);
        } else {
            console.log('❌ Failed:', result.message);
            console.log('   Errors:', result.error);
        }
    } catch (error) {
        console.log('❌ Error:', error);
    }
    console.log('');
}

async function testSingleEvent() {
    console.log('Test 5: Single Event');
    console.log('--------------------');

    try {
        const event = {
            type: 'signup_completed',
            properties: {
                method: 'email',
                plan: 'free'
            },
            metadata: {
                source: 'landing_page'
            }
        };

        const result = await analyticsService.sendSingleEvent(event);

        if (result.success) {
            console.log('✅ Single event sent successfully');
            console.log('   Event ID:', result.data?.eventId);
            console.log('   Type:', result.data?.type);
        } else {
            console.log('❌ Failed:', result.message);
        }
    } catch (error) {
        console.log('❌ Error:', error);
    }
    console.log('');
}

async function testConvenienceMethods() {
    console.log('Test 6: Convenience Methods');
    console.log('---------------------------');

    const tests = [
        {
            name: 'Track Button Click',
            fn: () => analyticsService.trackButtonClick('test_button', { variant: 'primary' })
        },
        {
            name: 'Track Form Submit',
            fn: () => analyticsService.trackFormSubmit('test_form', { fields: 3 })
        },
        {
            name: 'Track Signup',
            fn: () => analyticsService.trackSignup('email')
        },
        {
            name: 'Track Login',
            fn: () => analyticsService.trackLogin('google')
        },
        {
            name: 'Track Subscription View',
            fn: () => analyticsService.trackSubscriptionView('premium')
        },
        {
            name: 'Track Payment Started',
            fn: () => analyticsService.trackPaymentStarted(99.99, 'USD')
        },
        {
            name: 'Track Payment Completed',
            fn: () => analyticsService.trackPaymentCompleted(99.99, 'USD', 'txn_test')
        },
        {
            name: 'Track Error',
            fn: () => analyticsService.trackError('test_error', 'Test error message', { code: 500 })
        },
        {
            name: 'Track Search',
            fn: () => analyticsService.trackSearch('test query', 10)
        },
        {
            name: 'Track Download',
            fn: () => analyticsService.trackDownload('test.pdf', 'pdf')
        }
    ];

    for (const test of tests) {
        try {
            const result = await test.fn();
            if (result.success) {
                console.log(`✅ ${test.name}`);
            } else {
                console.log(`❌ ${test.name}: ${result.message}`);
            }
        } catch (error) {
            console.log(`❌ ${test.name}: Error`);
        }
    }
    console.log('');
}

async function testQueueAndFlush() {
    console.log('Test 7: Queue and Flush');
    console.log('------------------------');

    try {
        // Queue multiple events
        console.log('📝 Queueing 5 events...');
        for (let i = 0; i < 5; i++) {
            analyticsService.queueEvent({
                type: 'user_action',
                properties: {
                    action: `test_action_${i}`,
                    timestamp: Date.now()
                }
            });
        }

        console.log('✅ Events queued');

        // Wait a bit then flush
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('🚀 Flushing events...');
        await analyticsService.flushEvents();

        console.log('✅ Events flushed');
    } catch (error) {
        console.log('❌ Error:', error);
    }
    console.log('');
}

// Export for use in browser console
if (typeof window !== 'undefined') {
    (window as any).testAnalytics = runTests;
    (window as any).analyticsService = analyticsService;
}
