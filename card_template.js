// Generates an HTML Pokemon TCG card (Sun & Moon style) given mashup data

// Type colors and gradient styles based on Sun & Moon era
const TYPE_STYLES = {
  fighting: {
    // Machoke style - orange/desert
    cardGradient: "linear-gradient(180deg, #E8A547 0%, #D88B2A 35%, #B97020 65%, #8E5418 100%)",
    bottomBg: "radial-gradient(ellipse at center, #F0B870 0%, #C77E2A 50%, #A56519 100%)",
    energyBg: "#E84A28",
    energyEmoji: "✊",
    accentColor: "#5A2E0A",
    titleColor: "#2A1606",
  },
  fire: {
    cardGradient: "linear-gradient(180deg, #F0773A 0%, #E1591E 35%, #BC4012 65%, #8A2E0C 100%)",
    bottomBg: "radial-gradient(ellipse at center, #F8915A 0%, #DC5419 50%, #A53A0F 100%)",
    energyBg: "#E84A28",
    energyEmoji: "🔥",
    accentColor: "#5A1A0A",
    titleColor: "#2A0A06",
  },
  water: {
    cardGradient: "linear-gradient(180deg, #5BA8E1 0%, #3A8AC8 35%, #2469A3 65%, #154874 100%)",
    bottomBg: "radial-gradient(ellipse at center, #92CFEC 0%, #4A98D2 50%, #2E70A8 100%)",
    energyBg: "#3589C2",
    energyEmoji: "💧",
    accentColor: "#0A3A5A",
    titleColor: "#06202A",
  },
  lightning: {
    cardGradient: "linear-gradient(180deg, #F5D440 0%, #EBC222 35%, #C99B0A 65%, #8E6D04 100%)",
    bottomBg: "radial-gradient(ellipse at center, #F9E37A 0%, #ECC424 50%, #B58908 100%)",
    energyBg: "#F8C81E",
    energyEmoji: "⚡",
    accentColor: "#5A4A0A",
    titleColor: "#2A2306",
  },
  grass: {
    cardGradient: "linear-gradient(180deg, #92C84A 0%, #76AE2E 35%, #5A8E1E 65%, #3D6310 100%)",
    bottomBg: "radial-gradient(ellipse at center, #B9DC7E 0%, #84BB36 50%, #5A8A1A 100%)",
    energyBg: "#3FAF3A",
    energyEmoji: "🌿",
    accentColor: "#1F4A0A",
    titleColor: "#0F2A06",
  },
  psychic: {
    cardGradient: "linear-gradient(180deg, #B97DC4 0%, #9F5BAB 35%, #7E4089 65%, #582C61 100%)",
    bottomBg: "radial-gradient(ellipse at center, #D8A8DE 0%, #AB6BB7 50%, #80478B 100%)",
    energyBg: "#A35BAA",
    energyEmoji: "👁",
    accentColor: "#3A1A4A",
    titleColor: "#1F0A2A",
  },
  darkness: {
    cardGradient: "linear-gradient(180deg, #3D6A7A 0%, #28505C 35%, #1A3C46 65%, #0F2730 100%)",
    bottomBg: "radial-gradient(ellipse at center, #5A8898 0%, #28565E 50%, #143842 100%)",
    energyBg: "#1F3640",
    energyEmoji: "⚫",
    accentColor: "#E0E8EC",
    titleColor: "#FFFFFF",
    textColor: "#F0F4F6",
  },
  colorless: {
    // Iridescent/cream like Snorlax or Chansey
    cardGradient: "linear-gradient(180deg, #F2EBE0 0%, #E0D8CB 35%, #C9C0B0 65%, #A89F8E 100%)",
    bottomBg: "radial-gradient(ellipse at center, #FAF6EE 0%, #E5DCCE 50%, #B0A695 100%)",
    energyBg: "#9FA09F",
    energyEmoji: "✦",
    accentColor: "#4A3D2A",
    titleColor: "#241F14",
  },
  fairy: {
    cardGradient: "linear-gradient(180deg, #F2A8C9 0%, #E68AB3 35%, #C76A95 65%, #8E4868 100%)",
    bottomBg: "radial-gradient(ellipse at center, #FBC8DD 0%, #EE9BBE 50%, #C26995 100%)",
    energyBg: "#E96AAA",
    energyEmoji: "🌟",
    accentColor: "#5A2A3D",
    titleColor: "#2A0F1F",
  },
  metal: {
    cardGradient: "linear-gradient(180deg, #B5B8BE 0%, #9498A0 35%, #75797F 65%, #4F535A 100%)",
    bottomBg: "radial-gradient(ellipse at center, #D0D2D6 0%, #9CA0A8 50%, #6A6E76 100%)",
    energyBg: "#9CA0A8",
    energyEmoji: "⚙",
    accentColor: "#2A2D32",
    titleColor: "#1A1C1F",
  },
};

