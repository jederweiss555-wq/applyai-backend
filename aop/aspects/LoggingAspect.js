// LoggingAspect.js

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {
    
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @After("execution(* com.yourpackage..*(..))")
    public void logAfter(JoinPoint joinPoint) {
        logger.info("Method executed: " + joinPoint.getSignature().getName());
        logger.info("Arguments: " + Arrays.toString(joinPoint.getArgs()));
    }
}