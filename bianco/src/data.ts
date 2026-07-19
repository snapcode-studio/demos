export const hours = [
  { day: 'Niedziela', time: '12:00–22:00' },
  { day: 'Poniedziałek', time: 'Zamknięte' },
  { day: 'Wtorek', time: 'Zamknięte' },
  { day: 'Środa', time: '12:00–22:00' },
  { day: 'Czwartek', time: '12:00–22:00' },
  { day: 'Piątek', time: '12:00–23:00' },
  { day: 'Sobota', time: '12:00–23:00' },
];

export const rules = [
  "O pizzę / danie tygodnia zapytaj obsługę.",
  "W weekendy ze względu na duże obłożenie czas oczekiwania może być wydłużony.",
  "W weekendy nie dzielimy pizz pół na pół.",
  "Do pizzy podajemy smakowe oliwy."
];

export const glossary = [
  { term: "XX", desc: "oznacza mozzarellę i sos pomidorowy (baza)" },
  { term: "x", desc: "oznacza samą mozzarellę (baza do białej pizzy)" },
  { term: "Prosciutto Cotto", desc: "włoska gotowana szynka z udźca" },
  { term: "Prosciutto Crudo", desc: "włoska szynka dojrzewająca" },
  { term: "Pancetta", desc: "włoski boczek rolowany" },
  { term: "Speck", desc: "włoski wędzony udziec" },
  { term: "Salsiccia Fresca", desc: "włoska świeża kiełbasa" },
  { term: "N'duja", desc: "włoska ostra kiełbasa" },
  { term: "Salami Napoli", desc: "włoskie łagodne salami" },
  { term: "Spianata Piccante", desc: "włoskie ostre salami" },
  { term: "Guanciale", desc: "włoskie podgardle" }
];

export const snacks = [
  { name: "Focaccia (klasyczna)", desc: "Oliwa, rozmaryn, sól morska", price: "14.00" },
  { name: "Focaccia (premium)", desc: "Rukola, szarpana mozzarella, pomidorki koktajlowe", price: "25.00" },
  { name: "Bruschetta 4 szt. (klasyczna)", desc: "Czosnek, pomidorki koktajlowe, mozarella, bazylia", price: "16.00" },
  { name: "Bruschetta 4 szt. (premium)", desc: "Pasta z suszonych pomidorów, rukola, parmezan", price: "16.00" }, // Zakładam tę samą cenę dla drugiej opcji bruschetty z opisu
];

export const salads = [
  { name: "Z tuńczykiem", desc: "Mix sałat, tuńczyk, jajko got., czerwona cebula, oliwki, sos jogurtowo-majonezowy z ziołami", price: "36.00" },
  { name: "Z gruszką", desc: "Mix sałat, orzechy włoskie, gruszka, gorgonzola, sos balsamiczny", price: "36.00" },
  { name: "Z kurczakiem", desc: "Mix sałat, kurczak grillowany, pomidory koktajlowe, ogórek, cebula, sos miodowo-musztardowy", price: "36.00" },
  { name: "Caprese", desc: "Pomidory, mozzarella, oliwa z oliwek, listki bazylii - sezonowo", price: "33.00" },
  { name: "Bałkańska", desc: "Mix sałat, pomidory, ogórek, czerwona cebula, oliwki, ser bałkański, sos balsamiczny", price: "36.00" },
];

