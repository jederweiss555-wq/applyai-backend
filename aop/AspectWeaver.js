/**
 * AspectWeaver - Core AOP Framework for Fastify
 * Manages aspect registration and execution
 */
class AspectWeaver {
  constructor() {
    this.aspects = {
      before: [],
      after: [],
      afterReturning: [],
      afterThrowing: [],
      around: []
    };
    this.pointcuts = new Map();
  }

  /**
   * Register a before aspect
   * @param {string} pattern - Pattern to match (e.g., 'auth.*')
   * @param {Function} advice - Function to execute before method
   */
  addBeforeAspect(pattern, advice) {
    this.aspects.before.push({ pattern, advice });
  }

  /**
   * Register an after aspect
   * @param {string} pattern - Pattern to match
   * @param {Function} advice - Function to execute after method
   */
  addAfterAspect(pattern, advice) {
    this.aspects.after.push({ pattern, advice });
  }

  /**
   * Register an afterReturning aspect
   * @param {string} pattern - Pattern to match
   * @param {Function} advice - Function to execute after successful return
   */
  addAfterReturningAspect(pattern, advice) {
    this.aspects.afterReturning.push({ pattern, advice });
  }

  /**
   * Register an afterThrowing aspect
   * @param {string} pattern - Pattern to match
   * @param {Function} advice - Function to execute on error
   */
  addAfterThrowingAspect(pattern, advice) {
    this.aspects.afterThrowing.push({ pattern, advice });
  }

  /**
   * Register an around aspect
   * @param {string} pattern - Pattern to match
   * @param {Function} advice - Function that wraps the entire method
   */
  addAroundAspect(pattern, advice) {
    this.aspects.around.push({ pattern, advice });
  }

  /**
   * Check if a pointcut matches a pattern
   * @param {string} pointcut - The actual pointcut
   * @param {string} pattern - The pattern to match against
   */
  matchesPattern(pointcut, pattern) {
    const regexPattern = pattern
      .replace(/\./g, '\\.')
      .replace(/\*/g, '.*');
    return new RegExp('^' + regexPattern + '$').test(pointcut);
  }

  /**
   * Get matching aspects for a pointcut
   * @param {string} pointcut - The pointcut to match
   * @param {string} type - The aspect type (before, after, etc.)
   */
  getMatchingAspects(pointcut, type) {
    return this.aspects[type].filter(aspect =>
      this.matchesPattern(pointcut, aspect.pattern)
    );
  }

  /**
   * Weave aspects into a Fastify route handler
   * @param {string} pointcut - The pointcut name (e.g., 'controller.userService.login')
   * @param {Function} originalHandler - Original route handler
   * @returns {Function} - Wrapped handler with aspects
   */
  weaveAspects(pointcut, originalHandler) {
    return async (request, reply) => {
      const joinPoint = {
        pointcut,
        request,
        reply,
        args: [request, reply],
        metadata: {}
      };

      try {
        // Execute before aspects
        const beforeAspects = this.getMatchingAspects(pointcut, 'before');
        for (const aspect of beforeAspects) {
          await aspect.advice(joinPoint);
        }

        // Execute around aspects or original handler
        const aroundAspects = this.getMatchingAspects(pointcut, 'around');
        let result;

        if (aroundAspects.length > 0) {
          // Chain around aspects
          let handler = originalHandler;
          for (let i = aroundAspects.length - 1; i >= 0; i--) {
            const aspect = aroundAspects[i];
            const currentHandler = handler;
            handler = async (request, reply) => {
              const proceedJoinPoint = {
                ...joinPoint,
                request,
                reply,
                proceed: () => currentHandler(request, reply)
              };
              return aspect.advice(proceedJoinPoint);
            };
          }
          result = await handler(request, reply);
        } else {
          result = await originalHandler(request, reply);
        }

        // Execute afterReturning aspects
        const afterReturningAspects = this.getMatchingAspects(pointcut, 'afterReturning');
        for (const aspect of afterReturningAspects) {
          await aspect.advice({ ...joinPoint, result });
        }

        // Execute after aspects
        const afterAspects = this.getMatchingAspects(pointcut, 'after');
        for (const aspect of afterAspects) {
          await aspect.advice({ ...joinPoint, result });
        }

        return result;
      } catch (error) {
        // Execute afterThrowing aspects
        const afterThrowingAspects = this.getMatchingAspects(pointcut, 'afterThrowing');
        for (const aspect of afterThrowingAspects) {
          await aspect.advice({ ...joinPoint, error });
        }

        throw error;
      }
    };
  }
}

module.exports = AspectWeaver;