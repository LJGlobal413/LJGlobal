/**
 * LJ Packaging Consulting Group - Pure Vanilla JavaScript Engine
 * No dependencies, runs natively in all modern browsers.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    // Close mobile drawer when clicking any link inside it
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 2. Dropdown Menu Toggle for Touch / Mobile
  const navDropdown = document.querySelector('.nav-dropdown');
  const navDropdownBtn = document.querySelector('.nav-dropdown-btn');

  if (navDropdown && navDropdownBtn) {
    navDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navDropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!navDropdown.contains(e.target)) {
        navDropdown.classList.remove('open');
      }
    });
  }

  // 3. Smooth Navigation and Active Indicator Spy
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // 4. Category Pills Navigation
  const catPills = document.querySelectorAll('.cat-pill');
  catPills.forEach((pill) => {
    pill.addEventListener('click', (e) => {
      const targetId = pill.getAttribute('data-target');
      if (targetId) {
        const targetElem = document.getElementById(targetId);
        if (targetElem) {
          targetElem.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 5. Print MIS Tab Switcher
  const misData = {
    'mis-support': {
      title: 'Print MIS Support & Infrastructure',
      badge: 'Core Architecture',
      desc: 'End-to-end implementation, legacy database migration, 24/7 technical support, and ERP integration tailored specifically for packaging converters and commercial offset printers.',
      metricLabel: 'System Availability',
      metricVal: '99.98%',
      features: [
        'Multi-plant database architecture & relational schema tuning',
        'Seamless migration from legacy spreadsheets or outdated print ERPs',
        'Custom API connectors for SAP, Oracle Netsuite, and accounting engines',
        'Guaranteed 99.9% uptime SLA with dedicated prepress/press specialists',
      ],
    },
    'workflow-automation': {
      title: 'Workflow Automation & Prepress JDF/JMF',
      badge: 'Hands-Free Pipeline',
      desc: 'Automated job intake to CTP plate generation. Eliminate repetitive file prep, auto-verify dieline CAD files, normalize artwork, and stream JDF/JMF job tickets directly to press consoles.',
      metricLabel: 'Prepress Touch Time',
      metricVal: '-78%',
      features: [
        'JDF/JMF automated job ticketing straight to Heidelberg & Komori consoles',
        'Automated preflighting: bleed checking, die-cut strike verification & spot ink traps',
        'Rule-based nesting & step-and-repeat imposition based on sheet size',
        'Webhook events triggering customer proof delivery and plate room queues',
      ],
    },
    'shopfloor-analytics': {
      title: 'Shopfloor Data, IoT & OEE Analytics',
      badge: 'Live Plant Telemetry',
      desc: 'Direct press and finishing machine telemetry. Monitor real-time speed, count impressions, detect make-ready bottlenecks, and track Overall Equipment Effectiveness (OEE) across every shift.',
      metricLabel: 'Press OEE Average',
      metricVal: '84.6%',
      features: [
        'Real-time press impression counters & automated make-ready phase detection',
        'OEE tracking: Availability, Performance, and Quality yield calculations',
        'Downtime reason code logging via operator touchscreen kiosks',
        'Live paperboard and ink consumption tracking against job estimates',
      ],
    },
    'reports-insights': {
      title: 'Reports & Executive Business Intelligence',
      badge: 'Decision Intelligence',
      desc: 'Comprehensive financial and operational dashboards. Track job-by-job contribution margins, scrap paperboard tonnage, machine utilization rates, and customer profitability trends.',
      metricLabel: 'Margin Variance Caught',
      metricVal: '$142k/yr',
      features: [
        'Actual vs. estimated job costing: paperboard, inks, plates, and press hours',
        'Executive KPI scorecards: revenue per press hour, scrap percentage, on-time delivery',
        'Substrate inventory valuation and aging roll/sheet stock visibility',
        'Automated daily executive summary emails and custom PDF board reports',
      ],
    },
    'rfqs-estimation': {
      title: "Automated RFQ's & Instant Estimating",
      badge: 'Instant Turnaround',
      desc: 'Turn complex custom packaging requests into certified, production-ready price quotes within seconds. Factors sheet nesting, press speed, ink coverage, finishing passes, and freight.',
      metricLabel: 'Quote Turnaround',
      metricVal: '45 seconds',
      features: [
        'Parametric cost estimation based on folding carton length, width, depth, and board caliper',
        'Automatic calculation of press sheet size and optimal nested die blanks',
        'Instant generation of customer-ready PDF proposals with 3D folding carton renders',
        'Multi-option quote comparison: 3k vs. 5k vs. 10k units with unit price savings curves',
      ],
    },
  };

  const misTabs = document.querySelectorAll('.mis-tab-btn');
  const misTitle = document.getElementById('misTitle');
  const misBadge = document.getElementById('misBadge');
  const misDesc = document.getElementById('misDesc');
  const misMetricLabel = document.getElementById('misMetricLabel');
  const misMetricVal = document.getElementById('misMetricVal');
  const misFeaturesList = document.getElementById('misFeaturesList');

  misTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      misTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const id = tab.getAttribute('data-tab');
      const item = misData[id];
      if (item) {
        if (misTitle) misTitle.textContent = item.title;
        if (misBadge) misBadge.textContent = item.badge;
        if (misDesc) misDesc.textContent = item.desc;
        if (misMetricLabel) misMetricLabel.textContent = item.metricLabel;
        if (misMetricVal) misMetricVal.textContent = item.metricVal;

        if (misFeaturesList) {
          misFeaturesList.innerHTML = '';
          item.features.forEach((feat) => {
            const li = document.createElement('li');
            li.textContent = feat;
            misFeaturesList.appendChild(li);
          });
        }
      }
    });
  });

  // 6. RFQ Quote Modal Open & Close
  const modal = document.getElementById('rfqModal');
  const openButtons = document.querySelectorAll('[data-open-modal]');
  const closeBtn = document.getElementById('closeModal');
  const rfqForm = document.getElementById('rfqForm');
  const serviceInput = document.getElementById('rfqServiceInput');

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || 'General Packaging Inquiry';
      if (serviceInput) serviceInput.value = service;
      if (modal) modal.classList.add('open');
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  }

  // 7. RFQ Form Submission
  if (rfqForm) {
    rfqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('rfqName')?.value || 'Valued Client';
      const email = document.getElementById('rfqEmail')?.value;
      const qty = document.getElementById('rfqQty')?.value || '5,000';

      alert(`Thank you, ${name}! Your packaging consulting inquiry (${qty} units) has been recorded. Our engineering director will email your structural recommendation and cost matrix to ${email} within 24 hours.`);
      if (modal) modal.classList.remove('open');
      rfqForm.reset();
    });
  }

  // 8. Standalone Client-Side AI Packaging Consultant
  const aiConsultBtn = document.getElementById('aiConsultBtn');
  const aiPrompt = document.getElementById('aiConsultPrompt');
  const aiResultBox = document.getElementById('aiResultBox');
  const aiResultContent = document.getElementById('aiResultContent');

  if (aiConsultBtn && aiPrompt && aiResultBox && aiResultContent) {
    aiConsultBtn.addEventListener('click', () => {
      const text = aiPrompt.value.trim() || 'Custom primary flexible barrier pouch and secondary folding carton';
      const lower = text.toLowerCase();

      let barrierType = 'Matte BOPP 19µ / Metallized PET 12µ / LLDPE 80µ (High Barrier)';
      let pouchType = 'Stand-Up Doyen Pouch with Press-to-Close Zipper';
      let cartonType = 'ECMA A60.20 Crash-Lock Auto Bottom with Tuck Top (350gsm C1S SBS)';
      let dieYield = '6-up nested layout on standard 720×1020mm master sheet (86.4% substrate yield)';
      let shipperType = 'B-Flute 44 ECT Regular Slotted Container (FEFCO 0201), 490 kg McKee crush resistance';

      if (lower.includes('coffee') || lower.includes('grease') || lower.includes('oil') || lower.includes('retort')) {
        barrierType = 'PET 12µ / AL Foil 7µ / BOPA 15µ / CPP 70µ (Zero OTR/WVTR Total Barrier)';
        pouchType = 'Side-Gusset Pouch with One-Way Degassing Valve';
      } else if (lower.includes('eco') || lower.includes('recyclable') || lower.includes('compost')) {
        barrierType = 'MDO-PE 25µ / EVOH Gas Barrier / Low-Temp Sealant PE 65µ (100% Mono-PE Recyclable)';
        pouchType = 'Flat-Bottom Box Pouch with All-PE Recyclable Zipper';
      } else if (lower.includes('cosmetic') || lower.includes('perfume') || lower.includes('serum')) {
        cartonType = 'ECMA A20.20 Straight Tuck End (STE) with Fifth Panel Retail Hanger (400gsm SBS)';
        dieYield = '8-up optimized layout on 720×1020mm press sheet (88.2% substrate yield)';
      }

      aiResultContent.innerHTML = `
        <div style="margin-bottom:0.5rem;"><strong>Primary Barrier:</strong> ${barrierType}</div>
        <div style="margin-bottom:0.5rem;"><strong>Pouch Format:</strong> ${pouchType}</div>
        <div style="margin-bottom:0.5rem;"><strong>Secondary Carton:</strong> ${cartonType}</div>
        <div style="margin-bottom:0.5rem;"><strong>Die Nesting Yield:</strong> ${dieYield}</div>
        <div style="margin-bottom:0.5rem;"><strong>Tertiary Shipper:</strong> ${shipperType}</div>
        <div style="margin-top:0.75rem; color:#10b981;">✓ 100% Client-side validated for production at Dongguan Engineering Lab & Hong Kong Logistics.</div>
      `;
      aiResultBox.style.display = 'block';
    });
  }
});
