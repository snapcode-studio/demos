export const menuCategories = ['Pizze', 'Hamburgery', 'Zapiekanki', 'Dodatki & Napoje'];

export const pizzas = [
  { id: 1, name: 'Margherita', desc: 'Składniki podstawowe bez dodatków', prices: { small: '32 zł', large: '47 zł' } },
  { id: 2, name: 'Bez dziwactw', desc: 'Szynka, pieczarki', prices: { small: '34 zł', large: '49 zł' } },
  { id: 3, name: 'Pepperoni', desc: 'Salami pepperoni', prices: { small: '38 zł', large: '50 zł' } },
  { id: 4, name: 'Wege', desc: 'Pieczarki, kukurydza, papryka świeża, oliwki zielone', prices: { small: '38 zł', large: '50 zł' } },
  { id: 5, name: 'Hawajska', desc: 'Szynka, ananas', prices: { small: '38 zł', large: '50 zł' } },
  { id: 6, name: 'Pini-mini', desc: 'Salami, pieczarki, cebula', prices: { small: '38 zł', large: '50 zł' } },
  { id: 7, name: 'Wiedźma', desc: 'Salami pepperoni, jalapeño, oliwki czarne', prices: { small: '39 zł', large: '53 zł' }, isSpicy: true },
  { id: 8, name: 'Łagodna', desc: 'Szynka, pieczarki, kukurydza, papryka świeża', prices: { small: '39 zł', large: '53 zł' } },
  { id: 9, name: 'Łagodna, ale z charakterem', desc: 'Szynka, pieczarki, kukurydza, papryka świeża, czosnek świeży, w opcji: tabasco', prices: { small: '42 zł', large: '55 zł' } },
  { id: 10, name: 'Mięcho', desc: 'Szynka, salami, kiełbasa, cebula', prices: { small: '42 zł', large: '55 zł' } },
  { id: 11, name: 'Robotnicza', desc: 'Szynka, pieczarki, boczek, cebula', prices: { small: '42 zł', large: '55 zł' } },
  { id: 12, name: 'Janosik', desc: 'Ser góralski, boczek, żurawina, cebula', prices: { small: '44 zł', large: '58 zł' }, isPremium: true },
  { id: 13, name: 'Tłusta', desc: 'Salami, kiełbasa, boczek, papryka jalapeño', prices: { small: '44 zł', large: '58 zł' }, isSpicy: true },
  { id: 14, name: 'Wiejska', desc: 'Boczek, kiełbasa, ogórek, cebula, pomidor', prices: { small: '44 zł', large: '58 zł' } },
  { id: 15, name: 'Sianka', desc: 'Salami, pieczarki, kukurydza, oliwki zielone, papryka jalapeño', prices: { small: '44 zł', large: '58 zł' }, isSpicy: true },
  { id: 16, name: 'MięsOFF', desc: 'Ser feta, pomidor, oliwki czarne, czosnek, cebula czerwona', prices: { small: '44 zł', large: '58 zł' } },
  { id: 17, name: 'Kotłownia', desc: 'Szynka, salami, pieczarki, kukurydza, papryka świeża, cebula', prices: { small: '44 zł', large: '58 zł' } },
  { id: 18, name: 'Clusive', desc: 'Szynka dojrzewająca, pomidor, cebula czerwona', prices: { small: '44 zł', large: '58 zł' }, isPremium: true },
  { id: 19, name: 'Futuńczyk', desc: 'Tuńczyk, cebula, pieczarki, pomidor', prices: { small: '44 zł', large: '58 zł' } },
  { id: 20, name: 'Coco del monte', desc: 'Kurczak, ser feta, ananas', prices: { small: '47 zł', large: '62 zł' }, isPremium: true },
  { id: 21, name: 'Coco Greco', desc: 'Kurczak, ser feta, czarne oliwki, papryka świeża', prices: { small: '47 zł', large: '62 zł' } },
  { id: 22, name: 'Coco Leve', desc: 'Kurczak, pieczarki, papryka świeża, kukurydza', prices: { small: '46 zł', large: '60 zł' } },
  { id: 23, name: 'Coco Fiero', desc: '*Pizza na sosie ostrym. Kurczak, salami pepperoni, oliwki czarne, cebula czerwona, czosnek świeży', prices: { small: '47 zł', large: '62 zł' }, isSpicy: true, isPremium: true },
  { id: 24, name: 'Kurczepieczone!', desc: '*Pizza na sosie ostrym. Kurczak, boczek, papryka jalapeño, tabasco', prices: { small: '47 zł', large: '62 zł' }, isSpicy: true, isPremium: true },
  { id: 25, name: 'Zberek', desc: 'Salami, kiełbasa, pieczarki, papryka świeża, cebula, papryka jalapeño, tabasco', prices: { small: '46 zł', large: '60 zł' }, isSpicy: true },
  { id: 26, name: 'Ślepy los', desc: 'Do wyboru: łagodna lub ostra, składniki wedle uznania kucharza', prices: { small: '39 zł', large: '52 zł' } },
  { id: 27, name: 'Zrób to sam 3', desc: '3 dodatki wedle uznania*', prices: { small: '42 zł', large: '55 zł' } },
  { id: 28, name: 'Zrób to sam 5', desc: '5 dodatków wedle uznania*', prices: { small: '50 zł', large: '65 zł' } },
];