const ENERGY_ICONS = {
  fighting: { bg: "#E84A28", icon: "✊", color: "#FFF" },
  fire: { bg: "#E84A28", icon: "🔥", color: "#FFF" },
  water: { bg: "#3589C2", icon: "💧", color: "#FFF" },
  lightning: { bg: "#F8C81E", icon: "⚡", color: "#3A2D08" },
  grass: { bg: "#3FAF3A", icon: "🌿", color: "#FFF" },
  psychic: { bg: "#A35BAA", icon: "👁", color: "#FFF" },
  darkness: { bg: "#1F3640", icon: "⚫", color: "#FFF" },
  colorless: { bg: "#9FA09F", icon: "✦", color: "#FFF" },
  fairy: { bg: "#E96AAA", icon: "🌟", color: "#FFF" },
  metal: { bg: "#9CA0A8", icon: "⚙", color: "#FFF" },
};

function energyIcon(type, size = 32) {
  const e = ENERGY_ICONS[type];
  return `<span style="
    display:inline-flex;
    align-items:center;
    justify-content:center;
    width:${size}px; height:${size}px;
    border-radius:50%;
    background:${e.bg};
    color:${e.color};
    font-size:${size * 0.55}px;
    margin-right:4px;
    box-shadow:inset -2px -2px 4px rgba(0,0,0,0.25), inset 2px 2px 4px rgba(255,255,255,0.3);
    border:2px solid rgba(0,0,0,0.15);
    line-height:1;
    vertical-align:middle;
  ">${e.icon}</span>`;
}

