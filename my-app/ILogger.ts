
interface ILogger {
  info(message: string): void;
  error(message: string): void;
  debug(message: string): void;
  warn(message: string): void;
}
class DevLogger implements ILogger {
  info(message: string): void {
    console.log(`[INFO] ${message}`);
  }
  error(message: string): void {
    console.log(`[ERROR] ${message}`);
  }
  debug(message: string): void {
    console.log(`[DEBUG] ${message}`);
  }
  warn(message: string): void {
    console.log(`[WARN] ${message}`);
  }
}
class ProdLogger implements ILogger {
  info(message: string): void { }
  error(message: string): void {
    console.log(`[ERROR] ${message}`);
  }
  debug(message: string): void { }
  warn(message: string): void {
    console.log(`[WARN] ${message}`);
  }
}
class LogFactory {
  static createLogger(): ILogger {
    if (process.env.NODE_ENV === "production") {
      return new ProdLogger();
    } else {
      return new DevLogger();
    }
  }
}

// Functional Variant

function prodLogger(): ILogger {
  return ({
    info(message: string): void { },
    error(message: string): void {
      console.log(`[ERROR] ${message}`);
    },
    debug(message: string): void { },
    warn(message: string): void {
      console.log(`[WARN] ${message}`);
    }
  })
}

function devLogger(): ILogger {
  return ({
    info(message: string): void {
      console.log(`[INFO] ${message}`);
    },
    error(message: string): void {
      console.log(`[ERROR] ${message}`);
    },
    debug(message: string): void {
      console.log(`[DEBUG] ${message}`);  
    },
    warn(message: string): void {
      console.log(`[WARN] ${message}`);
    }
  })
}

function loggerFactory(): ILogger {
  if (process.env.NODE_ENV === "production") {
    return prodLogger();
  } else {
    return devLogger();
  }
}

const log = loggerFactory();
log.info("Hello World");
log.error("Hello World");
log.debug("Hello World");
log.warn("Hello World");

