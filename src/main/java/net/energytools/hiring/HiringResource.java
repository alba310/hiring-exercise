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
    private String ABC = "A";

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/counter", method = RequestMethod.GET)
    public ResponseEntity<CounterDTO> getCounter(final HttpServletRequest request) {
        final String requestType = request.getHeader("X-Request-Type");
        if (!Objects.isNull(requestType) && ("a").equalsIgnoreCase(requestType) && ABC == "A") {
            counter += 1;
            ABC = "B";

            log.info("Request type A {}", counter);
            try {
                Thread.sleep(2000);
            } catch (final InterruptedException ignored) {
            }

        }else if (!Objects.isNull(requestType) && ("b").equalsIgnoreCase(requestType) && ABC == "B") {
            counter += 1;
            ABC = "C";

            log.info("Request type B {}", counter);
        }else if (!Objects.isNull(requestType) && ("c").equalsIgnoreCase(requestType)&& ABC == "C") {
            counter += 1;
            ABC = "A";

            log.info("Request type C {}", counter);
        }
        return ResponseEntity.ok(new CounterDTO(counter));
    }
}