export const burgers = [
  { name: 'Hamburger', desc: 'Bułka z sezamem, kotlet drobiowo-wieprzowy, sałatka szwedzka, cebula, sałata lodowa, sos curry, ketchup', prices: { small: '17 zł', large: '20 zł' } },
  { name: 'Burger wołowy curry', desc: 'Bułka z sezamem, kotlet wołowy, sałatka szwedzka, cebula, sałata lodowa, sos curry', prices: { small: '22 zł', large: '28 zł' } },
  { name: 'Burger wołowy klasyczny', desc: 'Bułka z sezamem, kotlet wołowy, sałatka szwedzka, cebula, pomidor, sałata lodowa, musztarda, majonez', prices: { small: '22 zł', large: '28 zł' } },
];

export const casseroles = [
  { name: 'Prosta', desc: 'Pieczarki, ser + ser mozarella, do wyboru: szynka lub salami, oregano, ketchup', price: '15 zł' },
  { name: 'Ostra', desc: 'Pieczarki, ser + ser mozarella, salami, papryka jalapeño, cebula czerwona, oregano, ketchup', price: '18 zł', isSpicy: true },
  { name: 'Bogata', desc: 'Pieczarki, ser + ser mozarella, szynka, papryka, ogórek, cebula czerwona, oregano, ketchup, sos curry', price: '20 zł' },
  { name: 'Wege', desc: 'Pieczarki, ser + ser mozarella, pomidor, papryka, ogórek, cebula czerwona, oregano, ketchup, sos curry', price: '20 zł' },
];

export const drinks = [
  { name: 'Coca-cola', desc: '850 ml', price: '10 zł' },
  { name: 'Sos dodatkowy', desc: 'Pomidorowy, czosnkowy lub ostry (pojemnik 50ml). Pierwszy darmowy!', price: '2 zł' }
];

export const promotions = [
  { day: 'Wtorek', title: '19 zł wybrana mała pizza', desc: 'Do każdej dużej pizzy mała (Margherita, Bez Dziwactw, Pepperoni lub Hawajska) w niższej cenie' },
  { day: 'Środa', title: '-5 zł z dużej', desc: 'Każda duża pizza z rabatem -5 zł' },
  { day: 'Czwartek', title: '-5 zł z dużej', desc: 'Każda duża pizza z kurczakiem z rabatem -5 zł' },
];

export const zones = [
  { name: 'Łazy', limit: '<30 zł = 8 zł | >30 zł = ZADARMO' },
  { name: 'Niegowonice, Rokitno Szlacheckie, Ciągowice, Wiesiółka, Wysoka', limit: '<30zł = 15zł | >30zł = 5zł | >60zł = 2zł | >80zł = ZADARMO' },
  { name: 'Turza, Grabowa', limit: 'Min. 60zł | >60zł = 5zł | >100zł = ZADARMO' },
  { name: 'Chruszczobród, Niwa Zagórczańska', limit: 'Min. 80zł | >80zł = 6zł | >100zł = 3zł | >120zł = ZADARMO' },
];
