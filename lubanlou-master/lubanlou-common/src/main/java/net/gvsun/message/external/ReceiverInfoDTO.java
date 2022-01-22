package net.gvsun.message.external;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class ReceiverInfoDTO implements Serializable {
    private List<ApiUserDTO> smsUserDTO;
    private List<ApiUserDTO> emailUserDTO;
}

