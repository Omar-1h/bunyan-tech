/**
 * BUNYAN (بُنيان للحلول البرمجية والتجارة الإلكترونية)
 * Interactive Application Logic & Modern Dynamic Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  // ================= 1. PERMANENT CORPORATE THEME (Toyota-Inspired Clean White) =================
  document.body.classList.remove('theme-dark');
  document.body.classList.add('theme-light');
  localStorage.setItem('bunyan_theme', 'light');

  // ================= 2. STICKY HEADER & SCROLL SPY =================
  const siteHeader = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  });

  // ================= 3. MOBILE MENU TOGGLE =================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  mobileMenuBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    mainNav?.classList.toggle('open');
    mobileMenuBtn?.classList.toggle('open');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.main-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav?.classList.remove('open');
      mobileMenuBtn?.classList.remove('open');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mainNav?.classList.contains('open') && !mainNav.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
      mainNav.classList.remove('open');
      mobileMenuBtn?.classList.remove('open');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav?.classList.contains('open')) {
      mainNav.classList.remove('open');
      mobileMenuBtn?.classList.remove('open');
    }
  });

  // Announcement Bar Close
  const closeAnnouncement = document.getElementById('closeAnnouncement');
  const announcementBar = document.getElementById('announcementBar');
  closeAnnouncement?.addEventListener('click', () => {
    if (announcementBar) announcementBar.style.display = 'none';
  });

  // ================= 4. OUR PROCESS (كيف نعمل؟) INTERACTIVE TABS =================
  const processTabs = document.querySelectorAll('.process-tab');
  const processPanes = document.querySelectorAll('.process-pane');

  processTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const step = tab.getAttribute('data-step');

      // Update tabs
      processTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update panes
      processPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === `pane-${step}`) {
          pane.classList.add('active');
        }
      });
    });
  });

  // ================= 5. PORTFOLIO FILTERS =================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ================= 6. INTERACTIVE PROJECT COST CALCULATOR =================
  const calcType = document.getElementById('calcType');
  const calcAddons = document.querySelectorAll('.calc-addon');
  const calcTotalValue = document.getElementById('calcTotalValue');
  const calcSendWhatsApp = document.getElementById('calcSendWhatsApp');

  function calculateTotal() {
    let base = parseInt(calcType?.value || 0, 10);
    let addonsTotal = 0;

    calcAddons.forEach(addon => {
      if (addon.checked) {
        addonsTotal += parseInt(addon.value, 10);
      }
    });

    const grandTotal = base + addonsTotal;
    if (calcTotalValue) {
      calcTotalValue.textContent = grandTotal.toLocaleString();
    }
    return grandTotal;
  }

  calcType?.addEventListener('change', calculateTotal);
  calcAddons.forEach(addon => addon.addEventListener('change', calculateTotal));

  // WhatsApp Trigger from Calculator
  calcSendWhatsApp?.addEventListener('click', () => {
    const selectedOption = calcType?.options[calcType.selectedIndex];
    const projectTypeName = selectedOption?.getAttribute('data-name') || selectedOption?.text;
    const grandTotal = calculateTotal();

    let chosenAddons = [];
    calcAddons.forEach(addon => {
      if (addon.checked) {
        chosenAddons.push(addon.getAttribute('data-name'));
      }
    });

    const addonsText = chosenAddons.length > 0 
      ? `\nالميزات الإضافية المختارة:\n- ${chosenAddons.join('\n- ')}` 
      : '\nبدون ميزات إضافية';

    const message = encodeURIComponent(
      `مرحباً فريق بُنيان،\nقمت بتقدير مشروعي عبر حاسبة الموقع:\n` +
      `نوع المشروع: ${projectTypeName}\n` +
      `${addonsText}\n` +
      `التكلفة التقديرية الإجمالية: $${grandTotal}\n\n` +
      `أرغب في مناقشة تفاصيل التنفيذ والبدء معكم.`
    );

    window.open(`https://wa.me/966500000000?text=${message}`, '_blank');
  });

  // Open calculator with specific service selected
  document.querySelectorAll('.open-calculator').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const service = btn.getAttribute('data-service');
      const calcSection = document.getElementById('costCalculator');
      calcSection?.scrollIntoView({ behavior: 'smooth' });

      if (service === 'ecom' && calcType) {
        calcType.value = '1850';
      } else if (service === 'custom' && calcType) {
        calcType.value = '3200';
      }
      calculateTotal();
    });
  });

  // ================= 7. MODALS SYSTEM =================
  const projectModal = document.getElementById('projectModal');
  const policyModal = document.getElementById('policyModal');
  const caseStudyModal = document.getElementById('caseStudyModal');

  function openModal(modal) {
    modal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Open Project Modal triggers
  const openProjectModalBtns = [
    document.getElementById('openProjectModal'),
    document.getElementById('heroStartProject'),
    document.getElementById('footerStartProject')
  ];

  openProjectModalBtns.forEach(btn => {
    btn?.addEventListener('click', () => openModal(projectModal));
  });

  document.querySelectorAll('.select-plan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const planName = btn.getAttribute('data-plan');
      const select = document.getElementById('projectTypeSelect');
      if (select && planName) {
        // find matching or set custom option
        select.value = planName.includes('متجر') ? 'متجر إلكتروني احترافي' :
                       planName.includes('معسكر') ? 'التسجيل في معسكر الفل ستاك' :
                       'موقع رسمي للشركة';
      }
      openModal(projectModal);
    });
  });

  document.querySelectorAll('.open-bootcamp-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const select = document.getElementById('projectTypeSelect');
      if (select) select.value = 'التسجيل في معسكر الفل ستاك';
      openModal(projectModal);
    });
  });

  // Download Curriculum Trigger
  document.getElementById('downloadCurriculumBtn')?.addEventListener('click', () => {
    showToast('جارِ إرسال خطة المنهج إلى بريدك أو واتساب...');
    setTimeout(() => {
      const select = document.getElementById('projectTypeSelect');
      if (select) select.value = 'التسجيل في معسكر الفل ستاك';
      openModal(projectModal);
    }, 600);
  });

  // Close buttons
  document.getElementById('closeProjectModal')?.addEventListener('click', () => closeModal(projectModal));
  document.getElementById('closePolicyModal')?.addEventListener('click', () => closeModal(policyModal));
  document.getElementById('closeCaseStudyModal')?.addEventListener('click', () => closeModal(caseStudyModal));

  // Close on backdrop click
  [projectModal, policyModal, caseStudyModal].forEach(modal => {
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // Policies Modal Triggers & Tab Switching
  document.querySelectorAll('.policy-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const policyKey = trigger.getAttribute('data-policy') || 'revisions';
      openPolicyTab(policyKey);
      openModal(policyModal);
    });
  });

  const modalPolicyTabs = document.querySelectorAll('.m-policy-tab');
  const policyTabContents = document.querySelectorAll('.policy-tab-content');

  function openPolicyTab(key) {
    const targetId = key.startsWith('policy-') ? key : `policy-${key}`;
    modalPolicyTabs.forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-target') === targetId);
    });
    policyTabContents.forEach(c => {
      c.classList.toggle('active', c.id === targetId);
    });
  }

  modalPolicyTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      openPolicyTab(targetId);
    });
  });

  // ================= 8. CASE STUDY MODAL DETAILS =================
  const projectsData = {
    luxesphere: {
      title: "منصة LuxeSphere للتجارة الإلكترونية الفاخرة",
      badge: "متجر إلكتروني فخم",
      client: "شركة الأناقة الدولية لتجارة التجزئة",
      challenge: "كان العميل يعاني من بطء في المتجر القديم، وارتفاع معدل التخلي عن السلة بنسبة 68% وصعوبة الربط مع بوابات الدفع المحلية وشركات الشحن السريع.",
      solution: "أعادت بُنيان بناء المتجر بالكامل بنظام Headless عالي السرعة باستخدام Next.js 14، وربط بوابات مدى، تمارا، وتابي مع مسار شراء ميسر بنقرة واحدة وتتبع مباشر للشحنات.",
      results: [
        "ارتفاع سرعة التحميل إلى أقل من 0.8 ثانية (Google Score 99/100)",
        "قفزة في معدل إتمام الشراء بنسبة +240%",
        "معالجة أكثر من 12,000 طلب شهرياً دون أي توقف أو بطء"
      ],
      tech: ["Next.js 14", "Tailwind CSS", "PostgreSQL", "Mada / Apple Pay", "Tamara"]
    },
    nexuserp: {
      title: "نظام Nexus Cloud ERP لإدارة سلاسل الإمداد",
      badge: "منصة سحابية مخصصة SaaS",
      client: "مجموعة الحلول اللوجستية المتطورة",
      challenge: "إدارة المخازن المتعددة عبر 4 مدن يدوياً وتأخر استخراج تقارير الفوترة الإلكترونية المعتمدة ومزامنة الجرد مع مندوبي التوزيع.",
      solution: "تطوير لوحة تحكم سحابية متقدمة تدعم الفوترة الإلكترونية الفورية، تتبع الشاحنات بالـ GPS في الوقت الفعلي، ومزامنة قواعد البيانات دون انقطاع.",
      results: [
        "أتمتة 85% من الإجراءات الورقية وتقليص وقت المعالجة",
        "تكامل مباشر مع هيئة الزكاة والضريبة والجمارك (ZATCA)",
        "تشفير بنكي كامل لكافة المعاملات المالية"
      ],
      tech: ["React 18", "Node.js Microservices", "PostgreSQL", "Docker", "Redis"]
    },
    capitaltech: {
      title: "البوابة الرسمية لمجموعة كابيتال القابضة",
      badge: "موقع مؤسسي رسمي للشركات",
      client: "مجموعة كابيتال للاستثمار وإدارة الأصول",
      challenge: "الحاجة إلى واجهة رسمية مهيبة تعكس حجم المحفظة الاستثمارية وتقدم تقارير دورية للمستثمرين بلغات متعددة وبأعلى معايير الأمان.",
      solution: "تصميم موقع تعريفي فائق الفخامة مع حركات تفاعلية سلسة، مدعوم بلوحة تحكم لإدارة بيانات المشاريع وغرفة الأخبار مع حماية Cloudflare.",
      results: [
        "درجة مثالية 98% في مؤشرات Core Web Vitals",
        "حضور مهيب استقطب شركاء دوليين جدد",
        "تصفح سلس على مختلف أنواع الشاشات الذكية"
      ],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
    }
  };

  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      const data = projectsData[projectKey];
      const container = document.getElementById('caseStudyContent');

      if (data && container) {
        container.innerHTML = `
          <div class="modal-badge">${data.badge}</div>
          <h3 class="modal-title">${data.title}</h3>
          <p class="modal-desc"><strong>العميل:</strong> ${data.client}</p>

          <div class="policy-item-box" style="margin-bottom: 16px;">
            <h4 style="color: #F87171;">⚠️ التحدي السابق:</h4>
            <p>${data.challenge}</p>
          </div>

          <div class="policy-item-box" style="margin-bottom: 16px;">
            <h4 style="color: #4ADE80;">💡 الحل الهندسي من بُنيان:</h4>
            <p>${data.solution}</p>
          </div>

          <div class="deliverables-box" style="margin-bottom: 20px;">
            <strong>📈 أهم النتائج والأرقام المحققة:</strong>
            <ul>
              ${data.results.map(r => `<li>${r}</li>`).join('')}
            </ul>
          </div>

          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
            ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>

          <button class="btn btn-primary btn-block" onclick="window.open('https://wa.me/966500000000?text=مرحباً بُنيان، اطلعت على مشروع ${encodeURIComponent(data.title)} وأرغب بنظام مماثل لمشروعي', '_blank')">
            طلب مشروع مماثل لهذا الإنجاز 🚀
          </button>
        `;
        openModal(caseStudyModal);
      }
    });
  });

  // ================= 9. PROJECT FORM SUBMISSION =================
  const projectForm = document.getElementById('projectForm');
  projectForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('clientName')?.value;
    const phone = document.getElementById('clientPhone')?.value;
    const email = document.getElementById('clientEmail')?.value || 'غير محدد';
    const type = document.getElementById('projectTypeSelect')?.value;
    const details = document.getElementById('projectDetails')?.value || 'لا توجد ملاحظات إضافية';

    // Construct WhatsApp message
    const msg = encodeURIComponent(
      `📌 طلب مشروع جديد من موقع بُنيان:\n\n` +
      `الاسم / المنشأة: ${name}\n` +
      `الجوال: ${phone}\n` +
      `البريد: ${email}\n` +
      `نوع الخدمة: ${type}\n` +
      `التفاصيل والرؤية:\n${details}\n`
    );

    closeModal(projectModal);
    showToast('شكراً لتواصلك! يتم فتح المحادثة المباشرة مع مهندسينا الآن...');

    setTimeout(() => {
      window.open(`https://wa.me/966500000000?text=${msg}`, '_blank');
    }, 800);

    projectForm.reset();
  });

  // ================= 10. TOAST NOTIFICATION HELPER =================
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const toastText = document.getElementById('toastMessage');
    if (toast && toastText) {
      toastText.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }
  }

  // ================= 11. TOYOTA-STYLE LINEUP SELECTOR TABS =================
  const lineupTabs = document.querySelectorAll('.lineup-tab-btn');
  const lineupContents = document.querySelectorAll('.lineup-tab-content');

  lineupTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetCategory = tab.getAttribute('data-lineup');
      lineupTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      lineupContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `lineup-${targetCategory}`) {
          content.classList.add('active');
        }
      });
    });
  });
});