function buildCardHTML(m) {
  const style = TYPE_STYLES[m.type] || TYPE_STYLES.colorless;
  const isDark = m.type === "darkness";
  const textColor = style.textColor || "#1F1A0F";
  const flavorTextColor = isDark ? "#E0E8EC" : "#3D3526";
  const attackCostHTML = m.attackCost.map(c => energyIcon(c, 38)).join("");
  const weaknessIconHTML = m.weakness.value !== "—"
    ? energyIcon(m.weakness.type, 26)
    : "";

  const stageBadge = m.stage === "Stage 1"
    ? `<div class="stage-badge"><span class="stage-text">STAGE 1</span></div>`
    : m.stage === "Stage 2"
    ? `<div class="stage-badge"><span class="stage-text">STAGE 2</span></div>`
    : m.stage === "Family"
    ? `<div class="stage-badge"><span class="stage-text">FAMILY</span></div>`
    : `<div class="stage-badge basic-badge"><span class="stage-text">BASIC</span></div>`;

  const evolvesFromHTML = m.evolvesFrom
    ? `<div class="evolves-from">Evolves from ${m.evolvesFrom}</div>`
    : "";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 750px; height: 1050px;
    font-family: 'Roboto', 'Arial Black', sans-serif;
    background: transparent;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card {
    width: 720px; height: 1010px;
    background: ${style.cardGradient};
    border-radius: 32px;
    padding: 16px;
    box-shadow: 0 12px 48px rgba(0,0,0,0.4);
    position: relative;
    border: 4px solid #F5F0E1;
    overflow: hidden;
  }
  .card-inner {
    width: 100%; height: 100%;
    border-radius: 20px;
    background: transparent;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 14px 22px;
  }
  /* Header */
  .header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
    color: ${textColor};
    position: relative;
  }
  .stage-badge {
    background: linear-gradient(180deg, #FFFFFF 0%, #DCD4C0 100%);
    border-radius: 4px;
    padding: 3px 10px;
    font-weight: 900;
    font-size: 14px;
    letter-spacing: 0.5px;
    color: #2A1F0F;
    border: 1px solid rgba(0,0,0,0.2);
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    flex-shrink: 0;
  }
  .basic-badge { font-size: 14px; }
  .stage-text { display: block; line-height: 1; }
  .name {
    font-weight: 900;
    font-size: 42px;
    color: ${textColor};
    flex: 1;
    margin-left: 8px;
    text-shadow: 1px 1px 0 rgba(255,255,255,0.3);
    letter-spacing: -0.5px;
  }
  .hp-block {
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${textColor};
  }
  .hp-label { font-size: 13px; font-weight: 700; }
  .hp-value { font-size: 38px; font-weight: 900; letter-spacing: -1px; }
  .type-circle {
    width: 42px; height: 42px;
    border-radius: 50%;
    background: ${ENERGY_ICONS[m.type].bg};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    color: white;
    border: 2px solid rgba(0,0,0,0.2);
    box-shadow: inset -2px -2px 4px rgba(0,0,0,0.25), inset 2px 2px 4px rgba(255,255,255,0.3);
  }
  .evolves-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
    padding-left: 8px;
  }
  .pre-evo-circle {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: linear-gradient(180deg, #F5F0E1 0%, #C9C2AC 100%);
    border: 2px solid rgba(0,0,0,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #5A4F3A;
    font-weight: 700;
    text-align: center;
    flex-shrink: 0;
  }
  .evolves-from {
    background: linear-gradient(180deg, #F5F0E1 0%, #DCD4C0 100%);
    border: 1px solid rgba(0,0,0,0.2);
    padding: 3px 16px;
    border-radius: 3px;
    font-size: 13px;
    font-weight: 700;
    color: #2A1F0F;
    flex: 1;
  }
  /* Artwork box */
  .artwork {
    border: 4px solid #F5F0E1;
    background:
      linear-gradient(135deg, #F0EAD7 0%, #D9D2BB 100%);
    height: 440px;
    margin: 6px 0 0 0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    box-shadow: inset 0 0 24px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.2);
  }
  .artwork::before {
    content: '';
    position: absolute;
    inset: 6px;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 2px;
    pointer-events: none;
  }
  .artwork-placeholder {
    font-size: 22px;
    font-weight: 900;
    color: ${ENERGY_ICONS[m.type].bg};
    letter-spacing: 3px;
    text-align: center;
  }
  .artwork-subtitle {
    font-style: italic;
    font-size: 18px;
    color: #5A4F3A;
    margin-top: 12px;
    text-align: center;
    line-height: 1.4;
  }
  .pokedex-bar {
    background: linear-gradient(180deg, #F5F0E1 0%, #DCD4C0 100%);
    border: 2px solid rgba(0,0,0,0.15);
    border-top: none;
    padding: 5px 12px;
    font-size: 12px;
    font-weight: 700;
    color: #2A1F0F;
    text-align: center;
    letter-spacing: 0.2px;
  }
  /* Attack section */
  .attack-section {
    flex: 1;
    padding: 20px 8px 6px 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: ${textColor};
  }
  .attack-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .attack-cost {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  .attack-name {
    font-size: 26px;
    font-weight: 900;
    color: ${textColor};
    flex: 1;
    text-align: center;
    letter-spacing: -0.3px;
  }
  .attack-damage {
    font-size: 36px;
    font-weight: 900;
    color: ${textColor};
    text-align: right;
    flex-shrink: 0;
    letter-spacing: -1px;
  }
  .attack-text {
    font-size: 13px;
    color: ${textColor};
    margin-top: 6px;
    line-height: 1.35;
    padding: 6px 14px;
    font-style: italic;
    background: rgba(255, 250, 235, 0.35);
    border-radius: 6px;
  }
  /* Bottom strip - weakness, resistance, retreat */
  .bottom-strip {
    display: flex;
    gap: 12px;
    padding: 4px 8px;
    margin-top: auto;
  }
  .stat-box {
    flex: 1;
    background: linear-gradient(180deg, #F5F0E1 0%, #DCD4C0 100%);
    border-radius: 14px;
    padding: 4px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 12px;
    color: #2A1F0F;
    border: 1px solid rgba(0,0,0,0.15);
    min-height: 28px;
  }
  .stat-label { font-style: italic; font-weight: 600; }
  .stat-value { font-weight: 900; font-size: 14px; }
  /* Footer */
  .footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
    padding: 6px 12px 0 12px;
    color: ${textColor};
  }
  .footer-left {
    flex-shrink: 0;
    font-size: 11px;
    font-style: italic;
    font-weight: 500;
  }
  .footer-left .illus { display: block; }
  .footer-left .rarity { margin-top: 2px; letter-spacing: 4px; font-size: 13px; }
  .flavor {
    font-size: 11.5px;
    color: ${textColor};
    text-align: right;
    flex: 1;
    line-height: 1.4;
    font-style: italic;
    max-width: 480px;
    background: rgba(255, 250, 235, 0.4);
    padding: 6px 10px;
    border-radius: 6px;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="card-inner">
      <!-- Header: stage + name + HP + type -->
      <div class="header">
        ${stageBadge}
        <div class="name">${m.nomMashup}</div>
        <div class="hp-block">
          <span class="hp-label">HP</span>
          <span class="hp-value">${m.hp}</span>
        </div>
        <div class="type-circle">${ENERGY_ICONS[m.type].icon}</div>
      </div>

      ${m.evolvesFrom ? `
      <div class="evolves-bar">
        <div class="pre-evo-circle">${m.evolvesFrom}</div>
        <div class="evolves-from">Evolves from ${m.evolvesFrom}</div>
      </div>` : ''}

      <!-- Artwork zone -->
      <div class="artwork">
        <div class="artwork-placeholder">[ MONTAGE PHOTO ]</div>
        <div class="artwork-subtitle">${m.pokemonBase}<br>+ ${m.target}</div>
      </div>
      <div class="pokedex-bar">
        NO. ${m.pokedexNumber} ${m.species} Pokémon &nbsp;·&nbsp; HT: ${m.height} &nbsp;·&nbsp; WT: ${m.weight}
      </div>

      <!-- Attack -->
      <div class="attack-section">
        <div class="attack-row">
          <div class="attack-cost">${attackCostHTML}</div>
          <div class="attack-name">${m.attackName}</div>
          <div class="attack-damage">${m.attackDamage}</div>
        </div>
        <div class="attack-text">${m.attackText}</div>
      </div>

      <!-- Weakness / Retreat -->
      <div class="bottom-strip">
        <div class="stat-box">
          <span class="stat-label">weakness</span>
          ${weaknessIconHTML}
          <span class="stat-value">${m.weakness.value}</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">retreat</span>
          ${m.retreat > 0 ? Array(m.retreat).fill(0).map(() => energyIcon('colorless', 22)).join('') : '<span style="font-size:14px;">—</span>'}
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="footer-left">
          <span class="illus">Illus. EVJFG Squad</span>
          <span class="rarity">◇ ◇</span>
        </div>
        <div class="flavor">${m.flavorText}</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

module.exports = { buildCardHTML, TYPE_STYLES, ENERGY_ICONS };
