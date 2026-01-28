// Aspect Configuration

const aspectConfig = {
    aspects: [
        {
            name: 'LoggingAspect',
            type: 'crosscutting',
            pointcut: 'execution(* com.example..*.*(..))',
            advice: 'around'
        },
        {
            name: 'PerformanceAspect',
            type: 'crosscutting',
            pointcut: 'execution(* com.example..*.*(..))',
            advice: 'around'
        }
    ]
};

module.exports = aspectConfig;
