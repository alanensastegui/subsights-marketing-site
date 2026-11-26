import 'server-only';

// Exact existing bot/workspace identities; capabilities never live in this catalog.
export const PRIVATE_DEMO_IDENTITIES: Record<string, {workspace: string; bot: string}> = {
  'timber-ridge': { workspace: '0XvceSLk1j', bot: 'fjFKFtGY0G7e' },
  'seattle-finance-collective': { workspace: '0XvceSLk1j', bot: 'qIUvfq6hdXEr' },
  'kirkland-rotary': { workspace: '0XvceSLk1j', bot: 'Jo00xh1PEbCV' },
  'bellevue-rotary': { workspace: '0XvceSLk1j', bot: 'IfO177RQiubx' },
  reaps: { workspace: '0XvceSLk1j', bot: 'R3OxycakOFvq' },
  northmarq: { workspace: '0XvceSLk1j', bot: 'wpdh9BsY0WrQ' },
  creda: { workspace: '0XvceSLk1j', bot: '97XKi6oySbns' },
  oneredmond: { workspace: '0XvceSLk1j', bot: 'IghIH1d1RlRr' },
  'kidder-simon-anderson': { workspace: '0XvceSLk1j', bot: 'WmRcP6mBHWQQ' },
  'gsba-business-support': { workspace: '0XvceSLk1j', bot: 'jbreLNX0dX8c' },
  'startup425': { workspace: '0XvceSLk1j', bot: 'sDmmOe5sqiBi' },
  'seattle-4-rotary': { workspace: '0XvceSLk1j', bot: 'gTNatsF2teOw' },
  'redmond-rotary': { workspace: '0XvceSLk1j', bot: 'AHp9JueXRvcA' },
  'bellevue-sunrise-rotary': { workspace: '0XvceSLk1j', bot: '2CEkfrLiLRKh' },
  wmfha: { workspace: '0XvceSLk1j', bot: 'EIMt8YnHb0OK' },
  'crew-seattle': { workspace: '0XvceSLk1j', bot: 'tvROp0BfgdvA' },
  wmba: { workspace: '0XvceSLk1j', bot: 'yXI0jDaoHyCa' },
  rhawa: { workspace: "0XvceSLk1j", bot: "OW45SH6wfmwS" },
  bellevue: { workspace: "0XvceSLk1j", bot: "gDz1Noxsjr9U" },
  issaquah: { workspace: "0XvceSLk1j", bot: "Cz8TTZvCk7fF" },
  // Prepared routes only. Native enrollment and a valid bot-scoped capability
  // are still required; these mappings do not enable a runtime.
  "kirkland-community-foundation": { "workspace": "0XvceSLk1j", "bot": "oBgDPkFN3tlQ" },
  "simply-bold-design": { "workspace": "0XvceSLk1j", "bot": "jcptvP98MPg2" },
  "captured-by-bernadette": { "workspace": "0XvceSLk1j", "bot": "hH7wwZywyDip" },
  "postcards-to-seattle": {
    "workspace": "0XvceSLk1j",
    "bot": "aXCHlhdkU7zG"
  },
  "forks": {
    "workspace": "0XvceSLk1j",
    "bot": "pxtrtOFDN9ap"
  },
  "kirkland-chamber": {
    "workspace": "0XvceSLk1j",
    "bot": "oN6wv60VY2Mb"
  },
  "visit-kitsap-peninsula": {
    "workspace": "0XvceSLk1j",
    "bot": "ccz708CWfl7W"
  },
  "cascara-capital": {
    "workspace": "0XvceSLk1j",
    "bot": "2lbqzpDZ9OB3"
  },
  "onlineu": {
    "workspace": "0XvceSLk1j",
    "bot": "71GuV8w0Ldtm"
  },
  "secret-burger-kitchen": {
    "workspace": "0XvceSLk1j",
    "bot": "q96yasP1pwhw"
  },
  "studio-east": {
    "workspace": "0XvceSLk1j",
    "bot": "RIpBZic9oXj6"
  },
  "santa-monica-pier": {
    "workspace": "3vRaqoLArV",
    "bot": "cvaQKzBPFBQ0"
  },
  "seattle-chamber": {
    "workspace": "0XvceSLk1j",
    "bot": "WYA0B24DnjAe"
  },
  "business-impact-nw": {
    "workspace": "0XvceSLk1j",
    "bot": "6HZxulzvEjBk"
  },
  "cesi": {
    "workspace": "0XvceSLk1j",
    "bot": "in7eijgaFCo8"
  },
  "cleanupguys": {
    "workspace": "mRgCMAhx8l",
    "bot": "vyasIsScDIQp"
  },
  "enrepreneurs-source": {
    "workspace": "0XvceSLk1j",
    "bot": "sLbiP7ijwUjw"
  },
  "eugene-cascades": {
    "workspace": "mRgCMAhx8l",
    "bot": "CaMTHf36x8U7"
  },
  "featuregraphics": {
    "workspace": "0XvceSLk1j",
    "bot": "r4RwwwaDH1Q1"
  },
  "finfit-life": {
    "workspace": "0XvceSLk1j",
    "bot": "jeJ7lLbcKhbY"
  },
  "fresno-county": {
    "workspace": "mRgCMAhx8l",
    "bot": "XBVGvnOMFVpJ"
  },
  "growing-contigo": {
    "workspace": "0XvceSLk1j",
    "bot": "2ijYrvn2BTka"
  },
  "gsba": {
    "workspace": "0XvceSLk1j",
    "bot": "CYQz66wMkzk9"
  },
  "hc": {
    "workspace": "0XvceSLk1j",
    "bot": "G7qXEXXwBi42"
  },
  "jlt": {
    "workspace": "0XvceSLk1j",
    "bot": "LniyoLIzuGWz"
  },
  "laguna-beach": {
    "workspace": "mRgCMAhx8l",
    "bot": "APjAq05EeBog"
  },
  "lake-tahoe": {
    "workspace": "mRgCMAhx8l",
    "bot": "bZgO2UP4Gkda"
  },
  "lithtex-nw": {
    "workspace": "0XvceSLk1j",
    "bot": "PSe0NX3I4pZB"
  },
  "luxury-supercars-dubai": {
    "workspace": "mRgCMAhx8l",
    "bot": "iGf93rIx2G8n"
  },
  "massage-reimagined": {
    "workspace": "3vRaqoLArV",
    "bot": "Ct3G00driJlT"
  },
  "monterey": {
    "workspace": "mRgCMAhx8l",
    "bot": "jJc7m7M6SUZq"
  },
  "newport-beach": {
    "workspace": "mRgCMAhx8l",
    "bot": "0gnpRcutYhfE"
  },
  "oakland": {
    "workspace": "mRgCMAhx8l",
    "bot": "zOK906vBeaIX"
  },
  "palm-springs": {
    "workspace": "mRgCMAhx8l",
    "bot": "rTfZu9BB9xun"
  },
  "redfish-lake": {
    "workspace": "mRgCMAhx8l",
    "bot": "ohcxI2coumqd"
  },
  "safariyellowstone": {
    "workspace": "0XvceSLk1j",
    "bot": "VbFET0Gbyluu"
  },
  "santa-cruz": {
    "workspace": "mRgCMAhx8l",
    "bot": "FjpS0GxkLjJP"
  },
  "santa-monica": {
    "workspace": "mRgCMAhx8l",
    "bot": "1qkcftR9HktL"
  },
  "santa-rosa": {
    "workspace": "mRgCMAhx8l",
    "bot": "0L8RAXGHUhkq"
  },
  "second-love": {
    "workspace": "0XvceSLk1j",
    "bot": "xOdy5teKFWnK"
  },
  "sonoma-county": {
    "workspace": "mRgCMAhx8l",
    "bot": "GYvDzIDxdzEm"
  },
  "southside-chamber": {
    "workspace": "0XvceSLk1j",
    "bot": "k58jDB1Bip1M"
  },
  "stockton": {
    "workspace": "mRgCMAhx8l",
    "bot": "OWDkaVLhzfjc"
  },
  "twin-falls": {
    "workspace": "mRgCMAhx8l",
    "bot": "IqKo9GrD7kRy"
  },
  "bouldercoloradousa": {
    "workspace": "0XvceSLk1j",
    "bot": "ijgV07jObEad"
  },
  "irvine": {
    "workspace": "mRgCMAhx8l",
    "bot": "EOpoShGwsGtG"
  },
  "oregon-coast": {
    "workspace": "mRgCMAhx8l",
    "bot": "zKFMARiML0SU"
  },
  "redding": {
    "workspace": "mRgCMAhx8l",
    "bot": "Jnu5vddgnVfq"
  },
  "cabarstyle": {
    "workspace": "3vRaqoLArV",
    "bot": "M0csZ76t5wbl"
  },
  "visit-irving": {
    "workspace": "3vRaqoLArV",
    "bot": "aCnoUMsawene"
  },
  "riverside": {
    "workspace": "3vRaqoLArV",
    "bot": "8MekI7G1Y1wI"
  },
  "swiftsku": {
    "workspace": "3vRaqoLArV",
    "bot": "8eGeUxED1HnF"
  },
  "aurora": {
    "workspace": "3vRaqoLArV",
    "bot": "7HLDmI5lGela"
  },
  "modesto": {
    "workspace": "mRgCMAhx8l",
    "bot": "inxqDDxLzoJF"
  }
};
