<table style="font-family:Trebuchet ms,Arial,sans-serif;max-width:600px;width:100%" cellspacing="0" cellpadding="0"
    border="0" align="center">
    <tbody>
        <tr style="background-color:#002F6C;display:flex">
            <td style="padding:15px" width="50%" valign="middle">
                <img src="https://i.imgur.com/bibkcl7.png" style="max-width:100%" class="CToWUd">
            </td>
            <td style="color:#fff;font-size:12px;line-height:16px;padding:15px;text-align:right" width="50%"
                valign="middle" align="right"> </td>
        </tr>
        <tr>
            <td colspan="2" style="padding:20px;color:#666666">
                <h2 style="color:#333333">Olá, {{$user['no_pessoa']}}</h2>
                <p>Segue dados de acesso ao sistema pecus</p>
                <p>
                <h3>
                    Seu login: {{$user['login']}}<br />
                    Sua senha: {{$user['password_decript']}}
                </h3>
                </p>
            </td>
        </tr>

        <tr>
            <td colspan="2" style="color:#666;font-size:14px;line-height:20px;padding:16px 16px 0">
                Acesse o
                <a href="#" style="color:#000;text-decoration:underline" target="_blank">
                    PECUS
                </a>
            </td>
        </tr>
        <tr>
            <td colspan="2" style="font-size:14px;padding:8px 16px 16px" align="left"> <a href="pecus.com.br"
                    style="color:#000;text-decoration:none" target="_blank">
                </a> </td>
        </tr>
    </tbody>
</table>
