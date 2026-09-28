(function () {
  'use strict';

  var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var isWWYD = path === 'what-would-you-do-set-1.html';

  var psychologyPages = [
    'trading-psychology.html',
    'why-traders-overtrade.html',
    'revenge-trading.html',
    'self-sabotage-in-trading.html',
    'trading-vs-gambling.html',
    'decision-fatigue-in-trading.html',
    'awareness-isnt-discipline.html',
    'stoicism-and-trading.html',
    'trading-discipline.html'
  ];
  var isPsychology = psychologyPages.indexOf(path) !== -1;
  var isComic = path === 'comics.html';
  var isSpotlight = /stock-spotlight.*\.html$/.test(path) && path !== 'stock-spotlights.html';

  if (!(isWWYD || isPsychology || isComic || isSpotlight)) return;

  var style = document.createElement('style');
  style.textContent =
    '.dagger-share-wrap{max-width:920px;margin:28px auto;padding:18px 20px;border:1px solid #1f5279;border-radius:12px;background:linear-gradient(145deg,#081827,#06121f);text-align:center}' +
    '.dagger-share-wrap strong{display:block;color:#fff;font-size:1.02rem;margin-bottom:5px}' +
    '.dagger-share-wrap p{margin:0 0 12px;color:#aebfd0;font-size:.92rem;line-height:1.45}' +
    '.dagger-share-btn{appearance:none;border:1px solid #2b9df4;border-radius:8px;background:#0c6fbd;color:#fff;padding:10px 16px;font:inherit;font-weight:800;cursor:pointer}' +
    '.dagger-share-btn:hover{background:#1084df}' +
    '.dagger-share-status{display:block;min-height:1.2em;margin-top:8px;color:#8fcaff;font-size:.82rem}' +
    '.dagger-share-status:empty{display:none}' +
    '.dagger-share-wwyd{margin:16px auto;padding:12px 16px;display:flex;flex-direction:column;align-items:center}' +
    '.dagger-share-wwyd strong{color:#fff !important;font-weight:800 !important;margin-bottom:3px}' +
    '.dagger-share-wwyd p{display:block;color:#b9cadd !important;margin:0 auto 9px !important;text-align:center !important;width:100% !important;max-width:100%;align-self:center}' +
    '.dagger-share-wwyd-buttons{display:flex;justify-content:center;gap:9px;flex-wrap:wrap}' +
    '.dagger-share-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}' +
    '.dagger-share-row .dagger-share-btn{margin-left:auto}' +
    '.dagger-share-row .dagger-share-status{flex-basis:100%;text-align:right;margin-top:0}' +
    '.dagger-share-spotlight{max-width:920px;margin:26px auto 30px;display:flex;align-items:center;gap:12px;padding:0 2px}' +
    '.dagger-share-spotlight .dagger-share-btn{margin-left:auto}' +
    '.dagger-share-spotlight-back{display:inline-flex;align-items:center;justify-content:center;text-decoration:none;border:1px solid #294866;border-radius:8px;background:#0b1d2d;color:#e8f3ff;padding:10px 14px;font-weight:800}' +
    '.dagger-share-spotlight-back:hover{border-color:#3b82b8;background:#10283d}' +
    '.dagger-share-spotlight .dagger-share-status{margin:0 0 0 2px}' +
    '.wwyd-result-actions .dagger-share-btn{background:#0c6fbd;border-color:#2b9df4}' +
    '@media(max-width:620px){.dagger-share-wrap{margin:22px 14px;padding:16px}.dagger-share-wrap .dagger-share-btn{width:100%;min-height:44px}.df-return .dagger-share-btn{margin-left:0;min-height:44px}.df-return .dagger-share-status{text-align:left}.dagger-share-spotlight{margin:22px 14px 26px;flex-wrap:wrap}.dagger-share-spotlight .dagger-share-btn{margin-left:auto;min-height:44px}.dagger-share-spotlight-back{min-height:44px}.dagger-share-spotlight .dagger-share-status{flex-basis:100%;text-align:right}}';
  
  style.textContent += '.dagger-share-spotlight-bottom{justify-content:center!important;text-align:center!important;}';

  
  style.textContent += '.dagger-share-spotlight-bottom{width:auto!important;max-width:none!important;margin:28px 0 18px!important;display:flex!important;justify-content:center!important;align-items:center!important;text-align:center!important;float:none!important;position:static!important;transform:none!important;}';

  
  style.textContent += '.dagger-share-spotlight-bottom{box-sizing:border-box!important;width:100%!important;max-width:675px!important;margin:16px auto 10px!important;padding:0!important;display:flex!important;justify-content:center!important;align-items:center!important;text-align:center!important;float:none!important;clear:both!important;position:relative!important;left:auto!important;right:auto!important;transform:none!important;} .dagger-share-spotlight-bottom .dagger-share-btn{margin-left:auto!important;margin-right:auto!important;transform:translateY(-18px)!important;}';

  document.head.appendChild(style);

  function shareText(mode) {
    if (isWWYD && mode === 'result') {
      var badge = document.getElementById('result-badge');
      var score = document.getElementById('result-score');
      var resultName = badge ? badge.textContent.trim() : '';
      var scoreText = score ? score.textContent.trim() : '';
      if (resultName && scoreText) return 'I got “' + resultName + '” on Dagger Trading WWYD Set 1 — ' + scoreText + '. How would you do? Take the challenge:';
    }
    if (isWWYD) return 'What would you do in these trading situations? Take Dagger Trading WWYD Set 1 and compare your result:';
    if (isComic) return 'Check out this Dagger Trading comic.';
    if (isSpotlight) return 'Check out this Dagger Trading Stock Spotlight.';
    return 'Check out this Dagger Trading trading psychology lesson.';
  }

  async function share(statusEl, mode) {
    var shareUrl = location.protocol === 'file:' ? 'https://daggertrading.com/' + path : location.href;
    var text = shareText(mode);
    var data = { title: document.title, text: text, url: shareUrl };
    try {
      if (navigator.share && location.protocol !== 'file:') {
        await navigator.share(data);
        if (statusEl) statusEl.textContent = 'Shared.';
        return;
      }
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text + ' ' + shareUrl);
      } else {
        var temp = document.createElement('textarea');
        temp.value = text + ' ' + shareUrl;
        temp.setAttribute('readonly', '');
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        temp.remove();
      }
      if (statusEl) statusEl.textContent = 'Link copied!';
    } catch (err) {
      if (err && err.name === 'AbortError') return;
      if (statusEl) statusEl.textContent = 'Could not share automatically. Copy the page URL from your browser.';
    }
  }

  function makeButton(label, statusEl, mode) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'dagger-share-btn';
    btn.textContent = label;
    btn.addEventListener('click', function () { share(statusEl, mode); });
    return btn;
  }

  if (isWWYD) {
    var resultActions = document.querySelector('#result-card .wwyd-result-actions');
    if (resultActions) {
      var wrap = document.createElement('div');
      wrap.className = 'dagger-share-wrap dagger-share-wwyd';
      wrap.innerHTML = '<strong>Challenge another trader</strong><p>Share your result, or send them the challenge without revealing your score.</p><div class="dagger-share-wwyd-buttons"></div><span class="dagger-share-status" aria-live="polite"></span>';
      var status = wrap.querySelector('.dagger-share-status');
      var buttons = wrap.querySelector('.dagger-share-wwyd-buttons');
      buttons.appendChild(makeButton('↗ Share My Result', status, 'result'));
      buttons.appendChild(makeButton('↗ Share WWYD Set 1', status, 'game'));
      resultActions.insertAdjacentElement('beforebegin', wrap);
    }
    return;
  }

  if (isPsychology) {
    var returnRow = document.querySelector('.df-return, .tg-return, .ss-return');
    if (returnRow) {
      returnRow.classList.add('dagger-share-row');
      var inlineStatus = document.createElement('span');
      inlineStatus.className = 'dagger-share-status';
      inlineStatus.setAttribute('aria-live', 'polite');
      returnRow.appendChild(makeButton('↗ Share', inlineStatus));
      returnRow.appendChild(inlineStatus);
      return;
    }
  }

  if (isSpotlight) {
    var topShare = document.createElement('div');
    topShare.className = 'dagger-share-spotlight dagger-share-spotlight-top';
    var topStatus = document.createElement('span');
    topStatus.className = 'dagger-share-status';
    topStatus.setAttribute('aria-live', 'polite');
    topShare.appendChild(makeButton('↗ Share Spotlight', topStatus));
    topShare.appendChild(topStatus);

    var hero = document.querySelector('.hero, .spotlight-hero, main .container');
    if (hero) hero.appendChild(topShare);

    var spotlightRow = document.createElement('div');
    spotlightRow.className = 'dagger-share-spotlight dagger-share-spotlight-bottom';
    var spotlightStatus = document.createElement('span');
    spotlightStatus.className = 'dagger-share-status';
    spotlightStatus.setAttribute('aria-live', 'polite');
    spotlightRow.appendChild(makeButton('↗ Share Spotlight', spotlightStatus));
    spotlightRow.appendChild(spotlightStatus);

    var continueSection = document.querySelector('.continue-exploring');
    if (continueSection) {
      // Put the bottom share inside the exact same content container as
      // Continue Exploring, immediately before that section.
      continueSection.parentNode.insertBefore(spotlightRow, continueSection);
    } else {
      var spotlightFooter = document.querySelector('footer');
      if (!spotlightFooter) return;
      spotlightFooter.parentNode.insertBefore(spotlightRow, spotlightFooter);
    }
    return;
  }

  var footer = document.querySelector('footer');
  if (!footer) return;
  var box = document.createElement('div');
  box.className = 'dagger-share-wrap';
  var heading = isComic ? 'Worth sending to another trader?' : isSpotlight ? 'Know someone watching this stock?' : 'Know a trader who could use this?';
  var subtext = isComic ? 'Share this comic.' : isSpotlight ? 'Share this Spotlight.' : 'Share this lesson with them.';
  box.innerHTML = '<strong>' + heading + '</strong><p>' + subtext + '</p><span class="dagger-share-status" aria-live="polite"></span>';
  var boxStatus = box.querySelector('.dagger-share-status');
  box.insertBefore(makeButton('↗ Share', boxStatus), boxStatus);
  footer.parentNode.insertBefore(box, footer);
})();
