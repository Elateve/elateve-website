/* ========================================
   ELATEVE — Lightweight EN / ES switch
   English lives in the HTML (source of truth); this file only carries
   the Spanish overrides. Elements opt in with:
     data-i18n="key"              -> sets textContent
     data-i18n-html="key"         -> sets innerHTML (for <br>, <strong>)
     data-i18n-placeholder="key"  -> sets the input placeholder
   Journal article bodies are intentionally English-only for now.
   ======================================== */
(function () {
  var STORAGE = 'elateve_lang';

  var ES = {
    // nav + shared CTA
    'nav.home': 'Inicio',
    'nav.journal': 'Diario',
    'nav.about': 'Nosotras',
    'cta.book': 'Reservar 30 minutos',

    // hero
    'hero.eyebrow': 'Una alianza de longevidad · Barcelona',
    'hero.title': 'La propuesta integral de bienestar y longevidad <br>para la hostelería, de principio a fin.',
    'hero.sub': 'En la intersección entre la ciencia de la longevidad y la hostelería de lujo, ELATEVE powered by Kloodos convierte el espacio de bienestar infrautilizado en una propuesta medible de recuperación y rendimiento — para spas de hotel, clubes deportivos profesionales, espacios de coworking premium y centros de bienestar independientes. Los huéspedes, atletas y socios de hoy buscan renovación celular y cognitiva, no relajación pasiva, y se la ofrecemos como un blueprint llave en mano, sin operar el espacio: protocolos clínicos, tecnología biométrica y formación digital que permiten a su establecimiento captar el mercado de longevidad de alto valor y convertir una superficie infrautilizada en su activo más rentable. Un solo socio, en exclusiva para España y Europa.',
    'hero.cta2': 'Ver qué entregamos',
    'hero.m1': 'Tecnologías de grado médico',
    'hero.m2': 'Años de diseño de protocolos',
    'hero.m3': 'Socio, de la instalación al resultado',

    // the system / what we deliver
    'sys.eyebrow': 'Qué entregamos',
    'sys.title': 'Un espacio de longevidad llave en mano. <br>Un contrato, un socio.',
    'sys.lead': 'No un catálogo de máquinas. Una propuesta de longevidad completa — diseñada para su edificio, su cliente y su tarifa, y luego instalada, dotada de personal y comercializada. Esto es lo que incluye.',
    'sys.s1t': 'Concepto y viabilidad',
    'sys.s1d': 'Recorremos el espacio, dibujamos el plano y trazamos el recorrido del huésped antes de encargar nada — superficie, ubicación y flujo de cada modalidad.',
    'sys.s2t': 'Suministro e instalación de tecnología',
    'sys.s2d': 'Más de 15 modalidades de grado médico de un único proveedor: crioterapia de cuerpo entero, cámara hiperbárica, fotobiomodulación, sueroterapia y NAD+, compresión con certificación FDA, electroestimulación, flotación seca y más.',
    'sys.s3t': 'Protocolos integrados',
    'sys.s3d': 'Tratamientos secuenciados para funcionar juntos y diseñados para venta cruzada y ascendente — para que los huéspedes se queden más tiempo, gasten más y repitan.',
    'sys.s4t': 'Formación y certificación del equipo',
    'sys.s4d': 'Su personal formado en cada modalidad — el qué, el cómo, el cuándo y el porqué — con formación continua y soporte de protocolos.',
    'sys.s5t': 'Lanzamiento y soporte comercial',
    'sys.s5d': 'Posicionamiento, naming, diseño de carta y materiales de lanzamiento, más orientación de precios — para que el espacio se llene desde la primera semana.',
    'sys.s6t': 'Servicio, mantenimiento y un único interlocutor',
    'sys.s6d': 'Un solo número para tecnología, repuestos, mantenimiento y soporte, durante toda la vida de la instalación.',
    'sys.line': 'Desde el primer plano hasta el resultado que sienten sus huéspedes — de principio a fin, bajo un mismo techo.',

    // track record
    'rec.eyebrow': 'Trayectoria',
    'rec.title': 'Ya presente en los espacios <br>que no aceptan menos.',
    'rec.lead': 'La tecnología y los protocolos de ELATEVE powered by Kloodos están instalados y en funcionamiento en el deporte de élite, la hostelería de lujo y el bienestar médico privado — desde salas de recuperación de la Premier League hasta spas de cinco estrellas.',
    'rec.standard': 'Especificamos únicamente equipos de grado médico y clínicamente validados — nunca dispositivos de consumo, nunca materiales de segunda. Ese estándar es la razón por la que estos nombres lo dejan entrar en sus edificios.',
    'rec.rolllabel': 'Algunos de los espacios donde ya funciona',
    'rec.rollmore': 'y más — bajo petición',

    // the market
    'mkt.eyebrow': 'El mercado',
    'mkt.title': 'La demanda ya está aquí. <br>La oferta, no.',
    'mkt.s1l': 'Lo que gasta por viaje un turista de bienestar internacional frente al turista medio',
    'mkt.s2l': 'Los viajes de bienestar son el 7,8% de todos los viajes — pero casi una quinta parte de lo que gastan los viajeros',
    'mkt.s3l': 'Tamaño previsto del turismo de bienestar en 2027, desde 1 billón de dólares en 2024',
    'mkt.s4l': 'Economía global del bienestar prevista para 2029 — la longevidad es su segmento de más rápido crecimiento',
    'mkt.fomo1': 'Las personas que impulsan ese gasto — huéspedes de alto poder adquisitivo, viajeros centrados en la longevidad, presupuestos de salud ejecutiva y deporte de élite — <strong>buscan activamente un lugar creíble donde destinarlo</strong>, y la mayoría de los establecimientos no pueden ofrecérselo.',
    'mkt.fomo2': 'Hay espacio para aproximadamente <strong>un destino de longevidad serio por ciudad</strong>. El establecimiento que instala primero suele conservar esa posición; el resto acaba derivando a sus mejores clientes a la competencia. Sus competidores ya están teniendo esta conversación con nosotras — el espacio que no acondicione ahora es la reserva que perderá después.',
    'mkt.src': 'Fuentes: Global Wellness Institute, 2023–2024.',

    // the opportunity
    'opp.eyebrow': 'La oportunidad',
    'opp.title': 'Su planta de bienestar es el espacio <br>menos aprovechado del edificio.',
    'opp.lead': 'Los clientes que más gastan — y una ola creciente de viajeros centrados en la longevidad — buscan activamente dónde destinar ese gasto. Una propuesta de longevidad seria y con respaldo científico es, cada vez más, la razón por la que eligen un establecimiento, o un club, frente a otro.',
    'opp.p2': 'La mayoría de los establecimientos no pueden atender esa demanda, porque la propuesta hay que ensamblarla con piezas que nunca se diseñaron para funcionar juntas — y alguien tiene que asumir el riesgo de equivocarse. No solo suministramos la tecnología; recorremos el espacio, dibujamos el plano, trazamos el flujo del huésped y asesoramos sobre la ubicación lógica de cada modalidad.',
    'opp.p3': 'Su spa se diseñó para un cliente anterior — otro huésped, otra década de demanda. Evaluamos lo que ya tiene y proponemos los cambios que lo elevan para atraer al cliente que entra hoy.',
    'opp.sub': 'Y no solo spas. Planificamos el espacio y asesoramos en toda la hostelería:',
    'opp.t1': 'Hoteles y resorts',
    'opp.t2': 'Clubes privados',
    'opp.t3': 'Espacios de coworking',
    'opp.t4': 'Gimnasios y clubes fitness',
    'opp.t5': 'Clubes deportivos y atléticos',
    'opp.t6': 'Residencias',
    'opp.t7': 'Clínicas de longevidad',

    // ROI
    'roi.eyebrow': 'El retorno',
    'roi.title': 'Lo que devuelve el espacio.',
    'roi.lead': 'Tres ejemplos ilustrativos. Las cifras reales dependen de su superficie, ubicación y tarifa — las modelamos con rigor en la propuesta.',
    'roi.c1k': 'Camilla HBOT',
    'roi.c1fig': '~ 140.000 € / año',
    'roi.c1d': 'Seis sesiones al día a 90 €, seis días por semana, desde unos 4 m² de superficie. Una camilla hiperbárica reclinable es uno de los activos con mayor ingreso por metro cuadrado del espacio.',
    'roi.c2k': 'Reconfiguración del spa',
    'roi.c2fig': 'Categoría de mayor margen',
    'roi.c2d': 'Reconvertir una sala de tratamiento infrautilizada en una suite de recuperación con crioterapia y compresión suele elevar la ocupación de la sala y añade una categoría de servicio premium por encima de los tratamientos estándar.',
    'roi.c3k': 'Membresía y fidelización',
    'roi.c3fig': 'Ingresos recurrentes',
    'roi.c3d': 'Los operadores citan una propuesta de longevidad creíble entre las tres principales razones por las que los clientes se dan de alta y se quedan — así que protege los ingresos recurrentes, no solo los de tratamiento.',
    'roi.note': 'Las cifras mostradas son ilustrativas, no presupuestos ni garantías.',

    // who we are
    'who.eyebrow': 'Quiénes somos',
    'who.title': 'Dos especialistas. <br>Una propuesta de longevidad.',
    'who.p1': 'ELATEVE es la curadora de longevidad — la experiencia, los protocolos y la marca de cara al huésped. Kloodos es la curadora de tecnología de bienestar para el deporte de élite, la hostelería de lujo y la salud médica privada — fabricante y distribuidora de las principales tecnologías de bienestar del mundo desde 2014.',
    'who.p2': 'Juntas somos la <strong>alianza exclusiva de tecnología de longevidad para España y Europa</strong>, con sede en Barcelona — para que un establecimiento nunca tenga que ensamblar una propuesta de bienestar con piezas que no se diseñaron para funcionar juntas, ni asumir el riesgo de equivocarse.',
    'who.t1': 'Exclusiva · España y Europa',
    'who.t2': 'Con sede en Barcelona',
    'who.t3': 'Solo grado médico',
    'who.t4': 'Un único interlocutor',

    // why us
    'why.eyebrow': 'Por qué ELATEVE powered by Kloodos',
    'why.title': 'El único socio que asume <br>todo el proyecto, de principio a fin.',
    'why.lead': 'La mayoría de los proveedores de bienestar le venden una máquina y se marchan. Nosotras diseñamos el concepto, suministramos toda la tecnología, creamos los protocolos que la hacen funcionar en conjunto, formamos a su equipo y permanecemos durante toda la vida de la instalación — un único punto de contacto para tecnología, servicio y soporte.',
    'why.i1t': 'Una agenda de contactos que no se compra',
    'why.i1d': 'Una red sin igual de expertos del deporte profesional de élite y la salud médica privada, disponible para su proyecto.',
    'why.i2t': 'Llave en mano, no a base de prueba y error',
    'why.i2d': 'Planos esquemáticos, orientación sobre el flujo lógico y la ubicación de cada tecnología, y soluciones llave en mano para un bienestar completo y real.',
    'why.i3t': 'Protocolos, no solo productos',
    'why.i3d': 'Protocolos integrados que secuencian todas las tecnologías — diseñados para venta cruzada y ascendente, para que los huéspedes gasten más tiempo y vuelvan una y otra vez.',
    'why.i4t': 'Formación en profundidad',
    'why.i4d': 'Formación exhaustiva en cada tecnología — el qué, el cómo, el cuándo y el porqué — más formación y soporte continuos de los protocolos.',
    'why.i5t': 'Más de 70 años de diseño de protocolos',
    'why.i5d': 'Un equipo con más de 70 años de experiencia combinada desarrollando protocolos de tratamiento galardonados para spas premium de todo el mundo.',
    'why.i6t': 'Probado en los dispositivos que ya llevan los huéspedes',
    'why.i6d': 'Protocolos que demuestran resultados inmediatos y acumulativos en la diagnóstica de consumo — Whoop, Oura y el resto.',
    'why.motto': 'Relevante · Coherente · Lógico · Fiable · Cautivador · Integrado · Completo',

    // 360 approach
    'app.eyebrow': 'Nuestro enfoque 360°',
    'app.title': 'Regular. Depurar. Regenerar.',
    'app.lead': 'La salud verdadera no consiste en tratar síntomas uno a uno — es restaurar la propia capacidad del cuerpo de regularse, adaptarse, repararse y prosperar. En el centro de todo lo que construimos está la <strong>regulación del sistema nervioso</strong>: el sistema que gobierna el rendimiento cerebral, la resiliencia emocional, las hormonas, la inmunidad, la salud cardiovascular, la digestión, la recuperación y la reparación celular.',
    'app.s1t': 'Regular',
    'app.s1d': 'Sacar al cuerpo del estrés crónico y el predominio simpático hacia un estado equilibrado donde la curación, la recuperación y la adaptación puedan ocurrir de verdad — la base que hace que cada terapia posterior funcione mejor.',
    'app.s2t': 'Depurar',
    'app.s2d': 'Apoyar las vías naturales de detoxificación del cuerpo, optimizar la circulación y el aporte de oxígeno, mejorar la función linfática y el rendimiento mitocondrial — restaurando la homeostasis fisiológica en múltiples sistemas.',
    'app.s3t': 'Regenerar',
    'app.s3d': 'Aumentar la producción de energía celular, mejorar la oxigenación de los tejidos, reducir la inflamación y apoyar la reparación intrínseca del cuerpo — construyendo resiliencia, vitalidad y envejecimiento saludable a largo plazo.',
    'app.note': 'No son tratamientos aislados — un ecosistema integrado de tecnologías clínicamente probadas, secuenciadas de forma intencionada para que cada modalidad prepare el cuerpo para la siguiente. El resultado es mayor que la suma de las partes.',

    // what we install (headings only; device cards stay English for now)
    'inst.eyebrow': 'Qué instalamos',
    'inst.title': 'El stack tecnológico, <br>al completo.',
    'inst.lead': 'Ninguna otra empresa reúne esta amplitud. Cada modalidad está clínicamente probada, es de grado médico donde importa y está pensada para secuenciarse — agrupada aquí por la fase del recorrido que impulsa.',
    'inst.stage1': 'Regular — el sistema nervioso',
    'inst.stage2': 'Depurar — circulación, linfa, homeostasis',
    'inst.stage3': 'Regenerar — energía y reparación celular',
    'inst.more': 'Y más — salas Deep Sea Sleep, sistemas de aire limpio e iones negativos, duchas de experiencias, terapia Kneipp y piscinas acústicas a medida. Tecnologías de diagnóstico y de ritmo circadiano en desarrollo.',

    // the people
    'ppl.eyebrow': 'El equipo',
    'ppl.title': 'Creado por mujeres cansadas <br>de que les dijeran que aguantaran.',
    'ppl.e1': 'ELATEVE es un grupo de mujeres de 30, 40, 50 y 60 años. Cada una chocó con el mismo muro — nuestro propio agotamiento, nuestra propia revolución hormonal, una recuperación que los procedimientos estándar recibieron con un encogimiento de hombros, y una curiosidad que nadie a nuestro alrededor alimentaba.',
    'ppl.e2': 'Venimos del mundo del lujo y el lifestyle en Barcelona, París y Londres — y de crear empresas. Entre todas hemos vivido la recuperación posparto, la perimenopausia, la menopausia y las décadas siguientes. Lo probamos todo en nosotras mismas antes de que llegue a un huésped.',
    'ppl.k1': 'Kloodos es una empresa familiar liderada por mujeres que llegó a la tecnología de bienestar con las mismas preguntas que nosotras — y empezó a responderlas en 2014, asesorando a spas y gimnasios sobre recuperación avanzada mucho antes de que fuera una categoría.',
    'ppl.k2': 'Detrás: más de 70 años de experiencia combinada diseñando protocolos de tratamiento galardonados para spas premium de todo el mundo, trabajo directo con departamentos de ciencia y medicina deportiva de la Premier League, y fabricación y distribución de las principales tecnologías de bienestar del mundo. Expertas en medicina, ciencia, fabricación y formación — al nivel más premium.',

    // barcelona
    'place.eyebrow': 'Nuestra base',
    'place.line': 'Con sede en Barcelona. <br>Trabajando en toda España y Europa.',

    // the ask
    'ask.eyebrow': 'La propuesta',
    'ask.title': 'Denos 30 minutos en su espacio.',
    'ask.lead': 'Sea cual sea el establecimiento — hotel, resort, club privado, gimnasio o coworking — al terminar sabrá la superficie, el stack tecnológico y los protocolos que encajan.',
    'ask.s1t': 'Llamada de descubrimiento',
    'ask.s1d': 'Su establecimiento, su cliente, su espacio actual — 30 minutos.',
    'ask.s2t': 'Visita in situ',
    'ask.s2d': 'Recorremos el espacio, medimos la superficie y trazamos el flujo del huésped.',
    'ask.s3t': 'Propuesta a medida',
    'ask.s3d': 'Stack tecnológico, protocolos, personal y retorno modelado, adaptados a su establecimiento.',

    // closer + newsletter
    'closer.quote': '«La longevidad no consiste en sumar años. <br>Consiste en vivirlos plenamente.»',
    'news.title': 'Únase a la elevación',
    'news.p': 'Pensamiento sobre longevidad, hallazgos seleccionados y notas de la alianza. Ocasional, nunca ruidoso.',
    'news.ph': 'Su correo electrónico',
    'news.btn': 'Suscribirse',

    // blog hero
    'blog.eyebrow': 'El diario',
    'blog.title': 'Apuntes del equipo',
    'blog.sub': 'Nuestras propias notas sobre la tecnología de longevidad que probamos, utilizamos y sobre la que nos preguntan — lo que funciona, lo que es exageración y lo que acaba de llegar al mercado.',
    'blog.back': '← Volver al diario',

    // footer
    'foot.tagline': 'Longevidad, de principio a fin.',
    'foot.company': 'Empresa',
    'foot.about': 'Nosotras',
    'foot.partnership': 'Alianza',
    'foot.track': 'Trayectoria',
    'foot.contact': 'Contacto',
    'foot.rights': '© 2026 ELATEVE powered by Kloodos. Todos los derechos reservados.',

    // contact modal
    'modal.title': 'Hablemos de longevidad.',
    'modal.text': 'Sáltese el formulario. Contacte directamente con una persona y organizaremos sus 30 minutos — una llamada de descubrimiento, una visita in situ y después una propuesta adaptada a su establecimiento.',
    'modal.wa': 'Escríbanos por WhatsApp',
    'modal.email': 'Escríbanos un correo',

    // about page
    'about.eyebrow': 'Nuestra historia',
    'about.title': 'Dos empresas. Una negativa.',
    'about.sub': 'Longevidad, desmitificada por mujeres que la han vivido',
    'about.tagline': 'ELATEVE powered by Kloodos — <br>la alianza de tecnología de longevidad para España y Europa.',
    'about.introlead': 'Creemos que la longevidad no consiste en perseguir más años — sino en sentirse lúcida, capaz y una misma en cada uno de ellos.',
    'about.introp': 'Es saber qué protocolo merece su tiempo, qué tecnología merece el espacio que ocupa y qué cambios mueven de verdad la aguja en cómo se siente — en lugar de ahogarse en ruido. Creamos ELATEVE, y nos aliamos en exclusiva con Kloodos, porque estábamos cansadas de ir a ciegas.',
    'about.l1': 'Las mujeres detrás de ELATEVE',
    'about.w1': 'ELATEVE es un grupo de mujeres de 30, 40, 50 y 60 años. Cada una chocó con el mismo muro — nuestro propio agotamiento, nuestra propia revolución hormonal, una recuperación que los procedimientos estándar recibieron con un encogimiento de hombros, y una curiosidad que nadie a nuestro alrededor alimentaba.',
    'about.w2': 'Venimos del mundo del lujo y el lifestyle en Barcelona, París y Londres, y de crear empresas durante décadas. Entre todas hemos atravesado la recuperación posparto, la perimenopausia, la menopausia y los años siguientes — y la callada confusión de no saber en qué protocolo, producto o profesional confiar.',
    'about.w3': 'Así que comparamos notas, discrepamos sobre lo que funciona de verdad y lo probamos todo en nosotras mismas antes de que llegue a usted. Si no nos lo pondríamos en nuestro propio cuerpo, o no se lo recomendaríamos a nuestras madres, hermanas e hijas, no pasa el corte.',
    'about.l2': 'Kloodos — nuestra socia tecnológica',
    'about.k1': 'Kloodos es una empresa familiar liderada por mujeres que llegó a la tecnología de bienestar con las mismas preguntas que nosotras — y empezó a responderlas en 2014, asesorando a spas y gimnasios sobre recuperación avanzada mucho antes de que fuera una categoría.',
    'about.k2': 'Detrás: más de 70 años de experiencia combinada diseñando protocolos de tratamiento galardonados para spas premium de todo el mundo, trabajo directo con departamentos de ciencia y medicina deportiva de la Premier League, y la fabricación y distribución de las principales tecnologías de bienestar del mundo. Crioterapia de cuerpo entero, fotobiomodulación dirigida por médicos, oxígeno hiperbárico de grado médico, NAD+ y jetting vitamínico sin aguja, compresión con certificación FDA, flotación seca, IHHT, cápsulas multisensoriales de recuperación y más — clínicamente probado y secuenciado en protocolos en lugar de vendido como una sala de máquinas.',
    'about.k3': 'Ninguna otra empresa reúne esta amplitud de tecnología junto al conocimiento profundo, los contactos expertos del deporte de élite y la medicina privada, y la formación y el soporte continuos para hacer que todo funcione en conjunto. Un único punto de contacto, desde los planos esquemáticos hasta el resultado que sienten sus huéspedes.',
    'about.l3': 'La confianza ELATEVE — ¿Por qué nosotras?',
    'about.l3lead': 'Probado por nosotras. Respaldado por la ciencia. Curación con conciencia.',
    'about.p1t': 'Validado por generaciones',
    'about.p1d': 'Cada protocolo o tecnología que recomendamos ha sido revisado por una mujer de nuestro equipo que ha vivido exactamente esa etapa de la vida.',
    'about.p2t': 'Enfoque 360°',
    'about.p2d': 'No creemos que una sola máquina lo arregle todo. El cambio real necesita la tecnología adecuada, la quietud mental y el cuidado físico avanzado trabajando juntos.',
    'about.p3t': 'Sin tabúes',
    'about.p3d': 'Desde la salud del suelo pélvico posparto hasta la libido posmenopáusica, hablamos con apertura, honestidad y sin juzgar.',
    'about.quote': '«Para nosotras, la longevidad no es solo vivir más — es una sensación. Es despertar con la mente clara, con fuerza para seguir el ritmo de tu vida y con confianza en cada decisión sobre tu propio cuerpo.»',
    'about.close1': 'Hemos hecho la investigación, validado la tecnología y probado los protocolos — para que usted no tenga que ir a ciegas. Estamos aquí para ayudarle a salvar la distancia entre donde está y la vida ELATEVE que merece.',
    'about.closelead': 'La vida auténtica es accesible. La transformación está a una sola decisión de distancia. <br>Elevemos lo cotidiano, juntas.',
    'about.ctajournal': 'Leer lo último del diario'
  };

  var original = {};

  function collect() {
    return document.querySelectorAll('[data-i18n],[data-i18n-html],[data-i18n-placeholder]');
  }

  function capture() {
    collect().forEach(function (el) {
      var hk = el.getAttribute('data-i18n-html');
      var tk = el.getAttribute('data-i18n');
      var pk = el.getAttribute('data-i18n-placeholder');
      if (hk && !('h:' + hk in original)) original['h:' + hk] = el.innerHTML;
      if (tk && !('t:' + tk in original)) original['t:' + tk] = el.textContent;
      if (pk && !('p:' + pk in original)) original['p:' + pk] = el.getAttribute('placeholder') || '';
    });
  }

  function apply(lang) {
    var es = lang === 'es';
    collect().forEach(function (el) {
      var hk = el.getAttribute('data-i18n-html');
      var tk = el.getAttribute('data-i18n');
      var pk = el.getAttribute('data-i18n-placeholder');
      if (hk) el.innerHTML = (es && ES[hk] != null) ? ES[hk] : original['h:' + hk];
      else if (tk) el.textContent = (es && ES[tk] != null) ? ES[tk] : original['t:' + tk];
      if (pk) el.setAttribute('placeholder', (es && ES[pk] != null) ? ES[pk] : original['p:' + pk]);
    });
    document.documentElement.lang = es ? 'es' : 'en';
    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.textContent = es ? 'EN' : 'ES';
      btn.setAttribute('aria-label', es ? 'Switch to English' : 'Cambiar a español');
    }
    try { localStorage.setItem(STORAGE, es ? 'es' : 'en'); } catch (e) {}
    window.__elateveLang = es ? 'es' : 'en';
  }

  function init() {
    capture();
    var saved = 'en';
    try { saved = localStorage.getItem(STORAGE) || 'en'; } catch (e) {}
    apply(saved);
    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        apply(window.__elateveLang === 'es' ? 'en' : 'es');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.ELATEVE_applyLang = apply;
})();
