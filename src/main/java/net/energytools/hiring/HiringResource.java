package net.energytools.hiring;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

@RestController
@RequestMapping(value = "/api/hiring", produces = MediaType.APPLICATION_JSON_VALUE)
public class HiringResource {
    private int counter = 0;
    private int counterA = 1;
    private int counterB = 2;
    private int counterC = 3;
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/counter", method = RequestMethod.GET)
    public ResponseEntity<CounterDTO> getCounter(HttpServletRequest request) {
        String requestType = request.getHeader("X-Request-Type");
        if (!Objects.isNull(requestType) && ("a").equalsIgnoreCase(requestType)){

            log.info("Request of type A {}", counterA);

            try {
                Thread.sleep(2000);
                counter=counterA;
                counterA += 3;
            } catch (InterruptedException ignored) {}


        }else if (requestType != null && requestType.toLowerCase().equals("b")) {
            counter=counterB;
            log.info("Request type B {}", counterB);
            counterB += 3;

        }else if (requestType != null && requestType.toLowerCase().equals("c") ) {
            counter=counterC;
            log.info("Request type C {}", counterC);
            counterC += 3;

        }
        return ResponseEntity.ok(new CounterDTO(counter));
    }

}
