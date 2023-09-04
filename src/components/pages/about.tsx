export const About = () => {

  return (
    <div className='page'>
      <h1>O aplikacji</h1>
      <p>Podstrona zawiera opis funkcji tej aplikacji</p>

      <h2>Zgłaszanie problemów</h2>
      <p>Na stronie głównej aplikacji użytkownik może zgłosić usterkę. W tym celu należy uzupełnić formularz, podając dane zgłaszajacego, opis usterki, a następnie wybrać z listy miejsce wystąpienia usterki oraz kategorię. Jeżeli towarzyszą temu odpowiednie okoliczności, można także zmienić priorytet zgłoszenia.</p>

      <h2>Panel administratora</h2>
      <p>Korzystając z tego segmentu aplikacji wybrani administratorzy mają możliwość zarządzania aplikacją.</p>

      <h3>Sekcja zgłoszenia</h3>
      <p>W tej sekcji administrator może przeglądać zgłoszone problemy, które nie zostały rozwiązane. Podwójnym kliknięciem na tabelkę reprezentującą zgłoszenie, administrator uzyskuje dostep do szczegółów zgłoszenia. Z tego poziomu może wykonać modyfikację danych zgłoszenia (miejsce i kategorię) oraz przypisać zgłoszenie do siebie (inni administratorzy systemu widzą wówczas, że tym zgłoszeniem już ktoś się zajmuje). Przypisane zgłoszenia znajdują się w sekcji <i>W trakcie realizacji</i>, a te przypisane do zalogowanego użytkownika <i>Realizowane przez Ciebie</i>. Mając przypisane do siebie zgłoszenie, administrator może zrezygnować z niego lub oznaczyć jako rozwiązane. Wówczas zgłoszenie znika z tej podstrony i jest dostępne w <i>Archiwum</i>.</p>
      
      <h3>Sekcja archiwum</h3>
      <p>W tej sekcji administrator może przeglądać zgłoszenia oznaczone jako rozwiązane. Z tego widoku podwójnym kliknięciem administrator uzyska dostęp do widoku szczegółów zgłoszenia i przypisać zgłoszenie do siebie. Z racji na potencjalną ilość zgłoszeń zastosowany został mechanizm paginacji.</p>
    
      <h3>Konto</h3>
      <p>W tej sekcji administrator może przeglądać dane przypisane do swojego konta (nazwa i email) oraz dokonać zmiany adresu email lub hasła.</p>
      
      <h3>Zarządzanie</h3>
      <p>Korzystając z tej sekcji administrator może modyfikować listę kategorii oraz miejsc dostępnych w formularzu zgłoszenia, a takze dodać lub usunąć administratora z systemu.</p>

      <h3>Dziennik LOG</h3>
      <p>Ta sekcja pozwala na przeglądanie informacji o np. niedostarczonych wiadomościach email oraz zmianach w liście administratorów.</p>
    </div>
  );
};