export const pizzaRosso = [
  { id: "1", name: "Margherita", desc: "Mozzarella fior di latte, sos z pomidorów Pelati, bazylia", p1: "31.00", p2: "38.00" },
  { id: "2", name: "Prosciutto", desc: "XX, Prosciutto cotto", p1: "42.00", p2: "47.00" },
  { id: "3", name: "Pecorina", desc: "XX, szpinak, ricotta, orzechy włoskie", p1: "46.00", p2: "52.00" },
  { id: "4", name: "Vege", desc: "XX, grillowany bakłażan, cukinia, papryka, friarielli (brokuł neapolitański)", p1: "46.00", p2: "52.00" },
  { id: "5", name: "Formaggi", desc: "XX, taleggio, gorgonzola, parmezan", p1: "47.00", p2: "53.00" },
  { id: "6", name: "Quattro Stagioni", desc: "XX, Salami Napoli, Prosciutto cotto, pieczarki, karczochy", p1: "47.00", p2: "53.00" },
  { id: "7", name: "Bologna", desc: "XX, Pancetta, rukola", p1: "46.00", p2: "52.00" },
  { id: "8", name: "Bolognese", desc: "X, Mozzarella w kulce, Salsiccia Fresca, bazylia, czosnek", p1: "46.00", p2: "52.00" },
  { id: "9", name: "Parma", desc: "X, Mozzarella w kulce, Prosciutto Crudo, pomidory suszone, rukola", p1: "48.00", p2: "54.00" },
  { id: "10", name: "Capricciossa", desc: "XX, Prosciutto cotto, karczochy, czarne oliwki", p1: "47.00", p2: "53.00" },
  { id: "11", name: "Diavola", desc: "XX, Spianata piccante, chilli, zielone oliwki, cebula", p1: "47.00", p2: "53.00" },
  { id: "12", name: "Buona", desc: "XX, Pancetta, szparagi, jajko", p1: "46.00", p2: "52.00" },
  { id: "13", name: "Tropea", desc: "XX, Salami Napoli, cebula, pomidory suszone, zielone oliwki", p1: "47.00", p2: "53.00" },
  { id: "14", name: "Tonno", desc: "XX, tuńczyk, cebula, czarne oliwki, szczypiorek", p1: "47.00", p2: "53.00" },
  { id: "15", name: "Mare Monti", desc: "XX, krewetki, małże, grzyby, czosnek, pietruszka", p1: "49.00", p2: "55.00" },
  { id: "21", name: "Górska", desc: "XX, Speck, ricotta, żurawina", p1: "47.00", p2: "53.00" },
  { id: "22", name: "Grzybowa", desc: "XX, Salsiccia Fresca, grzyby, cebula", p1: "47.00", p2: "53.00" },
  { id: "23", name: "Wiejska", desc: "XX, Pancetta, Salsiccia Fresca, pomidor, szczypior", p1: "47.00", p2: "53.00" },
  { id: "24", name: "Hawajska", desc: "XX, Prosciutto Cotto, ananas", p1: "45.00", p2: "51.00" },
  { id: "25", name: "Tradycyjna", desc: "XX, Prosciutto Cotto, pieczarki, cebula", p1: "47.00", p2: "53.00" },
  { id: "26", name: "Funghi", desc: "XX, pieczarki", p1: "42.00", p2: "47.00" },
  { id: "27", name: "Bałkańska", desc: "XX, pomidorki koktajlowe, czerwona cebula, ser bałkański", p1: "47.00", p2: "53.00" },
  { id: "28", name: "Guanciale", desc: "XX, Guanciale, suszone pomidory, czerwona cebula, szarpana mozzarella po piecu", p1: "48.00", p2: "54.00" },
  { id: "29", name: "Salsiccia", desc: "XX, Salsiccia Fresca, friarielli (brokuł neapolitański), czerwona cebula", p1: "47.00", p2: "53.00" },
];

export const pizzaBianco = [
  { id: "16", name: "Pera", desc: "X, gorgonzola, gruszka, orzechy włoskie", p1: "46.00", p2: "52.00" },
  { id: "17", name: "Carbonara", desc: "X, śmietana, Pancetta, cebula, jajko, parmezan", p1: "47.00", p2: "53.00" },
  { id: "18", name: "Modena", desc: "X, Speck, rukola, parmezan", p1: "47.00", p2: "53.00" },
  { id: "19", name: "Aleksandro", desc: "X, ricotta, Prosciutto cotto, kukurydza", p1: "47.00", p2: "53.00" },
  { id: "20", name: "Prima Vera", desc: "X, śmietana, łosoś świeży, pietruszka, cytryna", p1: "48.00", p2: "54.00" },
];

export const extras = [
  { name: "Ryby, owoce morza", p1: "9.00", p2: "11.00" },
  { name: "Ser, wędliny", p1: "8.00", p2: "10.00" },
  { name: "Warzywa, owoce", p1: "7.00", p2: "9.00" },
  { name: "Pozostałe", p1: "5.00", p2: "5.00" }, // Zakładam stałą cenę dla pozostałych
  { name: "Opakowanie na wynos", p1: "2.00", p2: "2.00" },
];

export const pastas = [
  { name: "Pappardelle z grzybami", desc: "Grzyby ze speckiem i cebulą w sosie śmietanowym z pietruszką", price: "41.00" },
  { name: "Spaghetti alla carbonara", desc: "Guanciale z jajkiem i parmezanem", price: "41.00" },
  { name: "Penne ze szpinakiem", desc: "Szpinak z łososiem i czosnkiem w sosie śmietanowym", price: "41.00" },
  { name: "Tagiatelle z prosciutto crudo", desc: "Prosciutto crudo z gorgonzolą, suszonymi pomidorami w sosie śmietanowym z pietruszką", price: "41.00" },
  { name: "Tagiatelle z owocami morza", desc: "Krewetki, małże, pomidorki koktajlowe i chilli z oliwą czosnkową i pietruszką", price: "46.00" },
  { name: "Spaghetti alla Bolognese", desc: "Salsiccia Fresca z cebulą i czosnkiem w sosie pomidorowym z parmezanem", price: "41.00" },
];

export const drinks = {
  hot: [
    { name: "Kawa espresso", price: "7.00" },
    { name: "Kawa czarna", price: "7.00" },
    { name: "Podwójne espresso", price: "9.00" },
    { name: "Kawa biała / cappuccino", price: "9.00" },
    { name: "Latte Macchiato", price: "11.00" },
    { name: "Herbata Richmont 400 ml", price: "12.00" },
  ],
  cold: [
    { name: "Woda Kropla Beskidu (gaz / n.gaz)", price: "6.00" },
    { name: "Coca cola, Coca cola zero, Fanta, Sprite", price: "7.00" },
    { name: "Fuzetea cytryna, brzoskwinia", price: "7.00" },
    { name: "Soki Cappy", price: "7.00" },
    { name: "Sok w dzbanku (pomarańcza, jabłko 1L)", price: "13.00" },
  ]
};
