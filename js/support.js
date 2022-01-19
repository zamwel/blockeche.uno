/*! For license information please see support.js.LICENSE.txt */
;(() => {
  'use strict'
  var t = {}
  t.g = (function () {
    if ('object' == typeof globalThis) return globalThis
    try {
      return this || new Function('return this')()
    } catch (t) {
      if ('object' == typeof window) return window
    }
  })()
  const e = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE:
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    get ENCODED_VALS () {
      return this.ENCODED_VALS_BASE + '+/='
    },
    get ENCODED_VALS_WEBSAFE () {
      return this.ENCODED_VALS_BASE + '-_.'
    },
    HAS_NATIVE_SUPPORT: 'function' == typeof atob,
    encodeByteArray (t, e) {
      if (!Array.isArray(t))
        throw Error('encodeByteArray takes an array as a parameter')
      this.init_()
      const n = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
        i = []
      for (let e = 0; e < t.length; e += 3) {
        const s = t[e],
          r = e + 1 < t.length,
          o = r ? t[e + 1] : 0,
          a = e + 2 < t.length,
          c = a ? t[e + 2] : 0,
          h = s >> 2,
          u = ((3 & s) << 4) | (o >> 4)
        let l = ((15 & o) << 2) | (c >> 6),
          d = 63 & c
        a || ((d = 64), r || (l = 64)), i.push(n[h], n[u], n[l], n[d])
      }
      return i.join('')
    },
    encodeString (t, e) {
      return this.HAS_NATIVE_SUPPORT && !e
        ? btoa(t)
        : this.encodeByteArray(
            (function (t) {
              const e = []
              let n = 0
              for (let i = 0; i < t.length; i++) {
                let s = t.charCodeAt(i)
                s < 128
                  ? (e[n++] = s)
                  : s < 2048
                  ? ((e[n++] = (s >> 6) | 192), (e[n++] = (63 & s) | 128))
                  : 55296 == (64512 & s) &&
                    i + 1 < t.length &&
                    56320 == (64512 & t.charCodeAt(i + 1))
                  ? ((s =
                      65536 + ((1023 & s) << 10) + (1023 & t.charCodeAt(++i))),
                    (e[n++] = (s >> 18) | 240),
                    (e[n++] = ((s >> 12) & 63) | 128),
                    (e[n++] = ((s >> 6) & 63) | 128),
                    (e[n++] = (63 & s) | 128))
                  : ((e[n++] = (s >> 12) | 224),
                    (e[n++] = ((s >> 6) & 63) | 128),
                    (e[n++] = (63 & s) | 128))
              }
              return e
            })(t),
            e
          )
    },
    decodeString (t, e) {
      return this.HAS_NATIVE_SUPPORT && !e
        ? atob(t)
        : (function (t) {
            const e = []
            let n = 0,
              i = 0
            for (; n < t.length; ) {
              const s = t[n++]
              if (s < 128) e[i++] = String.fromCharCode(s)
              else if (s > 191 && s < 224) {
                const r = t[n++]
                e[i++] = String.fromCharCode(((31 & s) << 6) | (63 & r))
              } else if (s > 239 && s < 365) {
                const r =
                  (((7 & s) << 18) |
                    ((63 & t[n++]) << 12) |
                    ((63 & t[n++]) << 6) |
                    (63 & t[n++])) -
                  65536
                ;(e[i++] = String.fromCharCode(55296 + (r >> 10))),
                  (e[i++] = String.fromCharCode(56320 + (1023 & r)))
              } else {
                const r = t[n++],
                  o = t[n++]
                e[i++] = String.fromCharCode(
                  ((15 & s) << 12) | ((63 & r) << 6) | (63 & o)
                )
              }
            }
            return e.join('')
          })(this.decodeStringToByteArray(t, e))
    },
    decodeStringToByteArray (t, e) {
      this.init_()
      const n = e ? this.charToByteMapWebSafe_ : this.charToByteMap_,
        i = []
      for (let e = 0; e < t.length; ) {
        const s = n[t.charAt(e++)],
          r = e < t.length ? n[t.charAt(e)] : 0
        ++e
        const o = e < t.length ? n[t.charAt(e)] : 64
        ++e
        const a = e < t.length ? n[t.charAt(e)] : 64
        if ((++e, null == s || null == r || null == o || null == a))
          throw Error()
        const c = (s << 2) | (r >> 4)
        if ((i.push(c), 64 !== o)) {
          const t = ((r << 4) & 240) | (o >> 2)
          if ((i.push(t), 64 !== a)) {
            const t = ((o << 6) & 192) | a
            i.push(t)
          }
        }
      }
      return i
    },
    init_ () {
      if (!this.byteToCharMap_) {
        ;(this.byteToCharMap_ = {}),
          (this.charToByteMap_ = {}),
          (this.byteToCharMapWebSafe_ = {}),
          (this.charToByteMapWebSafe_ = {})
        for (let t = 0; t < this.ENCODED_VALS.length; t++)
          (this.byteToCharMap_[t] = this.ENCODED_VALS.charAt(t)),
            (this.charToByteMap_[this.byteToCharMap_[t]] = t),
            (this.byteToCharMapWebSafe_[t] = this.ENCODED_VALS_WEBSAFE.charAt(
              t
            )),
            (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]] = t),
            t >= this.ENCODED_VALS_BASE.length &&
              ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)] = t),
              (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)] = t))
      }
    }
  }
  class n {
    constructor () {
      ;(this.reject = () => {}),
        (this.resolve = () => {}),
        (this.promise = new Promise((t, e) => {
          ;(this.resolve = t), (this.reject = e)
        }))
    }
    wrapCallback (t) {
      return (e, n) => {
        e ? this.reject(e) : this.resolve(n),
          'function' == typeof t &&
            (this.promise.catch(() => {}), 1 === t.length ? t(e) : t(e, n))
      }
    }
  }
  function i () {
    return 'undefined' != typeof navigator &&
      'string' == typeof navigator.userAgent
      ? navigator.userAgent
      : ''
  }
  function s () {
    return (
      'undefined' != typeof window &&
      !!(window.cordova || window.phonegap || window.PhoneGap) &&
      /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(i())
    )
  }
  function r () {
    const t =
      'object' == typeof chrome
        ? chrome.runtime
        : 'object' == typeof browser
        ? browser.runtime
        : void 0
    return 'object' == typeof t && void 0 !== t.id
  }
  function o () {
    return 'object' == typeof navigator && 'ReactNative' === navigator.product
  }
  function a () {
    const t = i()
    return t.indexOf('MSIE ') >= 0 || t.indexOf('Trident/') >= 0
  }
  class c extends Error {
    constructor (t, e, n) {
      super(e),
        (this.code = t),
        (this.customData = n),
        (this.name = 'FirebaseError'),
        Object.setPrototypeOf(this, c.prototype),
        Error.captureStackTrace &&
          Error.captureStackTrace(this, h.prototype.create)
    }
  }
  class h {
    constructor (t, e, n) {
      ;(this.service = t), (this.serviceName = e), (this.errors = n)
    }
    create (t, ...e) {
      const n = e[0] || {},
        i = `${this.service}/${t}`,
        s = this.errors[t],
        r = s
          ? (function (t, e) {
              return t.replace(u, (t, n) => {
                const i = e[n]
                return null != i ? String(i) : `<${n}?>`
              })
            })(s, n)
          : 'Error',
        o = `${this.serviceName}: ${r} (${i}).`
      return new c(i, o, n)
    }
  }
  const u = /\{\$([^}]+)}/g
  function l (t, e) {
    if (t === e) return !0
    const n = Object.keys(t),
      i = Object.keys(e)
    for (const s of n) {
      if (!i.includes(s)) return !1
      const n = t[s],
        r = e[s]
      if (d(n) && d(r)) {
        if (!l(n, r)) return !1
      } else if (n !== r) return !1
    }
    for (const t of i) if (!n.includes(t)) return !1
    return !0
  }
  function d (t) {
    return null !== t && 'object' == typeof t
  }
  function f (t) {
    const e = []
    for (const [n, i] of Object.entries(t))
      Array.isArray(i)
        ? i.forEach(t => {
            e.push(encodeURIComponent(n) + '=' + encodeURIComponent(t))
          })
        : e.push(encodeURIComponent(n) + '=' + encodeURIComponent(i))
    return e.length ? '&' + e.join('&') : ''
  }
  function p (t) {
    const e = {}
    return (
      t
        .replace(/^\?/, '')
        .split('&')
        .forEach(t => {
          if (t) {
            const [n, i] = t.split('=')
            e[decodeURIComponent(n)] = decodeURIComponent(i)
          }
        }),
      e
    )
  }
  function m (t) {
    const e = t.indexOf('?')
    if (!e) return ''
    const n = t.indexOf('#', e)
    return t.substring(e, n > 0 ? n : void 0)
  }
  class g {
    constructor (t, e) {
      ;(this.observers = []),
        (this.unsubscribes = []),
        (this.observerCount = 0),
        (this.task = Promise.resolve()),
        (this.finalized = !1),
        (this.onNoObservers = e),
        this.task
          .then(() => {
            t(this)
          })
          .catch(t => {
            this.error(t)
          })
    }
    next (t) {
      this.forEachObserver(e => {
        e.next(t)
      })
    }
    error (t) {
      this.forEachObserver(e => {
        e.error(t)
      }),
        this.close(t)
    }
    complete () {
      this.forEachObserver(t => {
        t.complete()
      }),
        this.close()
    }
    subscribe (t, e, n) {
      let i
      if (void 0 === t && void 0 === e && void 0 === n)
        throw new Error('Missing Observer.')
      ;(i = (function (t, e) {
        if ('object' != typeof t || null === t) return !1
        for (const e of ['next', 'error', 'complete'])
          if (e in t && 'function' == typeof t[e]) return !0
        return !1
      })(t)
        ? t
        : { next: t, error: e, complete: n }),
        void 0 === i.next && (i.next = y),
        void 0 === i.error && (i.error = y),
        void 0 === i.complete && (i.complete = y)
      const s = this.unsubscribeOne.bind(this, this.observers.length)
      return (
        this.finalized &&
          this.task.then(() => {
            try {
              this.finalError ? i.error(this.finalError) : i.complete()
            } catch (t) {}
          }),
        this.observers.push(i),
        s
      )
    }
    unsubscribeOne (t) {
      void 0 !== this.observers &&
        void 0 !== this.observers[t] &&
        (delete this.observers[t],
        (this.observerCount -= 1),
        0 === this.observerCount &&
          void 0 !== this.onNoObservers &&
          this.onNoObservers(this))
    }
    forEachObserver (t) {
      if (!this.finalized)
        for (let e = 0; e < this.observers.length; e++) this.sendOne(e, t)
    }
    sendOne (t, e) {
      this.task.then(() => {
        if (void 0 !== this.observers && void 0 !== this.observers[t])
          try {
            e(this.observers[t])
          } catch (t) {
            'undefined' != typeof console && console.error && console.error(t)
          }
      })
    }
    close (t) {
      this.finalized ||
        ((this.finalized = !0),
        void 0 !== t && (this.finalError = t),
        this.task.then(() => {
          ;(this.observers = void 0), (this.onNoObservers = void 0)
        }))
    }
  }
  function y () {}
  function v (t) {
    return t && t._delegate ? t._delegate : t
  }
  class w {
    constructor (t, e, n) {
      ;(this.name = t),
        (this.instanceFactory = e),
        (this.type = n),
        (this.multipleInstances = !1),
        (this.serviceProps = {}),
        (this.instantiationMode = 'LAZY'),
        (this.onInstanceCreated = null)
    }
    setInstantiationMode (t) {
      return (this.instantiationMode = t), this
    }
    setMultipleInstances (t) {
      return (this.multipleInstances = t), this
    }
    setServiceProps (t) {
      return (this.serviceProps = t), this
    }
    setInstanceCreatedCallback (t) {
      return (this.onInstanceCreated = t), this
    }
  }
  const I = '[DEFAULT]'
  class T {
    constructor (t, e) {
      ;(this.name = t),
        (this.container = e),
        (this.component = null),
        (this.instances = new Map()),
        (this.instancesDeferred = new Map()),
        (this.instancesOptions = new Map()),
        (this.onInitCallbacks = new Map())
    }
    get (t) {
      const e = this.normalizeInstanceIdentifier(t)
      if (!this.instancesDeferred.has(e)) {
        const t = new n()
        if (
          (this.instancesDeferred.set(e, t),
          this.isInitialized(e) || this.shouldAutoInitialize())
        )
          try {
            const n = this.getOrInitializeService({ instanceIdentifier: e })
            n && t.resolve(n)
          } catch (t) {}
      }
      return this.instancesDeferred.get(e).promise
    }
    getImmediate (t) {
      var e
      const n = this.normalizeInstanceIdentifier(
          null == t ? void 0 : t.identifier
        ),
        i = null !== (e = null == t ? void 0 : t.optional) && void 0 !== e && e
      if (!this.isInitialized(n) && !this.shouldAutoInitialize()) {
        if (i) return null
        throw Error(`Service ${this.name} is not available`)
      }
      try {
        return this.getOrInitializeService({ instanceIdentifier: n })
      } catch (t) {
        if (i) return null
        throw t
      }
    }
    getComponent () {
      return this.component
    }
    setComponent (t) {
      if (t.name !== this.name)
        throw Error(
          `Mismatching Component ${t.name} for Provider ${this.name}.`
        )
      if (this.component)
        throw Error(`Component for ${this.name} has already been provided`)
      if (((this.component = t), this.shouldAutoInitialize())) {
        if (
          (function (t) {
            return 'EAGER' === t.instantiationMode
          })(t)
        )
          try {
            this.getOrInitializeService({ instanceIdentifier: I })
          } catch (t) {}
        for (const [t, e] of this.instancesDeferred.entries()) {
          const n = this.normalizeInstanceIdentifier(t)
          try {
            const t = this.getOrInitializeService({ instanceIdentifier: n })
            e.resolve(t)
          } catch (t) {}
        }
      }
    }
    clearInstance (t = '[DEFAULT]') {
      this.instancesDeferred.delete(t),
        this.instancesOptions.delete(t),
        this.instances.delete(t)
    }
    async delete () {
      const t = Array.from(this.instances.values())
      await Promise.all([
        ...t.filter(t => 'INTERNAL' in t).map(t => t.INTERNAL.delete()),
        ...t.filter(t => '_delete' in t).map(t => t._delete())
      ])
    }
    isComponentSet () {
      return null != this.component
    }
    isInitialized (t = '[DEFAULT]') {
      return this.instances.has(t)
    }
    getOptions (t = '[DEFAULT]') {
      return this.instancesOptions.get(t) || {}
    }
    initialize (t = {}) {
      const { options: e = {} } = t,
        n = this.normalizeInstanceIdentifier(t.instanceIdentifier)
      if (this.isInitialized(n))
        throw Error(`${this.name}(${n}) has already been initialized`)
      if (!this.isComponentSet())
        throw Error(`Component ${this.name} has not been registered yet`)
      const i = this.getOrInitializeService({
        instanceIdentifier: n,
        options: e
      })
      for (const [t, e] of this.instancesDeferred.entries())
        n === this.normalizeInstanceIdentifier(t) && e.resolve(i)
      return i
    }
    onInit (t, e) {
      var n
      const i = this.normalizeInstanceIdentifier(e),
        s =
          null !== (n = this.onInitCallbacks.get(i)) && void 0 !== n
            ? n
            : new Set()
      s.add(t), this.onInitCallbacks.set(i, s)
      const r = this.instances.get(i)
      return (
        r && t(r, i),
        () => {
          s.delete(t)
        }
      )
    }
    invokeOnInitCallbacks (t, e) {
      const n = this.onInitCallbacks.get(e)
      if (n)
        for (const i of n)
          try {
            i(t, e)
          } catch (t) {}
    }
    getOrInitializeService ({ instanceIdentifier: t, options: e = {} }) {
      let n = this.instances.get(t)
      if (
        !n &&
        this.component &&
        ((n = this.component.instanceFactory(this.container, {
          instanceIdentifier: ((i = t), i === I ? void 0 : i),
          options: e
        })),
        this.instances.set(t, n),
        this.instancesOptions.set(t, e),
        this.invokeOnInitCallbacks(n, t),
        this.component.onInstanceCreated)
      )
        try {
          this.component.onInstanceCreated(this.container, t, n)
        } catch (t) {}
      var i
      return n || null
    }
    normalizeInstanceIdentifier (t = '[DEFAULT]') {
      return this.component ? (this.component.multipleInstances ? t : I) : t
    }
    shouldAutoInitialize () {
      return !!this.component && 'EXPLICIT' !== this.component.instantiationMode
    }
  }
  class E {
    constructor (t) {
      ;(this.name = t), (this.providers = new Map())
    }
    addComponent (t) {
      const e = this.getProvider(t.name)
      if (e.isComponentSet())
        throw new Error(
          `Component ${t.name} has already been registered with ${this.name}`
        )
      e.setComponent(t)
    }
    addOrOverwriteComponent (t) {
      this.getProvider(t.name).isComponentSet() &&
        this.providers.delete(t.name),
        this.addComponent(t)
    }
    getProvider (t) {
      if (this.providers.has(t)) return this.providers.get(t)
      const e = new T(t, this)
      return this.providers.set(t, e), e
    }
    getProviders () {
      return Array.from(this.providers.values())
    }
  }
  const b = []
  var _, S
  ;((S = _ || (_ = {}))[(S.DEBUG = 0)] = 'DEBUG'),
    (S[(S.VERBOSE = 1)] = 'VERBOSE'),
    (S[(S.INFO = 2)] = 'INFO'),
    (S[(S.WARN = 3)] = 'WARN'),
    (S[(S.ERROR = 4)] = 'ERROR'),
    (S[(S.SILENT = 5)] = 'SILENT')
  const k = {
      debug: _.DEBUG,
      verbose: _.VERBOSE,
      info: _.INFO,
      warn: _.WARN,
      error: _.ERROR,
      silent: _.SILENT
    },
    A = _.INFO,
    C = {
      [_.DEBUG]: 'log',
      [_.VERBOSE]: 'log',
      [_.INFO]: 'info',
      [_.WARN]: 'warn',
      [_.ERROR]: 'error'
    },
    N = (t, e, ...n) => {
      if (e < t.logLevel) return
      const i = new Date().toISOString(),
        s = C[e]
      if (!s)
        throw new Error(
          `Attempted to log a message with an invalid logType (value: ${e})`
        )
      console[s](`[${i}]  ${t.name}:`, ...n)
    }
  class R {
    constructor (t) {
      ;(this.name = t),
        (this._logLevel = A),
        (this._logHandler = N),
        (this._userLogHandler = null),
        b.push(this)
    }
    get logLevel () {
      return this._logLevel
    }
    set logLevel (t) {
      if (!(t in _))
        throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``)
      this._logLevel = t
    }
    setLogLevel (t) {
      this._logLevel = 'string' == typeof t ? k[t] : t
    }
    get logHandler () {
      return this._logHandler
    }
    set logHandler (t) {
      if ('function' != typeof t)
        throw new TypeError('Value assigned to `logHandler` must be a function')
      this._logHandler = t
    }
    get userLogHandler () {
      return this._userLogHandler
    }
    set userLogHandler (t) {
      this._userLogHandler = t
    }
    debug (...t) {
      this._userLogHandler && this._userLogHandler(this, _.DEBUG, ...t),
        this._logHandler(this, _.DEBUG, ...t)
    }
    log (...t) {
      this._userLogHandler && this._userLogHandler(this, _.VERBOSE, ...t),
        this._logHandler(this, _.VERBOSE, ...t)
    }
    info (...t) {
      this._userLogHandler && this._userLogHandler(this, _.INFO, ...t),
        this._logHandler(this, _.INFO, ...t)
    }
    warn (...t) {
      this._userLogHandler && this._userLogHandler(this, _.WARN, ...t),
        this._logHandler(this, _.WARN, ...t)
    }
    error (...t) {
      this._userLogHandler && this._userLogHandler(this, _.ERROR, ...t),
        this._logHandler(this, _.ERROR, ...t)
    }
  }
  class D {
    constructor (t) {
      this.container = t
    }
    getPlatformInfoString () {
      return this.container
        .getProviders()
        .map(t => {
          if (
            (function (t) {
              const e = t.getComponent()
              return 'VERSION' === (null == e ? void 0 : e.type)
            })(t)
          ) {
            const e = t.getImmediate()
            return `${e.library}/${e.version}`
          }
          return null
        })
        .filter(t => t)
        .join(' ')
    }
  }
  const O = '@firebase/app',
    L = '0.7.13',
    P = new R('@firebase/app'),
    M = {
      [O]: 'fire-core',
      '@firebase/app-compat': 'fire-core-compat',
      '@firebase/analytics': 'fire-analytics',
      '@firebase/analytics-compat': 'fire-analytics-compat',
      '@firebase/app-check': 'fire-app-check',
      '@firebase/app-check-compat': 'fire-app-check-compat',
      '@firebase/auth': 'fire-auth',
      '@firebase/auth-compat': 'fire-auth-compat',
      '@firebase/database': 'fire-rtdb',
      '@firebase/database-compat': 'fire-rtdb-compat',
      '@firebase/functions': 'fire-fn',
      '@firebase/functions-compat': 'fire-fn-compat',
      '@firebase/installations': 'fire-iid',
      '@firebase/installations-compat': 'fire-iid-compat',
      '@firebase/messaging': 'fire-fcm',
      '@firebase/messaging-compat': 'fire-fcm-compat',
      '@firebase/performance': 'fire-perf',
      '@firebase/performance-compat': 'fire-perf-compat',
      '@firebase/remote-config': 'fire-rc',
      '@firebase/remote-config-compat': 'fire-rc-compat',
      '@firebase/storage': 'fire-gcs',
      '@firebase/storage-compat': 'fire-gcs-compat',
      '@firebase/firestore': 'fire-fst',
      '@firebase/firestore-compat': 'fire-fst-compat',
      'fire-js': 'fire-js',
      firebase: 'fire-js-all'
    },
    U = new Map(),
    x = new Map()
  function V (t, e) {
    try {
      t.container.addComponent(e)
    } catch (n) {
      P.debug(
        `Component ${e.name} failed to register with FirebaseApp ${t.name}`,
        n
      )
    }
  }
  function F (t) {
    const e = t.name
    if (x.has(e))
      return (
        P.debug(`There were multiple attempts to register component ${e}.`), !1
      )
    x.set(e, t)
    for (const e of U.values()) V(e, t)
    return !0
  }
  function q (t, e) {
    return t.container.getProvider(e)
  }
  const j = new h('app', 'Firebase', {
    'no-app':
      "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
    'bad-app-name': "Illegal App name: '{$appName}",
    'duplicate-app':
      "Firebase App named '{$appName}' already exists with different options or config",
    'app-deleted': "Firebase App named '{$appName}' already deleted",
    'invalid-app-argument':
      'firebase.{$appName}() takes either no argument or a Firebase App instance.',
    'invalid-log-argument':
      'First argument to `onLog` must be null or a function.'
  })
  class B {
    constructor (t, e, n) {
      ;(this._isDeleted = !1),
        (this._options = Object.assign({}, t)),
        (this._config = Object.assign({}, e)),
        (this._name = e.name),
        (this._automaticDataCollectionEnabled =
          e.automaticDataCollectionEnabled),
        (this._container = n),
        this.container.addComponent(new w('app', () => this, 'PUBLIC'))
    }
    get automaticDataCollectionEnabled () {
      return this.checkDestroyed(), this._automaticDataCollectionEnabled
    }
    set automaticDataCollectionEnabled (t) {
      this.checkDestroyed(), (this._automaticDataCollectionEnabled = t)
    }
    get name () {
      return this.checkDestroyed(), this._name
    }
    get options () {
      return this.checkDestroyed(), this._options
    }
    get config () {
      return this.checkDestroyed(), this._config
    }
    get container () {
      return this._container
    }
    get isDeleted () {
      return this._isDeleted
    }
    set isDeleted (t) {
      this._isDeleted = t
    }
    checkDestroyed () {
      if (this.isDeleted) throw j.create('app-deleted', { appName: this._name })
    }
  }
  const H = '9.6.3'
  function K (t = '[DEFAULT]') {
    const e = U.get(t)
    if (!e) throw j.create('no-app', { appName: t })
    return e
  }
  function z (t, e, n) {
    var i
    let s = null !== (i = M[t]) && void 0 !== i ? i : t
    n && (s += `-${n}`)
    const r = s.match(/\s|\//),
      o = e.match(/\s|\//)
    if (r || o) {
      const t = [`Unable to register library "${s}" with version "${e}":`]
      return (
        r &&
          t.push(
            `library name "${s}" contains illegal characters (whitespace or "/")`
          ),
        r && o && t.push('and'),
        o &&
          t.push(
            `version name "${e}" contains illegal characters (whitespace or "/")`
          ),
        void P.warn(t.join(' '))
      )
    }
    F(new w(`${s}-version`, () => ({ library: s, version: e }), 'VERSION'))
  }
  F(new w('platform-logger', t => new D(t), 'PRIVATE')),
    z(O, L, ''),
    z(O, L, 'esm2017'),
    z('fire-js', ''),
    z('firebase', '9.6.3', 'app')
  var G,
    W =
      'undefined' != typeof globalThis
        ? globalThis
        : 'undefined' != typeof window
        ? window
        : void 0 !== t.g
        ? t.g
        : 'undefined' != typeof self
        ? self
        : {},
    J = {},
    Q = Q || {},
    X = W || self
  function Y () {}
  function Z (t) {
    var e = typeof t
    return (
      'array' ==
        (e =
          'object' != e ? e : t ? (Array.isArray(t) ? 'array' : e) : 'null') ||
      ('object' == e && 'number' == typeof t.length)
    )
  }
  function tt (t) {
    var e = typeof t
    return ('object' == e && null != t) || 'function' == e
  }
  var et = 'closure_uid_' + ((1e9 * Math.random()) >>> 0),
    nt = 0
  function it (t, e, n) {
    return t.call.apply(t.bind, arguments)
  }
  function st (t, e, n) {
    if (!t) throw Error()
    if (2 < arguments.length) {
      var i = Array.prototype.slice.call(arguments, 2)
      return function () {
        var n = Array.prototype.slice.call(arguments)
        return Array.prototype.unshift.apply(n, i), t.apply(e, n)
      }
    }
    return function () {
      return t.apply(e, arguments)
    }
  }
  function rt (t, e, n) {
    return (rt =
      Function.prototype.bind &&
      -1 != Function.prototype.bind.toString().indexOf('native code')
        ? it
        : st).apply(null, arguments)
  }
  function ot (t, e) {
    var n = Array.prototype.slice.call(arguments, 1)
    return function () {
      var e = n.slice()
      return e.push.apply(e, arguments), t.apply(this, e)
    }
  }
  function at (t, e) {
    function n () {}
    ;(n.prototype = e.prototype),
      (t.Z = e.prototype),
      (t.prototype = new n()),
      (t.prototype.constructor = t),
      (t.Vb = function (t, n, i) {
        for (
          var s = Array(arguments.length - 2), r = 2;
          r < arguments.length;
          r++
        )
          s[r - 2] = arguments[r]
        return e.prototype[n].apply(t, s)
      })
  }
  function ct () {
    ;(this.s = this.s), (this.o = this.o)
  }
  var ht = {}
  ;(ct.prototype.s = !1),
    (ct.prototype.na = function () {
      if (!this.s && ((this.s = !0), this.M(), 0)) {
        var t = (function (t) {
          return (
            (Object.prototype.hasOwnProperty.call(t, et) && t[et]) ||
            (t[et] = ++nt)
          )
        })(this)
        delete ht[t]
      }
    }),
    (ct.prototype.M = function () {
      if (this.o) for (; this.o.length; ) this.o.shift()()
    })
  const ut = Array.prototype.indexOf
      ? function (t, e) {
          return Array.prototype.indexOf.call(t, e, void 0)
        }
      : function (t, e) {
          if ('string' == typeof t)
            return 'string' != typeof e || 1 != e.length ? -1 : t.indexOf(e, 0)
          for (let n = 0; n < t.length; n++) if (n in t && t[n] === e) return n
          return -1
        },
    lt = Array.prototype.forEach
      ? function (t, e, n) {
          Array.prototype.forEach.call(t, e, n)
        }
      : function (t, e, n) {
          const i = t.length,
            s = 'string' == typeof t ? t.split('') : t
          for (let r = 0; r < i; r++) r in s && e.call(n, s[r], r, t)
        }
  function dt (t) {
    return Array.prototype.concat.apply([], arguments)
  }
  function ft (t) {
    const e = t.length
    if (0 < e) {
      const n = Array(e)
      for (let i = 0; i < e; i++) n[i] = t[i]
      return n
    }
    return []
  }
  function pt (t) {
    return /^[\s\xa0]*$/.test(t)
  }
  var mt,
    gt = String.prototype.trim
      ? function (t) {
          return t.trim()
        }
      : function (t) {
          return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]
        }
  function yt (t, e) {
    return -1 != t.indexOf(e)
  }
  function vt (t, e) {
    return t < e ? -1 : t > e ? 1 : 0
  }
  t: {
    var wt = X.navigator
    if (wt) {
      var It = wt.userAgent
      if (It) {
        mt = It
        break t
      }
    }
    mt = ''
  }
  function Tt (t, e, n) {
    for (const i in t) e.call(n, t[i], i, t)
  }
  function Et (t) {
    const e = {}
    for (const n in t) e[n] = t[n]
    return e
  }
  var bt = 'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(
    ' '
  )
  function _t (t, e) {
    let n, i
    for (let e = 1; e < arguments.length; e++) {
      for (n in ((i = arguments[e]), i)) t[n] = i[n]
      for (let e = 0; e < bt.length; e++)
        (n = bt[e]), Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
    }
  }
  function St (t) {
    return St[' '](t), t
  }
  St[' '] = Y
  var kt,
    At,
    Ct = yt(mt, 'Opera'),
    Nt = yt(mt, 'Trident') || yt(mt, 'MSIE'),
    Rt = yt(mt, 'Edge'),
    Dt = Rt || Nt,
    Ot =
      yt(mt, 'Gecko') &&
      !(yt(mt.toLowerCase(), 'webkit') && !yt(mt, 'Edge')) &&
      !(yt(mt, 'Trident') || yt(mt, 'MSIE')) &&
      !yt(mt, 'Edge'),
    Lt = yt(mt.toLowerCase(), 'webkit') && !yt(mt, 'Edge')
  function Pt () {
    var t = X.document
    return t ? t.documentMode : void 0
  }
  t: {
    var Mt = '',
      Ut =
        ((At = mt),
        Ot
          ? /rv:([^\);]+)(\)|;)/.exec(At)
          : Rt
          ? /Edge\/([\d\.]+)/.exec(At)
          : Nt
          ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(At)
          : Lt
          ? /WebKit\/(\S+)/.exec(At)
          : Ct
          ? /(?:Version)[ \/]?(\S+)/.exec(At)
          : void 0)
    if ((Ut && (Mt = Ut ? Ut[1] : ''), Nt)) {
      var xt = Pt()
      if (null != xt && xt > parseFloat(Mt)) {
        kt = String(xt)
        break t
      }
    }
    kt = Mt
  }
  var Vt,
    Ft = {}
  function qt () {
    return (
      (t = Ft),
      Object.prototype.hasOwnProperty.call(t, 9)
        ? t[9]
        : (t[9] = (function () {
            let t = 0
            const e = gt(String(kt)).split('.'),
              n = gt('9').split('.'),
              i = Math.max(e.length, n.length)
            for (let o = 0; 0 == t && o < i; o++) {
              var s = e[o] || '',
                r = n[o] || ''
              do {
                if (
                  ((s = /(\d*)(\D*)(.*)/.exec(s) || ['', '', '', '']),
                  (r = /(\d*)(\D*)(.*)/.exec(r) || ['', '', '', '']),
                  0 == s[0].length && 0 == r[0].length)
                )
                  break
                ;(t =
                  vt(
                    0 == s[1].length ? 0 : parseInt(s[1], 10),
                    0 == r[1].length ? 0 : parseInt(r[1], 10)
                  ) ||
                  vt(0 == s[2].length, 0 == r[2].length) ||
                  vt(s[2], r[2])),
                  (s = s[3]),
                  (r = r[3])
              } while (0 == t)
            }
            return 0 <= t
          })())
    )
    var t
  }
  X.document && Nt ? (Vt = Pt() || parseInt(kt, 10) || void 0) : (Vt = void 0)
  var jt = Vt,
    Bt = (function () {
      if (!X.addEventListener || !Object.defineProperty) return !1
      var t = !1,
        e = Object.defineProperty({}, 'passive', {
          get: function () {
            t = !0
          }
        })
      try {
        X.addEventListener('test', Y, e), X.removeEventListener('test', Y, e)
      } catch (t) {}
      return t
    })()
  function $t (t, e) {
    ;(this.type = t), (this.g = this.target = e), (this.defaultPrevented = !1)
  }
  function Ht (t, e) {
    if (
      ($t.call(this, t ? t.type : ''),
      (this.relatedTarget = this.g = this.target = null),
      (this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0),
      (this.key = ''),
      (this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1),
      (this.state = null),
      (this.pointerId = 0),
      (this.pointerType = ''),
      (this.i = null),
      t)
    ) {
      var n = (this.type = t.type),
        i =
          t.changedTouches && t.changedTouches.length
            ? t.changedTouches[0]
            : null
      if (
        ((this.target = t.target || t.srcElement),
        (this.g = e),
        (e = t.relatedTarget))
      ) {
        if (Ot) {
          t: {
            try {
              St(e.nodeName)
              var s = !0
              break t
            } catch (t) {}
            s = !1
          }
          s || (e = null)
        }
      } else
        'mouseover' == n
          ? (e = t.fromElement)
          : 'mouseout' == n && (e = t.toElement)
      ;(this.relatedTarget = e),
        i
          ? ((this.clientX = void 0 !== i.clientX ? i.clientX : i.pageX),
            (this.clientY = void 0 !== i.clientY ? i.clientY : i.pageY),
            (this.screenX = i.screenX || 0),
            (this.screenY = i.screenY || 0))
          : ((this.clientX = void 0 !== t.clientX ? t.clientX : t.pageX),
            (this.clientY = void 0 !== t.clientY ? t.clientY : t.pageY),
            (this.screenX = t.screenX || 0),
            (this.screenY = t.screenY || 0)),
        (this.button = t.button),
        (this.key = t.key || ''),
        (this.ctrlKey = t.ctrlKey),
        (this.altKey = t.altKey),
        (this.shiftKey = t.shiftKey),
        (this.metaKey = t.metaKey),
        (this.pointerId = t.pointerId || 0),
        (this.pointerType =
          'string' == typeof t.pointerType
            ? t.pointerType
            : Kt[t.pointerType] || ''),
        (this.state = t.state),
        (this.i = t),
        t.defaultPrevented && Ht.Z.h.call(this)
    }
  }
  ;($t.prototype.h = function () {
    this.defaultPrevented = !0
  }),
    at(Ht, $t)
  var Kt = { 2: 'touch', 3: 'pen', 4: 'mouse' }
  Ht.prototype.h = function () {
    Ht.Z.h.call(this)
    var t = this.i
    t.preventDefault ? t.preventDefault() : (t.returnValue = !1)
  }
  var zt = 'closure_listenable_' + ((1e6 * Math.random()) | 0),
    Gt = 0
  function Wt (t, e, n, i, s) {
    ;(this.listener = t),
      (this.proxy = null),
      (this.src = e),
      (this.type = n),
      (this.capture = !!i),
      (this.ia = s),
      (this.key = ++Gt),
      (this.ca = this.fa = !1)
  }
  function Jt (t) {
    ;(t.ca = !0),
      (t.listener = null),
      (t.proxy = null),
      (t.src = null),
      (t.ia = null)
  }
  function Qt (t) {
    ;(this.src = t), (this.g = {}), (this.h = 0)
  }
  function Xt (t, e) {
    var n = e.type
    if (n in t.g) {
      var i,
        s = t.g[n],
        r = ut(s, e)
      ;(i = 0 <= r) && Array.prototype.splice.call(s, r, 1),
        i && (Jt(e), 0 == t.g[n].length && (delete t.g[n], t.h--))
    }
  }
  function Yt (t, e, n, i) {
    for (var s = 0; s < t.length; ++s) {
      var r = t[s]
      if (!r.ca && r.listener == e && r.capture == !!n && r.ia == i) return s
    }
    return -1
  }
  Qt.prototype.add = function (t, e, n, i, s) {
    var r = t.toString()
    ;(t = this.g[r]) || ((t = this.g[r] = []), this.h++)
    var o = Yt(t, e, i, s)
    return (
      -1 < o
        ? ((e = t[o]), n || (e.fa = !1))
        : (((e = new Wt(e, this.src, r, !!i, s)).fa = n), t.push(e)),
      e
    )
  }
  var Zt = 'closure_lm_' + ((1e6 * Math.random()) | 0),
    te = {}
  function ee (t, e, n, i, s) {
    if (i && i.once) return ie(t, e, n, i, s)
    if (Array.isArray(e)) {
      for (var r = 0; r < e.length; r++) ee(t, e[r], n, i, s)
      return null
    }
    return (
      (n = ue(n)),
      t && t[zt]
        ? t.N(e, n, tt(i) ? !!i.capture : !!i, s)
        : ne(t, e, n, !1, i, s)
    )
  }
  function ne (t, e, n, i, s, r) {
    if (!e) throw Error('Invalid event type')
    var o = tt(s) ? !!s.capture : !!s,
      a = ce(t)
    if ((a || (t[Zt] = a = new Qt(t)), (n = a.add(e, n, i, o, r)).proxy))
      return n
    if (
      ((i = (function () {
        var t = ae
        return function e (n) {
          return t.call(e.src, e.listener, n)
        }
      })()),
      (n.proxy = i),
      (i.src = t),
      (i.listener = n),
      t.addEventListener)
    )
      Bt || (s = o),
        void 0 === s && (s = !1),
        t.addEventListener(e.toString(), i, s)
    else if (t.attachEvent) t.attachEvent(oe(e.toString()), i)
    else {
      if (!t.addListener || !t.removeListener)
        throw Error('addEventListener and attachEvent are unavailable.')
      t.addListener(i)
    }
    return n
  }
  function ie (t, e, n, i, s) {
    if (Array.isArray(e)) {
      for (var r = 0; r < e.length; r++) ie(t, e[r], n, i, s)
      return null
    }
    return (
      (n = ue(n)),
      t && t[zt]
        ? t.O(e, n, tt(i) ? !!i.capture : !!i, s)
        : ne(t, e, n, !0, i, s)
    )
  }
  function se (t, e, n, i, s) {
    if (Array.isArray(e))
      for (var r = 0; r < e.length; r++) se(t, e[r], n, i, s)
    else
      (i = tt(i) ? !!i.capture : !!i),
        (n = ue(n)),
        t && t[zt]
          ? ((t = t.i),
            (e = String(e).toString()) in t.g &&
              -1 < (n = Yt((r = t.g[e]), n, i, s)) &&
              (Jt(r[n]),
              Array.prototype.splice.call(r, n, 1),
              0 == r.length && (delete t.g[e], t.h--)))
          : t &&
            (t = ce(t)) &&
            ((e = t.g[e.toString()]),
            (t = -1),
            e && (t = Yt(e, n, i, s)),
            (n = -1 < t ? e[t] : null) && re(n))
  }
  function re (t) {
    if ('number' != typeof t && t && !t.ca) {
      var e = t.src
      if (e && e[zt]) Xt(e.i, t)
      else {
        var n = t.type,
          i = t.proxy
        e.removeEventListener
          ? e.removeEventListener(n, i, t.capture)
          : e.detachEvent
          ? e.detachEvent(oe(n), i)
          : e.addListener && e.removeListener && e.removeListener(i),
          (n = ce(e))
            ? (Xt(n, t), 0 == n.h && ((n.src = null), (e[Zt] = null)))
            : Jt(t)
      }
    }
  }
  function oe (t) {
    return t in te ? te[t] : (te[t] = 'on' + t)
  }
  function ae (t, e) {
    if (t.ca) t = !0
    else {
      e = new Ht(e, this)
      var n = t.listener,
        i = t.ia || t.src
      t.fa && re(t), (t = n.call(i, e))
    }
    return t
  }
  function ce (t) {
    return (t = t[Zt]) instanceof Qt ? t : null
  }
  var he = '__closure_events_fn_' + ((1e9 * Math.random()) >>> 0)
  function ue (t) {
    return 'function' == typeof t
      ? t
      : (t[he] ||
          (t[he] = function (e) {
            return t.handleEvent(e)
          }),
        t[he])
  }
  function le () {
    ct.call(this), (this.i = new Qt(this)), (this.P = this), (this.I = null)
  }
  function de (t, e) {
    var n,
      i = t.I
    if (i) for (n = []; i; i = i.I) n.push(i)
    if (((t = t.P), (i = e.type || e), 'string' == typeof e)) e = new $t(e, t)
    else if (e instanceof $t) e.target = e.target || t
    else {
      var s = e
      _t((e = new $t(i, t)), s)
    }
    if (((s = !0), n))
      for (var r = n.length - 1; 0 <= r; r--) {
        var o = (e.g = n[r])
        s = fe(o, i, !0, e) && s
      }
    if (((s = fe((o = e.g = t), i, !0, e) && s), (s = fe(o, i, !1, e) && s), n))
      for (r = 0; r < n.length; r++) s = fe((o = e.g = n[r]), i, !1, e) && s
  }
  function fe (t, e, n, i) {
    if (!(e = t.i.g[String(e)])) return !0
    e = e.concat()
    for (var s = !0, r = 0; r < e.length; ++r) {
      var o = e[r]
      if (o && !o.ca && o.capture == n) {
        var a = o.listener,
          c = o.ia || o.src
        o.fa && Xt(t.i, o), (s = !1 !== a.call(c, i) && s)
      }
    }
    return s && !i.defaultPrevented
  }
  at(le, ct),
    (le.prototype[zt] = !0),
    (le.prototype.removeEventListener = function (t, e, n, i) {
      se(this, t, e, n, i)
    }),
    (le.prototype.M = function () {
      if ((le.Z.M.call(this), this.i)) {
        var t,
          e = this.i
        for (t in e.g) {
          for (var n = e.g[t], i = 0; i < n.length; i++) Jt(n[i])
          delete e.g[t], e.h--
        }
      }
      this.I = null
    }),
    (le.prototype.N = function (t, e, n, i) {
      return this.i.add(String(t), e, !1, n, i)
    }),
    (le.prototype.O = function (t, e, n, i) {
      return this.i.add(String(t), e, !0, n, i)
    })
  var pe = X.JSON.stringify
  function me () {
    var t = Ee
    let e = null
    return (
      t.g &&
        ((e = t.g), (t.g = t.g.next), t.g || (t.h = null), (e.next = null)),
      e
    )
  }
  var ge,
    ye = new (class {
      constructor (t, e) {
        ;(this.i = t), (this.j = e), (this.h = 0), (this.g = null)
      }
      get () {
        let t
        return (
          0 < this.h
            ? (this.h--, (t = this.g), (this.g = t.next), (t.next = null))
            : (t = this.i()),
          t
        )
      }
    })(
      () => new ve(),
      t => t.reset()
    )
  class ve {
    constructor () {
      this.next = this.g = this.h = null
    }
    set (t, e) {
      ;(this.h = t), (this.g = e), (this.next = null)
    }
    reset () {
      this.next = this.g = this.h = null
    }
  }
  function we (t) {
    X.setTimeout(() => {
      throw t
    }, 0)
  }
  function Ie (t, e) {
    ge ||
      (function () {
        var t = X.Promise.resolve(void 0)
        ge = function () {
          t.then(be)
        }
      })(),
      Te || (ge(), (Te = !0)),
      Ee.add(t, e)
  }
  var Te = !1,
    Ee = new (class {
      constructor () {
        this.h = this.g = null
      }
      add (t, e) {
        const n = ye.get()
        n.set(t, e), this.h ? (this.h.next = n) : (this.g = n), (this.h = n)
      }
    })()
  function be () {
    for (var t; (t = me()); ) {
      try {
        t.h.call(t.g)
      } catch (t) {
        we(t)
      }
      var e = ye
      e.j(t), 100 > e.h && (e.h++, (t.next = e.g), (e.g = t))
    }
    Te = !1
  }
  function _e (t, e) {
    le.call(this),
      (this.h = t || 1),
      (this.g = e || X),
      (this.j = rt(this.kb, this)),
      (this.l = Date.now())
  }
  function Se (t) {
    ;(t.da = !1), t.S && (t.g.clearTimeout(t.S), (t.S = null))
  }
  function ke (t, e, n) {
    if ('function' == typeof t) n && (t = rt(t, n))
    else {
      if (!t || 'function' != typeof t.handleEvent)
        throw Error('Invalid listener argument')
      t = rt(t.handleEvent, t)
    }
    return 2147483647 < Number(e) ? -1 : X.setTimeout(t, e || 0)
  }
  function Ae (t) {
    t.g = ke(() => {
      ;(t.g = null), t.i && ((t.i = !1), Ae(t))
    }, t.j)
    const e = t.h
    ;(t.h = null), t.m.apply(null, e)
  }
  at(_e, le),
    ((G = _e.prototype).da = !1),
    (G.S = null),
    (G.kb = function () {
      if (this.da) {
        var t = Date.now() - this.l
        0 < t && t < 0.8 * this.h
          ? (this.S = this.g.setTimeout(this.j, this.h - t))
          : (this.S && (this.g.clearTimeout(this.S), (this.S = null)),
            de(this, 'tick'),
            this.da && (Se(this), this.start()))
      }
    }),
    (G.start = function () {
      ;(this.da = !0),
        this.S ||
          ((this.S = this.g.setTimeout(this.j, this.h)), (this.l = Date.now()))
    }),
    (G.M = function () {
      _e.Z.M.call(this), Se(this), delete this.g
    })
  class Ce extends ct {
    constructor (t, e) {
      super(),
        (this.m = t),
        (this.j = e),
        (this.h = null),
        (this.i = !1),
        (this.g = null)
    }
    l (t) {
      ;(this.h = arguments), this.g ? (this.i = !0) : Ae(this)
    }
    M () {
      super.M(),
        this.g &&
          (X.clearTimeout(this.g),
          (this.g = null),
          (this.i = !1),
          (this.h = null))
    }
  }
  function Ne (t) {
    ct.call(this), (this.h = t), (this.g = {})
  }
  at(Ne, ct)
  var Re = []
  function De (t, e, n, i) {
    Array.isArray(n) || (n && (Re[0] = n.toString()), (n = Re))
    for (var s = 0; s < n.length; s++) {
      var r = ee(e, n[s], i || t.handleEvent, !1, t.h || t)
      if (!r) break
      t.g[r.key] = r
    }
  }
  function Oe (t) {
    Tt(
      t.g,
      function (t, e) {
        this.g.hasOwnProperty(e) && re(t)
      },
      t
    ),
      (t.g = {})
  }
  function Le () {
    this.g = !0
  }
  function Pe (t, e, n, i) {
    t.info(function () {
      return (
        'XMLHTTP TEXT (' +
        e +
        '): ' +
        (function (t, e) {
          if (!t.g) return e
          if (!e) return null
          try {
            var n = JSON.parse(e)
            if (n)
              for (t = 0; t < n.length; t++)
                if (Array.isArray(n[t])) {
                  var i = n[t]
                  if (!(2 > i.length)) {
                    var s = i[1]
                    if (Array.isArray(s) && !(1 > s.length)) {
                      var r = s[0]
                      if ('noop' != r && 'stop' != r && 'close' != r)
                        for (var o = 1; o < s.length; o++) s[o] = ''
                    }
                  }
                }
            return pe(n)
          } catch (t) {
            return e
          }
        })(t, n) +
        (i ? ' ' + i : '')
      )
    })
  }
  ;(Ne.prototype.M = function () {
    Ne.Z.M.call(this), Oe(this)
  }),
    (Ne.prototype.handleEvent = function () {
      throw Error('EventHandler.handleEvent not implemented')
    }),
    (Le.prototype.Aa = function () {
      this.g = !1
    }),
    (Le.prototype.info = function () {})
  var Me = {},
    Ue = null
  function xe () {
    return (Ue = Ue || new le())
  }
  function Ve (t) {
    $t.call(this, Me.Ma, t)
  }
  function Fe (t) {
    const e = xe()
    de(e, new Ve(e, t))
  }
  function qe (t, e) {
    $t.call(this, Me.STAT_EVENT, t), (this.stat = e)
  }
  function je (t) {
    const e = xe()
    de(e, new qe(e, t))
  }
  function Be (t, e) {
    $t.call(this, Me.Na, t), (this.size = e)
  }
  function $e (t, e) {
    if ('function' != typeof t)
      throw Error('Fn must not be null and must be a function')
    return X.setTimeout(function () {
      t()
    }, e)
  }
  ;(Me.Ma = 'serverreachability'),
    at(Ve, $t),
    (Me.STAT_EVENT = 'statevent'),
    at(qe, $t),
    (Me.Na = 'timingevent'),
    at(Be, $t)
  var He = {
      NO_ERROR: 0,
      lb: 1,
      yb: 2,
      xb: 3,
      sb: 4,
      wb: 5,
      zb: 6,
      Ja: 7,
      TIMEOUT: 8,
      Cb: 9
    },
    Ke = {
      qb: 'complete',
      Mb: 'success',
      Ka: 'error',
      Ja: 'abort',
      Eb: 'ready',
      Fb: 'readystatechange',
      TIMEOUT: 'timeout',
      Ab: 'incrementaldata',
      Db: 'progress',
      tb: 'downloadprogress',
      Ub: 'uploadprogress'
    }
  function ze () {}
  function Ge (t) {
    return t.h || (t.h = t.i())
  }
  function We () {}
  ze.prototype.h = null
  var Je,
    Qe = { OPEN: 'a', pb: 'b', Ka: 'c', Bb: 'd' }
  function Xe () {
    $t.call(this, 'd')
  }
  function Ye () {
    $t.call(this, 'c')
  }
  function Ze () {}
  function tn (t, e, n, i) {
    ;(this.l = t),
      (this.j = e),
      (this.m = n),
      (this.X = i || 1),
      (this.V = new Ne(this)),
      (this.P = nn),
      (t = Dt ? 125 : void 0),
      (this.W = new _e(t)),
      (this.H = null),
      (this.i = !1),
      (this.s = this.A = this.v = this.K = this.F = this.Y = this.B = null),
      (this.D = []),
      (this.g = null),
      (this.C = 0),
      (this.o = this.u = null),
      (this.N = -1),
      (this.I = !1),
      (this.O = 0),
      (this.L = null),
      (this.aa = this.J = this.$ = this.U = !1),
      (this.h = new en())
  }
  function en () {
    ;(this.i = null), (this.g = ''), (this.h = !1)
  }
  at(Xe, $t),
    at(Ye, $t),
    at(Ze, ze),
    (Ze.prototype.g = function () {
      return new XMLHttpRequest()
    }),
    (Ze.prototype.i = function () {
      return {}
    }),
    (Je = new Ze())
  var nn = 45e3,
    sn = {},
    rn = {}
  function on (t, e, n) {
    ;(t.K = 1), (t.v = Nn(bn(e))), (t.s = n), (t.U = !0), an(t, null)
  }
  function an (t, e) {
    ;(t.F = Date.now()), ln(t), (t.A = bn(t.v))
    var n = t.A,
      i = t.X
    Array.isArray(i) || (i = [String(i)]),
      Bn(n.h, 't', i),
      (t.C = 0),
      (n = t.l.H),
      (t.h = new en()),
      (t.g = Bi(t.l, n ? e : null, !t.s)),
      0 < t.O && (t.L = new Ce(rt(t.Ia, t, t.g), t.O)),
      De(t.V, t.g, 'readystatechange', t.gb),
      (e = t.H ? Et(t.H) : {}),
      t.s
        ? (t.u || (t.u = 'POST'),
          (e['Content-Type'] = 'application/x-www-form-urlencoded'),
          t.g.ea(t.A, t.u, t.s, e))
        : ((t.u = 'GET'), t.g.ea(t.A, t.u, null, e)),
      Fe(1),
      (function (t, e, n, i, s, r) {
        t.info(function () {
          if (t.g)
            if (r)
              for (var o = '', a = r.split('&'), c = 0; c < a.length; c++) {
                var h = a[c].split('=')
                if (1 < h.length) {
                  var u = h[0]
                  h = h[1]
                  var l = u.split('_')
                  o =
                    2 <= l.length && 'type' == l[1]
                      ? o + (u + '=') + h + '&'
                      : o + (u + '=redacted&')
                }
              }
            else o = null
          else o = r
          return (
            'XMLHTTP REQ (' +
            i +
            ') [attempt ' +
            s +
            ']: ' +
            e +
            '\n' +
            n +
            '\n' +
            o
          )
        })
      })(t.j, t.u, t.A, t.m, t.X, t.s)
  }
  function cn (t) {
    return !!t.g && 'GET' == t.u && 2 != t.K && t.l.Ba
  }
  function hn (t, e, n) {
    let i,
      s = !0
    for (; !t.I && t.C < n.length; ) {
      if (((i = un(t, n)), i == rn)) {
        4 == e && ((t.o = 4), je(14), (s = !1)),
          Pe(t.j, t.m, null, '[Incomplete Response]')
        break
      }
      if (i == sn) {
        ;(t.o = 4), je(15), Pe(t.j, t.m, n, '[Invalid Chunk]'), (s = !1)
        break
      }
      Pe(t.j, t.m, i, null), gn(t, i)
    }
    cn(t) && i != rn && i != sn && ((t.h.g = ''), (t.C = 0)),
      4 != e || 0 != n.length || t.h.h || ((t.o = 1), je(16), (s = !1)),
      (t.i = t.i && s),
      s
        ? 0 < n.length &&
          !t.aa &&
          ((t.aa = !0),
          (e = t.l).g == t &&
            e.$ &&
            !e.L &&
            (e.h.info(
              'Great, no buffering proxy detected. Bytes received: ' + n.length
            ),
            Pi(e),
            (e.L = !0),
            je(11)))
        : (Pe(t.j, t.m, n, '[Invalid Chunked Response]'), mn(t), pn(t))
  }
  function un (t, e) {
    var n = t.C,
      i = e.indexOf('\n', n)
    return -1 == i
      ? rn
      : ((n = Number(e.substring(n, i))),
        isNaN(n)
          ? sn
          : (i += 1) + n > e.length
          ? rn
          : ((e = e.substr(i, n)), (t.C = i + n), e))
  }
  function ln (t) {
    ;(t.Y = Date.now() + t.P), dn(t, t.P)
  }
  function dn (t, e) {
    if (null != t.B) throw Error('WatchDog timer not null')
    t.B = $e(rt(t.eb, t), e)
  }
  function fn (t) {
    t.B && (X.clearTimeout(t.B), (t.B = null))
  }
  function pn (t) {
    0 == t.l.G || t.I || xi(t.l, t)
  }
  function mn (t) {
    fn(t)
    var e = t.L
    e && 'function' == typeof e.na && e.na(),
      (t.L = null),
      Se(t.W),
      Oe(t.V),
      t.g && ((e = t.g), (t.g = null), e.abort(), e.na())
  }
  function gn (t, e) {
    try {
      var n = t.l
      if (0 != n.G && (n.g == t || Wn(n.i, t)))
        if (((n.I = t.N), !t.J && Wn(n.i, t) && 3 == n.G)) {
          try {
            var i = n.Ca.g.parse(e)
          } catch (t) {
            i = null
          }
          if (Array.isArray(i) && 3 == i.length) {
            var s = i
            if (0 == s[0]) {
              t: if (!n.u) {
                if (n.g) {
                  if (!(n.g.F + 3e3 < t.F)) break t
                  Ui(n), Si(n)
                }
                Li(n), je(18)
              }
            } else
              (n.ta = s[1]),
                0 < n.ta - n.U &&
                  37500 > s[2] &&
                  n.N &&
                  0 == n.A &&
                  !n.v &&
                  (n.v = $e(rt(n.ab, n), 6e3))
            if (1 >= Gn(n.i) && n.ka) {
              try {
                n.ka()
              } catch (t) {}
              n.ka = void 0
            }
          } else Fi(n, 11)
        } else if (((t.J || n.g == t) && Ui(n), !pt(e)))
          for (s = n.Ca.g.parse(e), e = 0; e < s.length; e++) {
            let h = s[e]
            if (((n.U = h[0]), (h = h[1]), 2 == n.G))
              if ('c' == h[0]) {
                ;(n.J = h[1]), (n.la = h[2])
                const e = h[3]
                null != e && ((n.ma = e), n.h.info('VER=' + n.ma))
                const s = h[4]
                null != s && ((n.za = s), n.h.info('SVER=' + n.za))
                const u = h[5]
                null != u &&
                  'number' == typeof u &&
                  0 < u &&
                  ((i = 1.5 * u),
                  (n.K = i),
                  n.h.info('backChannelRequestTimeoutMs_=' + i)),
                  (i = n)
                const l = t.g
                if (l) {
                  const t = l.g
                    ? l.g.getResponseHeader('X-Client-Wire-Protocol')
                    : null
                  if (t) {
                    var r = i.i
                    !r.g &&
                      (yt(t, 'spdy') || yt(t, 'quic') || yt(t, 'h2')) &&
                      ((r.j = r.l),
                      (r.g = new Set()),
                      r.h && (Jn(r, r.h), (r.h = null)))
                  }
                  if (i.D) {
                    const t = l.g
                      ? l.g.getResponseHeader('X-HTTP-Session-Id')
                      : null
                    t && ((i.sa = t), Cn(i.F, i.D, t))
                  }
                }
                ;(n.G = 3),
                  n.j && n.j.xa(),
                  n.$ &&
                    ((n.O = Date.now() - t.F),
                    n.h.info('Handshake RTT: ' + n.O + 'ms'))
                var o = t
                if ((((i = n).oa = ji(i, i.H ? i.la : null, i.W)), o.J)) {
                  Qn(i.i, o)
                  var a = o,
                    c = i.K
                  c && a.setTimeout(c), a.B && (fn(a), ln(a)), (i.g = o)
                } else Oi(i)
                0 < n.l.length && Ci(n)
              } else ('stop' != h[0] && 'close' != h[0]) || Fi(n, 7)
            else
              3 == n.G &&
                ('stop' == h[0] || 'close' == h[0]
                  ? 'stop' == h[0]
                    ? Fi(n, 7)
                    : _i(n)
                  : 'noop' != h[0] && n.j && n.j.wa(h),
                (n.A = 0))
          }
      Fe(4)
    } catch (t) {}
  }
  function yn (t, e) {
    if (t.forEach && 'function' == typeof t.forEach) t.forEach(e, void 0)
    else if (Z(t) || 'string' == typeof t) lt(t, e, void 0)
    else {
      if (t.T && 'function' == typeof t.T) var n = t.T()
      else if (t.R && 'function' == typeof t.R) n = void 0
      else if (Z(t) || 'string' == typeof t) {
        n = []
        for (var i = t.length, s = 0; s < i; s++) n.push(s)
      } else for (s in ((n = []), (i = 0), t)) n[i++] = s
      ;(i = (function (t) {
        if (t.R && 'function' == typeof t.R) return t.R()
        if ('string' == typeof t) return t.split('')
        if (Z(t)) {
          for (var e = [], n = t.length, i = 0; i < n; i++) e.push(t[i])
          return e
        }
        for (i in ((e = []), (n = 0), t)) e[n++] = t[i]
        return e
      })(t)),
        (s = i.length)
      for (var r = 0; r < s; r++) e.call(void 0, i[r], n && n[r], t)
    }
  }
  function vn (t, e) {
    ;(this.h = {}), (this.g = []), (this.i = 0)
    var n = arguments.length
    if (1 < n) {
      if (n % 2) throw Error('Uneven number of arguments')
      for (var i = 0; i < n; i += 2) this.set(arguments[i], arguments[i + 1])
    } else if (t)
      if (t instanceof vn)
        for (n = t.T(), i = 0; i < n.length; i++) this.set(n[i], t.get(n[i]))
      else for (i in t) this.set(i, t[i])
  }
  function wn (t) {
    if (t.i != t.g.length) {
      for (var e = 0, n = 0; e < t.g.length; ) {
        var i = t.g[e]
        In(t.h, i) && (t.g[n++] = i), e++
      }
      t.g.length = n
    }
    if (t.i != t.g.length) {
      var s = {}
      for (n = e = 0; e < t.g.length; )
        In(s, (i = t.g[e])) || ((t.g[n++] = i), (s[i] = 1)), e++
      t.g.length = n
    }
  }
  function In (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
  }
  ;((G = tn.prototype).setTimeout = function (t) {
    this.P = t
  }),
    (G.gb = function (t) {
      t = t.target
      const e = this.L
      e && 3 == wi(t) ? e.l() : this.Ia(t)
    }),
    (G.Ia = function (t) {
      try {
        if (t == this.g)
          t: {
            const u = wi(this.g)
            var e = this.g.Da()
            const l = this.g.ba()
            if (
              !(3 > u) &&
              (3 != u ||
                Dt ||
                (this.g && (this.h.h || this.g.ga() || Ii(this.g))))
            ) {
              this.I || 4 != u || 7 == e || Fe(8 == e || 0 >= l ? 3 : 2),
                fn(this)
              var n = this.g.ba()
              this.N = n
              e: if (cn(this)) {
                var i = Ii(this.g)
                t = ''
                var s = i.length,
                  r = 4 == wi(this.g)
                if (!this.h.i) {
                  if ('undefined' == typeof TextDecoder) {
                    mn(this), pn(this)
                    var o = ''
                    break e
                  }
                  this.h.i = new X.TextDecoder()
                }
                for (e = 0; e < s; e++)
                  (this.h.h = !0),
                    (t += this.h.i.decode(i[e], { stream: r && e == s - 1 }))
                i.splice(0, s), (this.h.g += t), (this.C = 0), (o = this.h.g)
              } else o = this.g.ga()
              if (
                ((this.i = 200 == n),
                (function (t, e, n, i, s, r, o) {
                  t.info(function () {
                    return (
                      'XMLHTTP RESP (' +
                      i +
                      ') [ attempt ' +
                      s +
                      ']: ' +
                      e +
                      '\n' +
                      n +
                      '\n' +
                      r +
                      ' ' +
                      o
                    )
                  })
                })(this.j, this.u, this.A, this.m, this.X, u, n),
                this.i)
              ) {
                if (this.$ && !this.J) {
                  e: {
                    if (this.g) {
                      var a,
                        c = this.g
                      if (
                        (a = c.g
                          ? c.g.getResponseHeader('X-HTTP-Initial-Response')
                          : null) &&
                        !pt(a)
                      ) {
                        var h = a
                        break e
                      }
                    }
                    h = null
                  }
                  if (!(n = h)) {
                    ;(this.i = !1), (this.o = 3), je(12), mn(this), pn(this)
                    break t
                  }
                  Pe(
                    this.j,
                    this.m,
                    n,
                    'Initial handshake response via X-HTTP-Initial-Response'
                  ),
                    (this.J = !0),
                    gn(this, n)
                }
                this.U
                  ? (hn(this, u, o),
                    Dt &&
                      this.i &&
                      3 == u &&
                      (De(this.V, this.W, 'tick', this.fb), this.W.start()))
                  : (Pe(this.j, this.m, o, null), gn(this, o)),
                  4 == u && mn(this),
                  this.i &&
                    !this.I &&
                    (4 == u ? xi(this.l, this) : ((this.i = !1), ln(this)))
              } else
                400 == n && 0 < o.indexOf('Unknown SID')
                  ? ((this.o = 3), je(12))
                  : ((this.o = 0), je(13)),
                  mn(this),
                  pn(this)
            }
          }
      } catch (t) {}
    }),
    (G.fb = function () {
      if (this.g) {
        var t = wi(this.g),
          e = this.g.ga()
        this.C < e.length &&
          (fn(this), hn(this, t, e), this.i && 4 != t && ln(this))
      }
    }),
    (G.cancel = function () {
      ;(this.I = !0), mn(this)
    }),
    (G.eb = function () {
      this.B = null
      const t = Date.now()
      0 <= t - this.Y
        ? ((function (t, e) {
            t.info(function () {
              return 'TIMEOUT: ' + e
            })
          })(this.j, this.A),
          2 != this.K && (Fe(3), je(17)),
          mn(this),
          (this.o = 2),
          pn(this))
        : dn(this, this.Y - t)
    }),
    ((G = vn.prototype).R = function () {
      wn(this)
      for (var t = [], e = 0; e < this.g.length; e++) t.push(this.h[this.g[e]])
      return t
    }),
    (G.T = function () {
      return wn(this), this.g.concat()
    }),
    (G.get = function (t, e) {
      return In(this.h, t) ? this.h[t] : e
    }),
    (G.set = function (t, e) {
      In(this.h, t) || (this.i++, this.g.push(t)), (this.h[t] = e)
    }),
    (G.forEach = function (t, e) {
      for (var n = this.T(), i = 0; i < n.length; i++) {
        var s = n[i],
          r = this.get(s)
        t.call(e, r, s, this)
      }
    })
  var Tn = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/
  function En (t, e) {
    if (
      ((this.i = this.s = this.j = ''),
      (this.m = null),
      (this.o = this.l = ''),
      (this.g = !1),
      t instanceof En)
    ) {
      ;(this.g = void 0 !== e ? e : t.g),
        _n(this, t.j),
        (this.s = t.s),
        Sn(this, t.i),
        kn(this, t.m),
        (this.l = t.l),
        (e = t.h)
      var n = new Vn()
      ;(n.i = e.i),
        e.g && ((n.g = new vn(e.g)), (n.h = e.h)),
        An(this, n),
        (this.o = t.o)
    } else
      t && (n = String(t).match(Tn))
        ? ((this.g = !!e),
          _n(this, n[1] || '', !0),
          (this.s = Rn(n[2] || '')),
          Sn(this, n[3] || '', !0),
          kn(this, n[4]),
          (this.l = Rn(n[5] || '', !0)),
          An(this, n[6] || '', !0),
          (this.o = Rn(n[7] || '')))
        : ((this.g = !!e), (this.h = new Vn(null, this.g)))
  }
  function bn (t) {
    return new En(t)
  }
  function _n (t, e, n) {
    ;(t.j = n ? Rn(e, !0) : e), t.j && (t.j = t.j.replace(/:$/, ''))
  }
  function Sn (t, e, n) {
    t.i = n ? Rn(e, !0) : e
  }
  function kn (t, e) {
    if (e) {
      if (((e = Number(e)), isNaN(e) || 0 > e))
        throw Error('Bad port number ' + e)
      t.m = e
    } else t.m = null
  }
  function An (t, e, n) {
    e instanceof Vn
      ? ((t.h = e),
        (function (t, e) {
          e &&
            !t.j &&
            (Fn(t),
            (t.i = null),
            t.g.forEach(function (t, e) {
              var n = e.toLowerCase()
              e != n && (qn(this, e), Bn(this, n, t))
            }, t)),
            (t.j = e)
        })(t.h, t.g))
      : (n || (e = Dn(e, Un)), (t.h = new Vn(e, t.g)))
  }
  function Cn (t, e, n) {
    t.h.set(e, n)
  }
  function Nn (t) {
    return (
      Cn(
        t,
        'zx',
        Math.floor(2147483648 * Math.random()).toString(36) +
          Math.abs(
            Math.floor(2147483648 * Math.random()) ^ Date.now()
          ).toString(36)
      ),
      t
    )
  }
  function Rn (t, e) {
    return t
      ? e
        ? decodeURI(t.replace(/%25/g, '%2525'))
        : decodeURIComponent(t)
      : ''
  }
  function Dn (t, e, n) {
    return 'string' == typeof t
      ? ((t = encodeURI(t).replace(e, On)),
        n && (t = t.replace(/%25([0-9a-fA-F]{2})/g, '%$1')),
        t)
      : null
  }
  function On (t) {
    return (
      '%' +
      (((t = t.charCodeAt(0)) >> 4) & 15).toString(16) +
      (15 & t).toString(16)
    )
  }
  En.prototype.toString = function () {
    var t = [],
      e = this.j
    e && t.push(Dn(e, Ln, !0), ':')
    var n = this.i
    return (
      (n || 'file' == e) &&
        (t.push('//'),
        (e = this.s) && t.push(Dn(e, Ln, !0), '@'),
        t.push(
          encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g, '%$1')
        ),
        null != (n = this.m) && t.push(':', String(n))),
      (n = this.l) &&
        (this.i && '/' != n.charAt(0) && t.push('/'),
        t.push(Dn(n, '/' == n.charAt(0) ? Mn : Pn, !0))),
      (n = this.h.toString()) && t.push('?', n),
      (n = this.o) && t.push('#', Dn(n, xn)),
      t.join('')
    )
  }
  var Ln = /[#\/\?@]/g,
    Pn = /[#\?:]/g,
    Mn = /[#\?]/g,
    Un = /[#\?@]/g,
    xn = /#/g
  function Vn (t, e) {
    ;(this.h = this.g = null), (this.i = t || null), (this.j = !!e)
  }
  function Fn (t) {
    t.g ||
      ((t.g = new vn()),
      (t.h = 0),
      t.i &&
        (function (t, e) {
          if (t) {
            t = t.split('&')
            for (var n = 0; n < t.length; n++) {
              var i = t[n].indexOf('='),
                s = null
              if (0 <= i) {
                var r = t[n].substring(0, i)
                s = t[n].substring(i + 1)
              } else r = t[n]
              e(r, s ? decodeURIComponent(s.replace(/\+/g, ' ')) : '')
            }
          }
        })(t.i, function (e, n) {
          t.add(decodeURIComponent(e.replace(/\+/g, ' ')), n)
        }))
  }
  function qn (t, e) {
    Fn(t),
      (e = $n(t, e)),
      In(t.g.h, e) &&
        ((t.i = null),
        (t.h -= t.g.get(e).length),
        In((t = t.g).h, e) &&
          (delete t.h[e], t.i--, t.g.length > 2 * t.i && wn(t)))
  }
  function jn (t, e) {
    return Fn(t), (e = $n(t, e)), In(t.g.h, e)
  }
  function Bn (t, e, n) {
    qn(t, e),
      0 < n.length &&
        ((t.i = null), t.g.set($n(t, e), ft(n)), (t.h += n.length))
  }
  function $n (t, e) {
    return (e = String(e)), t.j && (e = e.toLowerCase()), e
  }
  function Hn (t) {
    ;(this.l = t || Kn),
      (t = X.PerformanceNavigationTiming
        ? 0 < (t = X.performance.getEntriesByType('navigation')).length &&
          ('hq' == t[0].nextHopProtocol || 'h2' == t[0].nextHopProtocol)
        : !!(X.g && X.g.Ea && X.g.Ea() && X.g.Ea().Zb)),
      (this.j = t ? this.l : 1),
      (this.g = null),
      1 < this.j && (this.g = new Set()),
      (this.h = null),
      (this.i = [])
  }
  ;((G = Vn.prototype).add = function (t, e) {
    Fn(this), (this.i = null), (t = $n(this, t))
    var n = this.g.get(t)
    return n || this.g.set(t, (n = [])), n.push(e), (this.h += 1), this
  }),
    (G.forEach = function (t, e) {
      Fn(this),
        this.g.forEach(function (n, i) {
          lt(
            n,
            function (n) {
              t.call(e, n, i, this)
            },
            this
          )
        }, this)
    }),
    (G.T = function () {
      Fn(this)
      for (var t = this.g.R(), e = this.g.T(), n = [], i = 0; i < e.length; i++)
        for (var s = t[i], r = 0; r < s.length; r++) n.push(e[i])
      return n
    }),
    (G.R = function (t) {
      Fn(this)
      var e = []
      if ('string' == typeof t)
        jn(this, t) && (e = dt(e, this.g.get($n(this, t))))
      else {
        t = this.g.R()
        for (var n = 0; n < t.length; n++) e = dt(e, t[n])
      }
      return e
    }),
    (G.set = function (t, e) {
      return (
        Fn(this),
        (this.i = null),
        jn(this, (t = $n(this, t))) && (this.h -= this.g.get(t).length),
        this.g.set(t, [e]),
        (this.h += 1),
        this
      )
    }),
    (G.get = function (t, e) {
      return t && 0 < (t = this.R(t)).length ? String(t[0]) : e
    }),
    (G.toString = function () {
      if (this.i) return this.i
      if (!this.g) return ''
      for (var t = [], e = this.g.T(), n = 0; n < e.length; n++) {
        var i = e[n],
          s = encodeURIComponent(String(i))
        i = this.R(i)
        for (var r = 0; r < i.length; r++) {
          var o = s
          '' !== i[r] && (o += '=' + encodeURIComponent(String(i[r]))),
            t.push(o)
        }
      }
      return (this.i = t.join('&'))
    })
  var Kn = 10
  function zn (t) {
    return !!t.h || (!!t.g && t.g.size >= t.j)
  }
  function Gn (t) {
    return t.h ? 1 : t.g ? t.g.size : 0
  }
  function Wn (t, e) {
    return t.h ? t.h == e : !!t.g && t.g.has(e)
  }
  function Jn (t, e) {
    t.g ? t.g.add(e) : (t.h = e)
  }
  function Qn (t, e) {
    t.h && t.h == e ? (t.h = null) : t.g && t.g.has(e) && t.g.delete(e)
  }
  function Xn (t) {
    if (null != t.h) return t.i.concat(t.h.D)
    if (null != t.g && 0 !== t.g.size) {
      let e = t.i
      for (const n of t.g.values()) e = e.concat(n.D)
      return e
    }
    return ft(t.i)
  }
  function Yn () {}
  function Zn () {
    this.g = new Yn()
  }
  function ti (t, e, n) {
    const i = n || ''
    try {
      yn(t, function (t, n) {
        let s = t
        tt(t) && (s = pe(t)), e.push(i + n + '=' + encodeURIComponent(s))
      })
    } catch (t) {
      throw (e.push(i + 'type=' + encodeURIComponent('_badmap')), t)
    }
  }
  function ei (t, e, n, i, s) {
    try {
      ;(e.onload = null),
        (e.onerror = null),
        (e.onabort = null),
        (e.ontimeout = null),
        s(i)
    } catch (t) {}
  }
  function ni (t) {
    ;(this.l = t.$b || null), (this.j = t.ib || !1)
  }
  function ii (t, e) {
    le.call(this),
      (this.D = t),
      (this.u = e),
      (this.m = void 0),
      (this.readyState = si),
      (this.status = 0),
      (this.responseType = this.responseText = this.response = this.statusText =
        ''),
      (this.onreadystatechange = null),
      (this.v = new Headers()),
      (this.h = null),
      (this.C = 'GET'),
      (this.B = ''),
      (this.g = !1),
      (this.A = this.j = this.l = null)
  }
  ;(Hn.prototype.cancel = function () {
    if (((this.i = Xn(this)), this.h)) this.h.cancel(), (this.h = null)
    else if (this.g && 0 !== this.g.size) {
      for (const t of this.g.values()) t.cancel()
      this.g.clear()
    }
  }),
    (Yn.prototype.stringify = function (t) {
      return X.JSON.stringify(t, void 0)
    }),
    (Yn.prototype.parse = function (t) {
      return X.JSON.parse(t, void 0)
    }),
    at(ni, ze),
    (ni.prototype.g = function () {
      return new ii(this.l, this.j)
    }),
    (ni.prototype.i = (function (t) {
      return function () {
        return t
      }
    })({})),
    at(ii, le)
  var si = 0
  function ri (t) {
    t.j
      .read()
      .then(t.Sa.bind(t))
      .catch(t.ha.bind(t))
  }
  function oi (t) {
    ;(t.readyState = 4), (t.l = null), (t.j = null), (t.A = null), ai(t)
  }
  function ai (t) {
    t.onreadystatechange && t.onreadystatechange.call(t)
  }
  ;((G = ii.prototype).open = function (t, e) {
    if (this.readyState != si)
      throw (this.abort(), Error('Error reopening a connection'))
    ;(this.C = t), (this.B = e), (this.readyState = 1), ai(this)
  }),
    (G.send = function (t) {
      if (1 != this.readyState)
        throw (this.abort(), Error('need to call open() first. '))
      this.g = !0
      const e = {
        headers: this.v,
        method: this.C,
        credentials: this.m,
        cache: void 0
      }
      t && (e.body = t),
        (this.D || X)
          .fetch(new Request(this.B, e))
          .then(this.Va.bind(this), this.ha.bind(this))
    }),
    (G.abort = function () {
      ;(this.response = this.responseText = ''),
        (this.v = new Headers()),
        (this.status = 0),
        this.j && this.j.cancel('Request was aborted.'),
        1 <= this.readyState &&
          this.g &&
          4 != this.readyState &&
          ((this.g = !1), oi(this)),
        (this.readyState = si)
    }),
    (G.Va = function (t) {
      if (
        this.g &&
        ((this.l = t),
        this.h ||
          ((this.status = this.l.status),
          (this.statusText = this.l.statusText),
          (this.h = t.headers),
          (this.readyState = 2),
          ai(this)),
        this.g && ((this.readyState = 3), ai(this), this.g))
      )
        if ('arraybuffer' === this.responseType)
          t.arrayBuffer().then(this.Ta.bind(this), this.ha.bind(this))
        else if (void 0 !== X.ReadableStream && 'body' in t) {
          if (((this.j = t.body.getReader()), this.u)) {
            if (this.responseType)
              throw Error(
                'responseType must be empty for "streamBinaryChunks" mode responses.'
              )
            this.response = []
          } else
            (this.response = this.responseText = ''),
              (this.A = new TextDecoder())
          ri(this)
        } else t.text().then(this.Ua.bind(this), this.ha.bind(this))
    }),
    (G.Sa = function (t) {
      if (this.g) {
        if (this.u && t.value) this.response.push(t.value)
        else if (!this.u) {
          var e = t.value ? t.value : new Uint8Array(0)
          ;(e = this.A.decode(e, { stream: !t.done })) &&
            (this.response = this.responseText += e)
        }
        t.done ? oi(this) : ai(this), 3 == this.readyState && ri(this)
      }
    }),
    (G.Ua = function (t) {
      this.g && ((this.response = this.responseText = t), oi(this))
    }),
    (G.Ta = function (t) {
      this.g && ((this.response = t), oi(this))
    }),
    (G.ha = function () {
      this.g && oi(this)
    }),
    (G.setRequestHeader = function (t, e) {
      this.v.append(t, e)
    }),
    (G.getResponseHeader = function (t) {
      return (this.h && this.h.get(t.toLowerCase())) || ''
    }),
    (G.getAllResponseHeaders = function () {
      if (!this.h) return ''
      const t = [],
        e = this.h.entries()
      for (var n = e.next(); !n.done; )
        (n = n.value), t.push(n[0] + ': ' + n[1]), (n = e.next())
      return t.join('\r\n')
    }),
    Object.defineProperty(ii.prototype, 'withCredentials', {
      get: function () {
        return 'include' === this.m
      },
      set: function (t) {
        this.m = t ? 'include' : 'same-origin'
      }
    })
  var ci = X.JSON.parse
  function hi (t) {
    le.call(this),
      (this.headers = new vn()),
      (this.u = t || null),
      (this.h = !1),
      (this.C = this.g = null),
      (this.H = ''),
      (this.m = 0),
      (this.j = ''),
      (this.l = this.F = this.v = this.D = !1),
      (this.B = 0),
      (this.A = null),
      (this.J = ui),
      (this.K = this.L = !1)
  }
  at(hi, le)
  var ui = '',
    li = /^https?$/i,
    di = ['POST', 'PUT']
  function fi (t) {
    return 'content-type' == t.toLowerCase()
  }
  function pi (t, e) {
    ;(t.h = !1),
      t.g && ((t.l = !0), t.g.abort(), (t.l = !1)),
      (t.j = e),
      (t.m = 5),
      mi(t),
      yi(t)
  }
  function mi (t) {
    t.D || ((t.D = !0), de(t, 'complete'), de(t, 'error'))
  }
  function gi (t) {
    if (t.h && void 0 !== Q && (!t.C[1] || 4 != wi(t) || 2 != t.ba()))
      if (t.v && 4 == wi(t)) ke(t.Fa, 0, t)
      else if ((de(t, 'readystatechange'), 4 == wi(t))) {
        t.h = !1
        try {
          const a = t.ba()
          t: switch (a) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
              var e = !0
              break t
            default:
              e = !1
          }
          var n
          if (!(n = e)) {
            var i
            if ((i = 0 === a)) {
              var s = String(t.H).match(Tn)[1] || null
              if (!s && X.self && X.self.location) {
                var r = X.self.location.protocol
                s = r.substr(0, r.length - 1)
              }
              i = !li.test(s ? s.toLowerCase() : '')
            }
            n = i
          }
          if (n) de(t, 'complete'), de(t, 'success')
          else {
            t.m = 6
            try {
              var o = 2 < wi(t) ? t.g.statusText : ''
            } catch (t) {
              o = ''
            }
            ;(t.j = o + ' [' + t.ba() + ']'), mi(t)
          }
        } finally {
          yi(t)
        }
      }
  }
  function yi (t, e) {
    if (t.g) {
      vi(t)
      const n = t.g,
        i = t.C[0] ? Y : null
      ;(t.g = null), (t.C = null), e || de(t, 'ready')
      try {
        n.onreadystatechange = i
      } catch (t) {}
    }
  }
  function vi (t) {
    t.g && t.K && (t.g.ontimeout = null),
      t.A && (X.clearTimeout(t.A), (t.A = null))
  }
  function wi (t) {
    return t.g ? t.g.readyState : 0
  }
  function Ii (t) {
    try {
      if (!t.g) return null
      if ('response' in t.g) return t.g.response
      switch (t.J) {
        case ui:
        case 'text':
          return t.g.responseText
        case 'arraybuffer':
          if ('mozResponseArrayBuffer' in t.g) return t.g.mozResponseArrayBuffer
      }
      return null
    } catch (t) {
      return null
    }
  }
  function Ti (t, e, n) {
    t: {
      for (i in n) {
        var i = !1
        break t
      }
      i = !0
    }
    i ||
      ((n = (function (t) {
        let e = ''
        return (
          Tt(t, function (t, n) {
            ;(e += n), (e += ':'), (e += t), (e += '\r\n')
          }),
          e
        )
      })(n)),
      'string' == typeof t
        ? null != n && encodeURIComponent(String(n))
        : Cn(t, e, n))
  }
  function Ei (t, e, n) {
    return (n && n.internalChannelParams && n.internalChannelParams[t]) || e
  }
  function bi (t) {
    ;(this.za = 0),
      (this.l = []),
      (this.h = new Le()),
      (this.la = this.oa = this.F = this.W = this.g = this.sa = this.D = this.aa = this.o = this.P = this.s = null),
      (this.Za = this.V = 0),
      (this.Xa = Ei('failFast', !1, t)),
      (this.N = this.v = this.u = this.m = this.j = null),
      (this.X = !0),
      (this.I = this.ta = this.U = -1),
      (this.Y = this.A = this.C = 0),
      (this.Pa = Ei('baseRetryDelayMs', 5e3, t)),
      (this.$a = Ei('retryDelaySeedMs', 1e4, t)),
      (this.Ya = Ei('forwardChannelMaxRetries', 2, t)),
      (this.ra = Ei('forwardChannelRequestTimeoutMs', 2e4, t)),
      (this.qa = (t && t.xmlHttpFactory) || void 0),
      (this.Ba = (t && t.Yb) || !1),
      (this.K = void 0),
      (this.H = (t && t.supportsCrossDomainXhr) || !1),
      (this.J = ''),
      (this.i = new Hn(t && t.concurrentRequestLimit)),
      (this.Ca = new Zn()),
      (this.ja = (t && t.fastHandshake) || !1),
      (this.Ra = (t && t.Wb) || !1),
      t && t.Aa && this.h.Aa(),
      t && t.forceLongPolling && (this.X = !1),
      (this.$ = (!this.ja && this.X && t && t.detectBufferingProxy) || !1),
      (this.ka = void 0),
      (this.O = 0),
      (this.L = !1),
      (this.B = null),
      (this.Wa = !t || !1 !== t.Xb)
  }
  function _i (t) {
    if ((ki(t), 3 == t.G)) {
      var e = t.V++,
        n = bn(t.F)
      Cn(n, 'SID', t.J),
        Cn(n, 'RID', e),
        Cn(n, 'TYPE', 'terminate'),
        Ri(t, n),
        ((e = new tn(t, t.h, e, void 0)).K = 2),
        (e.v = Nn(bn(n))),
        (n = !1),
        X.navigator &&
          X.navigator.sendBeacon &&
          (n = X.navigator.sendBeacon(e.v.toString(), '')),
        !n && X.Image && ((new Image().src = e.v), (n = !0)),
        n || ((e.g = Bi(e.l, null)), e.g.ea(e.v)),
        (e.F = Date.now()),
        ln(e)
    }
    qi(t)
  }
  function Si (t) {
    t.g && (Pi(t), t.g.cancel(), (t.g = null))
  }
  function ki (t) {
    Si(t),
      t.u && (X.clearTimeout(t.u), (t.u = null)),
      Ui(t),
      t.i.cancel(),
      t.m && ('number' == typeof t.m && X.clearTimeout(t.m), (t.m = null))
  }
  function Ai (t, e) {
    t.l.push(
      new (class {
        constructor (t, e) {
          ;(this.h = t), (this.g = e)
        }
      })(t.Za++, e)
    ),
      3 == t.G && Ci(t)
  }
  function Ci (t) {
    zn(t.i) || t.m || ((t.m = !0), Ie(t.Ha, t), (t.C = 0))
  }
  function Ni (t, e) {
    var n
    n = e ? e.m : t.V++
    const i = bn(t.F)
    Cn(i, 'SID', t.J),
      Cn(i, 'RID', n),
      Cn(i, 'AID', t.U),
      Ri(t, i),
      t.o && t.s && Ti(i, t.o, t.s),
      (n = new tn(t, t.h, n, t.C + 1)),
      null === t.o && (n.H = t.s),
      e && (t.l = e.D.concat(t.l)),
      (e = Di(t, n, 1e3)),
      n.setTimeout(
        Math.round(0.5 * t.ra) + Math.round(0.5 * t.ra * Math.random())
      ),
      Jn(t.i, n),
      on(n, i, e)
  }
  function Ri (t, e) {
    t.j &&
      yn({}, function (t, n) {
        Cn(e, n, t)
      })
  }
  function Di (t, e, n) {
    n = Math.min(t.l.length, n)
    var i = t.j ? rt(t.j.Oa, t.j, t) : null
    t: {
      var s = t.l
      let e = -1
      for (;;) {
        const t = ['count=' + n]
        ;-1 == e
          ? 0 < n
            ? ((e = s[0].h), t.push('ofs=' + e))
            : (e = 0)
          : t.push('ofs=' + e)
        let r = !0
        for (let o = 0; o < n; o++) {
          let n = s[o].h
          const a = s[o].g
          if (((n -= e), 0 > n)) (e = Math.max(0, s[o].h - 100)), (r = !1)
          else
            try {
              ti(a, t, 'req' + n + '_')
            } catch (t) {
              i && i(a)
            }
        }
        if (r) {
          i = t.join('&')
          break t
        }
      }
    }
    return (t = t.l.splice(0, n)), (e.D = t), i
  }
  function Oi (t) {
    t.g || t.u || ((t.Y = 1), Ie(t.Ga, t), (t.A = 0))
  }
  function Li (t) {
    return !(
      t.g ||
      t.u ||
      3 <= t.A ||
      (t.Y++, (t.u = $e(rt(t.Ga, t), Vi(t, t.A))), t.A++, 0)
    )
  }
  function Pi (t) {
    null != t.B && (X.clearTimeout(t.B), (t.B = null))
  }
  function Mi (t) {
    ;(t.g = new tn(t, t.h, 'rpc', t.Y)),
      null === t.o && (t.g.H = t.s),
      (t.g.O = 0)
    var e = bn(t.oa)
    Cn(e, 'RID', 'rpc'),
      Cn(e, 'SID', t.J),
      Cn(e, 'CI', t.N ? '0' : '1'),
      Cn(e, 'AID', t.U),
      Ri(t, e),
      Cn(e, 'TYPE', 'xmlhttp'),
      t.o && t.s && Ti(e, t.o, t.s),
      t.K && t.g.setTimeout(t.K)
    var n = t.g
    ;(t = t.la),
      (n.K = 1),
      (n.v = Nn(bn(e))),
      (n.s = null),
      (n.U = !0),
      an(n, t)
  }
  function Ui (t) {
    null != t.v && (X.clearTimeout(t.v), (t.v = null))
  }
  function xi (t, e) {
    var n = null
    if (t.g == e) {
      Ui(t), Pi(t), (t.g = null)
      var i = 2
    } else {
      if (!Wn(t.i, e)) return
      ;(n = e.D), Qn(t.i, e), (i = 1)
    }
    if (((t.I = e.N), 0 != t.G))
      if (e.i)
        if (1 == i) {
          ;(n = e.s ? e.s.length : 0), (e = Date.now() - e.F)
          var s = t.C
          de((i = xe()), new Be(i, n, e, s)), Ci(t)
        } else Oi(t)
      else if (
        3 == (s = e.o) ||
        (0 == s && 0 < t.I) ||
        !(
          (1 == i &&
            (function (t, e) {
              return !(
                Gn(t.i) >= t.i.j - (t.m ? 1 : 0) ||
                (t.m
                  ? ((t.l = e.D.concat(t.l)), 0)
                  : 1 == t.G ||
                    2 == t.G ||
                    t.C >= (t.Xa ? 0 : t.Ya) ||
                    ((t.m = $e(rt(t.Ha, t, e), Vi(t, t.C))), t.C++, 0))
              )
            })(t, e)) ||
          (2 == i && Li(t))
        )
      )
        switch ((n && 0 < n.length && ((e = t.i), (e.i = e.i.concat(n))), s)) {
          case 1:
            Fi(t, 5)
            break
          case 4:
            Fi(t, 10)
            break
          case 3:
            Fi(t, 6)
            break
          default:
            Fi(t, 2)
        }
  }
  function Vi (t, e) {
    let n = t.Pa + Math.floor(Math.random() * t.$a)
    return t.j || (n *= 2), n * e
  }
  function Fi (t, e) {
    if ((t.h.info('Error code ' + e), 2 == e)) {
      var n = null
      t.j && (n = null)
      var i = rt(t.jb, t)
      n ||
        ((n = new En('//www.google.com/images/cleardot.gif')),
        (X.location && 'http' == X.location.protocol) || _n(n, 'https'),
        Nn(n)),
        (function (t, e) {
          const n = new Le()
          if (X.Image) {
            const i = new Image()
            ;(i.onload = ot(ei, n, i, 'TestLoadImage: loaded', !0, e)),
              (i.onerror = ot(ei, n, i, 'TestLoadImage: error', !1, e)),
              (i.onabort = ot(ei, n, i, 'TestLoadImage: abort', !1, e)),
              (i.ontimeout = ot(ei, n, i, 'TestLoadImage: timeout', !1, e)),
              X.setTimeout(function () {
                i.ontimeout && i.ontimeout()
              }, 1e4),
              (i.src = t)
          } else e(!1)
        })(n.toString(), i)
    } else je(2)
    ;(t.G = 0), t.j && t.j.va(e), qi(t), ki(t)
  }
  function qi (t) {
    ;(t.G = 0),
      (t.I = -1),
      t.j &&
        ((0 == Xn(t.i).length && 0 == t.l.length) ||
          ((t.i.i.length = 0), ft(t.l), (t.l.length = 0)),
        t.j.ua())
  }
  function ji (t, e, n) {
    let i = (function (t) {
      return t instanceof En ? bn(t) : new En(t, void 0)
    })(n)
    if ('' != i.i) e && Sn(i, e + '.' + i.i), kn(i, i.m)
    else {
      const t = X.location
      i = (function (t, e, n, i) {
        var s = new En(null, void 0)
        return t && _n(s, t), e && Sn(s, e), n && kn(s, n), i && (s.l = i), s
      })(t.protocol, e ? e + '.' + t.hostname : t.hostname, +t.port, n)
    }
    return (
      t.aa &&
        Tt(t.aa, function (t, e) {
          Cn(i, e, t)
        }),
      (e = t.D),
      (n = t.sa),
      e && n && Cn(i, e, n),
      Cn(i, 'VER', t.ma),
      Ri(t, i),
      i
    )
  }
  function Bi (t, e, n) {
    if (e && !t.H)
      throw Error("Can't create secondary domain capable XhrIo object.")
    return (
      ((e = n && t.Ba && !t.qa ? new hi(new ni({ ib: !0 })) : new hi(t.qa)).L =
        t.H),
      e
    )
  }
  function $i () {}
  function Hi () {
    if (Nt && !(10 <= Number(jt)))
      throw Error('Environmental error: no available transport.')
  }
  function Ki (t, e) {
    le.call(this),
      (this.g = new bi(e)),
      (this.l = t),
      (this.h = (e && e.messageUrlParams) || null),
      (t = (e && e.messageHeaders) || null),
      e &&
        e.clientProtocolHeaderRequired &&
        (t
          ? (t['X-Client-Protocol'] = 'webchannel')
          : (t = { 'X-Client-Protocol': 'webchannel' })),
      (this.g.s = t),
      (t = (e && e.initMessageHeaders) || null),
      e &&
        e.messageContentType &&
        (t
          ? (t['X-WebChannel-Content-Type'] = e.messageContentType)
          : (t = { 'X-WebChannel-Content-Type': e.messageContentType })),
      e &&
        e.ya &&
        (t
          ? (t['X-WebChannel-Client-Profile'] = e.ya)
          : (t = { 'X-WebChannel-Client-Profile': e.ya })),
      (this.g.P = t),
      (t = e && e.httpHeadersOverwriteParam) && !pt(t) && (this.g.o = t),
      (this.A = (e && e.supportsCrossDomainXhr) || !1),
      (this.v = (e && e.sendRawJson) || !1),
      (e = e && e.httpSessionIdParam) &&
        !pt(e) &&
        ((this.g.D = e),
        null !== (t = this.h) && e in t && e in (t = this.h) && delete t[e]),
      (this.j = new Wi(this))
  }
  function zi (t) {
    Xe.call(this)
    var e = t.__sm__
    if (e) {
      t: {
        for (const n in e) {
          t = n
          break t
        }
        t = void 0
      }
      ;(this.i = t) &&
        ((t = this.i), (e = null !== e && t in e ? e[t] : void 0)),
        (this.data = e)
    } else this.data = t
  }
  function Gi () {
    Ye.call(this), (this.status = 1)
  }
  function Wi (t) {
    this.g = t
  }
  ;((G = hi.prototype).ea = function (t, e, n, i) {
    if (this.g)
      throw Error(
        '[goog.net.XhrIo] Object is active with another request=' +
          this.H +
          '; newUri=' +
          t
      )
    ;(e = e ? e.toUpperCase() : 'GET'),
      (this.H = t),
      (this.j = ''),
      (this.m = 0),
      (this.D = !1),
      (this.h = !0),
      (this.g = this.u ? this.u.g() : Je.g()),
      (this.C = this.u ? Ge(this.u) : Ge(Je)),
      (this.g.onreadystatechange = rt(this.Fa, this))
    try {
      ;(this.F = !0), this.g.open(e, String(t), !0), (this.F = !1)
    } catch (t) {
      return void pi(this, t)
    }
    t = n || ''
    const s = new vn(this.headers)
    i &&
      yn(i, function (t, e) {
        s.set(e, t)
      }),
      (i = (function (t) {
        t: {
          var e = fi
          const n = t.length,
            i = 'string' == typeof t ? t.split('') : t
          for (let s = 0; s < n; s++)
            if (s in i && e.call(void 0, i[s], s, t)) {
              e = s
              break t
            }
          e = -1
        }
        return 0 > e ? null : 'string' == typeof t ? t.charAt(e) : t[e]
      })(s.T())),
      (n = X.FormData && t instanceof X.FormData),
      !(0 <= ut(di, e)) ||
        i ||
        n ||
        s.set(
          'Content-Type',
          'application/x-www-form-urlencoded;charset=utf-8'
        ),
      s.forEach(function (t, e) {
        this.g.setRequestHeader(e, t)
      }, this),
      this.J && (this.g.responseType = this.J),
      'withCredentials' in this.g &&
        this.g.withCredentials !== this.L &&
        (this.g.withCredentials = this.L)
    try {
      vi(this),
        0 < this.B &&
          ((this.K = (function (t) {
            return (
              Nt &&
              qt() &&
              'number' == typeof t.timeout &&
              void 0 !== t.ontimeout
            )
          })(this.g))
            ? ((this.g.timeout = this.B),
              (this.g.ontimeout = rt(this.pa, this)))
            : (this.A = ke(this.pa, this.B, this))),
        (this.v = !0),
        this.g.send(t),
        (this.v = !1)
    } catch (t) {
      pi(this, t)
    }
  }),
    (G.pa = function () {
      void 0 !== Q &&
        this.g &&
        ((this.j = 'Timed out after ' + this.B + 'ms, aborting'),
        (this.m = 8),
        de(this, 'timeout'),
        this.abort(8))
    }),
    (G.abort = function (t) {
      this.g &&
        this.h &&
        ((this.h = !1),
        (this.l = !0),
        this.g.abort(),
        (this.l = !1),
        (this.m = t || 7),
        de(this, 'complete'),
        de(this, 'abort'),
        yi(this))
    }),
    (G.M = function () {
      this.g &&
        (this.h &&
          ((this.h = !1), (this.l = !0), this.g.abort(), (this.l = !1)),
        yi(this, !0)),
        hi.Z.M.call(this)
    }),
    (G.Fa = function () {
      this.s || (this.F || this.v || this.l ? gi(this) : this.cb())
    }),
    (G.cb = function () {
      gi(this)
    }),
    (G.ba = function () {
      try {
        return 2 < wi(this) ? this.g.status : -1
      } catch (t) {
        return -1
      }
    }),
    (G.ga = function () {
      try {
        return this.g ? this.g.responseText : ''
      } catch (t) {
        return ''
      }
    }),
    (G.Qa = function (t) {
      if (this.g) {
        var e = this.g.responseText
        return t && 0 == e.indexOf(t) && (e = e.substring(t.length)), ci(e)
      }
    }),
    (G.Da = function () {
      return this.m
    }),
    (G.La = function () {
      return 'string' == typeof this.j ? this.j : String(this.j)
    }),
    ((G = bi.prototype).ma = 8),
    (G.G = 1),
    (G.hb = function (t) {
      try {
        this.h.info('Origin Trials invoked: ' + t)
      } catch (t) {}
    }),
    (G.Ha = function (t) {
      if (this.m)
        if (((this.m = null), 1 == this.G)) {
          if (!t) {
            ;(this.V = Math.floor(1e5 * Math.random())), (t = this.V++)
            const s = new tn(this, this.h, t, void 0)
            let r = this.s
            if (
              (this.P && (r ? ((r = Et(r)), _t(r, this.P)) : (r = this.P)),
              null === this.o && (s.H = r),
              this.ja)
            )
              t: {
                for (var e = 0, n = 0; n < this.l.length; n++) {
                  var i = this.l[n]
                  if (
                    void 0 ===
                    (i =
                      '__data__' in i.g && 'string' == typeof (i = i.g.__data__)
                        ? i.length
                        : void 0)
                  )
                    break
                  if (4096 < (e += i)) {
                    e = n
                    break t
                  }
                  if (4096 === e || n === this.l.length - 1) {
                    e = n + 1
                    break t
                  }
                }
                e = 1e3
              }
            else e = 1e3
            ;(e = Di(this, s, e)),
              Cn((n = bn(this.F)), 'RID', t),
              Cn(n, 'CVER', 22),
              this.D && Cn(n, 'X-HTTP-Session-Id', this.D),
              Ri(this, n),
              this.o && r && Ti(n, this.o, r),
              Jn(this.i, s),
              this.Ra && Cn(n, 'TYPE', 'init'),
              this.ja
                ? (Cn(n, '$req', e),
                  Cn(n, 'SID', 'null'),
                  (s.$ = !0),
                  on(s, n, null))
                : on(s, n, e),
              (this.G = 2)
          }
        } else
          3 == this.G &&
            (t ? Ni(this, t) : 0 == this.l.length || zn(this.i) || Ni(this))
    }),
    (G.Ga = function () {
      if (
        ((this.u = null),
        Mi(this),
        this.$ && !(this.L || null == this.g || 0 >= this.O))
      ) {
        var t = 2 * this.O
        this.h.info('BP detection timer enabled: ' + t),
          (this.B = $e(rt(this.bb, this), t))
      }
    }),
    (G.bb = function () {
      this.B &&
        ((this.B = null),
        this.h.info('BP detection timeout reached.'),
        this.h.info('Buffering proxy detected and switch to long-polling!'),
        (this.N = !1),
        (this.L = !0),
        je(10),
        Si(this),
        Mi(this))
    }),
    (G.ab = function () {
      null != this.v && ((this.v = null), Si(this), Li(this), je(19))
    }),
    (G.jb = function (t) {
      t
        ? (this.h.info('Successfully pinged google.com'), je(2))
        : (this.h.info('Failed to ping google.com'), je(1))
    }),
    ((G = $i.prototype).xa = function () {}),
    (G.wa = function () {}),
    (G.va = function () {}),
    (G.ua = function () {}),
    (G.Oa = function () {}),
    (Hi.prototype.g = function (t, e) {
      return new Ki(t, e)
    }),
    at(Ki, le),
    (Ki.prototype.m = function () {
      ;(this.g.j = this.j), this.A && (this.g.H = !0)
      var t = this.g,
        e = this.l,
        n = this.h || void 0
      t.Wa && (t.h.info('Origin Trials enabled.'), Ie(rt(t.hb, t, e))),
        je(0),
        (t.W = e),
        (t.aa = n || {}),
        (t.N = t.X),
        (t.F = ji(t, null, t.W)),
        Ci(t)
    }),
    (Ki.prototype.close = function () {
      _i(this.g)
    }),
    (Ki.prototype.u = function (t) {
      if ('string' == typeof t) {
        var e = {}
        ;(e.__data__ = t), Ai(this.g, e)
      } else
        this.v ? (((e = {}).__data__ = pe(t)), Ai(this.g, e)) : Ai(this.g, t)
    }),
    (Ki.prototype.M = function () {
      ;(this.g.j = null),
        delete this.j,
        _i(this.g),
        delete this.g,
        Ki.Z.M.call(this)
    }),
    at(zi, Xe),
    at(Gi, Ye),
    at(Wi, $i),
    (Wi.prototype.xa = function () {
      de(this.g, 'a')
    }),
    (Wi.prototype.wa = function (t) {
      de(this.g, new zi(t))
    }),
    (Wi.prototype.va = function (t) {
      de(this.g, new Gi(t))
    }),
    (Wi.prototype.ua = function () {
      de(this.g, 'b')
    }),
    (Hi.prototype.createWebChannel = Hi.prototype.g),
    (Ki.prototype.send = Ki.prototype.u),
    (Ki.prototype.open = Ki.prototype.m),
    (Ki.prototype.close = Ki.prototype.close),
    (He.NO_ERROR = 0),
    (He.TIMEOUT = 8),
    (He.HTTP_ERROR = 6),
    (Ke.COMPLETE = 'complete'),
    (We.EventType = Qe),
    (Qe.OPEN = 'a'),
    (Qe.CLOSE = 'b'),
    (Qe.ERROR = 'c'),
    (Qe.MESSAGE = 'd'),
    (le.prototype.listen = le.prototype.N),
    (hi.prototype.listenOnce = hi.prototype.O),
    (hi.prototype.getLastError = hi.prototype.La),
    (hi.prototype.getLastErrorCode = hi.prototype.Da),
    (hi.prototype.getStatus = hi.prototype.ba),
    (hi.prototype.getResponseJson = hi.prototype.Qa),
    (hi.prototype.getResponseText = hi.prototype.ga),
    (hi.prototype.send = hi.prototype.ea)
  var Ji = (J.createWebChannelTransport = function () {
      return new Hi()
    }),
    Qi = (J.getStatEventTarget = function () {
      return xe()
    }),
    Xi = (J.ErrorCode = He),
    Yi = (J.EventType = Ke),
    Zi = (J.Event = Me),
    ts = (J.Stat = {
      rb: 0,
      ub: 1,
      vb: 2,
      Ob: 3,
      Tb: 4,
      Qb: 5,
      Rb: 6,
      Pb: 7,
      Nb: 8,
      Sb: 9,
      PROXY: 10,
      NOPROXY: 11,
      Lb: 12,
      Hb: 13,
      Ib: 14,
      Gb: 15,
      Jb: 16,
      Kb: 17,
      nb: 18,
      mb: 19,
      ob: 20
    }),
    es = (J.FetchXmlHttpFactory = ni),
    ns = (J.WebChannel = We),
    is = (J.XhrIo = hi)
  const ss = '@firebase/firestore'
  class rs {
    constructor (t) {
      this.uid = t
    }
    isAuthenticated () {
      return null != this.uid
    }
    toKey () {
      return this.isAuthenticated() ? 'uid:' + this.uid : 'anonymous-user'
    }
    isEqual (t) {
      return t.uid === this.uid
    }
  }
  ;(rs.UNAUTHENTICATED = new rs(null)),
    (rs.GOOGLE_CREDENTIALS = new rs('google-credentials-uid')),
    (rs.FIRST_PARTY = new rs('first-party-uid')),
    (rs.MOCK_USER = new rs('mock-user'))
  let os = '9.6.3'
  const as = new R('@firebase/firestore')
  function cs () {
    return as.logLevel
  }
  function hs (t, ...e) {
    if (as.logLevel <= _.DEBUG) {
      const n = e.map(ds)
      as.debug(`Firestore (${os}): ${t}`, ...n)
    }
  }
  function us (t, ...e) {
    if (as.logLevel <= _.ERROR) {
      const n = e.map(ds)
      as.error(`Firestore (${os}): ${t}`, ...n)
    }
  }
  function ls (t, ...e) {
    if (as.logLevel <= _.WARN) {
      const n = e.map(ds)
      as.warn(`Firestore (${os}): ${t}`, ...n)
    }
  }
  function ds (t) {
    if ('string' == typeof t) return t
    try {
      return (e = t), JSON.stringify(e)
    } catch (e) {
      return t
    }
    var e
  }
  function fs (t = 'Unexpected state') {
    const e = `FIRESTORE (${os}) INTERNAL ASSERTION FAILED: ` + t
    throw (us(e), new Error(e))
  }
  function ps (t, e) {
    t || fs()
  }
  function ms (t, e) {
    return t
  }
  const gs = {
    OK: 'ok',
    CANCELLED: 'cancelled',
    UNKNOWN: 'unknown',
    INVALID_ARGUMENT: 'invalid-argument',
    DEADLINE_EXCEEDED: 'deadline-exceeded',
    NOT_FOUND: 'not-found',
    ALREADY_EXISTS: 'already-exists',
    PERMISSION_DENIED: 'permission-denied',
    UNAUTHENTICATED: 'unauthenticated',
    RESOURCE_EXHAUSTED: 'resource-exhausted',
    FAILED_PRECONDITION: 'failed-precondition',
    ABORTED: 'aborted',
    OUT_OF_RANGE: 'out-of-range',
    UNIMPLEMENTED: 'unimplemented',
    INTERNAL: 'internal',
    UNAVAILABLE: 'unavailable',
    DATA_LOSS: 'data-loss'
  }
  class ys extends c {
    constructor (t, e) {
      super(t, e),
        (this.code = t),
        (this.message = e),
        (this.toString = () =>
          `${this.name}: [code=${this.code}]: ${this.message}`)
    }
  }
  class vs {
    constructor () {
      this.promise = new Promise((t, e) => {
        ;(this.resolve = t), (this.reject = e)
      })
    }
  }
  class ws {
    constructor (t, e) {
      ;(this.user = e),
        (this.type = 'OAuth'),
        (this.headers = new Map()),
        this.headers.set('Authorization', `Bearer ${t}`)
    }
  }
  class Is {
    getToken () {
      return Promise.resolve(null)
    }
    invalidateToken () {}
    start (t, e) {
      t.enqueueRetryable(() => e(rs.UNAUTHENTICATED))
    }
    shutdown () {}
  }
  class Ts {
    constructor (t) {
      ;(this.t = t),
        (this.currentUser = rs.UNAUTHENTICATED),
        (this.i = 0),
        (this.forceRefresh = !1),
        (this.auth = null)
    }
    start (t, e) {
      let n = this.i
      const i = t => (this.i !== n ? ((n = this.i), e(t)) : Promise.resolve())
      let s = new vs()
      this.o = () => {
        this.i++,
          (this.currentUser = this.u()),
          s.resolve(),
          (s = new vs()),
          t.enqueueRetryable(() => i(this.currentUser))
      }
      const r = () => {
          const e = s
          t.enqueueRetryable(async () => {
            await e.promise, await i(this.currentUser)
          })
        },
        o = t => {
          hs('FirebaseAuthCredentialsProvider', 'Auth detected'),
            (this.auth = t),
            this.auth.addAuthTokenListener(this.o),
            r()
        }
      this.t.onInit(t => o(t)),
        setTimeout(() => {
          if (!this.auth) {
            const t = this.t.getImmediate({ optional: !0 })
            t
              ? o(t)
              : (hs('FirebaseAuthCredentialsProvider', 'Auth not yet detected'),
                s.resolve(),
                (s = new vs()))
          }
        }, 0),
        r()
    }
    getToken () {
      const t = this.i,
        e = this.forceRefresh
      return (
        (this.forceRefresh = !1),
        this.auth
          ? this.auth
              .getToken(e)
              .then(e =>
                this.i !== t
                  ? (hs(
                      'FirebaseAuthCredentialsProvider',
                      'getToken aborted due to token change.'
                    ),
                    this.getToken())
                  : e
                  ? (ps('string' == typeof e.accessToken),
                    new ws(e.accessToken, this.currentUser))
                  : null
              )
          : Promise.resolve(null)
      )
    }
    invalidateToken () {
      this.forceRefresh = !0
    }
    shutdown () {
      this.auth && this.auth.removeAuthTokenListener(this.o)
    }
    u () {
      const t = this.auth && this.auth.getUid()
      return ps(null === t || 'string' == typeof t), new rs(t)
    }
  }
  class Es {
    constructor (t, e, n) {
      ;(this.type = 'FirstParty'),
        (this.user = rs.FIRST_PARTY),
        (this.headers = new Map()),
        this.headers.set('X-Goog-AuthUser', e)
      const i = t.auth.getAuthHeaderValueForFirstParty([])
      i && this.headers.set('Authorization', i),
        n && this.headers.set('X-Goog-Iam-Authorization-Token', n)
    }
  }
  class bs {
    constructor (t, e, n) {
      ;(this.h = t), (this.l = e), (this.m = n)
    }
    getToken () {
      return Promise.resolve(new Es(this.h, this.l, this.m))
    }
    start (t, e) {
      t.enqueueRetryable(() => e(rs.FIRST_PARTY))
    }
    shutdown () {}
    invalidateToken () {}
  }
  class _s {
    constructor (t) {
      ;(this.value = t),
        (this.type = 'AppCheck'),
        (this.headers = new Map()),
        t && t.length > 0 && this.headers.set('x-firebase-appcheck', this.value)
    }
  }
  class Ss {
    constructor (t) {
      ;(this.g = t), (this.forceRefresh = !1), (this.appCheck = null)
    }
    start (t, e) {
      this.o = n => {
        t.enqueueRetryable(() =>
          (t => (
            null != t.error &&
              hs(
                'FirebaseAppCheckTokenProvider',
                `Error getting App Check token; using placeholder token instead. Error: ${t.error.message}`
              ),
            e(t.token)
          ))(n)
        )
      }
      const n = t => {
        hs('FirebaseAppCheckTokenProvider', 'AppCheck detected'),
          (this.appCheck = t),
          this.appCheck.addTokenListener(this.o)
      }
      this.g.onInit(t => n(t)),
        setTimeout(() => {
          if (!this.appCheck) {
            const t = this.g.getImmediate({ optional: !0 })
            t
              ? n(t)
              : hs('FirebaseAppCheckTokenProvider', 'AppCheck not yet detected')
          }
        }, 0)
    }
    getToken () {
      const t = this.forceRefresh
      return (
        (this.forceRefresh = !1),
        this.appCheck
          ? this.appCheck
              .getToken(t)
              .then(t =>
                t ? (ps('string' == typeof t.token), new _s(t.token)) : null
              )
          : Promise.resolve(null)
      )
    }
    invalidateToken () {
      this.forceRefresh = !0
    }
    shutdown () {
      this.appCheck && this.appCheck.removeTokenListener(this.o)
    }
  }
  class ks {
    constructor (t, e) {
      ;(this.previousValue = t),
        e &&
          ((e.sequenceNumberHandler = t => this.p(t)),
          (this.T = t => e.writeSequenceNumber(t)))
    }
    p (t) {
      return (
        (this.previousValue = Math.max(t, this.previousValue)),
        this.previousValue
      )
    }
    next () {
      const t = ++this.previousValue
      return this.T && this.T(t), t
    }
  }
  function As (t) {
    const e = 'undefined' != typeof self && (self.crypto || self.msCrypto),
      n = new Uint8Array(t)
    if (e && 'function' == typeof e.getRandomValues) e.getRandomValues(n)
    else for (let e = 0; e < t; e++) n[e] = Math.floor(256 * Math.random())
    return n
  }
  ks.I = -1
  class Cs {
    static A () {
      const t =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        e = Math.floor(256 / t.length) * t.length
      let n = ''
      for (; n.length < 20; ) {
        const i = As(40)
        for (let s = 0; s < i.length; ++s)
          n.length < 20 && i[s] < e && (n += t.charAt(i[s] % t.length))
      }
      return n
    }
  }
  function Ns (t, e) {
    return t < e ? -1 : t > e ? 1 : 0
  }
  function Rs (t, e, n) {
    return t.length === e.length && t.every((t, i) => n(t, e[i]))
  }
  class Ds {
    constructor (t, e) {
      if (((this.seconds = t), (this.nanoseconds = e), e < 0))
        throw new ys(
          gs.INVALID_ARGUMENT,
          'Timestamp nanoseconds out of range: ' + e
        )
      if (e >= 1e9)
        throw new ys(
          gs.INVALID_ARGUMENT,
          'Timestamp nanoseconds out of range: ' + e
        )
      if (t < -62135596800)
        throw new ys(
          gs.INVALID_ARGUMENT,
          'Timestamp seconds out of range: ' + t
        )
      if (t >= 253402300800)
        throw new ys(
          gs.INVALID_ARGUMENT,
          'Timestamp seconds out of range: ' + t
        )
    }
    static now () {
      return Ds.fromMillis(Date.now())
    }
    static fromDate (t) {
      return Ds.fromMillis(t.getTime())
    }
    static fromMillis (t) {
      const e = Math.floor(t / 1e3),
        n = Math.floor(1e6 * (t - 1e3 * e))
      return new Ds(e, n)
    }
    toDate () {
      return new Date(this.toMillis())
    }
    toMillis () {
      return 1e3 * this.seconds + this.nanoseconds / 1e6
    }
    _compareTo (t) {
      return this.seconds === t.seconds
        ? Ns(this.nanoseconds, t.nanoseconds)
        : Ns(this.seconds, t.seconds)
    }
    isEqual (t) {
      return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds
    }
    toString () {
      return (
        'Timestamp(seconds=' +
        this.seconds +
        ', nanoseconds=' +
        this.nanoseconds +
        ')'
      )
    }
    toJSON () {
      return { seconds: this.seconds, nanoseconds: this.nanoseconds }
    }
    valueOf () {
      const t = this.seconds - -62135596800
      return (
        String(t).padStart(12, '0') +
        '.' +
        String(this.nanoseconds).padStart(9, '0')
      )
    }
  }
  class Os {
    constructor (t) {
      this.timestamp = t
    }
    static fromTimestamp (t) {
      return new Os(t)
    }
    static min () {
      return new Os(new Ds(0, 0))
    }
    compareTo (t) {
      return this.timestamp._compareTo(t.timestamp)
    }
    isEqual (t) {
      return this.timestamp.isEqual(t.timestamp)
    }
    toMicroseconds () {
      return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3
    }
    toString () {
      return 'SnapshotVersion(' + this.timestamp.toString() + ')'
    }
    toTimestamp () {
      return this.timestamp
    }
  }
  function Ls (t) {
    let e = 0
    for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e++
    return e
  }
  function Ps (t, e) {
    for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n])
  }
  function Ms (t) {
    for (const e in t) if (Object.prototype.hasOwnProperty.call(t, e)) return !1
    return !0
  }
  class Us {
    constructor (t, e, n) {
      void 0 === e ? (e = 0) : e > t.length && fs(),
        void 0 === n ? (n = t.length - e) : n > t.length - e && fs(),
        (this.segments = t),
        (this.offset = e),
        (this.len = n)
    }
    get length () {
      return this.len
    }
    isEqual (t) {
      return 0 === Us.comparator(this, t)
    }
    child (t) {
      const e = this.segments.slice(this.offset, this.limit())
      return (
        t instanceof Us
          ? t.forEach(t => {
              e.push(t)
            })
          : e.push(t),
        this.construct(e)
      )
    }
    limit () {
      return this.offset + this.length
    }
    popFirst (t) {
      return (
        (t = void 0 === t ? 1 : t),
        this.construct(this.segments, this.offset + t, this.length - t)
      )
    }
    popLast () {
      return this.construct(this.segments, this.offset, this.length - 1)
    }
    firstSegment () {
      return this.segments[this.offset]
    }
    lastSegment () {
      return this.get(this.length - 1)
    }
    get (t) {
      return this.segments[this.offset + t]
    }
    isEmpty () {
      return 0 === this.length
    }
    isPrefixOf (t) {
      if (t.length < this.length) return !1
      for (let e = 0; e < this.length; e++)
        if (this.get(e) !== t.get(e)) return !1
      return !0
    }
    isImmediateParentOf (t) {
      if (this.length + 1 !== t.length) return !1
      for (let e = 0; e < this.length; e++)
        if (this.get(e) !== t.get(e)) return !1
      return !0
    }
    forEach (t) {
      for (let e = this.offset, n = this.limit(); e < n; e++)
        t(this.segments[e])
    }
    toArray () {
      return this.segments.slice(this.offset, this.limit())
    }
    static comparator (t, e) {
      const n = Math.min(t.length, e.length)
      for (let i = 0; i < n; i++) {
        const n = t.get(i),
          s = e.get(i)
        if (n < s) return -1
        if (n > s) return 1
      }
      return t.length < e.length ? -1 : t.length > e.length ? 1 : 0
    }
  }
  class xs extends Us {
    construct (t, e, n) {
      return new xs(t, e, n)
    }
    canonicalString () {
      return this.toArray().join('/')
    }
    toString () {
      return this.canonicalString()
    }
    static fromString (...t) {
      const e = []
      for (const n of t) {
        if (n.indexOf('//') >= 0)
          throw new ys(
            gs.INVALID_ARGUMENT,
            `Invalid segment (${n}). Paths must not contain // in them.`
          )
        e.push(...n.split('/').filter(t => t.length > 0))
      }
      return new xs(e)
    }
    static emptyPath () {
      return new xs([])
    }
  }
  const Vs = /^[_a-zA-Z][_a-zA-Z0-9]*$/
  class Fs extends Us {
    construct (t, e, n) {
      return new Fs(t, e, n)
    }
    static isValidIdentifier (t) {
      return Vs.test(t)
    }
    canonicalString () {
      return this.toArray()
        .map(
          t => (
            (t = t.replace(/\\/g, '\\\\').replace(/`/g, '\\`')),
            Fs.isValidIdentifier(t) || (t = '`' + t + '`'),
            t
          )
        )
        .join('.')
    }
    toString () {
      return this.canonicalString()
    }
    isKeyField () {
      return 1 === this.length && '__name__' === this.get(0)
    }
    static keyField () {
      return new Fs(['__name__'])
    }
    static fromServerFormat (t) {
      const e = []
      let n = '',
        i = 0
      const s = () => {
        if (0 === n.length)
          throw new ys(
            gs.INVALID_ARGUMENT,
            `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`
          )
        e.push(n), (n = '')
      }
      let r = !1
      for (; i < t.length; ) {
        const e = t[i]
        if ('\\' === e) {
          if (i + 1 === t.length)
            throw new ys(
              gs.INVALID_ARGUMENT,
              'Path has trailing escape character: ' + t
            )
          const e = t[i + 1]
          if ('\\' !== e && '.' !== e && '`' !== e)
            throw new ys(
              gs.INVALID_ARGUMENT,
              'Path has invalid escape sequence: ' + t
            )
          ;(n += e), (i += 2)
        } else
          '`' === e
            ? ((r = !r), i++)
            : '.' !== e || r
            ? ((n += e), i++)
            : (s(), i++)
      }
      if ((s(), r))
        throw new ys(gs.INVALID_ARGUMENT, 'Unterminated ` in path: ' + t)
      return new Fs(e)
    }
    static emptyPath () {
      return new Fs([])
    }
  }
  class qs {
    constructor (t) {
      ;(this.fields = t), t.sort(Fs.comparator)
    }
    covers (t) {
      for (const e of this.fields) if (e.isPrefixOf(t)) return !0
      return !1
    }
    isEqual (t) {
      return Rs(this.fields, t.fields, (t, e) => t.isEqual(e))
    }
  }
  class js {
    constructor (t) {
      this.binaryString = t
    }
    static fromBase64String (t) {
      const e = atob(t)
      return new js(e)
    }
    static fromUint8Array (t) {
      const e = (function (t) {
        let e = ''
        for (let n = 0; n < t.length; ++n) e += String.fromCharCode(t[n])
        return e
      })(t)
      return new js(e)
    }
    [Symbol.iterator] () {
      let t = 0
      return {
        next: () =>
          t < this.binaryString.length
            ? { value: this.binaryString.charCodeAt(t++), done: !1 }
            : { value: void 0, done: !0 }
      }
    }
    toBase64 () {
      return (t = this.binaryString), btoa(t)
      var t
    }
    toUint8Array () {
      return (function (t) {
        const e = new Uint8Array(t.length)
        for (let n = 0; n < t.length; n++) e[n] = t.charCodeAt(n)
        return e
      })(this.binaryString)
    }
    approximateByteSize () {
      return 2 * this.binaryString.length
    }
    compareTo (t) {
      return Ns(this.binaryString, t.binaryString)
    }
    isEqual (t) {
      return this.binaryString === t.binaryString
    }
  }
  js.EMPTY_BYTE_STRING = new js('')
  const Bs = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/)
  function $s (t) {
    if ((ps(!!t), 'string' == typeof t)) {
      let e = 0
      const n = Bs.exec(t)
      if ((ps(!!n), n[1])) {
        let t = n[1]
        ;(t = (t + '000000000').substr(0, 9)), (e = Number(t))
      }
      const i = new Date(t)
      return { seconds: Math.floor(i.getTime() / 1e3), nanos: e }
    }
    return { seconds: Hs(t.seconds), nanos: Hs(t.nanos) }
  }
  function Hs (t) {
    return 'number' == typeof t ? t : 'string' == typeof t ? Number(t) : 0
  }
  function Ks (t) {
    return 'string' == typeof t ? js.fromBase64String(t) : js.fromUint8Array(t)
  }
  function zs (t) {
    var e, n
    return (
      'server_timestamp' ===
      (null ===
        (n = (
          (null === (e = null == t ? void 0 : t.mapValue) || void 0 === e
            ? void 0
            : e.fields) || {}
        ).__type__) || void 0 === n
        ? void 0
        : n.stringValue)
    )
  }
  function Gs (t) {
    const e = t.mapValue.fields.__previous_value__
    return zs(e) ? Gs(e) : e
  }
  function Ws (t) {
    const e = $s(t.mapValue.fields.__local_write_time__.timestampValue)
    return new Ds(e.seconds, e.nanos)
  }
  function Js (t) {
    return null == t
  }
  function Qs (t) {
    return 0 === t && 1 / t == -1 / 0
  }
  class Xs {
    constructor (t) {
      this.path = t
    }
    static fromPath (t) {
      return new Xs(xs.fromString(t))
    }
    static fromName (t) {
      return new Xs(xs.fromString(t).popFirst(5))
    }
    hasCollectionId (t) {
      return this.path.length >= 2 && this.path.get(this.path.length - 2) === t
    }
    isEqual (t) {
      return null !== t && 0 === xs.comparator(this.path, t.path)
    }
    toString () {
      return this.path.toString()
    }
    static comparator (t, e) {
      return xs.comparator(t.path, e.path)
    }
    static isDocumentKey (t) {
      return t.length % 2 == 0
    }
    static fromSegments (t) {
      return new Xs(new xs(t.slice()))
    }
  }
  function Ys (t) {
    return 'nullValue' in t
      ? 0
      : 'booleanValue' in t
      ? 1
      : 'integerValue' in t || 'doubleValue' in t
      ? 2
      : 'timestampValue' in t
      ? 3
      : 'stringValue' in t
      ? 5
      : 'bytesValue' in t
      ? 6
      : 'referenceValue' in t
      ? 7
      : 'geoPointValue' in t
      ? 8
      : 'arrayValue' in t
      ? 9
      : 'mapValue' in t
      ? zs(t)
        ? 4
        : 10
      : fs()
  }
  function Zs (t, e) {
    if (t === e) return !0
    const n = Ys(t)
    if (n !== Ys(e)) return !1
    switch (n) {
      case 0:
        return !0
      case 1:
        return t.booleanValue === e.booleanValue
      case 4:
        return Ws(t).isEqual(Ws(e))
      case 3:
        return (function (t, e) {
          if (
            'string' == typeof t.timestampValue &&
            'string' == typeof e.timestampValue &&
            t.timestampValue.length === e.timestampValue.length
          )
            return t.timestampValue === e.timestampValue
          const n = $s(t.timestampValue),
            i = $s(e.timestampValue)
          return n.seconds === i.seconds && n.nanos === i.nanos
        })(t, e)
      case 5:
        return t.stringValue === e.stringValue
      case 6:
        return (function (t, e) {
          return Ks(t.bytesValue).isEqual(Ks(e.bytesValue))
        })(t, e)
      case 7:
        return t.referenceValue === e.referenceValue
      case 8:
        return (function (t, e) {
          return (
            Hs(t.geoPointValue.latitude) === Hs(e.geoPointValue.latitude) &&
            Hs(t.geoPointValue.longitude) === Hs(e.geoPointValue.longitude)
          )
        })(t, e)
      case 2:
        return (function (t, e) {
          if ('integerValue' in t && 'integerValue' in e)
            return Hs(t.integerValue) === Hs(e.integerValue)
          if ('doubleValue' in t && 'doubleValue' in e) {
            const n = Hs(t.doubleValue),
              i = Hs(e.doubleValue)
            return n === i ? Qs(n) === Qs(i) : isNaN(n) && isNaN(i)
          }
          return !1
        })(t, e)
      case 9:
        return Rs(t.arrayValue.values || [], e.arrayValue.values || [], Zs)
      case 10:
        return (function (t, e) {
          const n = t.mapValue.fields || {},
            i = e.mapValue.fields || {}
          if (Ls(n) !== Ls(i)) return !1
          for (const t in n)
            if (n.hasOwnProperty(t) && (void 0 === i[t] || !Zs(n[t], i[t])))
              return !1
          return !0
        })(t, e)
      default:
        return fs()
    }
  }
  function tr (t, e) {
    return void 0 !== (t.values || []).find(t => Zs(t, e))
  }
  function er (t, e) {
    if (t === e) return 0
    const n = Ys(t),
      i = Ys(e)
    if (n !== i) return Ns(n, i)
    switch (n) {
      case 0:
        return 0
      case 1:
        return Ns(t.booleanValue, e.booleanValue)
      case 2:
        return (function (t, e) {
          const n = Hs(t.integerValue || t.doubleValue),
            i = Hs(e.integerValue || e.doubleValue)
          return n < i
            ? -1
            : n > i
            ? 1
            : n === i
            ? 0
            : isNaN(n)
            ? isNaN(i)
              ? 0
              : -1
            : 1
        })(t, e)
      case 3:
        return nr(t.timestampValue, e.timestampValue)
      case 4:
        return nr(Ws(t), Ws(e))
      case 5:
        return Ns(t.stringValue, e.stringValue)
      case 6:
        return (function (t, e) {
          const n = Ks(t),
            i = Ks(e)
          return n.compareTo(i)
        })(t.bytesValue, e.bytesValue)
      case 7:
        return (function (t, e) {
          const n = t.split('/'),
            i = e.split('/')
          for (let t = 0; t < n.length && t < i.length; t++) {
            const e = Ns(n[t], i[t])
            if (0 !== e) return e
          }
          return Ns(n.length, i.length)
        })(t.referenceValue, e.referenceValue)
      case 8:
        return (function (t, e) {
          const n = Ns(Hs(t.latitude), Hs(e.latitude))
          return 0 !== n ? n : Ns(Hs(t.longitude), Hs(e.longitude))
        })(t.geoPointValue, e.geoPointValue)
      case 9:
        return (function (t, e) {
          const n = t.values || [],
            i = e.values || []
          for (let t = 0; t < n.length && t < i.length; ++t) {
            const e = er(n[t], i[t])
            if (e) return e
          }
          return Ns(n.length, i.length)
        })(t.arrayValue, e.arrayValue)
      case 10:
        return (function (t, e) {
          const n = t.fields || {},
            i = Object.keys(n),
            s = e.fields || {},
            r = Object.keys(s)
          i.sort(), r.sort()
          for (let t = 0; t < i.length && t < r.length; ++t) {
            const e = Ns(i[t], r[t])
            if (0 !== e) return e
            const o = er(n[i[t]], s[r[t]])
            if (0 !== o) return o
          }
          return Ns(i.length, r.length)
        })(t.mapValue, e.mapValue)
      default:
        throw fs()
    }
  }
  function nr (t, e) {
    if ('string' == typeof t && 'string' == typeof e && t.length === e.length)
      return Ns(t, e)
    const n = $s(t),
      i = $s(e),
      s = Ns(n.seconds, i.seconds)
    return 0 !== s ? s : Ns(n.nanos, i.nanos)
  }
  function ir (t) {
    return sr(t)
  }
  function sr (t) {
    return 'nullValue' in t
      ? 'null'
      : 'booleanValue' in t
      ? '' + t.booleanValue
      : 'integerValue' in t
      ? '' + t.integerValue
      : 'doubleValue' in t
      ? '' + t.doubleValue
      : 'timestampValue' in t
      ? (function (t) {
          const e = $s(t)
          return `time(${e.seconds},${e.nanos})`
        })(t.timestampValue)
      : 'stringValue' in t
      ? t.stringValue
      : 'bytesValue' in t
      ? Ks(t.bytesValue).toBase64()
      : 'referenceValue' in t
      ? ((n = t.referenceValue), Xs.fromName(n).toString())
      : 'geoPointValue' in t
      ? `geo(${(e = t.geoPointValue).latitude},${e.longitude})`
      : 'arrayValue' in t
      ? (function (t) {
          let e = '[',
            n = !0
          for (const i of t.values || [])
            n ? (n = !1) : (e += ','), (e += sr(i))
          return e + ']'
        })(t.arrayValue)
      : 'mapValue' in t
      ? (function (t) {
          const e = Object.keys(t.fields || {}).sort()
          let n = '{',
            i = !0
          for (const s of e)
            i ? (i = !1) : (n += ','), (n += `${s}:${sr(t.fields[s])}`)
          return n + '}'
        })(t.mapValue)
      : fs()
    var e, n
  }
  function rr (t, e) {
    return {
      referenceValue: `projects/${t.projectId}/databases/${
        t.database
      }/documents/${e.path.canonicalString()}`
    }
  }
  function or (t) {
    return !!t && 'integerValue' in t
  }
  function ar (t) {
    return !!t && 'arrayValue' in t
  }
  function cr (t) {
    return !!t && 'nullValue' in t
  }
  function hr (t) {
    return !!t && 'doubleValue' in t && isNaN(Number(t.doubleValue))
  }
  function ur (t) {
    return !!t && 'mapValue' in t
  }
  function lr (t) {
    if (t.geoPointValue)
      return { geoPointValue: Object.assign({}, t.geoPointValue) }
    if (t.timestampValue && 'object' == typeof t.timestampValue)
      return { timestampValue: Object.assign({}, t.timestampValue) }
    if (t.mapValue) {
      const e = { mapValue: { fields: {} } }
      return Ps(t.mapValue.fields, (t, n) => (e.mapValue.fields[t] = lr(n))), e
    }
    if (t.arrayValue) {
      const e = { arrayValue: { values: [] } }
      for (let n = 0; n < (t.arrayValue.values || []).length; ++n)
        e.arrayValue.values[n] = lr(t.arrayValue.values[n])
      return e
    }
    return Object.assign({}, t)
  }
  class dr {
    constructor (t) {
      this.value = t
    }
    static empty () {
      return new dr({ mapValue: {} })
    }
    field (t) {
      if (t.isEmpty()) return this.value
      {
        let e = this.value
        for (let n = 0; n < t.length - 1; ++n)
          if (((e = (e.mapValue.fields || {})[t.get(n)]), !ur(e))) return null
        return (e = (e.mapValue.fields || {})[t.lastSegment()]), e || null
      }
    }
    set (t, e) {
      this.getFieldsMap(t.popLast())[t.lastSegment()] = lr(e)
    }
    setAll (t) {
      let e = Fs.emptyPath(),
        n = {},
        i = []
      t.forEach((t, s) => {
        if (!e.isImmediateParentOf(s)) {
          const t = this.getFieldsMap(e)
          this.applyChanges(t, n, i), (n = {}), (i = []), (e = s.popLast())
        }
        t ? (n[s.lastSegment()] = lr(t)) : i.push(s.lastSegment())
      })
      const s = this.getFieldsMap(e)
      this.applyChanges(s, n, i)
    }
    delete (t) {
      const e = this.field(t.popLast())
      ur(e) && e.mapValue.fields && delete e.mapValue.fields[t.lastSegment()]
    }
    isEqual (t) {
      return Zs(this.value, t.value)
    }
    getFieldsMap (t) {
      let e = this.value
      e.mapValue.fields || (e.mapValue = { fields: {} })
      for (let n = 0; n < t.length; ++n) {
        let i = e.mapValue.fields[t.get(n)]
        ;(ur(i) && i.mapValue.fields) ||
          ((i = { mapValue: { fields: {} } }),
          (e.mapValue.fields[t.get(n)] = i)),
          (e = i)
      }
      return e.mapValue.fields
    }
    applyChanges (t, e, n) {
      Ps(e, (e, n) => (t[e] = n))
      for (const e of n) delete t[e]
    }
    clone () {
      return new dr(lr(this.value))
    }
  }
  function fr (t) {
    const e = []
    return (
      Ps(t.fields, (t, n) => {
        const i = new Fs([t])
        if (ur(n)) {
          const t = fr(n.mapValue).fields
          if (0 === t.length) e.push(i)
          else for (const n of t) e.push(i.child(n))
        } else e.push(i)
      }),
      new qs(e)
    )
  }
  class pr {
    constructor (t, e, n, i, s) {
      ;(this.key = t),
        (this.documentType = e),
        (this.version = n),
        (this.data = i),
        (this.documentState = s)
    }
    static newInvalidDocument (t) {
      return new pr(t, 0, Os.min(), dr.empty(), 0)
    }
    static newFoundDocument (t, e, n) {
      return new pr(t, 1, e, n, 0)
    }
    static newNoDocument (t, e) {
      return new pr(t, 2, e, dr.empty(), 0)
    }
    static newUnknownDocument (t, e) {
      return new pr(t, 3, e, dr.empty(), 2)
    }
    convertToFoundDocument (t, e) {
      return (
        (this.version = t),
        (this.documentType = 1),
        (this.data = e),
        (this.documentState = 0),
        this
      )
    }
    convertToNoDocument (t) {
      return (
        (this.version = t),
        (this.documentType = 2),
        (this.data = dr.empty()),
        (this.documentState = 0),
        this
      )
    }
    convertToUnknownDocument (t) {
      return (
        (this.version = t),
        (this.documentType = 3),
        (this.data = dr.empty()),
        (this.documentState = 2),
        this
      )
    }
    setHasCommittedMutations () {
      return (this.documentState = 2), this
    }
    setHasLocalMutations () {
      return (this.documentState = 1), this
    }
    get hasLocalMutations () {
      return 1 === this.documentState
    }
    get hasCommittedMutations () {
      return 2 === this.documentState
    }
    get hasPendingWrites () {
      return this.hasLocalMutations || this.hasCommittedMutations
    }
    isValidDocument () {
      return 0 !== this.documentType
    }
    isFoundDocument () {
      return 1 === this.documentType
    }
    isNoDocument () {
      return 2 === this.documentType
    }
    isUnknownDocument () {
      return 3 === this.documentType
    }
    isEqual (t) {
      return (
        t instanceof pr &&
        this.key.isEqual(t.key) &&
        this.version.isEqual(t.version) &&
        this.documentType === t.documentType &&
        this.documentState === t.documentState &&
        this.data.isEqual(t.data)
      )
    }
    mutableCopy () {
      return new pr(
        this.key,
        this.documentType,
        this.version,
        this.data.clone(),
        this.documentState
      )
    }
    toString () {
      return `Document(${this.key}, ${this.version}, ${JSON.stringify(
        this.data.value
      )}, {documentType: ${this.documentType}}), {documentState: ${
        this.documentState
      }})`
    }
  }
  class mr {
    constructor (t, e = null, n = [], i = [], s = null, r = null, o = null) {
      ;(this.path = t),
        (this.collectionGroup = e),
        (this.orderBy = n),
        (this.filters = i),
        (this.limit = s),
        (this.startAt = r),
        (this.endAt = o),
        (this.R = null)
    }
  }
  function gr (t, e = null, n = [], i = [], s = null, r = null, o = null) {
    return new mr(t, e, n, i, s, r, o)
  }
  function yr (t) {
    const e = ms(t)
    if (null === e.R) {
      let t = e.path.canonicalString()
      null !== e.collectionGroup && (t += '|cg:' + e.collectionGroup),
        (t += '|f:'),
        (t += e.filters
          .map(t =>
            (function (t) {
              return t.field.canonicalString() + t.op.toString() + ir(t.value)
            })(t)
          )
          .join(',')),
        (t += '|ob:'),
        (t += e.orderBy
          .map(t =>
            (function (t) {
              return t.field.canonicalString() + t.dir
            })(t)
          )
          .join(',')),
        Js(e.limit) || ((t += '|l:'), (t += e.limit)),
        e.startAt && ((t += '|lb:'), (t += Rr(e.startAt))),
        e.endAt && ((t += '|ub:'), (t += Rr(e.endAt))),
        (e.R = t)
    }
    return e.R
  }
  function vr (t, e) {
    if (t.limit !== e.limit) return !1
    if (t.orderBy.length !== e.orderBy.length) return !1
    for (let n = 0; n < t.orderBy.length; n++)
      if (!Or(t.orderBy[n], e.orderBy[n])) return !1
    if (t.filters.length !== e.filters.length) return !1
    for (let s = 0; s < t.filters.length; s++)
      if (
        ((n = t.filters[s]),
        (i = e.filters[s]),
        n.op !== i.op || !n.field.isEqual(i.field) || !Zs(n.value, i.value))
      )
        return !1
    var n, i
    return (
      t.collectionGroup === e.collectionGroup &&
      !!t.path.isEqual(e.path) &&
      !!Pr(t.startAt, e.startAt) &&
      Pr(t.endAt, e.endAt)
    )
  }
  function wr (t) {
    return (
      Xs.isDocumentKey(t.path) &&
      null === t.collectionGroup &&
      0 === t.filters.length
    )
  }
  class Ir extends class {} {
    constructor (t, e, n) {
      super(), (this.field = t), (this.op = e), (this.value = n)
    }
    static create (t, e, n) {
      return t.isKeyField()
        ? 'in' === e || 'not-in' === e
          ? this.P(t, e, n)
          : new Tr(t, e, n)
        : 'array-contains' === e
        ? new Sr(t, n)
        : 'in' === e
        ? new kr(t, n)
        : 'not-in' === e
        ? new Ar(t, n)
        : 'array-contains-any' === e
        ? new Cr(t, n)
        : new Ir(t, e, n)
    }
    static P (t, e, n) {
      return 'in' === e ? new Er(t, n) : new br(t, n)
    }
    matches (t) {
      const e = t.data.field(this.field)
      return '!=' === this.op
        ? null !== e && this.v(er(e, this.value))
        : null !== e && Ys(this.value) === Ys(e) && this.v(er(e, this.value))
    }
    v (t) {
      switch (this.op) {
        case '<':
          return t < 0
        case '<=':
          return t <= 0
        case '==':
          return 0 === t
        case '!=':
          return 0 !== t
        case '>':
          return t > 0
        case '>=':
          return t >= 0
        default:
          return fs()
      }
    }
    V () {
      return ['<', '<=', '>', '>=', '!=', 'not-in'].indexOf(this.op) >= 0
    }
  }
  class Tr extends Ir {
    constructor (t, e, n) {
      super(t, e, n), (this.key = Xs.fromName(n.referenceValue))
    }
    matches (t) {
      const e = Xs.comparator(t.key, this.key)
      return this.v(e)
    }
  }
  class Er extends Ir {
    constructor (t, e) {
      super(t, 'in', e), (this.keys = _r(0, e))
    }
    matches (t) {
      return this.keys.some(e => e.isEqual(t.key))
    }
  }
  class br extends Ir {
    constructor (t, e) {
      super(t, 'not-in', e), (this.keys = _r(0, e))
    }
    matches (t) {
      return !this.keys.some(e => e.isEqual(t.key))
    }
  }
  function _r (t, e) {
    var n
    return (
      (null === (n = e.arrayValue) || void 0 === n ? void 0 : n.values) || []
    ).map(t => Xs.fromName(t.referenceValue))
  }
  class Sr extends Ir {
    constructor (t, e) {
      super(t, 'array-contains', e)
    }
    matches (t) {
      const e = t.data.field(this.field)
      return ar(e) && tr(e.arrayValue, this.value)
    }
  }
  class kr extends Ir {
    constructor (t, e) {
      super(t, 'in', e)
    }
    matches (t) {
      const e = t.data.field(this.field)
      return null !== e && tr(this.value.arrayValue, e)
    }
  }
  class Ar extends Ir {
    constructor (t, e) {
      super(t, 'not-in', e)
    }
    matches (t) {
      if (tr(this.value.arrayValue, { nullValue: 'NULL_VALUE' })) return !1
      const e = t.data.field(this.field)
      return null !== e && !tr(this.value.arrayValue, e)
    }
  }
  class Cr extends Ir {
    constructor (t, e) {
      super(t, 'array-contains-any', e)
    }
    matches (t) {
      const e = t.data.field(this.field)
      return (
        !(!ar(e) || !e.arrayValue.values) &&
        e.arrayValue.values.some(t => tr(this.value.arrayValue, t))
      )
    }
  }
  class Nr {
    constructor (t, e) {
      ;(this.position = t), (this.before = e)
    }
  }
  function Rr (t) {
    return `${t.before ? 'b' : 'a'}:${t.position.map(t => ir(t)).join(',')}`
  }
  class Dr {
    constructor (t, e = 'asc') {
      ;(this.field = t), (this.dir = e)
    }
  }
  function Or (t, e) {
    return t.dir === e.dir && t.field.isEqual(e.field)
  }
  function Lr (t, e, n) {
    let i = 0
    for (let s = 0; s < t.position.length; s++) {
      const r = e[s],
        o = t.position[s]
      if (
        ((i = r.field.isKeyField()
          ? Xs.comparator(Xs.fromName(o.referenceValue), n.key)
          : er(o, n.data.field(r.field))),
        'desc' === r.dir && (i *= -1),
        0 !== i)
      )
        break
    }
    return t.before ? i <= 0 : i < 0
  }
  function Pr (t, e) {
    if (null === t) return null === e
    if (null === e) return !1
    if (t.before !== e.before || t.position.length !== e.position.length)
      return !1
    for (let n = 0; n < t.position.length; n++)
      if (!Zs(t.position[n], e.position[n])) return !1
    return !0
  }
  class Mr {
    constructor (
      t,
      e = null,
      n = [],
      i = [],
      s = null,
      r = 'F',
      o = null,
      a = null
    ) {
      ;(this.path = t),
        (this.collectionGroup = e),
        (this.explicitOrderBy = n),
        (this.filters = i),
        (this.limit = s),
        (this.limitType = r),
        (this.startAt = o),
        (this.endAt = a),
        (this.S = null),
        (this.D = null),
        this.startAt,
        this.endAt
    }
  }
  function Ur (t) {
    return new Mr(t)
  }
  function xr (t) {
    return !Js(t.limit) && 'F' === t.limitType
  }
  function Vr (t) {
    return !Js(t.limit) && 'L' === t.limitType
  }
  function Fr (t) {
    return t.explicitOrderBy.length > 0 ? t.explicitOrderBy[0].field : null
  }
  function qr (t) {
    for (const e of t.filters) if (e.V()) return e.field
    return null
  }
  function jr (t) {
    return null !== t.collectionGroup
  }
  function Br (t) {
    const e = ms(t)
    if (null === e.S) {
      e.S = []
      const t = qr(e),
        n = Fr(e)
      if (null !== t && null === n)
        t.isKeyField() || e.S.push(new Dr(t)),
          e.S.push(new Dr(Fs.keyField(), 'asc'))
      else {
        let t = !1
        for (const n of e.explicitOrderBy)
          e.S.push(n), n.field.isKeyField() && (t = !0)
        if (!t) {
          const t =
            e.explicitOrderBy.length > 0
              ? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir
              : 'asc'
          e.S.push(new Dr(Fs.keyField(), t))
        }
      }
    }
    return e.S
  }
  function $r (t) {
    const e = ms(t)
    if (!e.D)
      if ('F' === e.limitType)
        e.D = gr(
          e.path,
          e.collectionGroup,
          Br(e),
          e.filters,
          e.limit,
          e.startAt,
          e.endAt
        )
      else {
        const t = []
        for (const n of Br(e)) {
          const e = 'desc' === n.dir ? 'asc' : 'desc'
          t.push(new Dr(n.field, e))
        }
        const n = e.endAt ? new Nr(e.endAt.position, !e.endAt.before) : null,
          i = e.startAt ? new Nr(e.startAt.position, !e.startAt.before) : null
        e.D = gr(e.path, e.collectionGroup, t, e.filters, e.limit, n, i)
      }
    return e.D
  }
  function Hr (t, e) {
    return vr($r(t), $r(e)) && t.limitType === e.limitType
  }
  function Kr (t) {
    return `${yr($r(t))}|lt:${t.limitType}`
  }
  function zr (t) {
    return `Query(target=${(function (t) {
      let e = t.path.canonicalString()
      return (
        null !== t.collectionGroup &&
          (e += ' collectionGroup=' + t.collectionGroup),
        t.filters.length > 0 &&
          (e += `, filters: [${t.filters
            .map(t => {
              return `${(e = t).field.canonicalString()} ${e.op} ${ir(e.value)}`
              var e
            })
            .join(', ')}]`),
        Js(t.limit) || (e += ', limit: ' + t.limit),
        t.orderBy.length > 0 &&
          (e += `, orderBy: [${t.orderBy
            .map(t =>
              (function (t) {
                return `${t.field.canonicalString()} (${t.dir})`
              })(t)
            )
            .join(', ')}]`),
        t.startAt && (e += ', startAt: ' + Rr(t.startAt)),
        t.endAt && (e += ', endAt: ' + Rr(t.endAt)),
        `Target(${e})`
      )
    })($r(t))}; limitType=${t.limitType})`
  }
  function Gr (t, e) {
    return (
      e.isFoundDocument() &&
      (function (t, e) {
        const n = e.key.path
        return null !== t.collectionGroup
          ? e.key.hasCollectionId(t.collectionGroup) && t.path.isPrefixOf(n)
          : Xs.isDocumentKey(t.path)
          ? t.path.isEqual(n)
          : t.path.isImmediateParentOf(n)
      })(t, e) &&
      (function (t, e) {
        for (const n of t.explicitOrderBy)
          if (!n.field.isKeyField() && null === e.data.field(n.field)) return !1
        return !0
      })(t, e) &&
      (function (t, e) {
        for (const n of t.filters) if (!n.matches(e)) return !1
        return !0
      })(t, e) &&
      (function (t, e) {
        return !(
          (t.startAt && !Lr(t.startAt, Br(t), e)) ||
          (t.endAt && Lr(t.endAt, Br(t), e))
        )
      })(t, e)
    )
  }
  function Wr (t) {
    return (e, n) => {
      let i = !1
      for (const s of Br(t)) {
        const t = Jr(s, e, n)
        if (0 !== t) return t
        i = i || s.field.isKeyField()
      }
      return 0
    }
  }
  function Jr (t, e, n) {
    const i = t.field.isKeyField()
      ? Xs.comparator(e.key, n.key)
      : (function (t, e, n) {
          const i = e.data.field(t),
            s = n.data.field(t)
          return null !== i && null !== s ? er(i, s) : fs()
        })(t.field, e, n)
    switch (t.dir) {
      case 'asc':
        return i
      case 'desc':
        return -1 * i
      default:
        return fs()
    }
  }
  function Qr (t, e) {
    if (t.C) {
      if (isNaN(e)) return { doubleValue: 'NaN' }
      if (e === 1 / 0) return { doubleValue: 'Infinity' }
      if (e === -1 / 0) return { doubleValue: '-Infinity' }
    }
    return { doubleValue: Qs(e) ? '-0' : e }
  }
  function Xr (t) {
    return { integerValue: '' + t }
  }
  function Yr (t, e) {
    return (function (t) {
      return (
        'number' == typeof t &&
        Number.isInteger(t) &&
        !Qs(t) &&
        t <= Number.MAX_SAFE_INTEGER &&
        t >= Number.MIN_SAFE_INTEGER
      )
    })(e)
      ? Xr(e)
      : Qr(t, e)
  }
  class Zr {
    constructor () {
      this._ = void 0
    }
  }
  function to (t, e, n) {
    return t instanceof io
      ? (function (t, e) {
          const n = {
            fields: {
              __type__: { stringValue: 'server_timestamp' },
              __local_write_time__: {
                timestampValue: { seconds: t.seconds, nanos: t.nanoseconds }
              }
            }
          }
          return e && (n.fields.__previous_value__ = e), { mapValue: n }
        })(n, e)
      : t instanceof so
      ? ro(t, e)
      : t instanceof oo
      ? ao(t, e)
      : (function (t, e) {
          const n = no(t, e),
            i = ho(n) + ho(t.N)
          return or(n) && or(t.N) ? Xr(i) : Qr(t.k, i)
        })(t, e)
  }
  function eo (t, e, n) {
    return t instanceof so ? ro(t, e) : t instanceof oo ? ao(t, e) : n
  }
  function no (t, e) {
    return t instanceof co
      ? or((n = e)) ||
        (function (t) {
          return !!t && 'doubleValue' in t
        })(n)
        ? e
        : { integerValue: 0 }
      : null
    var n
  }
  class io extends Zr {}
  class so extends Zr {
    constructor (t) {
      super(), (this.elements = t)
    }
  }
  function ro (t, e) {
    const n = uo(e)
    for (const e of t.elements) n.some(t => Zs(t, e)) || n.push(e)
    return { arrayValue: { values: n } }
  }
  class oo extends Zr {
    constructor (t) {
      super(), (this.elements = t)
    }
  }
  function ao (t, e) {
    let n = uo(e)
    for (const e of t.elements) n = n.filter(t => !Zs(t, e))
    return { arrayValue: { values: n } }
  }
  class co extends Zr {
    constructor (t, e) {
      super(), (this.k = t), (this.N = e)
    }
  }
  function ho (t) {
    return Hs(t.integerValue || t.doubleValue)
  }
  function uo (t) {
    return ar(t) && t.arrayValue.values ? t.arrayValue.values.slice() : []
  }
  class lo {
    constructor (t, e) {
      ;(this.version = t), (this.transformResults = e)
    }
  }
  class fo {
    constructor (t, e) {
      ;(this.updateTime = t), (this.exists = e)
    }
    static none () {
      return new fo()
    }
    static exists (t) {
      return new fo(void 0, t)
    }
    static updateTime (t) {
      return new fo(t)
    }
    get isNone () {
      return void 0 === this.updateTime && void 0 === this.exists
    }
    isEqual (t) {
      return (
        this.exists === t.exists &&
        (this.updateTime
          ? !!t.updateTime && this.updateTime.isEqual(t.updateTime)
          : !t.updateTime)
      )
    }
  }
  function po (t, e) {
    return void 0 !== t.updateTime
      ? e.isFoundDocument() && e.version.isEqual(t.updateTime)
      : void 0 === t.exists || t.exists === e.isFoundDocument()
  }
  class mo {}
  function go (t, e, n) {
    t instanceof To
      ? (function (t, e, n) {
          const i = t.value.clone(),
            s = _o(t.fieldTransforms, e, n.transformResults)
          i.setAll(s),
            e.convertToFoundDocument(n.version, i).setHasCommittedMutations()
        })(t, e, n)
      : t instanceof Eo
      ? (function (t, e, n) {
          if (!po(t.precondition, e))
            return void e.convertToUnknownDocument(n.version)
          const i = _o(t.fieldTransforms, e, n.transformResults),
            s = e.data
          s.setAll(bo(t)),
            s.setAll(i),
            e.convertToFoundDocument(n.version, s).setHasCommittedMutations()
        })(t, e, n)
      : (function (t, e, n) {
          e.convertToNoDocument(n.version).setHasCommittedMutations()
        })(0, e, n)
  }
  function yo (t, e, n) {
    t instanceof To
      ? (function (t, e, n) {
          if (!po(t.precondition, e)) return
          const i = t.value.clone(),
            s = So(t.fieldTransforms, n, e)
          i.setAll(s), e.convertToFoundDocument(Io(e), i).setHasLocalMutations()
        })(t, e, n)
      : t instanceof Eo
      ? (function (t, e, n) {
          if (!po(t.precondition, e)) return
          const i = So(t.fieldTransforms, n, e),
            s = e.data
          s.setAll(bo(t)),
            s.setAll(i),
            e.convertToFoundDocument(Io(e), s).setHasLocalMutations()
        })(t, e, n)
      : (function (t, e) {
          po(t.precondition, e) && e.convertToNoDocument(Os.min())
        })(t, e)
  }
  function vo (t, e) {
    let n = null
    for (const i of t.fieldTransforms) {
      const t = e.data.field(i.field),
        s = no(i.transform, t || null)
      null != s && (null == n && (n = dr.empty()), n.set(i.field, s))
    }
    return n || null
  }
  function wo (t, e) {
    return (
      t.type === e.type &&
      !!t.key.isEqual(e.key) &&
      !!t.precondition.isEqual(e.precondition) &&
      !!(function (t, e) {
        return (
          (void 0 === t && void 0 === e) ||
          (!(!t || !e) &&
            Rs(t, e, (t, e) =>
              (function (t, e) {
                return (
                  t.field.isEqual(e.field) &&
                  (function (t, e) {
                    return (t instanceof so && e instanceof so) ||
                      (t instanceof oo && e instanceof oo)
                      ? Rs(t.elements, e.elements, Zs)
                      : t instanceof co && e instanceof co
                      ? Zs(t.N, e.N)
                      : t instanceof io && e instanceof io
                  })(t.transform, e.transform)
                )
              })(t, e)
            ))
        )
      })(t.fieldTransforms, e.fieldTransforms) &&
      (0 === t.type
        ? t.value.isEqual(e.value)
        : 1 !== t.type ||
          (t.data.isEqual(e.data) && t.fieldMask.isEqual(e.fieldMask)))
    )
  }
  function Io (t) {
    return t.isFoundDocument() ? t.version : Os.min()
  }
  class To extends mo {
    constructor (t, e, n, i = []) {
      super(),
        (this.key = t),
        (this.value = e),
        (this.precondition = n),
        (this.fieldTransforms = i),
        (this.type = 0)
    }
  }
  class Eo extends mo {
    constructor (t, e, n, i, s = []) {
      super(),
        (this.key = t),
        (this.data = e),
        (this.fieldMask = n),
        (this.precondition = i),
        (this.fieldTransforms = s),
        (this.type = 1)
    }
  }
  function bo (t) {
    const e = new Map()
    return (
      t.fieldMask.fields.forEach(n => {
        if (!n.isEmpty()) {
          const i = t.data.field(n)
          e.set(n, i)
        }
      }),
      e
    )
  }
  function _o (t, e, n) {
    const i = new Map()
    ps(t.length === n.length)
    for (let s = 0; s < n.length; s++) {
      const r = t[s],
        o = r.transform,
        a = e.data.field(r.field)
      i.set(r.field, eo(o, a, n[s]))
    }
    return i
  }
  function So (t, e, n) {
    const i = new Map()
    for (const s of t) {
      const t = s.transform,
        r = n.data.field(s.field)
      i.set(s.field, to(t, r, e))
    }
    return i
  }
  class ko extends mo {
    constructor (t, e) {
      super(),
        (this.key = t),
        (this.precondition = e),
        (this.type = 2),
        (this.fieldTransforms = [])
    }
  }
  class Ao extends mo {
    constructor (t, e) {
      super(),
        (this.key = t),
        (this.precondition = e),
        (this.type = 3),
        (this.fieldTransforms = [])
    }
  }
  class Co {
    constructor (t) {
      this.count = t
    }
  }
  var No, Ro
  function Do (t) {
    if (void 0 === t) return us('GRPC error has no .code'), gs.UNKNOWN
    switch (t) {
      case No.OK:
        return gs.OK
      case No.CANCELLED:
        return gs.CANCELLED
      case No.UNKNOWN:
        return gs.UNKNOWN
      case No.DEADLINE_EXCEEDED:
        return gs.DEADLINE_EXCEEDED
      case No.RESOURCE_EXHAUSTED:
        return gs.RESOURCE_EXHAUSTED
      case No.INTERNAL:
        return gs.INTERNAL
      case No.UNAVAILABLE:
        return gs.UNAVAILABLE
      case No.UNAUTHENTICATED:
        return gs.UNAUTHENTICATED
      case No.INVALID_ARGUMENT:
        return gs.INVALID_ARGUMENT
      case No.NOT_FOUND:
        return gs.NOT_FOUND
      case No.ALREADY_EXISTS:
        return gs.ALREADY_EXISTS
      case No.PERMISSION_DENIED:
        return gs.PERMISSION_DENIED
      case No.FAILED_PRECONDITION:
        return gs.FAILED_PRECONDITION
      case No.ABORTED:
        return gs.ABORTED
      case No.OUT_OF_RANGE:
        return gs.OUT_OF_RANGE
      case No.UNIMPLEMENTED:
        return gs.UNIMPLEMENTED
      case No.DATA_LOSS:
        return gs.DATA_LOSS
      default:
        return fs()
    }
  }
  ;((Ro = No || (No = {}))[(Ro.OK = 0)] = 'OK'),
    (Ro[(Ro.CANCELLED = 1)] = 'CANCELLED'),
    (Ro[(Ro.UNKNOWN = 2)] = 'UNKNOWN'),
    (Ro[(Ro.INVALID_ARGUMENT = 3)] = 'INVALID_ARGUMENT'),
    (Ro[(Ro.DEADLINE_EXCEEDED = 4)] = 'DEADLINE_EXCEEDED'),
    (Ro[(Ro.NOT_FOUND = 5)] = 'NOT_FOUND'),
    (Ro[(Ro.ALREADY_EXISTS = 6)] = 'ALREADY_EXISTS'),
    (Ro[(Ro.PERMISSION_DENIED = 7)] = 'PERMISSION_DENIED'),
    (Ro[(Ro.UNAUTHENTICATED = 16)] = 'UNAUTHENTICATED'),
    (Ro[(Ro.RESOURCE_EXHAUSTED = 8)] = 'RESOURCE_EXHAUSTED'),
    (Ro[(Ro.FAILED_PRECONDITION = 9)] = 'FAILED_PRECONDITION'),
    (Ro[(Ro.ABORTED = 10)] = 'ABORTED'),
    (Ro[(Ro.OUT_OF_RANGE = 11)] = 'OUT_OF_RANGE'),
    (Ro[(Ro.UNIMPLEMENTED = 12)] = 'UNIMPLEMENTED'),
    (Ro[(Ro.INTERNAL = 13)] = 'INTERNAL'),
    (Ro[(Ro.UNAVAILABLE = 14)] = 'UNAVAILABLE'),
    (Ro[(Ro.DATA_LOSS = 15)] = 'DATA_LOSS')
  class Oo {
    constructor (t, e) {
      ;(this.comparator = t), (this.root = e || Po.EMPTY)
    }
    insert (t, e) {
      return new Oo(
        this.comparator,
        this.root
          .insert(t, e, this.comparator)
          .copy(null, null, Po.BLACK, null, null)
      )
    }
    remove (t) {
      return new Oo(
        this.comparator,
        this.root
          .remove(t, this.comparator)
          .copy(null, null, Po.BLACK, null, null)
      )
    }
    get (t) {
      let e = this.root
      for (; !e.isEmpty(); ) {
        const n = this.comparator(t, e.key)
        if (0 === n) return e.value
        n < 0 ? (e = e.left) : n > 0 && (e = e.right)
      }
      return null
    }
    indexOf (t) {
      let e = 0,
        n = this.root
      for (; !n.isEmpty(); ) {
        const i = this.comparator(t, n.key)
        if (0 === i) return e + n.left.size
        i < 0 ? (n = n.left) : ((e += n.left.size + 1), (n = n.right))
      }
      return -1
    }
    isEmpty () {
      return this.root.isEmpty()
    }
    get size () {
      return this.root.size
    }
    minKey () {
      return this.root.minKey()
    }
    maxKey () {
      return this.root.maxKey()
    }
    inorderTraversal (t) {
      return this.root.inorderTraversal(t)
    }
    forEach (t) {
      this.inorderTraversal((e, n) => (t(e, n), !1))
    }
    toString () {
      const t = []
      return (
        this.inorderTraversal((e, n) => (t.push(`${e}:${n}`), !1)),
        `{${t.join(', ')}}`
      )
    }
    reverseTraversal (t) {
      return this.root.reverseTraversal(t)
    }
    getIterator () {
      return new Lo(this.root, null, this.comparator, !1)
    }
    getIteratorFrom (t) {
      return new Lo(this.root, t, this.comparator, !1)
    }
    getReverseIterator () {
      return new Lo(this.root, null, this.comparator, !0)
    }
    getReverseIteratorFrom (t) {
      return new Lo(this.root, t, this.comparator, !0)
    }
  }
  class Lo {
    constructor (t, e, n, i) {
      ;(this.isReverse = i), (this.nodeStack = [])
      let s = 1
      for (; !t.isEmpty(); )
        if (((s = e ? n(t.key, e) : 1), i && (s *= -1), s < 0))
          t = this.isReverse ? t.left : t.right
        else {
          if (0 === s) {
            this.nodeStack.push(t)
            break
          }
          this.nodeStack.push(t), (t = this.isReverse ? t.right : t.left)
        }
    }
    getNext () {
      let t = this.nodeStack.pop()
      const e = { key: t.key, value: t.value }
      if (this.isReverse)
        for (t = t.left; !t.isEmpty(); ) this.nodeStack.push(t), (t = t.right)
      else
        for (t = t.right; !t.isEmpty(); ) this.nodeStack.push(t), (t = t.left)
      return e
    }
    hasNext () {
      return this.nodeStack.length > 0
    }
    peek () {
      if (0 === this.nodeStack.length) return null
      const t = this.nodeStack[this.nodeStack.length - 1]
      return { key: t.key, value: t.value }
    }
  }
  class Po {
    constructor (t, e, n, i, s) {
      ;(this.key = t),
        (this.value = e),
        (this.color = null != n ? n : Po.RED),
        (this.left = null != i ? i : Po.EMPTY),
        (this.right = null != s ? s : Po.EMPTY),
        (this.size = this.left.size + 1 + this.right.size)
    }
    copy (t, e, n, i, s) {
      return new Po(
        null != t ? t : this.key,
        null != e ? e : this.value,
        null != n ? n : this.color,
        null != i ? i : this.left,
        null != s ? s : this.right
      )
    }
    isEmpty () {
      return !1
    }
    inorderTraversal (t) {
      return (
        this.left.inorderTraversal(t) ||
        t(this.key, this.value) ||
        this.right.inorderTraversal(t)
      )
    }
    reverseTraversal (t) {
      return (
        this.right.reverseTraversal(t) ||
        t(this.key, this.value) ||
        this.left.reverseTraversal(t)
      )
    }
    min () {
      return this.left.isEmpty() ? this : this.left.min()
    }
    minKey () {
      return this.min().key
    }
    maxKey () {
      return this.right.isEmpty() ? this.key : this.right.maxKey()
    }
    insert (t, e, n) {
      let i = this
      const s = n(t, i.key)
      return (
        (i =
          s < 0
            ? i.copy(null, null, null, i.left.insert(t, e, n), null)
            : 0 === s
            ? i.copy(null, e, null, null, null)
            : i.copy(null, null, null, null, i.right.insert(t, e, n))),
        i.fixUp()
      )
    }
    removeMin () {
      if (this.left.isEmpty()) return Po.EMPTY
      let t = this
      return (
        t.left.isRed() || t.left.left.isRed() || (t = t.moveRedLeft()),
        (t = t.copy(null, null, null, t.left.removeMin(), null)),
        t.fixUp()
      )
    }
    remove (t, e) {
      let n,
        i = this
      if (e(t, i.key) < 0)
        i.left.isEmpty() ||
          i.left.isRed() ||
          i.left.left.isRed() ||
          (i = i.moveRedLeft()),
          (i = i.copy(null, null, null, i.left.remove(t, e), null))
      else {
        if (
          (i.left.isRed() && (i = i.rotateRight()),
          i.right.isEmpty() ||
            i.right.isRed() ||
            i.right.left.isRed() ||
            (i = i.moveRedRight()),
          0 === e(t, i.key))
        ) {
          if (i.right.isEmpty()) return Po.EMPTY
          ;(n = i.right.min()),
            (i = i.copy(n.key, n.value, null, null, i.right.removeMin()))
        }
        i = i.copy(null, null, null, null, i.right.remove(t, e))
      }
      return i.fixUp()
    }
    isRed () {
      return this.color
    }
    fixUp () {
      let t = this
      return (
        t.right.isRed() && !t.left.isRed() && (t = t.rotateLeft()),
        t.left.isRed() && t.left.left.isRed() && (t = t.rotateRight()),
        t.left.isRed() && t.right.isRed() && (t = t.colorFlip()),
        t
      )
    }
    moveRedLeft () {
      let t = this.colorFlip()
      return (
        t.right.left.isRed() &&
          ((t = t.copy(null, null, null, null, t.right.rotateRight())),
          (t = t.rotateLeft()),
          (t = t.colorFlip())),
        t
      )
    }
    moveRedRight () {
      let t = this.colorFlip()
      return (
        t.left.left.isRed() && ((t = t.rotateRight()), (t = t.colorFlip())), t
      )
    }
    rotateLeft () {
      const t = this.copy(null, null, Po.RED, null, this.right.left)
      return this.right.copy(null, null, this.color, t, null)
    }
    rotateRight () {
      const t = this.copy(null, null, Po.RED, this.left.right, null)
      return this.left.copy(null, null, this.color, null, t)
    }
    colorFlip () {
      const t = this.left.copy(null, null, !this.left.color, null, null),
        e = this.right.copy(null, null, !this.right.color, null, null)
      return this.copy(null, null, !this.color, t, e)
    }
    checkMaxDepth () {
      const t = this.check()
      return Math.pow(2, t) <= this.size + 1
    }
    check () {
      if (this.isRed() && this.left.isRed()) throw fs()
      if (this.right.isRed()) throw fs()
      const t = this.left.check()
      if (t !== this.right.check()) throw fs()
      return t + (this.isRed() ? 0 : 1)
    }
  }
  ;(Po.EMPTY = null),
    (Po.RED = !0),
    (Po.BLACK = !1),
    (Po.EMPTY = new (class {
      constructor () {
        this.size = 0
      }
      get key () {
        throw fs()
      }
      get value () {
        throw fs()
      }
      get color () {
        throw fs()
      }
      get left () {
        throw fs()
      }
      get right () {
        throw fs()
      }
      copy (t, e, n, i, s) {
        return this
      }
      insert (t, e, n) {
        return new Po(t, e)
      }
      remove (t, e) {
        return this
      }
      isEmpty () {
        return !0
      }
      inorderTraversal (t) {
        return !1
      }
      reverseTraversal (t) {
        return !1
      }
      minKey () {
        return null
      }
      maxKey () {
        return null
      }
      isRed () {
        return !1
      }
      checkMaxDepth () {
        return !0
      }
      check () {
        return 0
      }
    })())
  class Mo {
    constructor (t) {
      ;(this.comparator = t), (this.data = new Oo(this.comparator))
    }
    has (t) {
      return null !== this.data.get(t)
    }
    first () {
      return this.data.minKey()
    }
    last () {
      return this.data.maxKey()
    }
    get size () {
      return this.data.size
    }
    indexOf (t) {
      return this.data.indexOf(t)
    }
    forEach (t) {
      this.data.inorderTraversal((e, n) => (t(e), !1))
    }
    forEachInRange (t, e) {
      const n = this.data.getIteratorFrom(t[0])
      for (; n.hasNext(); ) {
        const i = n.getNext()
        if (this.comparator(i.key, t[1]) >= 0) return
        e(i.key)
      }
    }
    forEachWhile (t, e) {
      let n
      for (
        n =
          void 0 !== e ? this.data.getIteratorFrom(e) : this.data.getIterator();
        n.hasNext();

      )
        if (!t(n.getNext().key)) return
    }
    firstAfterOrEqual (t) {
      const e = this.data.getIteratorFrom(t)
      return e.hasNext() ? e.getNext().key : null
    }
    getIterator () {
      return new Uo(this.data.getIterator())
    }
    getIteratorFrom (t) {
      return new Uo(this.data.getIteratorFrom(t))
    }
    add (t) {
      return this.copy(this.data.remove(t).insert(t, !0))
    }
    delete (t) {
      return this.has(t) ? this.copy(this.data.remove(t)) : this
    }
    isEmpty () {
      return this.data.isEmpty()
    }
    unionWith (t) {
      let e = this
      return (
        e.size < t.size && ((e = t), (t = this)),
        t.forEach(t => {
          e = e.add(t)
        }),
        e
      )
    }
    isEqual (t) {
      if (!(t instanceof Mo)) return !1
      if (this.size !== t.size) return !1
      const e = this.data.getIterator(),
        n = t.data.getIterator()
      for (; e.hasNext(); ) {
        const t = e.getNext().key,
          i = n.getNext().key
        if (0 !== this.comparator(t, i)) return !1
      }
      return !0
    }
    toArray () {
      const t = []
      return (
        this.forEach(e => {
          t.push(e)
        }),
        t
      )
    }
    toString () {
      const t = []
      return this.forEach(e => t.push(e)), 'SortedSet(' + t.toString() + ')'
    }
    copy (t) {
      const e = new Mo(this.comparator)
      return (e.data = t), e
    }
  }
  class Uo {
    constructor (t) {
      this.iter = t
    }
    getNext () {
      return this.iter.getNext().key
    }
    hasNext () {
      return this.iter.hasNext()
    }
  }
  const xo = new Oo(Xs.comparator)
  function Vo () {
    return xo
  }
  const Fo = new Oo(Xs.comparator)
  function qo () {
    return Fo
  }
  const jo = new Oo(Xs.comparator)
  const Bo = new Mo(Xs.comparator)
  function $o (...t) {
    let e = Bo
    for (const n of t) e = e.add(n)
    return e
  }
  const Ho = new Mo(Ns)
  function Ko () {
    return Ho
  }
  class zo {
    constructor (t, e, n, i, s) {
      ;(this.snapshotVersion = t),
        (this.targetChanges = e),
        (this.targetMismatches = n),
        (this.documentUpdates = i),
        (this.resolvedLimboDocuments = s)
    }
    static createSynthesizedRemoteEventForCurrentChange (t, e) {
      const n = new Map()
      return (
        n.set(t, Go.createSynthesizedTargetChangeForCurrentChange(t, e)),
        new zo(Os.min(), n, Ko(), Vo(), $o())
      )
    }
  }
  class Go {
    constructor (t, e, n, i, s) {
      ;(this.resumeToken = t),
        (this.current = e),
        (this.addedDocuments = n),
        (this.modifiedDocuments = i),
        (this.removedDocuments = s)
    }
    static createSynthesizedTargetChangeForCurrentChange (t, e) {
      return new Go(js.EMPTY_BYTE_STRING, e, $o(), $o(), $o())
    }
  }
  class Wo {
    constructor (t, e, n, i) {
      ;(this.$ = t), (this.removedTargetIds = e), (this.key = n), (this.O = i)
    }
  }
  class Jo {
    constructor (t, e) {
      ;(this.targetId = t), (this.M = e)
    }
  }
  class Qo {
    constructor (t, e, n = js.EMPTY_BYTE_STRING, i = null) {
      ;(this.state = t),
        (this.targetIds = e),
        (this.resumeToken = n),
        (this.cause = i)
    }
  }
  class Xo {
    constructor () {
      ;(this.F = 0),
        (this.L = ta()),
        (this.B = js.EMPTY_BYTE_STRING),
        (this.U = !1),
        (this.q = !0)
    }
    get current () {
      return this.U
    }
    get resumeToken () {
      return this.B
    }
    get K () {
      return 0 !== this.F
    }
    get j () {
      return this.q
    }
    W (t) {
      t.approximateByteSize() > 0 && ((this.q = !0), (this.B = t))
    }
    G () {
      let t = $o(),
        e = $o(),
        n = $o()
      return (
        this.L.forEach((i, s) => {
          switch (s) {
            case 0:
              t = t.add(i)
              break
            case 2:
              e = e.add(i)
              break
            case 1:
              n = n.add(i)
              break
            default:
              fs()
          }
        }),
        new Go(this.B, this.U, t, e, n)
      )
    }
    H () {
      ;(this.q = !1), (this.L = ta())
    }
    J (t, e) {
      ;(this.q = !0), (this.L = this.L.insert(t, e))
    }
    Y (t) {
      ;(this.q = !0), (this.L = this.L.remove(t))
    }
    X () {
      this.F += 1
    }
    Z () {
      this.F -= 1
    }
    tt () {
      ;(this.q = !0), (this.U = !0)
    }
  }
  class Yo {
    constructor (t) {
      ;(this.et = t),
        (this.nt = new Map()),
        (this.st = Vo()),
        (this.it = Zo()),
        (this.rt = new Mo(Ns))
    }
    ot (t) {
      for (const e of t.$)
        t.O && t.O.isFoundDocument() ? this.ct(e, t.O) : this.at(e, t.key, t.O)
      for (const e of t.removedTargetIds) this.at(e, t.key, t.O)
    }
    ut (t) {
      this.forEachTarget(t, e => {
        const n = this.ht(e)
        switch (t.state) {
          case 0:
            this.lt(e) && n.W(t.resumeToken)
            break
          case 1:
            n.Z(), n.K || n.H(), n.W(t.resumeToken)
            break
          case 2:
            n.Z(), n.K || this.removeTarget(e)
            break
          case 3:
            this.lt(e) && (n.tt(), n.W(t.resumeToken))
            break
          case 4:
            this.lt(e) && (this.ft(e), n.W(t.resumeToken))
            break
          default:
            fs()
        }
      })
    }
    forEachTarget (t, e) {
      t.targetIds.length > 0
        ? t.targetIds.forEach(e)
        : this.nt.forEach((t, n) => {
            this.lt(n) && e(n)
          })
    }
    dt (t) {
      const e = t.targetId,
        n = t.M.count,
        i = this.wt(e)
      if (i) {
        const t = i.target
        if (wr(t))
          if (0 === n) {
            const n = new Xs(t.path)
            this.at(e, n, pr.newNoDocument(n, Os.min()))
          } else ps(1 === n)
        else this._t(e) !== n && (this.ft(e), (this.rt = this.rt.add(e)))
      }
    }
    gt (t) {
      const e = new Map()
      this.nt.forEach((n, i) => {
        const s = this.wt(i)
        if (s) {
          if (n.current && wr(s.target)) {
            const e = new Xs(s.target.path)
            null !== this.st.get(e) ||
              this.yt(i, e) ||
              this.at(i, e, pr.newNoDocument(e, t))
          }
          n.j && (e.set(i, n.G()), n.H())
        }
      })
      let n = $o()
      this.it.forEach((t, e) => {
        let i = !0
        e.forEachWhile(t => {
          const e = this.wt(t)
          return !e || 2 === e.purpose || ((i = !1), !1)
        }),
          i && (n = n.add(t))
      })
      const i = new zo(t, e, this.rt, this.st, n)
      return (this.st = Vo()), (this.it = Zo()), (this.rt = new Mo(Ns)), i
    }
    ct (t, e) {
      if (!this.lt(t)) return
      const n = this.yt(t, e.key) ? 2 : 0
      this.ht(t).J(e.key, n),
        (this.st = this.st.insert(e.key, e)),
        (this.it = this.it.insert(e.key, this.Tt(e.key).add(t)))
    }
    at (t, e, n) {
      if (!this.lt(t)) return
      const i = this.ht(t)
      this.yt(t, e) ? i.J(e, 1) : i.Y(e),
        (this.it = this.it.insert(e, this.Tt(e).delete(t))),
        n && (this.st = this.st.insert(e, n))
    }
    removeTarget (t) {
      this.nt.delete(t)
    }
    _t (t) {
      const e = this.ht(t).G()
      return (
        this.et.getRemoteKeysForTarget(t).size +
        e.addedDocuments.size -
        e.removedDocuments.size
      )
    }
    X (t) {
      this.ht(t).X()
    }
    ht (t) {
      let e = this.nt.get(t)
      return e || ((e = new Xo()), this.nt.set(t, e)), e
    }
    Tt (t) {
      let e = this.it.get(t)
      return e || ((e = new Mo(Ns)), (this.it = this.it.insert(t, e))), e
    }
    lt (t) {
      const e = null !== this.wt(t)
      return e || hs('WatchChangeAggregator', 'Detected inactive target', t), e
    }
    wt (t) {
      const e = this.nt.get(t)
      return e && e.K ? null : this.et.Et(t)
    }
    ft (t) {
      this.nt.set(t, new Xo()),
        this.et.getRemoteKeysForTarget(t).forEach(e => {
          this.at(t, e, null)
        })
    }
    yt (t, e) {
      return this.et.getRemoteKeysForTarget(t).has(e)
    }
  }
  function Zo () {
    return new Oo(Xs.comparator)
  }
  function ta () {
    return new Oo(Xs.comparator)
  }
  const ea = { asc: 'ASCENDING', desc: 'DESCENDING' },
    na = {
      '<': 'LESS_THAN',
      '<=': 'LESS_THAN_OR_EQUAL',
      '>': 'GREATER_THAN',
      '>=': 'GREATER_THAN_OR_EQUAL',
      '==': 'EQUAL',
      '!=': 'NOT_EQUAL',
      'array-contains': 'ARRAY_CONTAINS',
      in: 'IN',
      'not-in': 'NOT_IN',
      'array-contains-any': 'ARRAY_CONTAINS_ANY'
    }
  class ia {
    constructor (t, e) {
      ;(this.databaseId = t), (this.C = e)
    }
  }
  function sa (t, e) {
    return t.C
      ? `${new Date(1e3 * e.seconds)
          .toISOString()
          .replace(/\.\d*/, '')
          .replace('Z', '')}.${('000000000' + e.nanoseconds).slice(-9)}Z`
      : { seconds: '' + e.seconds, nanos: e.nanoseconds }
  }
  function ra (t, e) {
    return t.C ? e.toBase64() : e.toUint8Array()
  }
  function oa (t, e) {
    return sa(t, e.toTimestamp())
  }
  function aa (t) {
    return (
      ps(!!t),
      Os.fromTimestamp(
        (function (t) {
          const e = $s(t)
          return new Ds(e.seconds, e.nanos)
        })(t)
      )
    )
  }
  function ca (t, e) {
    return (function (t) {
      return new xs(['projects', t.projectId, 'databases', t.database])
    })(t)
      .child('documents')
      .child(e)
      .canonicalString()
  }
  function ha (t) {
    const e = xs.fromString(t)
    return ps(Na(e)), e
  }
  function ua (t, e) {
    return ca(t.databaseId, e.path)
  }
  function la (t, e) {
    const n = ha(e)
    if (n.get(1) !== t.databaseId.projectId)
      throw new ys(
        gs.INVALID_ARGUMENT,
        'Tried to deserialize key from different project: ' +
          n.get(1) +
          ' vs ' +
          t.databaseId.projectId
      )
    if (n.get(3) !== t.databaseId.database)
      throw new ys(
        gs.INVALID_ARGUMENT,
        'Tried to deserialize key from different database: ' +
          n.get(3) +
          ' vs ' +
          t.databaseId.database
      )
    return new Xs(pa(n))
  }
  function da (t, e) {
    return ca(t.databaseId, e)
  }
  function fa (t) {
    return new xs([
      'projects',
      t.databaseId.projectId,
      'databases',
      t.databaseId.database
    ]).canonicalString()
  }
  function pa (t) {
    return ps(t.length > 4 && 'documents' === t.get(4)), t.popFirst(5)
  }
  function ma (t, e, n) {
    return { name: ua(t, e), fields: n.value.mapValue.fields }
  }
  function ga (t, e) {
    return { documents: [da(t, e.path)] }
  }
  function ya (t, e) {
    const n = { structuredQuery: {} },
      i = e.path
    null !== e.collectionGroup
      ? ((n.parent = da(t, i)),
        (n.structuredQuery.from = [
          { collectionId: e.collectionGroup, allDescendants: !0 }
        ]))
      : ((n.parent = da(t, i.popLast())),
        (n.structuredQuery.from = [{ collectionId: i.lastSegment() }]))
    const s = (function (t) {
      if (0 === t.length) return
      const e = t.map(t =>
        (function (t) {
          if ('==' === t.op) {
            if (hr(t.value))
              return { unaryFilter: { field: _a(t.field), op: 'IS_NAN' } }
            if (cr(t.value))
              return { unaryFilter: { field: _a(t.field), op: 'IS_NULL' } }
          } else if ('!=' === t.op) {
            if (hr(t.value))
              return { unaryFilter: { field: _a(t.field), op: 'IS_NOT_NAN' } }
            if (cr(t.value))
              return { unaryFilter: { field: _a(t.field), op: 'IS_NOT_NULL' } }
          }
          return {
            fieldFilter: { field: _a(t.field), op: ba(t.op), value: t.value }
          }
        })(t)
      )
      return 1 === e.length
        ? e[0]
        : { compositeFilter: { op: 'AND', filters: e } }
    })(e.filters)
    s && (n.structuredQuery.where = s)
    const r = (function (t) {
      if (0 !== t.length)
        return t.map(t =>
          (function (t) {
            return { field: _a(t.field), direction: Ea(t.dir) }
          })(t)
        )
    })(e.orderBy)
    r && (n.structuredQuery.orderBy = r)
    const o = (function (t, e) {
      return t.C || Js(e) ? e : { value: e }
    })(t, e.limit)
    return (
      null !== o && (n.structuredQuery.limit = o),
      e.startAt && (n.structuredQuery.startAt = Ia(e.startAt)),
      e.endAt && (n.structuredQuery.endAt = Ia(e.endAt)),
      n
    )
  }
  function va (t) {
    let e = (function (t) {
      const e = ha(t)
      return 4 === e.length ? xs.emptyPath() : pa(e)
    })(t.parent)
    const n = t.structuredQuery,
      i = n.from ? n.from.length : 0
    let s = null
    if (i > 0) {
      ps(1 === i)
      const t = n.from[0]
      t.allDescendants ? (s = t.collectionId) : (e = e.child(t.collectionId))
    }
    let r = []
    n.where && (r = wa(n.where))
    let o = []
    n.orderBy &&
      (o = n.orderBy.map(t =>
        (function (t) {
          return new Dr(
            Sa(t.field),
            (function (t) {
              switch (t) {
                case 'ASCENDING':
                  return 'asc'
                case 'DESCENDING':
                  return 'desc'
                default:
                  return
              }
            })(t.direction)
          )
        })(t)
      ))
    let a = null
    n.limit &&
      (a = (function (t) {
        let e
        return (e = 'object' == typeof t ? t.value : t), Js(e) ? null : e
      })(n.limit))
    let c = null
    n.startAt && (c = Ta(n.startAt))
    let h = null
    return (
      n.endAt && (h = Ta(n.endAt)),
      (function (t, e, n, i, s, r, o, a) {
        return new Mr(t, e, n, i, s, r, o, a)
      })(e, s, o, r, a, 'F', c, h)
    )
  }
  function wa (t) {
    return t
      ? void 0 !== t.unaryFilter
        ? [Aa(t)]
        : void 0 !== t.fieldFilter
        ? [ka(t)]
        : void 0 !== t.compositeFilter
        ? t.compositeFilter.filters
            .map(t => wa(t))
            .reduce((t, e) => t.concat(e))
        : fs()
      : []
  }
  function Ia (t) {
    return { before: t.before, values: t.position }
  }
  function Ta (t) {
    const e = !!t.before,
      n = t.values || []
    return new Nr(n, e)
  }
  function Ea (t) {
    return ea[t]
  }
  function ba (t) {
    return na[t]
  }
  function _a (t) {
    return { fieldPath: t.canonicalString() }
  }
  function Sa (t) {
    return Fs.fromServerFormat(t.fieldPath)
  }
  function ka (t) {
    return Ir.create(
      Sa(t.fieldFilter.field),
      (function (t) {
        switch (t) {
          case 'EQUAL':
            return '=='
          case 'NOT_EQUAL':
            return '!='
          case 'GREATER_THAN':
            return '>'
          case 'GREATER_THAN_OR_EQUAL':
            return '>='
          case 'LESS_THAN':
            return '<'
          case 'LESS_THAN_OR_EQUAL':
            return '<='
          case 'ARRAY_CONTAINS':
            return 'array-contains'
          case 'IN':
            return 'in'
          case 'NOT_IN':
            return 'not-in'
          case 'ARRAY_CONTAINS_ANY':
            return 'array-contains-any'
          default:
            return fs()
        }
      })(t.fieldFilter.op),
      t.fieldFilter.value
    )
  }
  function Aa (t) {
    switch (t.unaryFilter.op) {
      case 'IS_NAN':
        const e = Sa(t.unaryFilter.field)
        return Ir.create(e, '==', { doubleValue: NaN })
      case 'IS_NULL':
        const n = Sa(t.unaryFilter.field)
        return Ir.create(n, '==', { nullValue: 'NULL_VALUE' })
      case 'IS_NOT_NAN':
        const i = Sa(t.unaryFilter.field)
        return Ir.create(i, '!=', { doubleValue: NaN })
      case 'IS_NOT_NULL':
        const s = Sa(t.unaryFilter.field)
        return Ir.create(s, '!=', { nullValue: 'NULL_VALUE' })
      default:
        return fs()
    }
  }
  function Ca (t) {
    const e = []
    return t.fields.forEach(t => e.push(t.canonicalString())), { fieldPaths: e }
  }
  function Na (t) {
    return t.length >= 4 && 'projects' === t.get(0) && 'databases' === t.get(2)
  }
  function Ra (t) {
    let e = ''
    for (let n = 0; n < t.length; n++)
      e.length > 0 && (e = Oa(e)), (e = Da(t.get(n), e))
    return Oa(e)
  }
  function Da (t, e) {
    let n = e
    const i = t.length
    for (let e = 0; e < i; e++) {
      const i = t.charAt(e)
      switch (i) {
        case '\0':
          n += ''
          break
        case '':
          n += ''
          break
        default:
          n += i
      }
    }
    return n
  }
  function Oa (t) {
    return t + ''
  }
  class La {
    constructor (t, e, n) {
      ;(this.ownerId = t),
        (this.allowTabSynchronization = e),
        (this.leaseTimestampMs = n)
    }
  }
  ;(La.store = 'owner'), (La.key = 'owner')
  class Pa {
    constructor (t, e, n) {
      ;(this.userId = t),
        (this.lastAcknowledgedBatchId = e),
        (this.lastStreamToken = n)
    }
  }
  ;(Pa.store = 'mutationQueues'), (Pa.keyPath = 'userId')
  class Ma {
    constructor (t, e, n, i, s) {
      ;(this.userId = t),
        (this.batchId = e),
        (this.localWriteTimeMs = n),
        (this.baseMutations = i),
        (this.mutations = s)
    }
  }
  ;(Ma.store = 'mutations'),
    (Ma.keyPath = 'batchId'),
    (Ma.userMutationsIndex = 'userMutationsIndex'),
    (Ma.userMutationsKeyPath = ['userId', 'batchId'])
  class Ua {
    constructor () {}
    static prefixForUser (t) {
      return [t]
    }
    static prefixForPath (t, e) {
      return [t, Ra(e)]
    }
    static key (t, e, n) {
      return [t, Ra(e), n]
    }
  }
  ;(Ua.store = 'documentMutations'), (Ua.PLACEHOLDER = new Ua())
  class xa {
    constructor (t, e, n, i, s, r) {
      ;(this.unknownDocument = t),
        (this.noDocument = e),
        (this.document = n),
        (this.hasCommittedMutations = i),
        (this.readTime = s),
        (this.parentPath = r)
    }
  }
  ;(xa.store = 'remoteDocuments'),
    (xa.readTimeIndex = 'readTimeIndex'),
    (xa.readTimeIndexPath = 'readTime'),
    (xa.collectionReadTimeIndex = 'collectionReadTimeIndex'),
    (xa.collectionReadTimeIndexPath = ['parentPath', 'readTime'])
  class Va {
    constructor (t) {
      this.byteSize = t
    }
  }
  ;(Va.store = 'remoteDocumentGlobal'), (Va.key = 'remoteDocumentGlobalKey')
  class Fa {
    constructor (t, e, n, i, s, r, o) {
      ;(this.targetId = t),
        (this.canonicalId = e),
        (this.readTime = n),
        (this.resumeToken = i),
        (this.lastListenSequenceNumber = s),
        (this.lastLimboFreeSnapshotVersion = r),
        (this.query = o)
    }
  }
  ;(Fa.store = 'targets'),
    (Fa.keyPath = 'targetId'),
    (Fa.queryTargetsIndexName = 'queryTargetsIndex'),
    (Fa.queryTargetsKeyPath = ['canonicalId', 'targetId'])
  class qa {
    constructor (t, e, n) {
      ;(this.targetId = t), (this.path = e), (this.sequenceNumber = n)
    }
  }
  ;(qa.store = 'targetDocuments'),
    (qa.keyPath = ['targetId', 'path']),
    (qa.documentTargetsIndex = 'documentTargetsIndex'),
    (qa.documentTargetsKeyPath = ['path', 'targetId'])
  class ja {
    constructor (t, e, n, i) {
      ;(this.highestTargetId = t),
        (this.highestListenSequenceNumber = e),
        (this.lastRemoteSnapshotVersion = n),
        (this.targetCount = i)
    }
  }
  ;(ja.key = 'targetGlobalKey'), (ja.store = 'targetGlobal')
  class Ba {
    constructor (t, e) {
      ;(this.collectionId = t), (this.parent = e)
    }
  }
  ;(Ba.store = 'collectionParents'), (Ba.keyPath = ['collectionId', 'parent'])
  class $a {
    constructor (t, e, n, i) {
      ;(this.clientId = t),
        (this.updateTimeMs = e),
        (this.networkEnabled = n),
        (this.inForeground = i)
    }
  }
  ;($a.store = 'clientMetadata'), ($a.keyPath = 'clientId')
  class Ha {
    constructor (t, e, n) {
      ;(this.bundleId = t), (this.createTime = e), (this.version = n)
    }
  }
  ;(Ha.store = 'bundles'), (Ha.keyPath = 'bundleId')
  class Ka {
    constructor (t, e, n) {
      ;(this.name = t), (this.readTime = e), (this.bundledQuery = n)
    }
  }
  ;(Ka.store = 'namedQueries'),
    (Ka.keyPath = 'name'),
    Pa.store,
    Ma.store,
    Ua.store,
    xa.store,
    Fa.store,
    La.store,
    ja.store,
    qa.store,
    $a.store,
    Va.store,
    Ba.store,
    Ha.store,
    Ka.store
  class za {
    constructor (t) {
      ;(this.nextCallback = null),
        (this.catchCallback = null),
        (this.result = void 0),
        (this.error = void 0),
        (this.isDone = !1),
        (this.callbackAttached = !1),
        t(
          t => {
            ;(this.isDone = !0),
              (this.result = t),
              this.nextCallback && this.nextCallback(t)
          },
          t => {
            ;(this.isDone = !0),
              (this.error = t),
              this.catchCallback && this.catchCallback(t)
          }
        )
    }
    catch (t) {
      return this.next(void 0, t)
    }
    next (t, e) {
      return (
        this.callbackAttached && fs(),
        (this.callbackAttached = !0),
        this.isDone
          ? this.error
            ? this.wrapFailure(e, this.error)
            : this.wrapSuccess(t, this.result)
          : new za((n, i) => {
              ;(this.nextCallback = e => {
                this.wrapSuccess(t, e).next(n, i)
              }),
                (this.catchCallback = t => {
                  this.wrapFailure(e, t).next(n, i)
                })
            })
      )
    }
    toPromise () {
      return new Promise((t, e) => {
        this.next(t, e)
      })
    }
    wrapUserFunction (t) {
      try {
        const e = t()
        return e instanceof za ? e : za.resolve(e)
      } catch (t) {
        return za.reject(t)
      }
    }
    wrapSuccess (t, e) {
      return t ? this.wrapUserFunction(() => t(e)) : za.resolve(e)
    }
    wrapFailure (t, e) {
      return t ? this.wrapUserFunction(() => t(e)) : za.reject(e)
    }
    static resolve (t) {
      return new za((e, n) => {
        e(t)
      })
    }
    static reject (t) {
      return new za((e, n) => {
        n(t)
      })
    }
    static waitFor (t) {
      return new za((e, n) => {
        let i = 0,
          s = 0,
          r = !1
        t.forEach(t => {
          ++i,
            t.next(
              () => {
                ++s, r && s === i && e()
              },
              t => n(t)
            )
        }),
          (r = !0),
          s === i && e()
      })
    }
    static or (t) {
      let e = za.resolve(!1)
      for (const n of t) e = e.next(t => (t ? za.resolve(t) : n()))
      return e
    }
    static forEach (t, e) {
      const n = []
      return (
        t.forEach((t, i) => {
          n.push(e.call(this, t, i))
        }),
        this.waitFor(n)
      )
    }
  }
  function Ga (t) {
    return 'IndexedDbTransactionError' === t.name
  }
  class Wa {
    constructor (t, e, n, i) {
      ;(this.batchId = t),
        (this.localWriteTime = e),
        (this.baseMutations = n),
        (this.mutations = i)
    }
    applyToRemoteDocument (t, e) {
      const n = e.mutationResults
      for (let e = 0; e < this.mutations.length; e++) {
        const i = this.mutations[e]
        i.key.isEqual(t.key) && go(i, t, n[e])
      }
    }
    applyToLocalView (t) {
      for (const e of this.baseMutations)
        e.key.isEqual(t.key) && yo(e, t, this.localWriteTime)
      for (const e of this.mutations)
        e.key.isEqual(t.key) && yo(e, t, this.localWriteTime)
    }
    applyToLocalDocumentSet (t) {
      this.mutations.forEach(e => {
        const n = t.get(e.key),
          i = n
        this.applyToLocalView(i),
          n.isValidDocument() || i.convertToNoDocument(Os.min())
      })
    }
    keys () {
      return this.mutations.reduce((t, e) => t.add(e.key), $o())
    }
    isEqual (t) {
      return (
        this.batchId === t.batchId &&
        Rs(this.mutations, t.mutations, (t, e) => wo(t, e)) &&
        Rs(this.baseMutations, t.baseMutations, (t, e) => wo(t, e))
      )
    }
  }
  class Ja {
    constructor (t, e, n, i) {
      ;(this.batch = t),
        (this.commitVersion = e),
        (this.mutationResults = n),
        (this.docVersions = i)
    }
    static from (t, e, n) {
      ps(t.mutations.length === n.length)
      let i = jo
      const s = t.mutations
      for (let t = 0; t < s.length; t++) i = i.insert(s[t].key, n[t].version)
      return new Ja(t, e, n, i)
    }
  }
  class Qa {
    constructor (
      t,
      e,
      n,
      i,
      s = Os.min(),
      r = Os.min(),
      o = js.EMPTY_BYTE_STRING
    ) {
      ;(this.target = t),
        (this.targetId = e),
        (this.purpose = n),
        (this.sequenceNumber = i),
        (this.snapshotVersion = s),
        (this.lastLimboFreeSnapshotVersion = r),
        (this.resumeToken = o)
    }
    withSequenceNumber (t) {
      return new Qa(
        this.target,
        this.targetId,
        this.purpose,
        t,
        this.snapshotVersion,
        this.lastLimboFreeSnapshotVersion,
        this.resumeToken
      )
    }
    withResumeToken (t, e) {
      return new Qa(
        this.target,
        this.targetId,
        this.purpose,
        this.sequenceNumber,
        e,
        this.lastLimboFreeSnapshotVersion,
        t
      )
    }
    withLastLimboFreeSnapshotVersion (t) {
      return new Qa(
        this.target,
        this.targetId,
        this.purpose,
        this.sequenceNumber,
        this.snapshotVersion,
        t,
        this.resumeToken
      )
    }
  }
  class Xa {
    constructor (t) {
      this.Gt = t
    }
  }
  function Ya (t) {
    const e = va({ parent: t.parent, structuredQuery: t.structuredQuery })
    return 'LAST' === t.limitType
      ? (function (t, e, n) {
          return new Mr(
            t.path,
            t.collectionGroup,
            t.explicitOrderBy.slice(),
            t.filters.slice(),
            e,
            n,
            t.startAt,
            t.endAt
          )
        })(e, e.limit, 'L')
      : e
  }
  class Za {
    constructor () {
      this.zt = new tc()
    }
    addToCollectionParentIndex (t, e) {
      return this.zt.add(e), za.resolve()
    }
    getCollectionParents (t, e) {
      return za.resolve(this.zt.getEntries(e))
    }
  }
  class tc {
    constructor () {
      this.index = {}
    }
    add (t) {
      const e = t.lastSegment(),
        n = t.popLast(),
        i = this.index[e] || new Mo(xs.comparator),
        s = !i.has(n)
      return (this.index[e] = i.add(n)), s
    }
    has (t) {
      const e = t.lastSegment(),
        n = t.popLast(),
        i = this.index[e]
      return i && i.has(n)
    }
    getEntries (t) {
      return (this.index[t] || new Mo(xs.comparator)).toArray()
    }
  }
  class ec {
    constructor (t, e, n) {
      ;(this.cacheSizeCollectionThreshold = t),
        (this.percentileToCollect = e),
        (this.maximumSequenceNumbersToCollect = n)
    }
    static withCacheSize (t) {
      return new ec(
        t,
        ec.DEFAULT_COLLECTION_PERCENTILE,
        ec.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT
      )
    }
  }
  ;(ec.DEFAULT_COLLECTION_PERCENTILE = 10),
    (ec.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3),
    (ec.DEFAULT = new ec(
      41943040,
      ec.DEFAULT_COLLECTION_PERCENTILE,
      ec.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT
    )),
    (ec.DISABLED = new ec(-1, 0, 0))
  class nc {
    constructor (t) {
      this.se = t
    }
    next () {
      return (this.se += 2), this.se
    }
    static ie () {
      return new nc(0)
    }
    static re () {
      return new nc(-1)
    }
  }
  async function ic (t) {
    if (
      t.code !== gs.FAILED_PRECONDITION ||
      'The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.' !==
        t.message
    )
      throw t
    hs('LocalStore', 'Unexpectedly lost primary lease')
  }
  class sc {
    constructor (t, e) {
      ;(this.mapKeyFn = t), (this.equalsFn = e), (this.inner = {})
    }
    get (t) {
      const e = this.mapKeyFn(t),
        n = this.inner[e]
      if (void 0 !== n)
        for (const [e, i] of n) if (this.equalsFn(e, t)) return i
    }
    has (t) {
      return void 0 !== this.get(t)
    }
    set (t, e) {
      const n = this.mapKeyFn(t),
        i = this.inner[n]
      if (void 0 !== i) {
        for (let n = 0; n < i.length; n++)
          if (this.equalsFn(i[n][0], t)) return void (i[n] = [t, e])
        i.push([t, e])
      } else this.inner[n] = [[t, e]]
    }
    delete (t) {
      const e = this.mapKeyFn(t),
        n = this.inner[e]
      if (void 0 === n) return !1
      for (let i = 0; i < n.length; i++)
        if (this.equalsFn(n[i][0], t))
          return 1 === n.length ? delete this.inner[e] : n.splice(i, 1), !0
      return !1
    }
    forEach (t) {
      Ps(this.inner, (e, n) => {
        for (const [e, i] of n) t(e, i)
      })
    }
    isEmpty () {
      return Ms(this.inner)
    }
  }
  class rc {
    constructor (t, e, n) {
      ;(this.Je = t), (this.An = e), (this.Jt = n)
    }
    Rn (t, e) {
      return this.An.getAllMutationBatchesAffectingDocumentKey(t, e).next(n =>
        this.bn(t, e, n)
      )
    }
    bn (t, e, n) {
      return this.Je.getEntry(t, e).next(t => {
        for (const e of n) e.applyToLocalView(t)
        return t
      })
    }
    Pn (t, e) {
      t.forEach((t, n) => {
        for (const t of e) t.applyToLocalView(n)
      })
    }
    vn (t, e) {
      return this.Je.getEntries(t, e).next(e => this.Vn(t, e).next(() => e))
    }
    Vn (t, e) {
      return this.An.getAllMutationBatchesAffectingDocumentKeys(t, e).next(t =>
        this.Pn(e, t)
      )
    }
    getDocumentsMatchingQuery (t, e, n) {
      return (function (t) {
        return (
          Xs.isDocumentKey(t.path) &&
          null === t.collectionGroup &&
          0 === t.filters.length
        )
      })(e)
        ? this.Sn(t, e.path)
        : jr(e)
        ? this.Dn(t, e, n)
        : this.Cn(t, e, n)
    }
    Sn (t, e) {
      return this.Rn(t, new Xs(e)).next(t => {
        let e = qo()
        return t.isFoundDocument() && (e = e.insert(t.key, t)), e
      })
    }
    Dn (t, e, n) {
      const i = e.collectionGroup
      let s = qo()
      return this.Jt.getCollectionParents(t, i).next(r =>
        za
          .forEach(r, r => {
            const o = (function (t, e) {
              return new Mr(
                e,
                null,
                t.explicitOrderBy.slice(),
                t.filters.slice(),
                t.limit,
                t.limitType,
                t.startAt,
                t.endAt
              )
            })(e, r.child(i))
            return this.Cn(t, o, n).next(t => {
              t.forEach((t, e) => {
                s = s.insert(t, e)
              })
            })
          })
          .next(() => s)
      )
    }
    Cn (t, e, n) {
      let i, s
      return this.Je.getDocumentsMatchingQuery(t, e, n)
        .next(n => ((i = n), this.An.getAllMutationBatchesAffectingQuery(t, e)))
        .next(
          e => (
            (s = e),
            this.Nn(t, s, i).next(t => {
              i = t
              for (const t of s)
                for (const e of t.mutations) {
                  const n = e.key
                  let s = i.get(n)
                  null == s &&
                    ((s = pr.newInvalidDocument(n)), (i = i.insert(n, s))),
                    yo(e, s, t.localWriteTime),
                    s.isFoundDocument() || (i = i.remove(n))
                }
            })
          )
        )
        .next(
          () => (
            i.forEach((t, n) => {
              Gr(e, n) || (i = i.remove(t))
            }),
            i
          )
        )
    }
    Nn (t, e, n) {
      let i = $o()
      for (const t of e)
        for (const e of t.mutations)
          e instanceof Eo && null === n.get(e.key) && (i = i.add(e.key))
      let s = n
      return this.Je.getEntries(t, i).next(
        t => (
          t.forEach((t, e) => {
            e.isFoundDocument() && (s = s.insert(t, e))
          }),
          s
        )
      )
    }
  }
  class oc {
    constructor (t, e, n, i) {
      ;(this.targetId = t), (this.fromCache = e), (this.kn = n), (this.xn = i)
    }
    static $n (t, e) {
      let n = $o(),
        i = $o()
      for (const t of e.docChanges)
        switch (t.type) {
          case 0:
            n = n.add(t.doc.key)
            break
          case 1:
            i = i.add(t.doc.key)
        }
      return new oc(t, e.fromCache, n, i)
    }
  }
  class ac {
    On (t) {
      this.Mn = t
    }
    getDocumentsMatchingQuery (t, e, n, i) {
      return (function (t) {
        return (
          0 === t.filters.length &&
          null === t.limit &&
          null == t.startAt &&
          null == t.endAt &&
          (0 === t.explicitOrderBy.length ||
            (1 === t.explicitOrderBy.length &&
              t.explicitOrderBy[0].field.isKeyField()))
        )
      })(e) || n.isEqual(Os.min())
        ? this.Fn(t, e)
        : this.Mn.vn(t, i).next(s => {
            const r = this.Ln(e, s)
            return (xr(e) || Vr(e)) && this.Bn(e.limitType, r, i, n)
              ? this.Fn(t, e)
              : (cs() <= _.DEBUG &&
                  hs(
                    'QueryEngine',
                    'Re-using previous result from %s to execute query: %s',
                    n.toString(),
                    zr(e)
                  ),
                this.Mn.getDocumentsMatchingQuery(t, e, n).next(
                  t => (
                    r.forEach(e => {
                      t = t.insert(e.key, e)
                    }),
                    t
                  )
                ))
          })
    }
    Ln (t, e) {
      let n = new Mo(Wr(t))
      return (
        e.forEach((e, i) => {
          Gr(t, i) && (n = n.add(i))
        }),
        n
      )
    }
    Bn (t, e, n, i) {
      if (n.size !== e.size) return !0
      const s = 'F' === t ? e.last() : e.first()
      return !!s && (s.hasPendingWrites || s.version.compareTo(i) > 0)
    }
    Fn (t, e) {
      return (
        cs() <= _.DEBUG &&
          hs(
            'QueryEngine',
            'Using full collection scan to execute query:',
            zr(e)
          ),
        this.Mn.getDocumentsMatchingQuery(t, e, Os.min())
      )
    }
  }
  class cc {
    constructor (t, e, n, i) {
      ;(this.persistence = t),
        (this.Un = e),
        (this.k = i),
        (this.qn = new Oo(Ns)),
        (this.Kn = new sc(t => yr(t), vr)),
        (this.jn = Os.min()),
        (this.An = t.getMutationQueue(n)),
        (this.Qn = t.getRemoteDocumentCache()),
        (this.He = t.getTargetCache()),
        (this.Wn = new rc(
          this.Qn,
          this.An,
          this.persistence.getIndexManager()
        )),
        (this.Ye = t.getBundleCache()),
        this.Un.On(this.Wn)
    }
    collectGarbage (t) {
      return this.persistence.runTransaction(
        'Collect garbage',
        'readwrite-primary',
        e => t.collect(e, this.qn)
      )
    }
  }
  async function hc (t, e) {
    const n = ms(t)
    let i = n.An,
      s = n.Wn
    const r = await n.persistence.runTransaction(
      'Handle user change',
      'readonly',
      t => {
        let r
        return n.An.getAllMutationBatches(t)
          .next(
            o => (
              (r = o),
              (i = n.persistence.getMutationQueue(e)),
              (s = new rc(n.Qn, i, n.persistence.getIndexManager())),
              i.getAllMutationBatches(t)
            )
          )
          .next(e => {
            const n = [],
              i = []
            let o = $o()
            for (const t of r) {
              n.push(t.batchId)
              for (const e of t.mutations) o = o.add(e.key)
            }
            for (const t of e) {
              i.push(t.batchId)
              for (const e of t.mutations) o = o.add(e.key)
            }
            return s
              .vn(t, o)
              .next(t => ({ Gn: t, removedBatchIds: n, addedBatchIds: i }))
          })
      }
    )
    return (n.An = i), (n.Wn = s), n.Un.On(n.Wn), r
  }
  function uc (t) {
    const e = ms(t)
    return e.persistence.runTransaction(
      'Get last remote snapshot version',
      'readonly',
      t => e.He.getLastRemoteSnapshotVersion(t)
    )
  }
  function lc (t, e) {
    const n = ms(t)
    return n.persistence.runTransaction(
      'Get next mutation batch',
      'readonly',
      t => (
        void 0 === e && (e = -1), n.An.getNextMutationBatchAfterBatchId(t, e)
      )
    )
  }
  async function dc (t, e, n) {
    const i = ms(t),
      s = i.qn.get(e),
      r = n ? 'readwrite' : 'readwrite-primary'
    try {
      n ||
        (await i.persistence.runTransaction('Release target', r, t =>
          i.persistence.referenceDelegate.removeTarget(t, s)
        ))
    } catch (t) {
      if (!Ga(t)) throw t
      hs(
        'LocalStore',
        `Failed to update sequence numbers for target ${e}: ${t}`
      )
    }
    ;(i.qn = i.qn.remove(e)), i.Kn.delete(s.target)
  }
  function fc (t, e, n) {
    const i = ms(t)
    let s = Os.min(),
      r = $o()
    return i.persistence.runTransaction('Execute query', 'readonly', t =>
      (function (t, e, n) {
        const i = ms(t),
          s = i.Kn.get(n)
        return void 0 !== s ? za.resolve(i.qn.get(s)) : i.He.getTargetData(e, n)
      })(i, t, $r(e))
        .next(e => {
          if (e)
            return (
              (s = e.lastLimboFreeSnapshotVersion),
              i.He.getMatchingKeysForTargetId(t, e.targetId).next(t => {
                r = t
              })
            )
        })
        .next(() =>
          i.Un.getDocumentsMatchingQuery(t, e, n ? s : Os.min(), n ? r : $o())
        )
        .next(t => ({ documents: t, zn: r }))
    )
  }
  class pc {
    constructor (t) {
      ;(this.k = t), (this.Xn = new Map()), (this.Zn = new Map())
    }
    getBundleMetadata (t, e) {
      return za.resolve(this.Xn.get(e))
    }
    saveBundleMetadata (t, e) {
      var n
      return (
        this.Xn.set(e.id, {
          id: (n = e).id,
          version: n.version,
          createTime: aa(n.createTime)
        }),
        za.resolve()
      )
    }
    getNamedQuery (t, e) {
      return za.resolve(this.Zn.get(e))
    }
    saveNamedQuery (t, e) {
      return (
        this.Zn.set(
          e.name,
          (function (t) {
            return {
              name: t.name,
              query: Ya(t.bundledQuery),
              readTime: aa(t.readTime)
            }
          })(e)
        ),
        za.resolve()
      )
    }
  }
  class mc {
    constructor () {
      ;(this.ts = new Mo(gc.es)), (this.ns = new Mo(gc.ss))
    }
    isEmpty () {
      return this.ts.isEmpty()
    }
    addReference (t, e) {
      const n = new gc(t, e)
      ;(this.ts = this.ts.add(n)), (this.ns = this.ns.add(n))
    }
    rs (t, e) {
      t.forEach(t => this.addReference(t, e))
    }
    removeReference (t, e) {
      this.os(new gc(t, e))
    }
    cs (t, e) {
      t.forEach(t => this.removeReference(t, e))
    }
    us (t) {
      const e = new Xs(new xs([])),
        n = new gc(e, t),
        i = new gc(e, t + 1),
        s = []
      return (
        this.ns.forEachInRange([n, i], t => {
          this.os(t), s.push(t.key)
        }),
        s
      )
    }
    hs () {
      this.ts.forEach(t => this.os(t))
    }
    os (t) {
      ;(this.ts = this.ts.delete(t)), (this.ns = this.ns.delete(t))
    }
    ls (t) {
      const e = new Xs(new xs([])),
        n = new gc(e, t),
        i = new gc(e, t + 1)
      let s = $o()
      return (
        this.ns.forEachInRange([n, i], t => {
          s = s.add(t.key)
        }),
        s
      )
    }
    containsKey (t) {
      const e = new gc(t, 0),
        n = this.ts.firstAfterOrEqual(e)
      return null !== n && t.isEqual(n.key)
    }
  }
  class gc {
    constructor (t, e) {
      ;(this.key = t), (this.fs = e)
    }
    static es (t, e) {
      return Xs.comparator(t.key, e.key) || Ns(t.fs, e.fs)
    }
    static ss (t, e) {
      return Ns(t.fs, e.fs) || Xs.comparator(t.key, e.key)
    }
  }
  class yc {
    constructor (t, e) {
      ;(this.Jt = t),
        (this.referenceDelegate = e),
        (this.An = []),
        (this.ds = 1),
        (this.ws = new Mo(gc.es))
    }
    checkEmpty (t) {
      return za.resolve(0 === this.An.length)
    }
    addMutationBatch (t, e, n, i) {
      const s = this.ds
      this.ds++, this.An.length > 0 && this.An[this.An.length - 1]
      const r = new Wa(s, e, n, i)
      this.An.push(r)
      for (const e of i)
        (this.ws = this.ws.add(new gc(e.key, s))),
          this.Jt.addToCollectionParentIndex(t, e.key.path.popLast())
      return za.resolve(r)
    }
    lookupMutationBatch (t, e) {
      return za.resolve(this._s(e))
    }
    getNextMutationBatchAfterBatchId (t, e) {
      const n = e + 1,
        i = this.gs(n),
        s = i < 0 ? 0 : i
      return za.resolve(this.An.length > s ? this.An[s] : null)
    }
    getHighestUnacknowledgedBatchId () {
      return za.resolve(0 === this.An.length ? -1 : this.ds - 1)
    }
    getAllMutationBatches (t) {
      return za.resolve(this.An.slice())
    }
    getAllMutationBatchesAffectingDocumentKey (t, e) {
      const n = new gc(e, 0),
        i = new gc(e, Number.POSITIVE_INFINITY),
        s = []
      return (
        this.ws.forEachInRange([n, i], t => {
          const e = this._s(t.fs)
          s.push(e)
        }),
        za.resolve(s)
      )
    }
    getAllMutationBatchesAffectingDocumentKeys (t, e) {
      let n = new Mo(Ns)
      return (
        e.forEach(t => {
          const e = new gc(t, 0),
            i = new gc(t, Number.POSITIVE_INFINITY)
          this.ws.forEachInRange([e, i], t => {
            n = n.add(t.fs)
          })
        }),
        za.resolve(this.ys(n))
      )
    }
    getAllMutationBatchesAffectingQuery (t, e) {
      const n = e.path,
        i = n.length + 1
      let s = n
      Xs.isDocumentKey(s) || (s = s.child(''))
      const r = new gc(new Xs(s), 0)
      let o = new Mo(Ns)
      return (
        this.ws.forEachWhile(t => {
          const e = t.key.path
          return !!n.isPrefixOf(e) && (e.length === i && (o = o.add(t.fs)), !0)
        }, r),
        za.resolve(this.ys(o))
      )
    }
    ys (t) {
      const e = []
      return (
        t.forEach(t => {
          const n = this._s(t)
          null !== n && e.push(n)
        }),
        e
      )
    }
    removeMutationBatch (t, e) {
      ps(0 === this.ps(e.batchId, 'removed')), this.An.shift()
      let n = this.ws
      return za
        .forEach(e.mutations, i => {
          const s = new gc(i.key, e.batchId)
          return (
            (n = n.delete(s)),
            this.referenceDelegate.markPotentiallyOrphaned(t, i.key)
          )
        })
        .next(() => {
          this.ws = n
        })
    }
    ee (t) {}
    containsKey (t, e) {
      const n = new gc(e, 0),
        i = this.ws.firstAfterOrEqual(n)
      return za.resolve(e.isEqual(i && i.key))
    }
    performConsistencyCheck (t) {
      return this.An.length, za.resolve()
    }
    ps (t, e) {
      return this.gs(t)
    }
    gs (t) {
      return 0 === this.An.length ? 0 : t - this.An[0].batchId
    }
    _s (t) {
      const e = this.gs(t)
      return e < 0 || e >= this.An.length ? null : this.An[e]
    }
  }
  class vc {
    constructor (t, e) {
      ;(this.Jt = t),
        (this.Ts = e),
        (this.docs = new Oo(Xs.comparator)),
        (this.size = 0)
    }
    addEntry (t, e, n) {
      const i = e.key,
        s = this.docs.get(i),
        r = s ? s.size : 0,
        o = this.Ts(e)
      return (
        (this.docs = this.docs.insert(i, {
          document: e.mutableCopy(),
          size: o,
          readTime: n
        })),
        (this.size += o - r),
        this.Jt.addToCollectionParentIndex(t, i.path.popLast())
      )
    }
    removeEntry (t) {
      const e = this.docs.get(t)
      e && ((this.docs = this.docs.remove(t)), (this.size -= e.size))
    }
    getEntry (t, e) {
      const n = this.docs.get(e)
      return za.resolve(n ? n.document.mutableCopy() : pr.newInvalidDocument(e))
    }
    getEntries (t, e) {
      let n = Vo()
      return (
        e.forEach(t => {
          const e = this.docs.get(t)
          n = n.insert(
            t,
            e ? e.document.mutableCopy() : pr.newInvalidDocument(t)
          )
        }),
        za.resolve(n)
      )
    }
    getDocumentsMatchingQuery (t, e, n) {
      let i = Vo()
      const s = new Xs(e.path.child('')),
        r = this.docs.getIteratorFrom(s)
      for (; r.hasNext(); ) {
        const {
          key: t,
          value: { document: s, readTime: o }
        } = r.getNext()
        if (!e.path.isPrefixOf(t.path)) break
        o.compareTo(n) <= 0 ||
          (Gr(e, s) && (i = i.insert(s.key, s.mutableCopy())))
      }
      return za.resolve(i)
    }
    Es (t, e) {
      return za.forEach(this.docs, t => e(t))
    }
    newChangeBuffer (t) {
      return new wc(this)
    }
    getSize (t) {
      return za.resolve(this.size)
    }
  }
  class wc extends class {
    constructor () {
      ;(this.changes = new sc(
        t => t.toString(),
        (t, e) => t.isEqual(e)
      )),
        (this.changesApplied = !1)
    }
    getReadTime (t) {
      const e = this.changes.get(t)
      return e ? e.readTime : Os.min()
    }
    addEntry (t, e) {
      this.assertNotApplied(),
        this.changes.set(t.key, { document: t, readTime: e })
    }
    removeEntry (t, e = null) {
      this.assertNotApplied(),
        this.changes.set(t, { document: pr.newInvalidDocument(t), readTime: e })
    }
    getEntry (t, e) {
      this.assertNotApplied()
      const n = this.changes.get(e)
      return void 0 !== n ? za.resolve(n.document) : this.getFromCache(t, e)
    }
    getEntries (t, e) {
      return this.getAllFromCache(t, e)
    }
    apply (t) {
      return (
        this.assertNotApplied(),
        (this.changesApplied = !0),
        this.applyChanges(t)
      )
    }
    assertNotApplied () {}
  } {
    constructor (t) {
      super(), (this.De = t)
    }
    applyChanges (t) {
      const e = []
      return (
        this.changes.forEach((n, i) => {
          i.document.isValidDocument()
            ? e.push(this.De.addEntry(t, i.document, this.getReadTime(n)))
            : this.De.removeEntry(n)
        }),
        za.waitFor(e)
      )
    }
    getFromCache (t, e) {
      return this.De.getEntry(t, e)
    }
    getAllFromCache (t, e) {
      return this.De.getEntries(t, e)
    }
  }
  class Ic {
    constructor (t) {
      ;(this.persistence = t),
        (this.Is = new sc(t => yr(t), vr)),
        (this.lastRemoteSnapshotVersion = Os.min()),
        (this.highestTargetId = 0),
        (this.As = 0),
        (this.Rs = new mc()),
        (this.targetCount = 0),
        (this.bs = nc.ie())
    }
    forEachTarget (t, e) {
      return this.Is.forEach((t, n) => e(n)), za.resolve()
    }
    getLastRemoteSnapshotVersion (t) {
      return za.resolve(this.lastRemoteSnapshotVersion)
    }
    getHighestSequenceNumber (t) {
      return za.resolve(this.As)
    }
    allocateTargetId (t) {
      return (
        (this.highestTargetId = this.bs.next()),
        za.resolve(this.highestTargetId)
      )
    }
    setTargetsMetadata (t, e, n) {
      return (
        n && (this.lastRemoteSnapshotVersion = n),
        e > this.As && (this.As = e),
        za.resolve()
      )
    }
    ae (t) {
      this.Is.set(t.target, t)
      const e = t.targetId
      e > this.highestTargetId &&
        ((this.bs = new nc(e)), (this.highestTargetId = e)),
        t.sequenceNumber > this.As && (this.As = t.sequenceNumber)
    }
    addTargetData (t, e) {
      return this.ae(e), (this.targetCount += 1), za.resolve()
    }
    updateTargetData (t, e) {
      return this.ae(e), za.resolve()
    }
    removeTargetData (t, e) {
      return (
        this.Is.delete(e.target),
        this.Rs.us(e.targetId),
        (this.targetCount -= 1),
        za.resolve()
      )
    }
    removeTargets (t, e, n) {
      let i = 0
      const s = []
      return (
        this.Is.forEach((r, o) => {
          o.sequenceNumber <= e &&
            null === n.get(o.targetId) &&
            (this.Is.delete(r),
            s.push(this.removeMatchingKeysForTargetId(t, o.targetId)),
            i++)
        }),
        za.waitFor(s).next(() => i)
      )
    }
    getTargetCount (t) {
      return za.resolve(this.targetCount)
    }
    getTargetData (t, e) {
      const n = this.Is.get(e) || null
      return za.resolve(n)
    }
    addMatchingKeys (t, e, n) {
      return this.Rs.rs(e, n), za.resolve()
    }
    removeMatchingKeys (t, e, n) {
      this.Rs.cs(e, n)
      const i = this.persistence.referenceDelegate,
        s = []
      return (
        i &&
          e.forEach(e => {
            s.push(i.markPotentiallyOrphaned(t, e))
          }),
        za.waitFor(s)
      )
    }
    removeMatchingKeysForTargetId (t, e) {
      return this.Rs.us(e), za.resolve()
    }
    getMatchingKeysForTargetId (t, e) {
      const n = this.Rs.ls(e)
      return za.resolve(n)
    }
    containsKey (t, e) {
      return za.resolve(this.Rs.containsKey(e))
    }
  }
  class Tc {
    constructor (t, e) {
      ;(this.Ps = {}),
        (this.Be = new ks(0)),
        (this.Ue = !1),
        (this.Ue = !0),
        (this.referenceDelegate = t(this)),
        (this.He = new Ic(this)),
        (this.Jt = new Za()),
        (this.Je = (function (t, e) {
          return new vc(t, e)
        })(this.Jt, t => this.referenceDelegate.vs(t))),
        (this.k = new Xa(e)),
        (this.Ye = new pc(this.k))
    }
    start () {
      return Promise.resolve()
    }
    shutdown () {
      return (this.Ue = !1), Promise.resolve()
    }
    get started () {
      return this.Ue
    }
    setDatabaseDeletedListener () {}
    setNetworkEnabled () {}
    getIndexManager () {
      return this.Jt
    }
    getMutationQueue (t) {
      let e = this.Ps[t.toKey()]
      return (
        e ||
          ((e = new yc(this.Jt, this.referenceDelegate)),
          (this.Ps[t.toKey()] = e)),
        e
      )
    }
    getTargetCache () {
      return this.He
    }
    getRemoteDocumentCache () {
      return this.Je
    }
    getBundleCache () {
      return this.Ye
    }
    runTransaction (t, e, n) {
      hs('MemoryPersistence', 'Starting transaction:', t)
      const i = new Ec(this.Be.next())
      return (
        this.referenceDelegate.Vs(),
        n(i)
          .next(t => this.referenceDelegate.Ss(i).next(() => t))
          .toPromise()
          .then(t => (i.raiseOnCommittedEvent(), t))
      )
    }
    Ds (t, e) {
      return za.or(Object.values(this.Ps).map(n => () => n.containsKey(t, e)))
    }
  }
  class Ec extends class {
    constructor () {
      this.onCommittedListeners = []
    }
    addOnCommittedListener (t) {
      this.onCommittedListeners.push(t)
    }
    raiseOnCommittedEvent () {
      this.onCommittedListeners.forEach(t => t())
    }
  } {
    constructor (t) {
      super(), (this.currentSequenceNumber = t)
    }
  }
  class bc {
    constructor (t) {
      ;(this.persistence = t), (this.Cs = new mc()), (this.Ns = null)
    }
    static ks (t) {
      return new bc(t)
    }
    get xs () {
      if (this.Ns) return this.Ns
      throw fs()
    }
    addReference (t, e, n) {
      return (
        this.Cs.addReference(n, e), this.xs.delete(n.toString()), za.resolve()
      )
    }
    removeReference (t, e, n) {
      return (
        this.Cs.removeReference(n, e), this.xs.add(n.toString()), za.resolve()
      )
    }
    markPotentiallyOrphaned (t, e) {
      return this.xs.add(e.toString()), za.resolve()
    }
    removeTarget (t, e) {
      this.Cs.us(e.targetId).forEach(t => this.xs.add(t.toString()))
      const n = this.persistence.getTargetCache()
      return n
        .getMatchingKeysForTargetId(t, e.targetId)
        .next(t => {
          t.forEach(t => this.xs.add(t.toString()))
        })
        .next(() => n.removeTargetData(t, e))
    }
    Vs () {
      this.Ns = new Set()
    }
    Ss (t) {
      const e = this.persistence.getRemoteDocumentCache().newChangeBuffer()
      return za
        .forEach(this.xs, n => {
          const i = Xs.fromPath(n)
          return this.$s(t, i).next(t => {
            t || e.removeEntry(i)
          })
        })
        .next(() => ((this.Ns = null), e.apply(t)))
    }
    updateLimboDocument (t, e) {
      return this.$s(t, e).next(t => {
        t ? this.xs.delete(e.toString()) : this.xs.add(e.toString())
      })
    }
    vs (t) {
      return 0
    }
    $s (t, e) {
      return za.or([
        () => za.resolve(this.Cs.containsKey(e)),
        () => this.persistence.getTargetCache().containsKey(t, e),
        () => this.persistence.Ds(t, e)
      ])
    }
  }
  class _c {
    constructor () {
      this.activeTargetIds = Ko()
    }
    Fs (t) {
      this.activeTargetIds = this.activeTargetIds.add(t)
    }
    Ls (t) {
      this.activeTargetIds = this.activeTargetIds.delete(t)
    }
    Ms () {
      const t = {
        activeTargetIds: this.activeTargetIds.toArray(),
        updateTimeMs: Date.now()
      }
      return JSON.stringify(t)
    }
  }
  class Sc {
    constructor () {
      ;(this.pi = new _c()),
        (this.Ti = {}),
        (this.onlineStateHandler = null),
        (this.sequenceNumberHandler = null)
    }
    addPendingMutation (t) {}
    updateMutationState (t, e, n) {}
    addLocalQueryTarget (t) {
      return this.pi.Fs(t), this.Ti[t] || 'not-current'
    }
    updateQueryState (t, e, n) {
      this.Ti[t] = e
    }
    removeLocalQueryTarget (t) {
      this.pi.Ls(t)
    }
    isLocalQueryTarget (t) {
      return this.pi.activeTargetIds.has(t)
    }
    clearQueryState (t) {
      delete this.Ti[t]
    }
    getAllActiveQueryTargets () {
      return this.pi.activeTargetIds
    }
    isActiveQueryTarget (t) {
      return this.pi.activeTargetIds.has(t)
    }
    start () {
      return (this.pi = new _c()), Promise.resolve()
    }
    handleUserChange (t, e, n) {}
    setOnlineState (t) {}
    shutdown () {}
    writeSequenceNumber (t) {}
    notifyBundleLoaded () {}
  }
  class kc {
    Ei (t) {}
    shutdown () {}
  }
  class Ac {
    constructor () {
      ;(this.Ii = () => this.Ai()),
        (this.Ri = () => this.bi()),
        (this.Pi = []),
        this.vi()
    }
    Ei (t) {
      this.Pi.push(t)
    }
    shutdown () {
      window.removeEventListener('online', this.Ii),
        window.removeEventListener('offline', this.Ri)
    }
    vi () {
      window.addEventListener('online', this.Ii),
        window.addEventListener('offline', this.Ri)
    }
    Ai () {
      hs('ConnectivityMonitor', 'Network connectivity changed: AVAILABLE')
      for (const t of this.Pi) t(0)
    }
    bi () {
      hs('ConnectivityMonitor', 'Network connectivity changed: UNAVAILABLE')
      for (const t of this.Pi) t(1)
    }
    static Pt () {
      return (
        'undefined' != typeof window &&
        void 0 !== window.addEventListener &&
        void 0 !== window.removeEventListener
      )
    }
  }
  const Cc = {
    BatchGetDocuments: 'batchGet',
    Commit: 'commit',
    RunQuery: 'runQuery'
  }
  class Nc {
    constructor (t) {
      ;(this.Vi = t.Vi), (this.Si = t.Si)
    }
    Di (t) {
      this.Ci = t
    }
    Ni (t) {
      this.ki = t
    }
    onMessage (t) {
      this.xi = t
    }
    close () {
      this.Si()
    }
    send (t) {
      this.Vi(t)
    }
    $i () {
      this.Ci()
    }
    Oi (t) {
      this.ki(t)
    }
    Mi (t) {
      this.xi(t)
    }
  }
  class Rc extends class {
    constructor (t) {
      ;(this.databaseInfo = t), (this.databaseId = t.databaseId)
      const e = t.ssl ? 'https' : 'http'
      ;(this.Fi = e + '://' + t.host),
        (this.Li =
          'projects/' +
          this.databaseId.projectId +
          '/databases/' +
          this.databaseId.database +
          '/documents')
    }
    Bi (t, e, n, i, s) {
      const r = this.Ui(t, e)
      hs('RestConnection', 'Sending: ', r, n)
      const o = {}
      return (
        this.qi(o, i, s),
        this.Ki(t, r, o, n).then(
          t => (hs('RestConnection', 'Received: ', t), t),
          e => {
            throw (ls(
              'RestConnection',
              `${t} failed with error: `,
              e,
              'url: ',
              r,
              'request:',
              n
            ),
            e)
          }
        )
      )
    }
    ji (t, e, n, i, s) {
      return this.Bi(t, e, n, i, s)
    }
    qi (t, e, n) {
      ;(t['X-Goog-Api-Client'] = 'gl-js/ fire/' + os),
        (t['Content-Type'] = 'text/plain'),
        this.databaseInfo.appId &&
          (t['X-Firebase-GMPID'] = this.databaseInfo.appId),
        e && e.headers.forEach((e, n) => (t[n] = e)),
        n && n.headers.forEach((e, n) => (t[n] = e))
    }
    Ui (t, e) {
      const n = Cc[t]
      return `${this.Fi}/v1/${e}:${n}`
    }
  } {
    constructor (t) {
      super(t),
        (this.forceLongPolling = t.forceLongPolling),
        (this.autoDetectLongPolling = t.autoDetectLongPolling),
        (this.useFetchStreams = t.useFetchStreams)
    }
    Ki (t, e, n, i) {
      return new Promise((s, r) => {
        const o = new is()
        o.listenOnce(Yi.COMPLETE, () => {
          try {
            switch (o.getLastErrorCode()) {
              case Xi.NO_ERROR:
                const e = o.getResponseJson()
                hs('Connection', 'XHR received:', JSON.stringify(e)), s(e)
                break
              case Xi.TIMEOUT:
                hs('Connection', 'RPC "' + t + '" timed out'),
                  r(new ys(gs.DEADLINE_EXCEEDED, 'Request time out'))
                break
              case Xi.HTTP_ERROR:
                const n = o.getStatus()
                if (
                  (hs(
                    'Connection',
                    'RPC "' + t + '" failed with status:',
                    n,
                    'response text:',
                    o.getResponseText()
                  ),
                  n > 0)
                ) {
                  const t = o.getResponseJson().error
                  if (t && t.status && t.message) {
                    const e = (function (t) {
                      const e = t.toLowerCase().replace(/_/g, '-')
                      return Object.values(gs).indexOf(e) >= 0 ? e : gs.UNKNOWN
                    })(t.status)
                    r(new ys(e, t.message))
                  } else
                    r(
                      new ys(
                        gs.UNKNOWN,
                        'Server responded with status ' + o.getStatus()
                      )
                    )
                } else r(new ys(gs.UNAVAILABLE, 'Connection failed.'))
                break
              default:
                fs()
            }
          } finally {
            hs('Connection', 'RPC "' + t + '" completed.')
          }
        })
        const a = JSON.stringify(i)
        o.send(e, 'POST', a, n, 15)
      })
    }
    Qi (t, e, n) {
      const c = [
          this.Fi,
          '/',
          'google.firestore.v1.Firestore',
          '/',
          t,
          '/channel'
        ],
        h = Ji(),
        u = Qi(),
        l = {
          httpSessionIdParam: 'gsessionid',
          initMessageHeaders: {},
          messageUrlParams: {
            database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`
          },
          sendRawJson: !0,
          supportsCrossDomainXhr: !0,
          internalChannelParams: { forwardChannelRequestTimeoutMs: 6e5 },
          forceLongPolling: this.forceLongPolling,
          detectBufferingProxy: this.autoDetectLongPolling
        }
      this.useFetchStreams && (l.xmlHttpFactory = new es({})),
        this.qi(l.initMessageHeaders, e, n),
        s() ||
          o() ||
          i().indexOf('Electron/') >= 0 ||
          a() ||
          i().indexOf('MSAppHost/') >= 0 ||
          r() ||
          (l.httpHeadersOverwriteParam = '$httpHeaders')
      const d = c.join('')
      hs('Connection', 'Creating WebChannel: ' + d, l)
      const f = h.createWebChannel(d, l)
      let p = !1,
        m = !1
      const g = new Nc({
          Vi: t => {
            m
              ? hs('Connection', 'Not sending because WebChannel is closed:', t)
              : (p ||
                  (hs('Connection', 'Opening WebChannel transport.'),
                  f.open(),
                  (p = !0)),
                hs('Connection', 'WebChannel sending:', t),
                f.send(t))
          },
          Si: () => f.close()
        }),
        y = (t, e, n) => {
          t.listen(e, t => {
            try {
              n(t)
            } catch (t) {
              setTimeout(() => {
                throw t
              }, 0)
            }
          })
        }
      return (
        y(f, ns.EventType.OPEN, () => {
          m || hs('Connection', 'WebChannel transport opened.')
        }),
        y(f, ns.EventType.CLOSE, () => {
          m ||
            ((m = !0), hs('Connection', 'WebChannel transport closed'), g.Oi())
        }),
        y(f, ns.EventType.ERROR, t => {
          m ||
            ((m = !0),
            ls('Connection', 'WebChannel transport errored:', t),
            g.Oi(
              new ys(gs.UNAVAILABLE, 'The operation could not be completed')
            ))
        }),
        y(f, ns.EventType.MESSAGE, t => {
          var e
          if (!m) {
            const n = t.data[0]
            ps(!!n)
            const i = n,
              s =
                i.error ||
                (null === (e = i[0]) || void 0 === e ? void 0 : e.error)
            if (s) {
              hs('Connection', 'WebChannel received error:', s)
              const t = s.status
              let e = (function (t) {
                  const e = No[t]
                  if (void 0 !== e) return Do(e)
                })(t),
                n = s.message
              void 0 === e &&
                ((e = gs.INTERNAL),
                (n =
                  'Unknown error status: ' + t + ' with message ' + s.message)),
                (m = !0),
                g.Oi(new ys(e, n)),
                f.close()
            } else hs('Connection', 'WebChannel received:', n), g.Mi(n)
          }
        }),
        y(u, Zi.STAT_EVENT, t => {
          t.stat === ts.PROXY
            ? hs('Connection', 'Detected buffering proxy')
            : t.stat === ts.NOPROXY &&
              hs('Connection', 'Detected no buffering proxy')
        }),
        setTimeout(() => {
          g.$i()
        }, 0),
        g
      )
    }
  }
  function Dc () {
    return 'undefined' != typeof document ? document : null
  }
  function Oc (t) {
    return new ia(t, !0)
  }
  class Lc {
    constructor (t, e, n = 1e3, i = 1.5, s = 6e4) {
      ;(this.Me = t),
        (this.timerId = e),
        (this.Wi = n),
        (this.Gi = i),
        (this.zi = s),
        (this.Hi = 0),
        (this.Ji = null),
        (this.Yi = Date.now()),
        this.reset()
    }
    reset () {
      this.Hi = 0
    }
    Xi () {
      this.Hi = this.zi
    }
    Zi (t) {
      this.cancel()
      const e = Math.floor(this.Hi + this.tr()),
        n = Math.max(0, Date.now() - this.Yi),
        i = Math.max(0, e - n)
      i > 0 &&
        hs(
          'ExponentialBackoff',
          `Backing off for ${i} ms (base delay: ${this.Hi} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`
        ),
        (this.Ji = this.Me.enqueueAfterDelay(
          this.timerId,
          i,
          () => ((this.Yi = Date.now()), t())
        )),
        (this.Hi *= this.Gi),
        this.Hi < this.Wi && (this.Hi = this.Wi),
        this.Hi > this.zi && (this.Hi = this.zi)
    }
    er () {
      null !== this.Ji && (this.Ji.skipDelay(), (this.Ji = null))
    }
    cancel () {
      null !== this.Ji && (this.Ji.cancel(), (this.Ji = null))
    }
    tr () {
      return (Math.random() - 0.5) * this.Hi
    }
  }
  class Pc {
    constructor (t, e, n, i, s, r, o, a) {
      ;(this.Me = t),
        (this.nr = n),
        (this.sr = i),
        (this.ir = s),
        (this.authCredentialsProvider = r),
        (this.appCheckCredentialsProvider = o),
        (this.listener = a),
        (this.state = 0),
        (this.rr = 0),
        (this.cr = null),
        (this.ar = null),
        (this.stream = null),
        (this.ur = new Lc(t, e))
    }
    hr () {
      return 1 === this.state || 5 === this.state || this.lr()
    }
    lr () {
      return 2 === this.state || 3 === this.state
    }
    start () {
      4 !== this.state ? this.auth() : this.dr()
    }
    async stop () {
      this.hr() && (await this.close(0))
    }
    wr () {
      ;(this.state = 0), this.ur.reset()
    }
    _r () {
      this.lr() &&
        null === this.cr &&
        (this.cr = this.Me.enqueueAfterDelay(this.nr, 6e4, () => this.mr()))
    }
    gr (t) {
      this.yr(), this.stream.send(t)
    }
    async mr () {
      if (this.lr()) return this.close(0)
    }
    yr () {
      this.cr && (this.cr.cancel(), (this.cr = null))
    }
    pr () {
      this.ar && (this.ar.cancel(), (this.ar = null))
    }
    async close (t, e) {
      this.yr(),
        this.pr(),
        this.ur.cancel(),
        this.rr++,
        4 !== t
          ? this.ur.reset()
          : e && e.code === gs.RESOURCE_EXHAUSTED
          ? (us(e.toString()),
            us(
              'Using maximum backoff delay to prevent overloading the backend.'
            ),
            this.ur.Xi())
          : e &&
            e.code === gs.UNAUTHENTICATED &&
            3 !== this.state &&
            (this.authCredentialsProvider.invalidateToken(),
            this.appCheckCredentialsProvider.invalidateToken()),
        null !== this.stream &&
          (this.Tr(), this.stream.close(), (this.stream = null)),
        (this.state = t),
        await this.listener.Ni(e)
    }
    Tr () {}
    auth () {
      this.state = 1
      const t = this.Er(this.rr),
        e = this.rr
      Promise.all([
        this.authCredentialsProvider.getToken(),
        this.appCheckCredentialsProvider.getToken()
      ]).then(
        ([t, n]) => {
          this.rr === e && this.Ir(t, n)
        },
        e => {
          t(() => {
            const t = new ys(
              gs.UNKNOWN,
              'Fetching auth token failed: ' + e.message
            )
            return this.Ar(t)
          })
        }
      )
    }
    Ir (t, e) {
      const n = this.Er(this.rr)
      ;(this.stream = this.Rr(t, e)),
        this.stream.Di(() => {
          n(
            () => (
              (this.state = 2),
              (this.ar = this.Me.enqueueAfterDelay(
                this.sr,
                1e4,
                () => (this.lr() && (this.state = 3), Promise.resolve())
              )),
              this.listener.Di()
            )
          )
        }),
        this.stream.Ni(t => {
          n(() => this.Ar(t))
        }),
        this.stream.onMessage(t => {
          n(() => this.onMessage(t))
        })
    }
    dr () {
      ;(this.state = 5),
        this.ur.Zi(async () => {
          ;(this.state = 0), this.start()
        })
    }
    Ar (t) {
      return (
        hs('PersistentStream', `close with error: ${t}`),
        (this.stream = null),
        this.close(4, t)
      )
    }
    Er (t) {
      return e => {
        this.Me.enqueueAndForget(() =>
          this.rr === t
            ? e()
            : (hs(
                'PersistentStream',
                'stream callback skipped by getCloseGuardedDispatcher.'
              ),
              Promise.resolve())
        )
      }
    }
  }
  class Mc extends Pc {
    constructor (t, e, n, i, s, r) {
      super(
        t,
        'listen_stream_connection_backoff',
        'listen_stream_idle',
        'health_check_timeout',
        e,
        n,
        i,
        r
      ),
        (this.k = s)
    }
    Rr (t, e) {
      return this.ir.Qi('Listen', t, e)
    }
    onMessage (t) {
      this.ur.reset()
      const e = (function (t, e) {
          let n
          if ('targetChange' in e) {
            e.targetChange
            const i = (function (t) {
                return 'NO_CHANGE' === t
                  ? 0
                  : 'ADD' === t
                  ? 1
                  : 'REMOVE' === t
                  ? 2
                  : 'CURRENT' === t
                  ? 3
                  : 'RESET' === t
                  ? 4
                  : fs()
              })(e.targetChange.targetChangeType || 'NO_CHANGE'),
              s = e.targetChange.targetIds || [],
              r = (function (t, e) {
                return t.C
                  ? (ps(void 0 === e || 'string' == typeof e),
                    js.fromBase64String(e || ''))
                  : (ps(void 0 === e || e instanceof Uint8Array),
                    js.fromUint8Array(e || new Uint8Array()))
              })(t, e.targetChange.resumeToken),
              o = e.targetChange.cause,
              a =
                o &&
                (function (t) {
                  const e = void 0 === t.code ? gs.UNKNOWN : Do(t.code)
                  return new ys(e, t.message || '')
                })(o)
            n = new Qo(i, s, r, a || null)
          } else if ('documentChange' in e) {
            e.documentChange
            const i = e.documentChange
            i.document, i.document.name, i.document.updateTime
            const s = la(t, i.document.name),
              r = aa(i.document.updateTime),
              o = new dr({ mapValue: { fields: i.document.fields } }),
              a = pr.newFoundDocument(s, r, o),
              c = i.targetIds || [],
              h = i.removedTargetIds || []
            n = new Wo(c, h, a.key, a)
          } else if ('documentDelete' in e) {
            e.documentDelete
            const i = e.documentDelete
            i.document
            const s = la(t, i.document),
              r = i.readTime ? aa(i.readTime) : Os.min(),
              o = pr.newNoDocument(s, r),
              a = i.removedTargetIds || []
            n = new Wo([], a, o.key, o)
          } else if ('documentRemove' in e) {
            e.documentRemove
            const i = e.documentRemove
            i.document
            const s = la(t, i.document),
              r = i.removedTargetIds || []
            n = new Wo([], r, s, null)
          } else {
            if (!('filter' in e)) return fs()
            {
              e.filter
              const t = e.filter
              t.targetId
              const i = t.count || 0,
                s = new Co(i),
                r = t.targetId
              n = new Jo(r, s)
            }
          }
          return n
        })(this.k, t),
        n = (function (t) {
          if (!('targetChange' in t)) return Os.min()
          const e = t.targetChange
          return e.targetIds && e.targetIds.length
            ? Os.min()
            : e.readTime
            ? aa(e.readTime)
            : Os.min()
        })(t)
      return this.listener.br(e, n)
    }
    Pr (t) {
      const e = {}
      ;(e.database = fa(this.k)),
        (e.addTarget = (function (t, e) {
          let n
          const i = e.target
          return (
            (n = wr(i) ? { documents: ga(t, i) } : { query: ya(t, i) }),
            (n.targetId = e.targetId),
            e.resumeToken.approximateByteSize() > 0
              ? (n.resumeToken = ra(t, e.resumeToken))
              : e.snapshotVersion.compareTo(Os.min()) > 0 &&
                (n.readTime = sa(t, e.snapshotVersion.toTimestamp())),
            n
          )
        })(this.k, t))
      const n = (function (t, e) {
        const n = (function (t, e) {
          switch (e) {
            case 0:
              return null
            case 1:
              return 'existence-filter-mismatch'
            case 2:
              return 'limbo-document'
            default:
              return fs()
          }
        })(0, e.purpose)
        return null == n ? null : { 'goog-listen-tags': n }
      })(this.k, t)
      n && (e.labels = n), this.gr(e)
    }
    vr (t) {
      const e = {}
      ;(e.database = fa(this.k)), (e.removeTarget = t), this.gr(e)
    }
  }
  class Uc extends Pc {
    constructor (t, e, n, i, s, r) {
      super(
        t,
        'write_stream_connection_backoff',
        'write_stream_idle',
        'health_check_timeout',
        e,
        n,
        i,
        r
      ),
        (this.k = s),
        (this.Vr = !1)
    }
    get Sr () {
      return this.Vr
    }
    start () {
      ;(this.Vr = !1), (this.lastStreamToken = void 0), super.start()
    }
    Tr () {
      this.Vr && this.Dr([])
    }
    Rr (t, e) {
      return this.ir.Qi('Write', t, e)
    }
    onMessage (t) {
      if (
        (ps(!!t.streamToken), (this.lastStreamToken = t.streamToken), this.Vr)
      ) {
        this.ur.reset()
        const e = (function (t, e) {
            return t && t.length > 0
              ? (ps(void 0 !== e),
                t.map(t =>
                  (function (t, e) {
                    let n = t.updateTime ? aa(t.updateTime) : aa(e)
                    return (
                      n.isEqual(Os.min()) && (n = aa(e)),
                      new lo(n, t.transformResults || [])
                    )
                  })(t, e)
                ))
              : []
          })(t.writeResults, t.commitTime),
          n = aa(t.commitTime)
        return this.listener.Cr(n, e)
      }
      return (
        ps(!t.writeResults || 0 === t.writeResults.length),
        (this.Vr = !0),
        this.listener.Nr()
      )
    }
    kr () {
      const t = {}
      ;(t.database = fa(this.k)), this.gr(t)
    }
    Dr (t) {
      const e = {
        streamToken: this.lastStreamToken,
        writes: t.map(t =>
          (function (t, e) {
            let n
            if (e instanceof To) n = { update: ma(t, e.key, e.value) }
            else if (e instanceof ko) n = { delete: ua(t, e.key) }
            else if (e instanceof Eo)
              n = { update: ma(t, e.key, e.data), updateMask: Ca(e.fieldMask) }
            else {
              if (!(e instanceof Ao)) return fs()
              n = { verify: ua(t, e.key) }
            }
            return (
              e.fieldTransforms.length > 0 &&
                (n.updateTransforms = e.fieldTransforms.map(t =>
                  (function (t, e) {
                    const n = e.transform
                    if (n instanceof io)
                      return {
                        fieldPath: e.field.canonicalString(),
                        setToServerValue: 'REQUEST_TIME'
                      }
                    if (n instanceof so)
                      return {
                        fieldPath: e.field.canonicalString(),
                        appendMissingElements: { values: n.elements }
                      }
                    if (n instanceof oo)
                      return {
                        fieldPath: e.field.canonicalString(),
                        removeAllFromArray: { values: n.elements }
                      }
                    if (n instanceof co)
                      return {
                        fieldPath: e.field.canonicalString(),
                        increment: n.N
                      }
                    throw fs()
                  })(0, t)
                )),
              e.precondition.isNone ||
                (n.currentDocument = (function (t, e) {
                  return void 0 !== e.updateTime
                    ? { updateTime: oa(t, e.updateTime) }
                    : void 0 !== e.exists
                    ? { exists: e.exists }
                    : fs()
                })(t, e.precondition)),
              n
            )
          })(this.k, t)
        )
      }
      this.gr(e)
    }
  }
  class xc extends class {} {
    constructor (t, e, n, i) {
      super(),
        (this.authCredentials = t),
        (this.appCheckCredentials = e),
        (this.ir = n),
        (this.k = i),
        (this.$r = !1)
    }
    Or () {
      if (this.$r)
        throw new ys(
          gs.FAILED_PRECONDITION,
          'The client has already been terminated.'
        )
    }
    Bi (t, e, n) {
      return (
        this.Or(),
        Promise.all([
          this.authCredentials.getToken(),
          this.appCheckCredentials.getToken()
        ])
          .then(([i, s]) => this.ir.Bi(t, e, n, i, s))
          .catch(t => {
            throw 'FirebaseError' === t.name
              ? (t.code === gs.UNAUTHENTICATED &&
                  (this.authCredentials.invalidateToken(),
                  this.appCheckCredentials.invalidateToken()),
                t)
              : new ys(gs.UNKNOWN, t.toString())
          })
      )
    }
    ji (t, e, n) {
      return (
        this.Or(),
        Promise.all([
          this.authCredentials.getToken(),
          this.appCheckCredentials.getToken()
        ])
          .then(([i, s]) => this.ir.ji(t, e, n, i, s))
          .catch(t => {
            throw 'FirebaseError' === t.name
              ? (t.code === gs.UNAUTHENTICATED &&
                  (this.authCredentials.invalidateToken(),
                  this.appCheckCredentials.invalidateToken()),
                t)
              : new ys(gs.UNKNOWN, t.toString())
          })
      )
    }
    terminate () {
      this.$r = !0
    }
  }
  class Vc {
    constructor (t, e) {
      ;(this.asyncQueue = t),
        (this.onlineStateHandler = e),
        (this.state = 'Unknown'),
        (this.Mr = 0),
        (this.Fr = null),
        (this.Lr = !0)
    }
    Br () {
      0 === this.Mr &&
        (this.Ur('Unknown'),
        (this.Fr = this.asyncQueue.enqueueAfterDelay(
          'online_state_timeout',
          1e4,
          () => (
            (this.Fr = null),
            this.qr("Backend didn't respond within 10 seconds."),
            this.Ur('Offline'),
            Promise.resolve()
          )
        )))
    }
    Kr (t) {
      'Online' === this.state
        ? this.Ur('Unknown')
        : (this.Mr++,
          this.Mr >= 1 &&
            (this.jr(),
            this.qr(
              `Connection failed 1 times. Most recent error: ${t.toString()}`
            ),
            this.Ur('Offline')))
    }
    set (t) {
      this.jr(), (this.Mr = 0), 'Online' === t && (this.Lr = !1), this.Ur(t)
    }
    Ur (t) {
      t !== this.state && ((this.state = t), this.onlineStateHandler(t))
    }
    qr (t) {
      const e = `Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`
      this.Lr ? (us(e), (this.Lr = !1)) : hs('OnlineStateTracker', e)
    }
    jr () {
      null !== this.Fr && (this.Fr.cancel(), (this.Fr = null))
    }
  }
  class Fc {
    constructor (t, e, n, i, s) {
      ;(this.localStore = t),
        (this.datastore = e),
        (this.asyncQueue = n),
        (this.remoteSyncer = {}),
        (this.Qr = []),
        (this.Wr = new Map()),
        (this.Gr = new Set()),
        (this.zr = []),
        (this.Hr = s),
        this.Hr.Ei(t => {
          n.enqueueAndForget(async () => {
            Wc(this) &&
              (hs(
                'RemoteStore',
                'Restarting streams for network reachability change.'
              ),
              await (async function (t) {
                const e = ms(t)
                e.Gr.add(4),
                  await jc(e),
                  e.Jr.set('Unknown'),
                  e.Gr.delete(4),
                  await qc(e)
              })(this))
          })
        }),
        (this.Jr = new Vc(n, i))
    }
  }
  async function qc (t) {
    if (Wc(t)) for (const e of t.zr) await e(!0)
  }
  async function jc (t) {
    for (const e of t.zr) await e(!1)
  }
  function Bc (t, e) {
    const n = ms(t)
    n.Wr.has(e.targetId) ||
      (n.Wr.set(e.targetId, e), Gc(n) ? zc(n) : uh(n).lr() && Hc(n, e))
  }
  function $c (t, e) {
    const n = ms(t),
      i = uh(n)
    n.Wr.delete(e),
      i.lr() && Kc(n, e),
      0 === n.Wr.size && (i.lr() ? i._r() : Wc(n) && n.Jr.set('Unknown'))
  }
  function Hc (t, e) {
    t.Yr.X(e.targetId), uh(t).Pr(e)
  }
  function Kc (t, e) {
    t.Yr.X(e), uh(t).vr(e)
  }
  function zc (t) {
    ;(t.Yr = new Yo({
      getRemoteKeysForTarget: e => t.remoteSyncer.getRemoteKeysForTarget(e),
      Et: e => t.Wr.get(e) || null
    })),
      uh(t).start(),
      t.Jr.Br()
  }
  function Gc (t) {
    return Wc(t) && !uh(t).hr() && t.Wr.size > 0
  }
  function Wc (t) {
    return 0 === ms(t).Gr.size
  }
  function Jc (t) {
    t.Yr = void 0
  }
  async function Qc (t) {
    t.Wr.forEach((e, n) => {
      Hc(t, e)
    })
  }
  async function Xc (t, e) {
    Jc(t), Gc(t) ? (t.Jr.Kr(e), zc(t)) : t.Jr.set('Unknown')
  }
  async function Yc (t, e, n) {
    if ((t.Jr.set('Online'), e instanceof Qo && 2 === e.state && e.cause))
      try {
        await (async function (t, e) {
          const n = e.cause
          for (const i of e.targetIds)
            t.Wr.has(i) &&
              (await t.remoteSyncer.rejectListen(i, n),
              t.Wr.delete(i),
              t.Yr.removeTarget(i))
        })(t, e)
      } catch (n) {
        hs(
          'RemoteStore',
          'Failed to remove targets %s: %s ',
          e.targetIds.join(','),
          n
        ),
          await Zc(t, n)
      }
    else if (
      (e instanceof Wo ? t.Yr.ot(e) : e instanceof Jo ? t.Yr.dt(e) : t.Yr.ut(e),
      !n.isEqual(Os.min()))
    )
      try {
        const e = await uc(t.localStore)
        n.compareTo(e) >= 0 &&
          (await (function (t, e) {
            const n = t.Yr.gt(e)
            return (
              n.targetChanges.forEach((n, i) => {
                if (n.resumeToken.approximateByteSize() > 0) {
                  const s = t.Wr.get(i)
                  s && t.Wr.set(i, s.withResumeToken(n.resumeToken, e))
                }
              }),
              n.targetMismatches.forEach(e => {
                const n = t.Wr.get(e)
                if (!n) return
                t.Wr.set(
                  e,
                  n.withResumeToken(js.EMPTY_BYTE_STRING, n.snapshotVersion)
                ),
                  Kc(t, e)
                const i = new Qa(n.target, e, 1, n.sequenceNumber)
                Hc(t, i)
              }),
              t.remoteSyncer.applyRemoteEvent(n)
            )
          })(t, n))
      } catch (e) {
        hs('RemoteStore', 'Failed to raise snapshot:', e), await Zc(t, e)
      }
  }
  async function Zc (t, e, n) {
    if (!Ga(e)) throw e
    t.Gr.add(1),
      await jc(t),
      t.Jr.set('Offline'),
      n || (n = () => uc(t.localStore)),
      t.asyncQueue.enqueueRetryable(async () => {
        hs('RemoteStore', 'Retrying IndexedDB access'),
          await n(),
          t.Gr.delete(1),
          await qc(t)
      })
  }
  function th (t, e) {
    return e().catch(n => Zc(t, n, e))
  }
  async function eh (t) {
    const e = ms(t),
      n = lh(e)
    let i = e.Qr.length > 0 ? e.Qr[e.Qr.length - 1].batchId : -1
    for (; nh(e); )
      try {
        const t = await lc(e.localStore, i)
        if (null === t) {
          0 === e.Qr.length && n._r()
          break
        }
        ;(i = t.batchId), ih(e, t)
      } catch (t) {
        await Zc(e, t)
      }
    sh(e) && rh(e)
  }
  function nh (t) {
    return Wc(t) && t.Qr.length < 10
  }
  function ih (t, e) {
    t.Qr.push(e)
    const n = lh(t)
    n.lr() && n.Sr && n.Dr(e.mutations)
  }
  function sh (t) {
    return Wc(t) && !lh(t).hr() && t.Qr.length > 0
  }
  function rh (t) {
    lh(t).start()
  }
  async function oh (t) {
    lh(t).kr()
  }
  async function ah (t) {
    const e = lh(t)
    for (const n of t.Qr) e.Dr(n.mutations)
  }
  async function ch (t, e, n) {
    const i = t.Qr.shift(),
      s = Ja.from(i, e, n)
    await th(t, () => t.remoteSyncer.applySuccessfulWrite(s)), await eh(t)
  }
  async function hh (t, e) {
    e &&
      lh(t).Sr &&
      (await (async function (t, e) {
        if (
          (function (t) {
            switch (t) {
              default:
                return fs()
              case gs.CANCELLED:
              case gs.UNKNOWN:
              case gs.DEADLINE_EXCEEDED:
              case gs.RESOURCE_EXHAUSTED:
              case gs.INTERNAL:
              case gs.UNAVAILABLE:
              case gs.UNAUTHENTICATED:
                return !1
              case gs.INVALID_ARGUMENT:
              case gs.NOT_FOUND:
              case gs.ALREADY_EXISTS:
              case gs.PERMISSION_DENIED:
              case gs.FAILED_PRECONDITION:
              case gs.ABORTED:
              case gs.OUT_OF_RANGE:
              case gs.UNIMPLEMENTED:
              case gs.DATA_LOSS:
                return !0
            }
          })((n = e.code)) &&
          n !== gs.ABORTED
        ) {
          const n = t.Qr.shift()
          lh(t).wr(),
            await th(t, () => t.remoteSyncer.rejectFailedWrite(n.batchId, e)),
            await eh(t)
        }
        var n
      })(t, e)),
      sh(t) && rh(t)
  }
  function uh (t) {
    return (
      t.Xr ||
        ((t.Xr = (function (t, e, n) {
          const i = ms(t)
          return (
            i.Or(),
            new Mc(e, i.ir, i.authCredentials, i.appCheckCredentials, i.k, n)
          )
        })(t.datastore, t.asyncQueue, {
          Di: Qc.bind(null, t),
          Ni: Xc.bind(null, t),
          br: Yc.bind(null, t)
        })),
        t.zr.push(async e => {
          e
            ? (t.Xr.wr(), Gc(t) ? zc(t) : t.Jr.set('Unknown'))
            : (await t.Xr.stop(), Jc(t))
        })),
      t.Xr
    )
  }
  function lh (t) {
    return (
      t.Zr ||
        ((t.Zr = (function (t, e, n) {
          const i = ms(t)
          return (
            i.Or(),
            new Uc(e, i.ir, i.authCredentials, i.appCheckCredentials, i.k, n)
          )
        })(t.datastore, t.asyncQueue, {
          Di: oh.bind(null, t),
          Ni: hh.bind(null, t),
          Nr: ah.bind(null, t),
          Cr: ch.bind(null, t)
        })),
        t.zr.push(async e => {
          e
            ? (t.Zr.wr(), await eh(t))
            : (await t.Zr.stop(),
              t.Qr.length > 0 &&
                (hs(
                  'RemoteStore',
                  `Stopping write stream with ${t.Qr.length} pending writes`
                ),
                (t.Qr = [])))
        })),
      t.Zr
    )
  }
  class dh {
    constructor (t, e, n, i, s) {
      ;(this.asyncQueue = t),
        (this.timerId = e),
        (this.targetTimeMs = n),
        (this.op = i),
        (this.removalCallback = s),
        (this.deferred = new vs()),
        (this.then = this.deferred.promise.then.bind(this.deferred.promise)),
        this.deferred.promise.catch(t => {})
    }
    static createAndSchedule (t, e, n, i, s) {
      const r = Date.now() + n,
        o = new dh(t, e, r, i, s)
      return o.start(n), o
    }
    start (t) {
      this.timerHandle = setTimeout(() => this.handleDelayElapsed(), t)
    }
    skipDelay () {
      return this.handleDelayElapsed()
    }
    cancel (t) {
      null !== this.timerHandle &&
        (this.clearTimeout(),
        this.deferred.reject(
          new ys(gs.CANCELLED, 'Operation cancelled' + (t ? ': ' + t : ''))
        ))
    }
    handleDelayElapsed () {
      this.asyncQueue.enqueueAndForget(() =>
        null !== this.timerHandle
          ? (this.clearTimeout(), this.op().then(t => this.deferred.resolve(t)))
          : Promise.resolve()
      )
    }
    clearTimeout () {
      null !== this.timerHandle &&
        (this.removalCallback(this),
        clearTimeout(this.timerHandle),
        (this.timerHandle = null))
    }
  }
  function fh (t, e) {
    if ((us('AsyncQueue', `${e}: ${t}`), Ga(t)))
      return new ys(gs.UNAVAILABLE, `${e}: ${t}`)
    throw t
  }
  class ph {
    constructor (t) {
      ;(this.comparator = t
        ? (e, n) => t(e, n) || Xs.comparator(e.key, n.key)
        : (t, e) => Xs.comparator(t.key, e.key)),
        (this.keyedMap = qo()),
        (this.sortedSet = new Oo(this.comparator))
    }
    static emptySet (t) {
      return new ph(t.comparator)
    }
    has (t) {
      return null != this.keyedMap.get(t)
    }
    get (t) {
      return this.keyedMap.get(t)
    }
    first () {
      return this.sortedSet.minKey()
    }
    last () {
      return this.sortedSet.maxKey()
    }
    isEmpty () {
      return this.sortedSet.isEmpty()
    }
    indexOf (t) {
      const e = this.keyedMap.get(t)
      return e ? this.sortedSet.indexOf(e) : -1
    }
    get size () {
      return this.sortedSet.size
    }
    forEach (t) {
      this.sortedSet.inorderTraversal((e, n) => (t(e), !1))
    }
    add (t) {
      const e = this.delete(t.key)
      return e.copy(e.keyedMap.insert(t.key, t), e.sortedSet.insert(t, null))
    }
    delete (t) {
      const e = this.get(t)
      return e
        ? this.copy(this.keyedMap.remove(t), this.sortedSet.remove(e))
        : this
    }
    isEqual (t) {
      if (!(t instanceof ph)) return !1
      if (this.size !== t.size) return !1
      const e = this.sortedSet.getIterator(),
        n = t.sortedSet.getIterator()
      for (; e.hasNext(); ) {
        const t = e.getNext().key,
          i = n.getNext().key
        if (!t.isEqual(i)) return !1
      }
      return !0
    }
    toString () {
      const t = []
      return (
        this.forEach(e => {
          t.push(e.toString())
        }),
        0 === t.length
          ? 'DocumentSet ()'
          : 'DocumentSet (\n  ' + t.join('  \n') + '\n)'
      )
    }
    copy (t, e) {
      const n = new ph()
      return (
        (n.comparator = this.comparator), (n.keyedMap = t), (n.sortedSet = e), n
      )
    }
  }
  class mh {
    constructor () {
      this.eo = new Oo(Xs.comparator)
    }
    track (t) {
      const e = t.doc.key,
        n = this.eo.get(e)
      n
        ? 0 !== t.type && 3 === n.type
          ? (this.eo = this.eo.insert(e, t))
          : 3 === t.type && 1 !== n.type
          ? (this.eo = this.eo.insert(e, { type: n.type, doc: t.doc }))
          : 2 === t.type && 2 === n.type
          ? (this.eo = this.eo.insert(e, { type: 2, doc: t.doc }))
          : 2 === t.type && 0 === n.type
          ? (this.eo = this.eo.insert(e, { type: 0, doc: t.doc }))
          : 1 === t.type && 0 === n.type
          ? (this.eo = this.eo.remove(e))
          : 1 === t.type && 2 === n.type
          ? (this.eo = this.eo.insert(e, { type: 1, doc: n.doc }))
          : 0 === t.type && 1 === n.type
          ? (this.eo = this.eo.insert(e, { type: 2, doc: t.doc }))
          : fs()
        : (this.eo = this.eo.insert(e, t))
    }
    no () {
      const t = []
      return (
        this.eo.inorderTraversal((e, n) => {
          t.push(n)
        }),
        t
      )
    }
  }
  class gh {
    constructor (t, e, n, i, s, r, o, a) {
      ;(this.query = t),
        (this.docs = e),
        (this.oldDocs = n),
        (this.docChanges = i),
        (this.mutatedKeys = s),
        (this.fromCache = r),
        (this.syncStateChanged = o),
        (this.excludesMetadataChanges = a)
    }
    static fromInitialDocuments (t, e, n, i) {
      const s = []
      return (
        e.forEach(t => {
          s.push({ type: 0, doc: t })
        }),
        new gh(t, e, ph.emptySet(e), s, n, i, !0, !1)
      )
    }
    get hasPendingWrites () {
      return !this.mutatedKeys.isEmpty()
    }
    isEqual (t) {
      if (
        !(
          this.fromCache === t.fromCache &&
          this.syncStateChanged === t.syncStateChanged &&
          this.mutatedKeys.isEqual(t.mutatedKeys) &&
          Hr(this.query, t.query) &&
          this.docs.isEqual(t.docs) &&
          this.oldDocs.isEqual(t.oldDocs)
        )
      )
        return !1
      const e = this.docChanges,
        n = t.docChanges
      if (e.length !== n.length) return !1
      for (let t = 0; t < e.length; t++)
        if (e[t].type !== n[t].type || !e[t].doc.isEqual(n[t].doc)) return !1
      return !0
    }
  }
  class yh {
    constructor () {
      ;(this.so = void 0), (this.listeners = [])
    }
  }
  class vh {
    constructor () {
      ;(this.queries = new sc(t => Kr(t), Hr)),
        (this.onlineState = 'Unknown'),
        (this.io = new Set())
    }
  }
  function wh (t, e) {
    const n = ms(t)
    let i = !1
    for (const t of e) {
      const e = t.query,
        s = n.queries.get(e)
      if (s) {
        for (const e of s.listeners) e.oo(t) && (i = !0)
        s.so = t
      }
    }
    i && Th(n)
  }
  function Ih (t, e, n) {
    const i = ms(t),
      s = i.queries.get(e)
    if (s) for (const t of s.listeners) t.onError(n)
    i.queries.delete(e)
  }
  function Th (t) {
    t.io.forEach(t => {
      t.next()
    })
  }
  class Eh {
    constructor (t, e, n) {
      ;(this.query = t),
        (this.co = e),
        (this.ao = !1),
        (this.uo = null),
        (this.onlineState = 'Unknown'),
        (this.options = n || {})
    }
    oo (t) {
      if (!this.options.includeMetadataChanges) {
        const e = []
        for (const n of t.docChanges) 3 !== n.type && e.push(n)
        t = new gh(
          t.query,
          t.docs,
          t.oldDocs,
          e,
          t.mutatedKeys,
          t.fromCache,
          t.syncStateChanged,
          !0
        )
      }
      let e = !1
      return (
        this.ao
          ? this.ho(t) && (this.co.next(t), (e = !0))
          : this.lo(t, this.onlineState) && (this.fo(t), (e = !0)),
        (this.uo = t),
        e
      )
    }
    onError (t) {
      this.co.error(t)
    }
    ro (t) {
      this.onlineState = t
      let e = !1
      return (
        this.uo &&
          !this.ao &&
          this.lo(this.uo, t) &&
          (this.fo(this.uo), (e = !0)),
        e
      )
    }
    lo (t, e) {
      if (!t.fromCache) return !0
      const n = 'Offline' !== e
      return !((this.options.wo && n) || (t.docs.isEmpty() && 'Offline' !== e))
    }
    ho (t) {
      if (t.docChanges.length > 0) return !0
      const e = this.uo && this.uo.hasPendingWrites !== t.hasPendingWrites
      return (
        !(!t.syncStateChanged && !e) &&
        !0 === this.options.includeMetadataChanges
      )
    }
    fo (t) {
      ;(t = gh.fromInitialDocuments(
        t.query,
        t.docs,
        t.mutatedKeys,
        t.fromCache
      )),
        (this.ao = !0),
        this.co.next(t)
    }
  }
  class bh {
    constructor (t) {
      this.key = t
    }
  }
  class _h {
    constructor (t) {
      this.key = t
    }
  }
  class Sh {
    constructor (t, e) {
      ;(this.query = t),
        (this.To = e),
        (this.Eo = null),
        (this.current = !1),
        (this.Io = $o()),
        (this.mutatedKeys = $o()),
        (this.Ao = Wr(t)),
        (this.Ro = new ph(this.Ao))
    }
    get bo () {
      return this.To
    }
    Po (t, e) {
      const n = e ? e.vo : new mh(),
        i = e ? e.Ro : this.Ro
      let s = e ? e.mutatedKeys : this.mutatedKeys,
        r = i,
        o = !1
      const a = xr(this.query) && i.size === this.query.limit ? i.last() : null,
        c = Vr(this.query) && i.size === this.query.limit ? i.first() : null
      if (
        (t.inorderTraversal((t, e) => {
          const h = i.get(t),
            u = Gr(this.query, e) ? e : null,
            l = !!h && this.mutatedKeys.has(h.key),
            d =
              !!u &&
              (u.hasLocalMutations ||
                (this.mutatedKeys.has(u.key) && u.hasCommittedMutations))
          let f = !1
          h && u
            ? h.data.isEqual(u.data)
              ? l !== d && (n.track({ type: 3, doc: u }), (f = !0))
              : this.Vo(h, u) ||
                (n.track({ type: 2, doc: u }),
                (f = !0),
                ((a && this.Ao(u, a) > 0) || (c && this.Ao(u, c) < 0)) &&
                  (o = !0))
            : !h && u
            ? (n.track({ type: 0, doc: u }), (f = !0))
            : h &&
              !u &&
              (n.track({ type: 1, doc: h }), (f = !0), (a || c) && (o = !0)),
            f &&
              (u
                ? ((r = r.add(u)), (s = d ? s.add(t) : s.delete(t)))
                : ((r = r.delete(t)), (s = s.delete(t))))
        }),
        xr(this.query) || Vr(this.query))
      )
        for (; r.size > this.query.limit; ) {
          const t = xr(this.query) ? r.last() : r.first()
          ;(r = r.delete(t.key)),
            (s = s.delete(t.key)),
            n.track({ type: 1, doc: t })
        }
      return { Ro: r, vo: n, Bn: o, mutatedKeys: s }
    }
    Vo (t, e) {
      return (
        t.hasLocalMutations && e.hasCommittedMutations && !e.hasLocalMutations
      )
    }
    applyChanges (t, e, n) {
      const i = this.Ro
      ;(this.Ro = t.Ro), (this.mutatedKeys = t.mutatedKeys)
      const s = t.vo.no()
      s.sort(
        (t, e) =>
          (function (t, e) {
            const n = t => {
              switch (t) {
                case 0:
                  return 1
                case 2:
                case 3:
                  return 2
                case 1:
                  return 0
                default:
                  return fs()
              }
            }
            return n(t) - n(e)
          })(t.type, e.type) || this.Ao(t.doc, e.doc)
      ),
        this.So(n)
      const r = e ? this.Do() : [],
        o = 0 === this.Io.size && this.current ? 1 : 0,
        a = o !== this.Eo
      return (
        (this.Eo = o),
        0 !== s.length || a
          ? {
              snapshot: new gh(
                this.query,
                t.Ro,
                i,
                s,
                t.mutatedKeys,
                0 === o,
                a,
                !1
              ),
              Co: r
            }
          : { Co: r }
      )
    }
    ro (t) {
      return this.current && 'Offline' === t
        ? ((this.current = !1),
          this.applyChanges(
            {
              Ro: this.Ro,
              vo: new mh(),
              mutatedKeys: this.mutatedKeys,
              Bn: !1
            },
            !1
          ))
        : { Co: [] }
    }
    No (t) {
      return (
        !this.To.has(t) && !!this.Ro.has(t) && !this.Ro.get(t).hasLocalMutations
      )
    }
    So (t) {
      t &&
        (t.addedDocuments.forEach(t => (this.To = this.To.add(t))),
        t.modifiedDocuments.forEach(t => {}),
        t.removedDocuments.forEach(t => (this.To = this.To.delete(t))),
        (this.current = t.current))
    }
    Do () {
      if (!this.current) return []
      const t = this.Io
      ;(this.Io = $o()),
        this.Ro.forEach(t => {
          this.No(t.key) && (this.Io = this.Io.add(t.key))
        })
      const e = []
      return (
        t.forEach(t => {
          this.Io.has(t) || e.push(new _h(t))
        }),
        this.Io.forEach(n => {
          t.has(n) || e.push(new bh(n))
        }),
        e
      )
    }
    ko (t) {
      ;(this.To = t.zn), (this.Io = $o())
      const e = this.Po(t.documents)
      return this.applyChanges(e, !0)
    }
    xo () {
      return gh.fromInitialDocuments(
        this.query,
        this.Ro,
        this.mutatedKeys,
        0 === this.Eo
      )
    }
  }
  class kh {
    constructor (t, e, n) {
      ;(this.query = t), (this.targetId = e), (this.view = n)
    }
  }
  class Ah {
    constructor (t) {
      ;(this.key = t), (this.$o = !1)
    }
  }
  class Ch {
    constructor (t, e, n, i, s, r) {
      ;(this.localStore = t),
        (this.remoteStore = e),
        (this.eventManager = n),
        (this.sharedClientState = i),
        (this.currentUser = s),
        (this.maxConcurrentLimboResolutions = r),
        (this.Oo = {}),
        (this.Mo = new sc(t => Kr(t), Hr)),
        (this.Fo = new Map()),
        (this.Lo = new Set()),
        (this.Bo = new Oo(Xs.comparator)),
        (this.Uo = new Map()),
        (this.qo = new mc()),
        (this.Ko = {}),
        (this.jo = new Map()),
        (this.Qo = nc.re()),
        (this.onlineState = 'Unknown'),
        (this.Wo = void 0)
    }
    get isPrimaryClient () {
      return !0 === this.Wo
    }
  }
  async function Nh (t, e) {
    const n = (function (t) {
      const e = ms(t)
      return (
        (e.remoteStore.remoteSyncer.applyRemoteEvent = Dh.bind(null, e)),
        (e.remoteStore.remoteSyncer.getRemoteKeysForTarget = Kh.bind(null, e)),
        (e.remoteStore.remoteSyncer.rejectListen = Lh.bind(null, e)),
        (e.Oo.br = wh.bind(null, e.eventManager)),
        (e.Oo.zo = Ih.bind(null, e.eventManager)),
        e
      )
    })(t)
    let i, s
    const r = n.Mo.get(e)
    if (r)
      (i = r.targetId),
        n.sharedClientState.addLocalQueryTarget(i),
        (s = r.view.xo())
    else {
      const t = await (function (t, e) {
          const n = ms(t)
          return n.persistence
            .runTransaction('Allocate target', 'readwrite', t => {
              let i
              return n.He.getTargetData(t, e).next(s =>
                s
                  ? ((i = s), za.resolve(i))
                  : n.He.allocateTargetId(t).next(
                      s => (
                        (i = new Qa(e, s, 0, t.currentSequenceNumber)),
                        n.He.addTargetData(t, i).next(() => i)
                      )
                    )
              )
            })
            .then(t => {
              const i = n.qn.get(t.targetId)
              return (
                (null === i ||
                  t.snapshotVersion.compareTo(i.snapshotVersion) > 0) &&
                  ((n.qn = n.qn.insert(t.targetId, t)),
                  n.Kn.set(e, t.targetId)),
                t
              )
            })
        })(n.localStore, $r(e)),
        r = n.sharedClientState.addLocalQueryTarget(t.targetId)
      ;(i = t.targetId),
        (s = await (async function (t, e, n, i) {
          t.Go = (e, n, i) =>
            (async function (t, e, n, i) {
              let s = e.view.Po(n)
              s.Bn &&
                (s = await fc(t.localStore, e.query, !1).then(
                  ({ documents: t }) => e.view.Po(t, s)
                ))
              const r = i && i.targetChanges.get(e.targetId),
                o = e.view.applyChanges(s, t.isPrimaryClient, r)
              return qh(t, e.targetId, o.Co), o.snapshot
            })(t, e, n, i)
          const s = await fc(t.localStore, e, !0),
            r = new Sh(e, s.zn),
            o = r.Po(s.documents),
            a = Go.createSynthesizedTargetChangeForCurrentChange(
              n,
              i && 'Offline' !== t.onlineState
            ),
            c = r.applyChanges(o, t.isPrimaryClient, a)
          qh(t, n, c.Co)
          const h = new kh(e, n, r)
          return (
            t.Mo.set(e, h),
            t.Fo.has(n) ? t.Fo.get(n).push(e) : t.Fo.set(n, [e]),
            c.snapshot
          )
        })(n, e, i, 'current' === r)),
        n.isPrimaryClient && Bc(n.remoteStore, t)
    }
    return s
  }
  async function Rh (t, e) {
    const n = ms(t),
      i = n.Mo.get(e),
      s = n.Fo.get(i.targetId)
    if (s.length > 1)
      return (
        n.Fo.set(
          i.targetId,
          s.filter(t => !Hr(t, e))
        ),
        void n.Mo.delete(e)
      )
    n.isPrimaryClient
      ? (n.sharedClientState.removeLocalQueryTarget(i.targetId),
        n.sharedClientState.isActiveQueryTarget(i.targetId) ||
          (await dc(n.localStore, i.targetId, !1)
            .then(() => {
              n.sharedClientState.clearQueryState(i.targetId),
                $c(n.remoteStore, i.targetId),
                Vh(n, i.targetId)
            })
            .catch(ic)))
      : (Vh(n, i.targetId), await dc(n.localStore, i.targetId, !0))
  }
  async function Dh (t, e) {
    const n = ms(t)
    try {
      const t = await (function (t, e) {
        const n = ms(t),
          i = e.snapshotVersion
        let s = n.qn
        return n.persistence
          .runTransaction('Apply remote event', 'readwrite-primary', t => {
            const r = n.Qn.newChangeBuffer({ trackRemovals: !0 })
            s = n.qn
            const o = []
            e.targetChanges.forEach((r, a) => {
              const c = s.get(a)
              if (!c) return
              o.push(
                n.He.removeMatchingKeys(t, r.removedDocuments, a).next(() =>
                  n.He.addMatchingKeys(t, r.addedDocuments, a)
                )
              )
              let h = c.withSequenceNumber(t.currentSequenceNumber)
              e.targetMismatches.has(a)
                ? (h = h
                    .withResumeToken(js.EMPTY_BYTE_STRING, Os.min())
                    .withLastLimboFreeSnapshotVersion(Os.min()))
                : r.resumeToken.approximateByteSize() > 0 &&
                  (h = h.withResumeToken(r.resumeToken, i)),
                (s = s.insert(a, h)),
                (function (t, e, n) {
                  return (
                    0 === t.resumeToken.approximateByteSize() ||
                    e.snapshotVersion.toMicroseconds() -
                      t.snapshotVersion.toMicroseconds() >=
                      3e8 ||
                    n.addedDocuments.size +
                      n.modifiedDocuments.size +
                      n.removedDocuments.size >
                      0
                  )
                })(c, h, r) && o.push(n.He.updateTargetData(t, h))
            })
            let a = Vo()
            if (
              (e.documentUpdates.forEach((i, s) => {
                e.resolvedLimboDocuments.has(i) &&
                  o.push(
                    n.persistence.referenceDelegate.updateLimboDocument(t, i)
                  )
              }),
              o.push(
                (function (t, e, n, i, s) {
                  let r = $o()
                  return (
                    n.forEach(t => (r = r.add(t))),
                    e.getEntries(t, r).next(t => {
                      let r = Vo()
                      return (
                        n.forEach((n, o) => {
                          const a = t.get(n),
                            c = (null == s ? void 0 : s.get(n)) || i
                          o.isNoDocument() && o.version.isEqual(Os.min())
                            ? (e.removeEntry(n, c), (r = r.insert(n, o)))
                            : !a.isValidDocument() ||
                              o.version.compareTo(a.version) > 0 ||
                              (0 === o.version.compareTo(a.version) &&
                                a.hasPendingWrites)
                            ? (e.addEntry(o, c), (r = r.insert(n, o)))
                            : hs(
                                'LocalStore',
                                'Ignoring outdated watch update for ',
                                n,
                                '. Current version:',
                                a.version,
                                ' Watch version:',
                                o.version
                              )
                        }),
                        r
                      )
                    })
                  )
                })(t, r, e.documentUpdates, i, void 0).next(t => {
                  a = t
                })
              ),
              !i.isEqual(Os.min()))
            ) {
              const e = n.He.getLastRemoteSnapshotVersion(t).next(e =>
                n.He.setTargetsMetadata(t, t.currentSequenceNumber, i)
              )
              o.push(e)
            }
            return za
              .waitFor(o)
              .next(() => r.apply(t))
              .next(() => n.Wn.Vn(t, a))
              .next(() => a)
          })
          .then(t => ((n.qn = s), t))
      })(n.localStore, e)
      e.targetChanges.forEach((t, e) => {
        const i = n.Uo.get(e)
        i &&
          (ps(
            t.addedDocuments.size +
              t.modifiedDocuments.size +
              t.removedDocuments.size <=
              1
          ),
          t.addedDocuments.size > 0
            ? (i.$o = !0)
            : t.modifiedDocuments.size > 0
            ? ps(i.$o)
            : t.removedDocuments.size > 0 && (ps(i.$o), (i.$o = !1)))
      }),
        await $h(n, t, e)
    } catch (t) {
      await ic(t)
    }
  }
  function Oh (t, e, n) {
    const i = ms(t)
    if ((i.isPrimaryClient && 0 === n) || (!i.isPrimaryClient && 1 === n)) {
      const t = []
      i.Mo.forEach((n, i) => {
        const s = i.view.ro(e)
        s.snapshot && t.push(s.snapshot)
      }),
        (function (t, e) {
          const n = ms(t)
          n.onlineState = e
          let i = !1
          n.queries.forEach((t, n) => {
            for (const t of n.listeners) t.ro(e) && (i = !0)
          }),
            i && Th(n)
        })(i.eventManager, e),
        t.length && i.Oo.br(t),
        (i.onlineState = e),
        i.isPrimaryClient && i.sharedClientState.setOnlineState(e)
    }
  }
  async function Lh (t, e, n) {
    const i = ms(t)
    i.sharedClientState.updateQueryState(e, 'rejected', n)
    const s = i.Uo.get(e),
      r = s && s.key
    if (r) {
      let t = new Oo(Xs.comparator)
      t = t.insert(r, pr.newNoDocument(r, Os.min()))
      const n = $o().add(r),
        s = new zo(Os.min(), new Map(), new Mo(Ns), t, n)
      await Dh(i, s), (i.Bo = i.Bo.remove(r)), i.Uo.delete(e), Bh(i)
    } else
      await dc(i.localStore, e, !1)
        .then(() => Vh(i, e, n))
        .catch(ic)
  }
  async function Ph (t, e) {
    const n = ms(t),
      i = e.batch.batchId
    try {
      const t = await (function (t, e) {
        const n = ms(t)
        return n.persistence.runTransaction(
          'Acknowledge batch',
          'readwrite-primary',
          t => {
            const i = e.batch.keys(),
              s = n.Qn.newChangeBuffer({ trackRemovals: !0 })
            return (function (t, e, n, i) {
              const s = n.batch,
                r = s.keys()
              let o = za.resolve()
              return (
                r.forEach(t => {
                  o = o
                    .next(() => i.getEntry(e, t))
                    .next(e => {
                      const r = n.docVersions.get(t)
                      ps(null !== r),
                        e.version.compareTo(r) < 0 &&
                          (s.applyToRemoteDocument(e, n),
                          e.isValidDocument() && i.addEntry(e, n.commitVersion))
                    })
                }),
                o.next(() => t.An.removeMutationBatch(e, s))
              )
            })(n, t, e, s)
              .next(() => s.apply(t))
              .next(() => n.An.performConsistencyCheck(t))
              .next(() => n.Wn.vn(t, i))
          }
        )
      })(n.localStore, e)
      xh(n, i, null),
        Uh(n, i),
        n.sharedClientState.updateMutationState(i, 'acknowledged'),
        await $h(n, t)
    } catch (t) {
      await ic(t)
    }
  }
  async function Mh (t, e, n) {
    const i = ms(t)
    try {
      const t = await (function (t, e) {
        const n = ms(t)
        return n.persistence.runTransaction(
          'Reject batch',
          'readwrite-primary',
          t => {
            let i
            return n.An.lookupMutationBatch(t, e)
              .next(
                e => (
                  ps(null !== e), (i = e.keys()), n.An.removeMutationBatch(t, e)
                )
              )
              .next(() => n.An.performConsistencyCheck(t))
              .next(() => n.Wn.vn(t, i))
          }
        )
      })(i.localStore, e)
      xh(i, e, n),
        Uh(i, e),
        i.sharedClientState.updateMutationState(e, 'rejected', n),
        await $h(i, t)
    } catch (n) {
      await ic(n)
    }
  }
  function Uh (t, e) {
    ;(t.jo.get(e) || []).forEach(t => {
      t.resolve()
    }),
      t.jo.delete(e)
  }
  function xh (t, e, n) {
    const i = ms(t)
    let s = i.Ko[i.currentUser.toKey()]
    if (s) {
      const t = s.get(e)
      t && (n ? t.reject(n) : t.resolve(), (s = s.remove(e))),
        (i.Ko[i.currentUser.toKey()] = s)
    }
  }
  function Vh (t, e, n = null) {
    t.sharedClientState.removeLocalQueryTarget(e)
    for (const i of t.Fo.get(e)) t.Mo.delete(i), n && t.Oo.zo(i, n)
    t.Fo.delete(e),
      t.isPrimaryClient &&
        t.qo.us(e).forEach(e => {
          t.qo.containsKey(e) || Fh(t, e)
        })
  }
  function Fh (t, e) {
    t.Lo.delete(e.path.canonicalString())
    const n = t.Bo.get(e)
    null !== n &&
      ($c(t.remoteStore, n), (t.Bo = t.Bo.remove(e)), t.Uo.delete(n), Bh(t))
  }
  function qh (t, e, n) {
    for (const i of n)
      i instanceof bh
        ? (t.qo.addReference(i.key, e), jh(t, i))
        : i instanceof _h
        ? (hs('SyncEngine', 'Document no longer in limbo: ' + i.key),
          t.qo.removeReference(i.key, e),
          t.qo.containsKey(i.key) || Fh(t, i.key))
        : fs()
  }
  function jh (t, e) {
    const n = e.key,
      i = n.path.canonicalString()
    t.Bo.get(n) ||
      t.Lo.has(i) ||
      (hs('SyncEngine', 'New document in limbo: ' + n), t.Lo.add(i), Bh(t))
  }
  function Bh (t) {
    for (; t.Lo.size > 0 && t.Bo.size < t.maxConcurrentLimboResolutions; ) {
      const e = t.Lo.values().next().value
      t.Lo.delete(e)
      const n = new Xs(xs.fromString(e)),
        i = t.Qo.next()
      t.Uo.set(i, new Ah(n)),
        (t.Bo = t.Bo.insert(n, i)),
        Bc(t.remoteStore, new Qa($r(Ur(n.path)), i, 2, ks.I))
    }
  }
  async function $h (t, e, n) {
    const i = ms(t),
      s = [],
      r = [],
      o = []
    i.Mo.isEmpty() ||
      (i.Mo.forEach((t, a) => {
        o.push(
          i.Go(a, e, n).then(t => {
            if (t) {
              i.isPrimaryClient &&
                i.sharedClientState.updateQueryState(
                  a.targetId,
                  t.fromCache ? 'not-current' : 'current'
                ),
                s.push(t)
              const e = oc.$n(a.targetId, t)
              r.push(e)
            }
          })
        )
      }),
      await Promise.all(o),
      i.Oo.br(s),
      await (async function (t, e) {
        const n = ms(t)
        try {
          await n.persistence.runTransaction(
            'notifyLocalViewChanges',
            'readwrite',
            t =>
              za.forEach(e, e =>
                za
                  .forEach(e.kn, i =>
                    n.persistence.referenceDelegate.addReference(
                      t,
                      e.targetId,
                      i
                    )
                  )
                  .next(() =>
                    za.forEach(e.xn, i =>
                      n.persistence.referenceDelegate.removeReference(
                        t,
                        e.targetId,
                        i
                      )
                    )
                  )
              )
          )
        } catch (t) {
          if (!Ga(t)) throw t
          hs('LocalStore', 'Failed to update sequence numbers: ' + t)
        }
        for (const t of e) {
          const e = t.targetId
          if (!t.fromCache) {
            const t = n.qn.get(e),
              i = t.snapshotVersion,
              s = t.withLastLimboFreeSnapshotVersion(i)
            n.qn = n.qn.insert(e, s)
          }
        }
      })(i.localStore, r))
  }
  async function Hh (t, e) {
    const n = ms(t)
    if (!n.currentUser.isEqual(e)) {
      hs('SyncEngine', 'User change. New user:', e.toKey())
      const t = await hc(n.localStore, e)
      ;(n.currentUser = e),
        (function (t, e) {
          t.jo.forEach(t => {
            t.forEach(t => {
              t.reject(
                new ys(
                  gs.CANCELLED,
                  "'waitForPendingWrites' promise is rejected due to a user change."
                )
              )
            })
          }),
            t.jo.clear()
        })(n),
        n.sharedClientState.handleUserChange(
          e,
          t.removedBatchIds,
          t.addedBatchIds
        ),
        await $h(n, t.Gn)
    }
  }
  function Kh (t, e) {
    const n = ms(t),
      i = n.Uo.get(e)
    if (i && i.$o) return $o().add(i.key)
    {
      let t = $o()
      const i = n.Fo.get(e)
      if (!i) return t
      for (const e of i) {
        const i = n.Mo.get(e)
        t = t.unionWith(i.view.bo)
      }
      return t
    }
  }
  function zh (t) {
    const e = ms(t)
    return (
      (e.remoteStore.remoteSyncer.applySuccessfulWrite = Ph.bind(null, e)),
      (e.remoteStore.remoteSyncer.rejectFailedWrite = Mh.bind(null, e)),
      e
    )
  }
  class Gh {
    constructor () {
      this.synchronizeTabs = !1
    }
    async initialize (t) {
      ;(this.k = Oc(t.databaseInfo.databaseId)),
        (this.sharedClientState = this.Jo(t)),
        (this.persistence = this.Yo(t)),
        await this.persistence.start(),
        (this.gcScheduler = this.Xo(t)),
        (this.localStore = this.Zo(t))
    }
    Xo (t) {
      return null
    }
    Zo (t) {
      return (function (t, e, n, i) {
        return new cc(t, e, n, i)
      })(this.persistence, new ac(), t.initialUser, this.k)
    }
    Yo (t) {
      return new Tc(bc.ks, this.k)
    }
    Jo (t) {
      return new Sc()
    }
    async terminate () {
      this.gcScheduler && this.gcScheduler.stop(),
        await this.sharedClientState.shutdown(),
        await this.persistence.shutdown()
    }
  }
  class Wh {
    async initialize (t, e) {
      this.localStore ||
        ((this.localStore = t.localStore),
        (this.sharedClientState = t.sharedClientState),
        (this.datastore = this.createDatastore(e)),
        (this.remoteStore = this.createRemoteStore(e)),
        (this.eventManager = this.createEventManager(e)),
        (this.syncEngine = this.createSyncEngine(e, !t.synchronizeTabs)),
        (this.sharedClientState.onlineStateHandler = t =>
          Oh(this.syncEngine, t, 1)),
        (this.remoteStore.remoteSyncer.handleCredentialChange = Hh.bind(
          null,
          this.syncEngine
        )),
        await (async function (t, e) {
          const n = ms(t)
          e
            ? (n.Gr.delete(2), await qc(n))
            : e || (n.Gr.add(2), await jc(n), n.Jr.set('Unknown'))
        })(this.remoteStore, this.syncEngine.isPrimaryClient))
    }
    createEventManager (t) {
      return new vh()
    }
    createDatastore (t) {
      const e = Oc(t.databaseInfo.databaseId),
        n = ((i = t.databaseInfo), new Rc(i))
      var i
      return (function (t, e, n, i) {
        return new xc(t, e, n, i)
      })(t.authCredentials, t.appCheckCredentials, n, e)
    }
    createRemoteStore (t) {
      return (
        (e = this.localStore),
        (n = this.datastore),
        (i = t.asyncQueue),
        (s = t => Oh(this.syncEngine, t, 0)),
        (r = Ac.Pt() ? new Ac() : new kc()),
        new Fc(e, n, i, s, r)
      )
      var e, n, i, s, r
    }
    createSyncEngine (t, e) {
      return (function (t, e, n, i, s, r, o) {
        const a = new Ch(t, e, n, i, s, r)
        return o && (a.Wo = !0), a
      })(
        this.localStore,
        this.remoteStore,
        this.eventManager,
        this.sharedClientState,
        t.initialUser,
        t.maxConcurrentLimboResolutions,
        e
      )
    }
    terminate () {
      return (async function (t) {
        const e = ms(t)
        hs('RemoteStore', 'RemoteStore shutting down.'),
          e.Gr.add(5),
          await jc(e),
          e.Hr.shutdown(),
          e.Jr.set('Unknown')
      })(this.remoteStore)
    }
  }
  class Jh {
    constructor (t) {
      ;(this.observer = t), (this.muted = !1)
    }
    next (t) {
      this.observer.next && this.ec(this.observer.next, t)
    }
    error (t) {
      this.observer.error
        ? this.ec(this.observer.error, t)
        : console.error('Uncaught Error in snapshot listener:', t)
    }
    nc () {
      this.muted = !0
    }
    ec (t, e) {
      this.muted ||
        setTimeout(() => {
          this.muted || t(e)
        }, 0)
    }
  }
  class Qh {
    constructor (t, e, n, i) {
      ;(this.authCredentials = t),
        (this.appCheckCredentials = e),
        (this.asyncQueue = n),
        (this.databaseInfo = i),
        (this.user = rs.UNAUTHENTICATED),
        (this.clientId = Cs.A()),
        (this.authCredentialListener = () => Promise.resolve()),
        this.authCredentials.start(n, async t => {
          hs('FirestoreClient', 'Received user=', t.uid),
            await this.authCredentialListener(t),
            (this.user = t)
        }),
        this.appCheckCredentials.start(n, () => Promise.resolve())
    }
    async getConfiguration () {
      return {
        asyncQueue: this.asyncQueue,
        databaseInfo: this.databaseInfo,
        clientId: this.clientId,
        authCredentials: this.authCredentials,
        appCheckCredentials: this.appCheckCredentials,
        initialUser: this.user,
        maxConcurrentLimboResolutions: 100
      }
    }
    setCredentialChangeListener (t) {
      this.authCredentialListener = t
    }
    verifyNotTerminated () {
      if (this.asyncQueue.isShuttingDown)
        throw new ys(
          gs.FAILED_PRECONDITION,
          'The client has already been terminated.'
        )
    }
    terminate () {
      this.asyncQueue.enterRestrictedMode()
      const t = new vs()
      return (
        this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
          try {
            this.onlineComponents && (await this.onlineComponents.terminate()),
              this.offlineComponents &&
                (await this.offlineComponents.terminate()),
              this.authCredentials.shutdown(),
              this.appCheckCredentials.shutdown(),
              t.resolve()
          } catch (e) {
            const n = fh(e, 'Failed to shutdown persistence')
            t.reject(n)
          }
        }),
        t.promise
      )
    }
  }
  async function Xh (t, e) {
    t.asyncQueue.verifyOperationInProgress()
    const n = await (async function (t) {
      return (
        t.offlineComponents ||
          (hs('FirestoreClient', 'Using default OfflineComponentProvider'),
          await (async function (t, e) {
            t.asyncQueue.verifyOperationInProgress(),
              hs('FirestoreClient', 'Initializing OfflineComponentProvider')
            const n = await t.getConfiguration()
            await e.initialize(n)
            let i = n.initialUser
            t.setCredentialChangeListener(async t => {
              i.isEqual(t) || (await hc(e.localStore, t), (i = t))
            }),
              e.persistence.setDatabaseDeletedListener(() => t.terminate()),
              (t.offlineComponents = e)
          })(t, new Gh())),
        t.offlineComponents
      )
    })(t)
    hs('FirestoreClient', 'Initializing OnlineComponentProvider')
    const i = await t.getConfiguration()
    await e.initialize(n, i),
      t.setCredentialChangeListener(t =>
        (async function (t, e) {
          const n = ms(t)
          n.asyncQueue.verifyOperationInProgress(),
            hs('RemoteStore', 'RemoteStore received new credentials')
          const i = Wc(n)
          n.Gr.add(3),
            await jc(n),
            i && n.Jr.set('Unknown'),
            await n.remoteSyncer.handleCredentialChange(e),
            n.Gr.delete(3),
            await qc(n)
        })(e.remoteStore, t)
      ),
      (t.onlineComponents = e)
  }
  async function Yh (t) {
    return (
      t.onlineComponents ||
        (hs('FirestoreClient', 'Using default OnlineComponentProvider'),
        await Xh(t, new Wh())),
      t.onlineComponents
    )
  }
  async function Zh (t) {
    const e = await Yh(t),
      n = e.eventManager
    return (
      (n.onListen = Nh.bind(null, e.syncEngine)),
      (n.onUnlisten = Rh.bind(null, e.syncEngine)),
      n
    )
  }
  class tu {
    constructor (t, e, n, i, s, r, o, a) {
      ;(this.databaseId = t),
        (this.appId = e),
        (this.persistenceKey = n),
        (this.host = i),
        (this.ssl = s),
        (this.forceLongPolling = r),
        (this.autoDetectLongPolling = o),
        (this.useFetchStreams = a)
    }
  }
  class eu {
    constructor (t, e) {
      ;(this.projectId = t), (this.database = e || '(default)')
    }
    get isDefaultDatabase () {
      return '(default)' === this.database
    }
    isEqual (t) {
      return (
        t instanceof eu &&
        t.projectId === this.projectId &&
        t.database === this.database
      )
    }
  }
  const nu = new Map()
  function iu (t, e, n) {
    if (!n)
      throw new ys(
        gs.INVALID_ARGUMENT,
        `Function ${t}() cannot be called with an empty ${e}.`
      )
  }
  function su (t) {
    if (!Xs.isDocumentKey(t))
      throw new ys(
        gs.INVALID_ARGUMENT,
        `Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`
      )
  }
  function ru (t) {
    if (Xs.isDocumentKey(t))
      throw new ys(
        gs.INVALID_ARGUMENT,
        `Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`
      )
  }
  function ou (t) {
    if (void 0 === t) return 'undefined'
    if (null === t) return 'null'
    if ('string' == typeof t)
      return (
        t.length > 20 && (t = `${t.substring(0, 20)}...`), JSON.stringify(t)
      )
    if ('number' == typeof t || 'boolean' == typeof t) return '' + t
    if ('object' == typeof t) {
      if (t instanceof Array) return 'an array'
      {
        const e = (function (t) {
          return t.constructor ? t.constructor.name : null
        })(t)
        return e ? `a custom ${e} object` : 'an object'
      }
    }
    return 'function' == typeof t ? 'a function' : fs()
  }
  function au (t, e) {
    if (('_delegate' in t && (t = t._delegate), !(t instanceof e))) {
      if (e.name === t.constructor.name)
        throw new ys(
          gs.INVALID_ARGUMENT,
          'Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?'
        )
      {
        const n = ou(t)
        throw new ys(
          gs.INVALID_ARGUMENT,
          `Expected type '${e.name}', but it was: ${n}`
        )
      }
    }
    return t
  }
  class cu {
    constructor (t) {
      var e
      if (void 0 === t.host) {
        if (void 0 !== t.ssl)
          throw new ys(
            gs.INVALID_ARGUMENT,
            "Can't provide ssl option if host option is not set"
          )
        ;(this.host = 'firestore.googleapis.com'), (this.ssl = !0)
      } else
        (this.host = t.host),
          (this.ssl = null === (e = t.ssl) || void 0 === e || e)
      if (
        ((this.credentials = t.credentials),
        (this.ignoreUndefinedProperties = !!t.ignoreUndefinedProperties),
        void 0 === t.cacheSizeBytes)
      )
        this.cacheSizeBytes = 41943040
      else {
        if (-1 !== t.cacheSizeBytes && t.cacheSizeBytes < 1048576)
          throw new ys(
            gs.INVALID_ARGUMENT,
            'cacheSizeBytes must be at least 1048576'
          )
        this.cacheSizeBytes = t.cacheSizeBytes
      }
      ;(this.experimentalForceLongPolling = !!t.experimentalForceLongPolling),
        (this.experimentalAutoDetectLongPolling = !!t.experimentalAutoDetectLongPolling),
        (this.useFetchStreams = !!t.useFetchStreams),
        (function (t, e, n, i) {
          if (!0 === e && !0 === i)
            throw new ys(
              gs.INVALID_ARGUMENT,
              'experimentalForceLongPolling and experimentalAutoDetectLongPolling cannot be used together.'
            )
        })(
          0,
          t.experimentalForceLongPolling,
          0,
          t.experimentalAutoDetectLongPolling
        )
    }
    isEqual (t) {
      return (
        this.host === t.host &&
        this.ssl === t.ssl &&
        this.credentials === t.credentials &&
        this.cacheSizeBytes === t.cacheSizeBytes &&
        this.experimentalForceLongPolling === t.experimentalForceLongPolling &&
        this.experimentalAutoDetectLongPolling ===
          t.experimentalAutoDetectLongPolling &&
        this.ignoreUndefinedProperties === t.ignoreUndefinedProperties &&
        this.useFetchStreams === t.useFetchStreams
      )
    }
  }
  class hu {
    constructor (t, e, n) {
      ;(this._authCredentials = e),
        (this._appCheckCredentials = n),
        (this.type = 'firestore-lite'),
        (this._persistenceKey = '(lite)'),
        (this._settings = new cu({})),
        (this._settingsFrozen = !1),
        t instanceof eu
          ? (this._databaseId = t)
          : ((this._app = t),
            (this._databaseId = (function (t) {
              if (
                !Object.prototype.hasOwnProperty.apply(t.options, ['projectId'])
              )
                throw new ys(
                  gs.INVALID_ARGUMENT,
                  '"projectId" not provided in firebase.initializeApp.'
                )
              return new eu(t.options.projectId)
            })(t)))
    }
    get app () {
      if (!this._app)
        throw new ys(
          gs.FAILED_PRECONDITION,
          "Firestore was not initialized using the Firebase SDK. 'app' is not available"
        )
      return this._app
    }
    get _initialized () {
      return this._settingsFrozen
    }
    get _terminated () {
      return void 0 !== this._terminateTask
    }
    _setSettings (t) {
      if (this._settingsFrozen)
        throw new ys(
          gs.FAILED_PRECONDITION,
          'Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.'
        )
      ;(this._settings = new cu(t)),
        void 0 !== t.credentials &&
          (this._authCredentials = (function (t) {
            if (!t) return new Is()
            switch (t.type) {
              case 'gapi':
                const e = t.client
                return (
                  ps(
                    !(
                      'object' != typeof e ||
                      null === e ||
                      !e.auth ||
                      !e.auth.getAuthHeaderValueForFirstParty
                    )
                  ),
                  new bs(e, t.sessionIndex || '0', t.iamToken || null)
                )
              case 'provider':
                return t.client
              default:
                throw new ys(
                  gs.INVALID_ARGUMENT,
                  'makeAuthCredentialsProvider failed due to invalid credential type'
                )
            }
          })(t.credentials))
    }
    _getSettings () {
      return this._settings
    }
    _freezeSettings () {
      return (this._settingsFrozen = !0), this._settings
    }
    _delete () {
      return (
        this._terminateTask || (this._terminateTask = this._terminate()),
        this._terminateTask
      )
    }
    toJSON () {
      return {
        app: this._app,
        databaseId: this._databaseId,
        settings: this._settings
      }
    }
    _terminate () {
      return (
        (function (t) {
          const e = nu.get(t)
          e &&
            (hs('ComponentProvider', 'Removing Datastore'),
            nu.delete(t),
            e.terminate())
        })(this),
        Promise.resolve()
      )
    }
  }
  class uu {
    constructor (t, e, n) {
      ;(this.converter = e),
        (this._key = n),
        (this.type = 'document'),
        (this.firestore = t)
    }
    get _path () {
      return this._key.path
    }
    get id () {
      return this._key.path.lastSegment()
    }
    get path () {
      return this._key.path.canonicalString()
    }
    get parent () {
      return new du(this.firestore, this.converter, this._key.path.popLast())
    }
    withConverter (t) {
      return new uu(this.firestore, t, this._key)
    }
  }
  class lu {
    constructor (t, e, n) {
      ;(this.converter = e),
        (this._query = n),
        (this.type = 'query'),
        (this.firestore = t)
    }
    withConverter (t) {
      return new lu(this.firestore, t, this._query)
    }
  }
  class du extends lu {
    constructor (t, e, n) {
      super(t, e, Ur(n)), (this._path = n), (this.type = 'collection')
    }
    get id () {
      return this._query.path.lastSegment()
    }
    get path () {
      return this._query.path.canonicalString()
    }
    get parent () {
      const t = this._path.popLast()
      return t.isEmpty() ? null : new uu(this.firestore, null, new Xs(t))
    }
    withConverter (t) {
      return new du(this.firestore, t, this._path)
    }
  }
  function fu (t, e, ...n) {
    if (((t = v(t)), iu('collection', 'path', e), t instanceof hu)) {
      const i = xs.fromString(e, ...n)
      return ru(i), new du(t, null, i)
    }
    {
      if (!(t instanceof uu || t instanceof du))
        throw new ys(
          gs.INVALID_ARGUMENT,
          'Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore'
        )
      const i = t._path.child(xs.fromString(e, ...n))
      return ru(i), new du(t.firestore, null, i)
    }
  }
  function pu (t, e, ...n) {
    if (
      ((t = v(t)),
      1 === arguments.length && (e = Cs.A()),
      iu('doc', 'path', e),
      t instanceof hu)
    ) {
      const i = xs.fromString(e, ...n)
      return su(i), new uu(t, null, new Xs(i))
    }
    {
      if (!(t instanceof uu || t instanceof du))
        throw new ys(
          gs.INVALID_ARGUMENT,
          'Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore'
        )
      const i = t._path.child(xs.fromString(e, ...n))
      return (
        su(i),
        new uu(t.firestore, t instanceof du ? t.converter : null, new Xs(i))
      )
    }
  }
  class mu {
    constructor () {
      ;(this.mc = Promise.resolve()),
        (this.gc = []),
        (this.yc = !1),
        (this.Tc = []),
        (this.Ec = null),
        (this.Ic = !1),
        (this.Ac = !1),
        (this.Rc = []),
        (this.ur = new Lc(this, 'async_queue_retry')),
        (this.bc = () => {
          const t = Dc()
          t &&
            hs(
              'AsyncQueue',
              'Visibility state changed to ' + t.visibilityState
            ),
            this.ur.er()
        })
      const t = Dc()
      t &&
        'function' == typeof t.addEventListener &&
        t.addEventListener('visibilitychange', this.bc)
    }
    get isShuttingDown () {
      return this.yc
    }
    enqueueAndForget (t) {
      this.enqueue(t)
    }
    enqueueAndForgetEvenWhileRestricted (t) {
      this.Pc(), this.vc(t)
    }
    enterRestrictedMode (t) {
      if (!this.yc) {
        ;(this.yc = !0), (this.Ac = t || !1)
        const e = Dc()
        e &&
          'function' == typeof e.removeEventListener &&
          e.removeEventListener('visibilitychange', this.bc)
      }
    }
    enqueue (t) {
      if ((this.Pc(), this.yc)) return new Promise(() => {})
      const e = new vs()
      return this.vc(() =>
        this.yc && this.Ac
          ? Promise.resolve()
          : (t().then(e.resolve, e.reject), e.promise)
      ).then(() => e.promise)
    }
    enqueueRetryable (t) {
      this.enqueueAndForget(() => (this.gc.push(t), this.Vc()))
    }
    async Vc () {
      if (0 !== this.gc.length) {
        try {
          await this.gc[0](), this.gc.shift(), this.ur.reset()
        } catch (t) {
          if (!Ga(t)) throw t
          hs('AsyncQueue', 'Operation failed with retryable error: ' + t)
        }
        this.gc.length > 0 && this.ur.Zi(() => this.Vc())
      }
    }
    vc (t) {
      const e = this.mc.then(
        () => (
          (this.Ic = !0),
          t()
            .catch(t => {
              ;(this.Ec = t), (this.Ic = !1)
              const e = (function (t) {
                let e = t.message || ''
                return (
                  t.stack &&
                    (e = t.stack.includes(t.message)
                      ? t.stack
                      : t.message + '\n' + t.stack),
                  e
                )
              })(t)
              throw (us('INTERNAL UNHANDLED ERROR: ', e), t)
            })
            .then(t => ((this.Ic = !1), t))
        )
      )
      return (this.mc = e), e
    }
    enqueueAfterDelay (t, e, n) {
      this.Pc(), this.Rc.indexOf(t) > -1 && (e = 0)
      const i = dh.createAndSchedule(this, t, e, n, t => this.Sc(t))
      return this.Tc.push(i), i
    }
    Pc () {
      this.Ec && fs()
    }
    verifyOperationInProgress () {}
    async Dc () {
      let t
      do {
        ;(t = this.mc), await t
      } while (t !== this.mc)
    }
    Cc (t) {
      for (const e of this.Tc) if (e.timerId === t) return !0
      return !1
    }
    Nc (t) {
      return this.Dc().then(() => {
        this.Tc.sort((t, e) => t.targetTimeMs - e.targetTimeMs)
        for (const e of this.Tc)
          if ((e.skipDelay(), 'all' !== t && e.timerId === t)) break
        return this.Dc()
      })
    }
    kc (t) {
      this.Rc.push(t)
    }
    Sc (t) {
      const e = this.Tc.indexOf(t)
      this.Tc.splice(e, 1)
    }
  }
  function gu (t) {
    return (function (t, e) {
      if ('object' != typeof t || null === t) return !1
      const n = t
      for (const t of ['next', 'error', 'complete'])
        if (t in n && 'function' == typeof n[t]) return !0
      return !1
    })(t)
  }
  class yu extends hu {
    constructor (t, e, n) {
      super(t, e, n),
        (this.type = 'firestore'),
        (this._queue = new mu()),
        (this._persistenceKey = 'name' in t ? t.name : '[DEFAULT]')
    }
    _terminate () {
      return (
        this._firestoreClient || wu(this), this._firestoreClient.terminate()
      )
    }
  }
  function vu (t) {
    return (
      t._firestoreClient || wu(t),
      t._firestoreClient.verifyNotTerminated(),
      t._firestoreClient
    )
  }
  function wu (t) {
    var e
    const n = t._freezeSettings(),
      i = (function (t, e, n, i) {
        return new tu(
          t,
          e,
          n,
          i.host,
          i.ssl,
          i.experimentalForceLongPolling,
          i.experimentalAutoDetectLongPolling,
          i.useFetchStreams
        )
      })(
        t._databaseId,
        (null === (e = t._app) || void 0 === e ? void 0 : e.options.appId) ||
          '',
        t._persistenceKey,
        n
      )
    t._firestoreClient = new Qh(
      t._authCredentials,
      t._appCheckCredentials,
      t._queue,
      i
    )
  }
  class Iu {
    constructor (...t) {
      for (let e = 0; e < t.length; ++e)
        if (0 === t[e].length)
          throw new ys(
            gs.INVALID_ARGUMENT,
            'Invalid field name at argument $(i + 1). Field names must not be empty.'
          )
      this._internalPath = new Fs(t)
    }
    isEqual (t) {
      return this._internalPath.isEqual(t._internalPath)
    }
  }
  class Tu {
    constructor (t) {
      this._byteString = t
    }
    static fromBase64String (t) {
      try {
        return new Tu(js.fromBase64String(t))
      } catch (t) {
        throw new ys(
          gs.INVALID_ARGUMENT,
          'Failed to construct data from Base64 string: ' + t
        )
      }
    }
    static fromUint8Array (t) {
      return new Tu(js.fromUint8Array(t))
    }
    toBase64 () {
      return this._byteString.toBase64()
    }
    toUint8Array () {
      return this._byteString.toUint8Array()
    }
    toString () {
      return 'Bytes(base64: ' + this.toBase64() + ')'
    }
    isEqual (t) {
      return this._byteString.isEqual(t._byteString)
    }
  }
  class Eu {
    constructor (t) {
      this._methodName = t
    }
  }
  class bu {
    constructor (t, e) {
      if (!isFinite(t) || t < -90 || t > 90)
        throw new ys(
          gs.INVALID_ARGUMENT,
          'Latitude must be a number between -90 and 90, but was: ' + t
        )
      if (!isFinite(e) || e < -180 || e > 180)
        throw new ys(
          gs.INVALID_ARGUMENT,
          'Longitude must be a number between -180 and 180, but was: ' + e
        )
      ;(this._lat = t), (this._long = e)
    }
    get latitude () {
      return this._lat
    }
    get longitude () {
      return this._long
    }
    isEqual (t) {
      return this._lat === t._lat && this._long === t._long
    }
    toJSON () {
      return { latitude: this._lat, longitude: this._long }
    }
    _compareTo (t) {
      return Ns(this._lat, t._lat) || Ns(this._long, t._long)
    }
  }
  const _u = /^__.*__$/
  class Su {
    constructor (t, e, n) {
      ;(this.data = t), (this.fieldMask = e), (this.fieldTransforms = n)
    }
    toMutation (t, e) {
      return null !== this.fieldMask
        ? new Eo(t, this.data, this.fieldMask, e, this.fieldTransforms)
        : new To(t, this.data, e, this.fieldTransforms)
    }
  }
  function ku (t) {
    switch (t) {
      case 0:
      case 2:
      case 1:
        return !0
      case 3:
      case 4:
        return !1
      default:
        throw fs()
    }
  }
  class Au {
    constructor (t, e, n, i, s, r) {
      ;(this.settings = t),
        (this.databaseId = e),
        (this.k = n),
        (this.ignoreUndefinedProperties = i),
        void 0 === s && this.xc(),
        (this.fieldTransforms = s || []),
        (this.fieldMask = r || [])
    }
    get path () {
      return this.settings.path
    }
    get $c () {
      return this.settings.$c
    }
    Oc (t) {
      return new Au(
        Object.assign(Object.assign({}, this.settings), t),
        this.databaseId,
        this.k,
        this.ignoreUndefinedProperties,
        this.fieldTransforms,
        this.fieldMask
      )
    }
    Mc (t) {
      var e
      const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t),
        i = this.Oc({ path: n, Fc: !1 })
      return i.Lc(t), i
    }
    Bc (t) {
      var e
      const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t),
        i = this.Oc({ path: n, Fc: !1 })
      return i.xc(), i
    }
    Uc (t) {
      return this.Oc({ path: void 0, Fc: !0 })
    }
    qc (t) {
      return Vu(
        t,
        this.settings.methodName,
        this.settings.Kc || !1,
        this.path,
        this.settings.jc
      )
    }
    contains (t) {
      return (
        void 0 !== this.fieldMask.find(e => t.isPrefixOf(e)) ||
        void 0 !== this.fieldTransforms.find(e => t.isPrefixOf(e.field))
      )
    }
    xc () {
      if (this.path)
        for (let t = 0; t < this.path.length; t++) this.Lc(this.path.get(t))
    }
    Lc (t) {
      if (0 === t.length) throw this.qc('Document fields must not be empty')
      if (ku(this.$c) && _u.test(t))
        throw this.qc('Document fields cannot begin and end with "__"')
    }
  }
  class Cu {
    constructor (t, e, n) {
      ;(this.databaseId = t),
        (this.ignoreUndefinedProperties = e),
        (this.k = n || Oc(t))
    }
    Qc (t, e, n, i = !1) {
      return new Au(
        { $c: t, methodName: e, jc: n, path: Fs.emptyPath(), Fc: !1, Kc: i },
        this.databaseId,
        this.k,
        this.ignoreUndefinedProperties
      )
    }
  }
  function Nu (t) {
    const e = t._freezeSettings(),
      n = Oc(t._databaseId)
    return new Cu(t._databaseId, !!e.ignoreUndefinedProperties, n)
  }
  function Ru (t, e, n, i, s, r = {}) {
    const o = t.Qc(r.merge || r.mergeFields ? 2 : 0, e, n, s)
    Pu('Data must be an object, but it was:', o, i)
    const a = Ou(i, o)
    let c, h
    if (r.merge) (c = new qs(o.fieldMask)), (h = o.fieldTransforms)
    else if (r.mergeFields) {
      const t = []
      for (const i of r.mergeFields) {
        const s = Mu(e, i, n)
        if (!o.contains(s))
          throw new ys(
            gs.INVALID_ARGUMENT,
            `Field '${s}' is specified in your field mask but missing from your input data.`
          )
        Fu(t, s) || t.push(s)
      }
      ;(c = new qs(t)), (h = o.fieldTransforms.filter(t => c.covers(t.field)))
    } else (c = null), (h = o.fieldTransforms)
    return new Su(new dr(a), c, h)
  }
  function Du (t, e) {
    if (Lu((t = v(t)))) return Pu('Unsupported field value:', e, t), Ou(t, e)
    if (t instanceof Eu)
      return (
        (function (t, e) {
          if (!ku(e.$c))
            throw e.qc(
              `${t._methodName}() can only be used with update() and set()`
            )
          if (!e.path)
            throw e.qc(
              `${t._methodName}() is not currently supported inside arrays`
            )
          const n = t._toFieldTransform(e)
          n && e.fieldTransforms.push(n)
        })(t, e),
        null
      )
    if (void 0 === t && e.ignoreUndefinedProperties) return null
    if ((e.path && e.fieldMask.push(e.path), t instanceof Array)) {
      if (e.settings.Fc && 4 !== e.$c)
        throw e.qc('Nested arrays are not supported')
      return (function (t, e) {
        const n = []
        let i = 0
        for (const s of t) {
          let t = Du(s, e.Uc(i))
          null == t && (t = { nullValue: 'NULL_VALUE' }), n.push(t), i++
        }
        return { arrayValue: { values: n } }
      })(t, e)
    }
    return (function (t, e) {
      if (null === (t = v(t))) return { nullValue: 'NULL_VALUE' }
      if ('number' == typeof t) return Yr(e.k, t)
      if ('boolean' == typeof t) return { booleanValue: t }
      if ('string' == typeof t) return { stringValue: t }
      if (t instanceof Date) {
        const n = Ds.fromDate(t)
        return { timestampValue: sa(e.k, n) }
      }
      if (t instanceof Ds) {
        const n = new Ds(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3))
        return { timestampValue: sa(e.k, n) }
      }
      if (t instanceof bu)
        return {
          geoPointValue: { latitude: t.latitude, longitude: t.longitude }
        }
      if (t instanceof Tu) return { bytesValue: ra(e.k, t._byteString) }
      if (t instanceof uu) {
        const n = e.databaseId,
          i = t.firestore._databaseId
        if (!i.isEqual(n))
          throw e.qc(
            `Document reference is for database ${i.projectId}/${i.database} but should be for database ${n.projectId}/${n.database}`
          )
        return {
          referenceValue: ca(
            t.firestore._databaseId || e.databaseId,
            t._key.path
          )
        }
      }
      throw e.qc(`Unsupported field value: ${ou(t)}`)
    })(t, e)
  }
  function Ou (t, e) {
    const n = {}
    return (
      Ms(t)
        ? e.path && e.path.length > 0 && e.fieldMask.push(e.path)
        : Ps(t, (t, i) => {
            const s = Du(i, e.Mc(t))
            null != s && (n[t] = s)
          }),
      { mapValue: { fields: n } }
    )
  }
  function Lu (t) {
    return !(
      'object' != typeof t ||
      null === t ||
      t instanceof Array ||
      t instanceof Date ||
      t instanceof Ds ||
      t instanceof bu ||
      t instanceof Tu ||
      t instanceof uu ||
      t instanceof Eu
    )
  }
  function Pu (t, e, n) {
    if (
      !Lu(n) ||
      !(function (t) {
        return (
          'object' == typeof t &&
          null !== t &&
          (Object.getPrototypeOf(t) === Object.prototype ||
            null === Object.getPrototypeOf(t))
        )
      })(n)
    ) {
      const i = ou(n)
      throw 'an object' === i ? e.qc(t + ' a custom object') : e.qc(t + ' ' + i)
    }
  }
  function Mu (t, e, n) {
    if ((e = v(e)) instanceof Iu) return e._internalPath
    if ('string' == typeof e) return xu(t, e)
    throw Vu(
      'Field path arguments must be of type string or ',
      t,
      !1,
      void 0,
      n
    )
  }
  const Uu = new RegExp('[~\\*/\\[\\]]')
  function xu (t, e, n) {
    if (e.search(Uu) >= 0)
      throw Vu(
        `Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,
        t,
        !1,
        void 0,
        n
      )
    try {
      return new Iu(...e.split('.'))._internalPath
    } catch (i) {
      throw Vu(
        `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
        t,
        !1,
        void 0,
        n
      )
    }
  }
  function Vu (t, e, n, i, s) {
    const r = i && !i.isEmpty(),
      o = void 0 !== s
    let a = `Function ${e}() called with invalid data`
    n && (a += ' (via `toFirestore()`)'), (a += '. ')
    let c = ''
    return (
      (r || o) &&
        ((c += ' (found'),
        r && (c += ` in field ${i}`),
        o && (c += ` in document ${s}`),
        (c += ')')),
      new ys(gs.INVALID_ARGUMENT, a + t + c)
    )
  }
  function Fu (t, e) {
    return t.some(t => t.isEqual(e))
  }
  class qu {
    constructor (t, e, n, i, s) {
      ;(this._firestore = t),
        (this._userDataWriter = e),
        (this._key = n),
        (this._document = i),
        (this._converter = s)
    }
    get id () {
      return this._key.path.lastSegment()
    }
    get ref () {
      return new uu(this._firestore, this._converter, this._key)
    }
    exists () {
      return null !== this._document
    }
    data () {
      if (this._document) {
        if (this._converter) {
          const t = new ju(
            this._firestore,
            this._userDataWriter,
            this._key,
            this._document,
            null
          )
          return this._converter.fromFirestore(t)
        }
        return this._userDataWriter.convertValue(this._document.data.value)
      }
    }
    get (t) {
      if (this._document) {
        const e = this._document.data.field(Bu('DocumentSnapshot.get', t))
        if (null !== e) return this._userDataWriter.convertValue(e)
      }
    }
  }
  class ju extends qu {
    data () {
      return super.data()
    }
  }
  function Bu (t, e) {
    return 'string' == typeof e
      ? xu(t, e)
      : e instanceof Iu
      ? e._internalPath
      : e._delegate._internalPath
  }
  class $u {
    constructor (t, e) {
      ;(this.hasPendingWrites = t), (this.fromCache = e)
    }
    isEqual (t) {
      return (
        this.hasPendingWrites === t.hasPendingWrites &&
        this.fromCache === t.fromCache
      )
    }
  }
  class Hu extends qu {
    constructor (t, e, n, i, s, r) {
      super(t, e, n, i, r),
        (this._firestore = t),
        (this._firestoreImpl = t),
        (this.metadata = s)
    }
    exists () {
      return super.exists()
    }
    data (t = {}) {
      if (this._document) {
        if (this._converter) {
          const e = new Ku(
            this._firestore,
            this._userDataWriter,
            this._key,
            this._document,
            this.metadata,
            null
          )
          return this._converter.fromFirestore(e, t)
        }
        return this._userDataWriter.convertValue(
          this._document.data.value,
          t.serverTimestamps
        )
      }
    }
    get (t, e = {}) {
      if (this._document) {
        const n = this._document.data.field(Bu('DocumentSnapshot.get', t))
        if (null !== n)
          return this._userDataWriter.convertValue(n, e.serverTimestamps)
      }
    }
  }
  class Ku extends Hu {
    data (t = {}) {
      return super.data(t)
    }
  }
  class zu {
    constructor (t, e, n, i) {
      ;(this._firestore = t),
        (this._userDataWriter = e),
        (this._snapshot = i),
        (this.metadata = new $u(i.hasPendingWrites, i.fromCache)),
        (this.query = n)
    }
    get docs () {
      const t = []
      return this.forEach(e => t.push(e)), t
    }
    get size () {
      return this._snapshot.docs.size
    }
    get empty () {
      return 0 === this.size
    }
    forEach (t, e) {
      this._snapshot.docs.forEach(n => {
        t.call(
          e,
          new Ku(
            this._firestore,
            this._userDataWriter,
            n.key,
            n,
            new $u(
              this._snapshot.mutatedKeys.has(n.key),
              this._snapshot.fromCache
            ),
            this.query.converter
          )
        )
      })
    }
    docChanges (t = {}) {
      const e = !!t.includeMetadataChanges
      if (e && this._snapshot.excludesMetadataChanges)
        throw new ys(
          gs.INVALID_ARGUMENT,
          'To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().'
        )
      return (
        (this._cachedChanges &&
          this._cachedChangesIncludeMetadataChanges === e) ||
          ((this._cachedChanges = (function (t, e) {
            if (t._snapshot.oldDocs.isEmpty()) {
              let e = 0
              return t._snapshot.docChanges.map(n => ({
                type: 'added',
                doc: new Ku(
                  t._firestore,
                  t._userDataWriter,
                  n.doc.key,
                  n.doc,
                  new $u(
                    t._snapshot.mutatedKeys.has(n.doc.key),
                    t._snapshot.fromCache
                  ),
                  t.query.converter
                ),
                oldIndex: -1,
                newIndex: e++
              }))
            }
            {
              let n = t._snapshot.oldDocs
              return t._snapshot.docChanges
                .filter(t => e || 3 !== t.type)
                .map(e => {
                  const i = new Ku(
                    t._firestore,
                    t._userDataWriter,
                    e.doc.key,
                    e.doc,
                    new $u(
                      t._snapshot.mutatedKeys.has(e.doc.key),
                      t._snapshot.fromCache
                    ),
                    t.query.converter
                  )
                  let s = -1,
                    r = -1
                  return (
                    0 !== e.type &&
                      ((s = n.indexOf(e.doc.key)), (n = n.delete(e.doc.key))),
                    1 !== e.type &&
                      ((n = n.add(e.doc)), (r = n.indexOf(e.doc.key))),
                    { type: Gu(e.type), doc: i, oldIndex: s, newIndex: r }
                  )
                })
            }
          })(this, e)),
          (this._cachedChangesIncludeMetadataChanges = e)),
        this._cachedChanges
      )
    }
  }
  function Gu (t) {
    switch (t) {
      case 0:
        return 'added'
      case 2:
      case 3:
        return 'modified'
      case 1:
        return 'removed'
      default:
        return fs()
    }
  }
  class Wu extends class {} {
    constructor (t, e, n) {
      super(),
        (this.zc = t),
        (this.Hc = e),
        (this.Jc = n),
        (this.type = 'where')
    }
    _apply (t) {
      const e = Nu(t.firestore),
        n = (function (t, e, n, i, s, r, o) {
          let a
          if (s.isKeyField()) {
            if ('array-contains' === r || 'array-contains-any' === r)
              throw new ys(
                gs.INVALID_ARGUMENT,
                `Invalid Query. You can't perform '${r}' queries on documentId().`
              )
            if ('in' === r || 'not-in' === r) {
              Qu(o, r)
              const e = []
              for (const n of o) e.push(Ju(i, t, n))
              a = { arrayValue: { values: e } }
            } else a = Ju(i, t, o)
          } else
            ('in' !== r && 'not-in' !== r && 'array-contains-any' !== r) ||
              Qu(o, r),
              (a = (function (t, e, n, i = !1) {
                return Du(n, t.Qc(i ? 4 : 3, e))
              })(n, 'where', o, 'in' === r || 'not-in' === r))
          const c = Ir.create(s, r, a)
          return (
            (function (t, e) {
              if (e.V()) {
                const n = qr(t)
                if (null !== n && !n.isEqual(e.field))
                  throw new ys(
                    gs.INVALID_ARGUMENT,
                    `Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${e.field.toString()}'`
                  )
                const i = Fr(t)
                null !== i &&
                  (function (t, e, n) {
                    if (!n.isEqual(e))
                      throw new ys(
                        gs.INVALID_ARGUMENT,
                        `Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`
                      )
                  })(0, e.field, i)
              }
              const n = (function (t, e) {
                for (const n of t.filters) if (e.indexOf(n.op) >= 0) return n.op
                return null
              })(
                t,
                (function (t) {
                  switch (t) {
                    case '!=':
                      return ['!=', 'not-in']
                    case 'array-contains':
                      return ['array-contains', 'array-contains-any', 'not-in']
                    case 'in':
                      return ['array-contains-any', 'in', 'not-in']
                    case 'array-contains-any':
                      return [
                        'array-contains',
                        'array-contains-any',
                        'in',
                        'not-in'
                      ]
                    case 'not-in':
                      return [
                        'array-contains',
                        'array-contains-any',
                        'in',
                        'not-in',
                        '!='
                      ]
                    default:
                      return []
                  }
                })(e.op)
              )
              if (null !== n)
                throw n === e.op
                  ? new ys(
                      gs.INVALID_ARGUMENT,
                      `Invalid query. You cannot use more than one '${e.op.toString()}' filter.`
                    )
                  : new ys(
                      gs.INVALID_ARGUMENT,
                      `Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`
                    )
            })(t, c),
            c
          )
        })(t._query, 0, e, t.firestore._databaseId, this.zc, this.Hc, this.Jc)
      return new lu(
        t.firestore,
        t.converter,
        (function (t, e) {
          const n = t.filters.concat([e])
          return new Mr(
            t.path,
            t.collectionGroup,
            t.explicitOrderBy.slice(),
            n,
            t.limit,
            t.limitType,
            t.startAt,
            t.endAt
          )
        })(t._query, n)
      )
    }
  }
  function Ju (t, e, n) {
    if ('string' == typeof (n = v(n))) {
      if ('' === n)
        throw new ys(
          gs.INVALID_ARGUMENT,
          'Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.'
        )
      if (!jr(e) && -1 !== n.indexOf('/'))
        throw new ys(
          gs.INVALID_ARGUMENT,
          `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`
        )
      const i = e.path.child(xs.fromString(n))
      if (!Xs.isDocumentKey(i))
        throw new ys(
          gs.INVALID_ARGUMENT,
          `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${i}' is not because it has an odd number of segments (${i.length}).`
        )
      return rr(t, new Xs(i))
    }
    if (n instanceof uu) return rr(t, n._key)
    throw new ys(
      gs.INVALID_ARGUMENT,
      `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ou(
        n
      )}.`
    )
  }
  function Qu (t, e) {
    if (!Array.isArray(t) || 0 === t.length)
      throw new ys(
        gs.INVALID_ARGUMENT,
        `Invalid Query. A non-empty array is required for '${e.toString()}' filters.`
      )
    if (t.length > 10)
      throw new ys(
        gs.INVALID_ARGUMENT,
        `Invalid Query. '${e.toString()}' filters support a maximum of 10 elements in the value array.`
      )
  }
  class Xu extends class {
    convertValue (t, e = 'none') {
      switch (Ys(t)) {
        case 0:
          return null
        case 1:
          return t.booleanValue
        case 2:
          return Hs(t.integerValue || t.doubleValue)
        case 3:
          return this.convertTimestamp(t.timestampValue)
        case 4:
          return this.convertServerTimestamp(t, e)
        case 5:
          return t.stringValue
        case 6:
          return this.convertBytes(Ks(t.bytesValue))
        case 7:
          return this.convertReference(t.referenceValue)
        case 8:
          return this.convertGeoPoint(t.geoPointValue)
        case 9:
          return this.convertArray(t.arrayValue, e)
        case 10:
          return this.convertObject(t.mapValue, e)
        default:
          throw fs()
      }
    }
    convertObject (t, e) {
      const n = {}
      return (
        Ps(t.fields, (t, i) => {
          n[t] = this.convertValue(i, e)
        }),
        n
      )
    }
    convertGeoPoint (t) {
      return new bu(Hs(t.latitude), Hs(t.longitude))
    }
    convertArray (t, e) {
      return (t.values || []).map(t => this.convertValue(t, e))
    }
    convertServerTimestamp (t, e) {
      switch (e) {
        case 'previous':
          const n = Gs(t)
          return null == n ? null : this.convertValue(n, e)
        case 'estimate':
          return this.convertTimestamp(Ws(t))
        default:
          return null
      }
    }
    convertTimestamp (t) {
      const e = $s(t)
      return new Ds(e.seconds, e.nanos)
    }
    convertDocumentKey (t, e) {
      const n = xs.fromString(t)
      ps(Na(n))
      const i = new eu(n.get(1), n.get(3)),
        s = new Xs(n.popFirst(5))
      return (
        i.isEqual(e) ||
          us(
            `Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`
          ),
        s
      )
    }
  } {
    constructor (t) {
      super(), (this.firestore = t)
    }
    convertBytes (t) {
      return new Tu(t)
    }
    convertReference (t) {
      const e = this.convertDocumentKey(t, this.firestore._databaseId)
      return new uu(this.firestore, null, e)
    }
  }
  function Yu (t, e, n) {
    t = au(t, uu)
    const i = au(t.firestore, yu),
      s = (function (t, e, n) {
        let i
        return (
          (i = t
            ? n && (n.merge || n.mergeFields)
              ? t.toFirestore(e, n)
              : t.toFirestore(e)
            : e),
          i
        )
      })(t.converter, e, n)
    return (function (t, e) {
      return (function (t, e) {
        const n = new vs()
        return (
          t.asyncQueue.enqueueAndForget(async () =>
            (async function (t, e, n) {
              const i = zh(t)
              try {
                const t = await (function (t, e) {
                  const n = ms(t),
                    i = Ds.now(),
                    s = e.reduce((t, e) => t.add(e.key), $o())
                  let r
                  return n.persistence
                    .runTransaction('Locally write mutations', 'readwrite', t =>
                      n.Wn.vn(t, s).next(s => {
                        r = s
                        const o = []
                        for (const t of e) {
                          const e = vo(t, r.get(t.key))
                          null != e &&
                            o.push(
                              new Eo(
                                t.key,
                                e,
                                fr(e.value.mapValue),
                                fo.exists(!0)
                              )
                            )
                        }
                        return n.An.addMutationBatch(t, i, o, e)
                      })
                    )
                    .then(
                      t => (
                        t.applyToLocalDocumentSet(r),
                        { batchId: t.batchId, changes: r }
                      )
                    )
                })(i.localStore, e)
                i.sharedClientState.addPendingMutation(t.batchId),
                  (function (t, e, n) {
                    let i = t.Ko[t.currentUser.toKey()]
                    i || (i = new Oo(Ns)),
                      (i = i.insert(e, n)),
                      (t.Ko[t.currentUser.toKey()] = i)
                  })(i, t.batchId, n),
                  await $h(i, t.changes),
                  await eh(i.remoteStore)
              } catch (t) {
                const e = fh(t, 'Failed to persist write')
                n.reject(e)
              }
            })(
              await (function (t) {
                return Yh(t).then(t => t.syncEngine)
              })(t),
              e,
              n
            )
          ),
          n.promise
        )
      })(vu(t), e)
    })(i, [
      Ru(Nu(i), 'setDoc', t._key, s, null !== t.converter, n).toMutation(
        t._key,
        fo.none()
      )
    ])
  }
  function Zu (t, e) {
    var n = {}
    for (var i in t)
      Object.prototype.hasOwnProperty.call(t, i) &&
        e.indexOf(i) < 0 &&
        (n[i] = t[i])
    if (null != t && 'function' == typeof Object.getOwnPropertySymbols) {
      var s = 0
      for (i = Object.getOwnPropertySymbols(t); s < i.length; s++)
        e.indexOf(i[s]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(t, i[s]) &&
          (n[i[s]] = t[i[s]])
    }
    return n
  }
  !(function (t, e = !0) {
    ;(os = '9.6.3'),
      F(
        new w(
          'firestore',
          (t, { options: n }) => {
            const i = t.getProvider('app').getImmediate(),
              s = new yu(
                i,
                new Ts(t.getProvider('auth-internal')),
                new Ss(t.getProvider('app-check-internal'))
              )
            return (
              (n = Object.assign({ useFetchStreams: e }, n)),
              s._setSettings(n),
              s
            )
          },
          'PUBLIC'
        )
      ),
      z(ss, '3.4.3', t),
      z(ss, '3.4.3', 'esm2017')
  })(),
    Object.create,
    Object.create
  const tl = function () {
      return {
        'dependent-sdk-initialized-before-auth':
          'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.'
      }
    },
    el = new h('auth', 'Firebase', {
      'dependent-sdk-initialized-before-auth':
        'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.'
    }),
    nl = new R('@firebase/auth')
  function il (t, ...e) {
    nl.logLevel <= _.ERROR && nl.error(`Auth (9.6.3): ${t}`, ...e)
  }
  function sl (t, ...e) {
    throw ol(t, ...e)
  }
  function rl (t, ...e) {
    return ol(t, ...e)
  }
  function ol (t, ...e) {
    if ('string' != typeof t) {
      const n = e[0],
        i = [...e.slice(1)]
      return i[0] && (i[0].appName = t.name), t._errorFactory.create(n, ...i)
    }
    return el.create(t, ...e)
  }
  function al (t, e, ...n) {
    if (!t) throw ol(e, ...n)
  }
  function cl (t) {
    const e = 'INTERNAL ASSERTION FAILED: ' + t
    throw (il(e), new Error(e))
  }
  function hl (t, e) {
    t || cl(e)
  }
  const ul = new Map()
  function ll (t) {
    hl(t instanceof Function, 'Expected a class definition')
    let e = ul.get(t)
    return e
      ? (hl(e instanceof t, 'Instance stored in cache mismatched with class'),
        e)
      : ((e = new t()), ul.set(t, e), e)
  }
  function dl () {
    var t
    return (
      ('undefined' != typeof self &&
        (null === (t = self.location) || void 0 === t ? void 0 : t.href)) ||
      ''
    )
  }
  function fl () {
    var t
    return (
      ('undefined' != typeof self &&
        (null === (t = self.location) || void 0 === t ? void 0 : t.protocol)) ||
      null
    )
  }
  class pl {
    constructor (t, e) {
      ;(this.shortDelay = t),
        (this.longDelay = e),
        hl(e > t, 'Short delay should be less than long delay!'),
        (this.isMobile = s() || o())
    }
    get () {
      return 'undefined' != typeof navigator &&
        navigator &&
        'onLine' in navigator &&
        'boolean' == typeof navigator.onLine &&
        ('http:' === fl() ||
          'https:' === fl() ||
          r() ||
          'connection' in navigator) &&
        !navigator.onLine
        ? Math.min(5e3, this.shortDelay)
        : this.isMobile
        ? this.longDelay
        : this.shortDelay
    }
  }
  function ml (t, e) {
    hl(t.emulator, 'Emulator should always be set here')
    const { url: n } = t.emulator
    return e ? `${n}${e.startsWith('/') ? e.slice(1) : e}` : n
  }
  class gl {
    static initialize (t, e, n) {
      ;(this.fetchImpl = t),
        e && (this.headersImpl = e),
        n && (this.responseImpl = n)
    }
    static fetch () {
      return this.fetchImpl
        ? this.fetchImpl
        : 'undefined' != typeof self && 'fetch' in self
        ? self.fetch
        : void cl(
            'Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
          )
    }
    static headers () {
      return this.headersImpl
        ? this.headersImpl
        : 'undefined' != typeof self && 'Headers' in self
        ? self.Headers
        : void cl(
            'Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
          )
    }
    static response () {
      return this.responseImpl
        ? this.responseImpl
        : 'undefined' != typeof self && 'Response' in self
        ? self.Response
        : void cl(
            'Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
          )
    }
  }
  const yl = {
      CREDENTIAL_MISMATCH: 'custom-token-mismatch',
      MISSING_CUSTOM_TOKEN: 'internal-error',
      INVALID_IDENTIFIER: 'invalid-email',
      MISSING_CONTINUE_URI: 'internal-error',
      INVALID_PASSWORD: 'wrong-password',
      MISSING_PASSWORD: 'internal-error',
      EMAIL_EXISTS: 'email-already-in-use',
      PASSWORD_LOGIN_DISABLED: 'operation-not-allowed',
      INVALID_IDP_RESPONSE: 'invalid-credential',
      INVALID_PENDING_TOKEN: 'invalid-credential',
      FEDERATED_USER_ID_ALREADY_LINKED: 'credential-already-in-use',
      MISSING_REQ_TYPE: 'internal-error',
      EMAIL_NOT_FOUND: 'user-not-found',
      RESET_PASSWORD_EXCEED_LIMIT: 'too-many-requests',
      EXPIRED_OOB_CODE: 'expired-action-code',
      INVALID_OOB_CODE: 'invalid-action-code',
      MISSING_OOB_CODE: 'internal-error',
      CREDENTIAL_TOO_OLD_LOGIN_AGAIN: 'requires-recent-login',
      INVALID_ID_TOKEN: 'invalid-user-token',
      TOKEN_EXPIRED: 'user-token-expired',
      USER_NOT_FOUND: 'user-token-expired',
      TOO_MANY_ATTEMPTS_TRY_LATER: 'too-many-requests',
      INVALID_CODE: 'invalid-verification-code',
      INVALID_SESSION_INFO: 'invalid-verification-id',
      INVALID_TEMPORARY_PROOF: 'invalid-credential',
      MISSING_SESSION_INFO: 'missing-verification-id',
      SESSION_EXPIRED: 'code-expired',
      MISSING_ANDROID_PACKAGE_NAME: 'missing-android-pkg-name',
      UNAUTHORIZED_DOMAIN: 'unauthorized-continue-uri',
      INVALID_OAUTH_CLIENT_ID: 'invalid-oauth-client-id',
      ADMIN_ONLY_OPERATION: 'admin-restricted-operation',
      INVALID_MFA_PENDING_CREDENTIAL: 'invalid-multi-factor-session',
      MFA_ENROLLMENT_NOT_FOUND: 'multi-factor-info-not-found',
      MISSING_MFA_ENROLLMENT_ID: 'missing-multi-factor-info',
      MISSING_MFA_PENDING_CREDENTIAL: 'missing-multi-factor-session',
      SECOND_FACTOR_EXISTS: 'second-factor-already-in-use',
      SECOND_FACTOR_LIMIT_EXCEEDED: 'maximum-second-factor-count-exceeded',
      BLOCKING_FUNCTION_ERROR_RESPONSE: 'internal-error'
    },
    vl = new pl(3e4, 6e4)
  function wl (t, e) {
    return t.tenantId && !e.tenantId
      ? Object.assign(Object.assign({}, e), { tenantId: t.tenantId })
      : e
  }
  async function Il (t, e, n, i, s = {}) {
    return Tl(t, s, async () => {
      let s = {},
        r = {}
      i && ('GET' === e ? (r = i) : (s = { body: JSON.stringify(i) }))
      const o = f(Object.assign({ key: t.config.apiKey }, r)).slice(1),
        a = await t._getAdditionalHeaders()
      return (
        (a['Content-Type'] = 'application/json'),
        t.languageCode && (a['X-Firebase-Locale'] = t.languageCode),
        gl.fetch()(
          bl(t, t.config.apiHost, n, o),
          Object.assign(
            { method: e, headers: a, referrerPolicy: 'no-referrer' },
            s
          )
        )
      )
    })
  }
  async function Tl (t, e, n) {
    t._canInitEmulator = !1
    const i = Object.assign(Object.assign({}, yl), e)
    try {
      const e = new _l(t),
        s = await Promise.race([n(), e.promise])
      e.clearNetworkTimeout()
      const r = await s.json()
      if ('needConfirmation' in r)
        throw Sl(t, 'account-exists-with-different-credential', r)
      if (s.ok && !('errorMessage' in r)) return r
      {
        const e = s.ok ? r.errorMessage : r.error.message,
          [n, o] = e.split(' : ')
        if ('FEDERATED_USER_ID_ALREADY_LINKED' === n)
          throw Sl(t, 'credential-already-in-use', r)
        if ('EMAIL_EXISTS' === n) throw Sl(t, 'email-already-in-use', r)
        const a = i[n] || n.toLowerCase().replace(/[_\s]+/g, '-')
        if (o)
          throw (function (t, e, n) {
            const i = Object.assign(Object.assign({}, tl()), { [e]: n })
            return new h('auth', 'Firebase', i).create(e, { appName: t.name })
          })(t, a, o)
        sl(t, a)
      }
    } catch (e) {
      if (e instanceof c) throw e
      sl(t, 'network-request-failed')
    }
  }
  async function El (t, e, n, i, s = {}) {
    const r = await Il(t, e, n, i, s)
    return (
      'mfaPendingCredential' in r &&
        sl(t, 'multi-factor-auth-required', { _serverResponse: r }),
      r
    )
  }
  function bl (t, e, n, i) {
    const s = `${e}${n}?${i}`
    return t.config.emulator ? ml(t.config, s) : `${t.config.apiScheme}://${s}`
  }
  class _l {
    constructor (t) {
      ;(this.auth = t),
        (this.timer = null),
        (this.promise = new Promise((t, e) => {
          this.timer = setTimeout(() => e(rl(this.auth, 'timeout')), vl.get())
        }))
    }
    clearNetworkTimeout () {
      clearTimeout(this.timer)
    }
  }
  function Sl (t, e, n) {
    const i = { appName: t.name }
    n.email && (i.email = n.email),
      n.phoneNumber && (i.phoneNumber = n.phoneNumber)
    const s = rl(t, e, i)
    return (s.customData._tokenResponse = n), s
  }
  function kl (t) {
    if (t)
      try {
        const e = new Date(Number(t))
        if (!isNaN(e.getTime())) return e.toUTCString()
      } catch (t) {}
  }
  function Al (t) {
    return 1e3 * Number(t)
  }
  function Cl (t) {
    const [n, i, s] = t.split('.')
    if (void 0 === n || void 0 === i || void 0 === s)
      return il('JWT malformed, contained fewer than 3 sections'), null
    try {
      const t = (function (t) {
        try {
          return e.decodeString(t, !0)
        } catch (t) {
          console.error('base64Decode failed: ', t)
        }
        return null
      })(i)
      return t
        ? JSON.parse(t)
        : (il('Failed to decode base64 JWT payload'), null)
    } catch (t) {
      return il('Caught error parsing JWT payload as JSON', t), null
    }
  }
  async function Nl (t, e, n = !1) {
    if (n) return e
    try {
      return await e
    } catch (e) {
      throw (e instanceof c &&
        (function ({ code: t }) {
          return 'auth/user-disabled' === t || 'auth/user-token-expired' === t
        })(e) &&
        t.auth.currentUser === t &&
        (await t.auth.signOut()),
      e)
    }
  }
  class Rl {
    constructor (t) {
      ;(this.user = t),
        (this.isRunning = !1),
        (this.timerId = null),
        (this.errorBackoff = 3e4)
    }
    _start () {
      this.isRunning || ((this.isRunning = !0), this.schedule())
    }
    _stop () {
      this.isRunning &&
        ((this.isRunning = !1),
        null !== this.timerId && clearTimeout(this.timerId))
    }
    getInterval (t) {
      var e
      if (t) {
        const t = this.errorBackoff
        return (this.errorBackoff = Math.min(2 * this.errorBackoff, 96e4)), t
      }
      {
        this.errorBackoff = 3e4
        const t =
          (null !== (e = this.user.stsTokenManager.expirationTime) &&
          void 0 !== e
            ? e
            : 0) -
          Date.now() -
          3e5
        return Math.max(0, t)
      }
    }
    schedule (t = !1) {
      if (!this.isRunning) return
      const e = this.getInterval(t)
      this.timerId = setTimeout(async () => {
        await this.iteration()
      }, e)
    }
    async iteration () {
      try {
        await this.user.getIdToken(!0)
      } catch (t) {
        return void (
          'auth/network-request-failed' === t.code && this.schedule(!0)
        )
      }
      this.schedule()
    }
  }
  class Dl {
    constructor (t, e) {
      ;(this.createdAt = t), (this.lastLoginAt = e), this._initializeTime()
    }
    _initializeTime () {
      ;(this.lastSignInTime = kl(this.lastLoginAt)),
        (this.creationTime = kl(this.createdAt))
    }
    _copy (t) {
      ;(this.createdAt = t.createdAt),
        (this.lastLoginAt = t.lastLoginAt),
        this._initializeTime()
    }
    toJSON () {
      return { createdAt: this.createdAt, lastLoginAt: this.lastLoginAt }
    }
  }
  async function Ol (t) {
    var e
    const n = t.auth,
      i = await t.getIdToken(),
      s = await Nl(
        t,
        (async function (t, e) {
          return Il(t, 'POST', '/v1/accounts:lookup', e)
        })(n, { idToken: i })
      )
    al(null == s ? void 0 : s.users.length, n, 'internal-error')
    const r = s.users[0]
    t._notifyReloadListener(r)
    const o = (null === (e = r.providerUserInfo) || void 0 === e
      ? void 0
      : e.length)
        ? r.providerUserInfo.map(t => {
            var { providerId: e } = t,
              n = Zu(t, ['providerId'])
            return {
              providerId: e,
              uid: n.rawId || '',
              displayName: n.displayName || null,
              email: n.email || null,
              phoneNumber: n.phoneNumber || null,
              photoURL: n.photoUrl || null
            }
          })
        : [],
      a =
        ((c = t.providerData),
        (h = o),
        [...c.filter(t => !h.some(e => e.providerId === t.providerId)), ...h])
    var c, h
    const u = t.isAnonymous,
      l = !((t.email && r.passwordHash) || (null == a ? void 0 : a.length)),
      d = !!u && l,
      f = {
        uid: r.localId,
        displayName: r.displayName || null,
        photoURL: r.photoUrl || null,
        email: r.email || null,
        emailVerified: r.emailVerified || !1,
        phoneNumber: r.phoneNumber || null,
        tenantId: r.tenantId || null,
        providerData: a,
        metadata: new Dl(r.createdAt, r.lastLoginAt),
        isAnonymous: d
      }
    Object.assign(t, f)
  }
  class Ll {
    constructor () {
      ;(this.refreshToken = null),
        (this.accessToken = null),
        (this.expirationTime = null)
    }
    get isExpired () {
      return !this.expirationTime || Date.now() > this.expirationTime - 3e4
    }
    updateFromServerResponse (t) {
      al(t.idToken, 'internal-error'),
        al(void 0 !== t.idToken, 'internal-error'),
        al(void 0 !== t.refreshToken, 'internal-error')
      const e =
        'expiresIn' in t && void 0 !== t.expiresIn
          ? Number(t.expiresIn)
          : (function (t) {
              const e = Cl(t)
              return (
                al(e, 'internal-error'),
                al(void 0 !== e.exp, 'internal-error'),
                al(void 0 !== e.iat, 'internal-error'),
                Number(e.exp) - Number(e.iat)
              )
            })(t.idToken)
      this.updateTokensAndExpiration(t.idToken, t.refreshToken, e)
    }
    async getToken (t, e = !1) {
      return (
        al(!this.accessToken || this.refreshToken, t, 'user-token-expired'),
        e || !this.accessToken || this.isExpired
          ? this.refreshToken
            ? (await this.refresh(t, this.refreshToken), this.accessToken)
            : null
          : this.accessToken
      )
    }
    clearRefreshToken () {
      this.refreshToken = null
    }
    async refresh (t, e) {
      const {
        accessToken: n,
        refreshToken: i,
        expiresIn: s
      } = await (async function (t, e) {
        const n = await Tl(t, {}, async () => {
          const n = f({ grant_type: 'refresh_token', refresh_token: e }).slice(
              1
            ),
            { tokenApiHost: i, apiKey: s } = t.config,
            r = bl(t, i, '/v1/token', `key=${s}`),
            o = await t._getAdditionalHeaders()
          return (
            (o['Content-Type'] = 'application/x-www-form-urlencoded'),
            gl.fetch()(r, { method: 'POST', headers: o, body: n })
          )
        })
        return {
          accessToken: n.access_token,
          expiresIn: n.expires_in,
          refreshToken: n.refresh_token
        }
      })(t, e)
      this.updateTokensAndExpiration(n, i, Number(s))
    }
    updateTokensAndExpiration (t, e, n) {
      ;(this.refreshToken = e || null),
        (this.accessToken = t || null),
        (this.expirationTime = Date.now() + 1e3 * n)
    }
    static fromJSON (t, e) {
      const { refreshToken: n, accessToken: i, expirationTime: s } = e,
        r = new Ll()
      return (
        n &&
          (al('string' == typeof n, 'internal-error', { appName: t }),
          (r.refreshToken = n)),
        i &&
          (al('string' == typeof i, 'internal-error', { appName: t }),
          (r.accessToken = i)),
        s &&
          (al('number' == typeof s, 'internal-error', { appName: t }),
          (r.expirationTime = s)),
        r
      )
    }
    toJSON () {
      return {
        refreshToken: this.refreshToken,
        accessToken: this.accessToken,
        expirationTime: this.expirationTime
      }
    }
    _assign (t) {
      ;(this.accessToken = t.accessToken),
        (this.refreshToken = t.refreshToken),
        (this.expirationTime = t.expirationTime)
    }
    _clone () {
      return Object.assign(new Ll(), this.toJSON())
    }
    _performRefresh () {
      return cl('not implemented')
    }
  }
  function Pl (t, e) {
    al('string' == typeof t || void 0 === t, 'internal-error', { appName: e })
  }
  class Ml {
    constructor (t) {
      var { uid: e, auth: n, stsTokenManager: i } = t,
        s = Zu(t, ['uid', 'auth', 'stsTokenManager'])
      ;(this.providerId = 'firebase'),
        (this.emailVerified = !1),
        (this.isAnonymous = !1),
        (this.tenantId = null),
        (this.providerData = []),
        (this.proactiveRefresh = new Rl(this)),
        (this.reloadUserInfo = null),
        (this.reloadListener = null),
        (this.uid = e),
        (this.auth = n),
        (this.stsTokenManager = i),
        (this.accessToken = i.accessToken),
        (this.displayName = s.displayName || null),
        (this.email = s.email || null),
        (this.emailVerified = s.emailVerified || !1),
        (this.phoneNumber = s.phoneNumber || null),
        (this.photoURL = s.photoURL || null),
        (this.isAnonymous = s.isAnonymous || !1),
        (this.tenantId = s.tenantId || null),
        (this.metadata = new Dl(s.createdAt || void 0, s.lastLoginAt || void 0))
    }
    async getIdToken (t) {
      const e = await Nl(this, this.stsTokenManager.getToken(this.auth, t))
      return (
        al(e, this.auth, 'internal-error'),
        this.accessToken !== e &&
          ((this.accessToken = e),
          await this.auth._persistUserIfCurrent(this),
          this.auth._notifyListenersIfCurrent(this)),
        e
      )
    }
    getIdTokenResult (t) {
      return (async function (t, e = !1) {
        const n = v(t),
          i = await n.getIdToken(e),
          s = Cl(i)
        al(s && s.exp && s.auth_time && s.iat, n.auth, 'internal-error')
        const r = 'object' == typeof s.firebase ? s.firebase : void 0,
          o = null == r ? void 0 : r.sign_in_provider
        return {
          claims: s,
          token: i,
          authTime: kl(Al(s.auth_time)),
          issuedAtTime: kl(Al(s.iat)),
          expirationTime: kl(Al(s.exp)),
          signInProvider: o || null,
          signInSecondFactor:
            (null == r ? void 0 : r.sign_in_second_factor) || null
        }
      })(this, t)
    }
    reload () {
      return (async function (t) {
        const e = v(t)
        await Ol(e),
          await e.auth._persistUserIfCurrent(e),
          e.auth._notifyListenersIfCurrent(e)
      })(this)
    }
    _assign (t) {
      this !== t &&
        (al(this.uid === t.uid, this.auth, 'internal-error'),
        (this.displayName = t.displayName),
        (this.photoURL = t.photoURL),
        (this.email = t.email),
        (this.emailVerified = t.emailVerified),
        (this.phoneNumber = t.phoneNumber),
        (this.isAnonymous = t.isAnonymous),
        (this.tenantId = t.tenantId),
        (this.providerData = t.providerData.map(t => Object.assign({}, t))),
        this.metadata._copy(t.metadata),
        this.stsTokenManager._assign(t.stsTokenManager))
    }
    _clone (t) {
      return new Ml(
        Object.assign(Object.assign({}, this), {
          auth: t,
          stsTokenManager: this.stsTokenManager._clone()
        })
      )
    }
    _onReload (t) {
      al(!this.reloadListener, this.auth, 'internal-error'),
        (this.reloadListener = t),
        this.reloadUserInfo &&
          (this._notifyReloadListener(this.reloadUserInfo),
          (this.reloadUserInfo = null))
    }
    _notifyReloadListener (t) {
      this.reloadListener ? this.reloadListener(t) : (this.reloadUserInfo = t)
    }
    _startProactiveRefresh () {
      this.proactiveRefresh._start()
    }
    _stopProactiveRefresh () {
      this.proactiveRefresh._stop()
    }
    async _updateTokensIfNecessary (t, e = !1) {
      let n = !1
      t.idToken &&
        t.idToken !== this.stsTokenManager.accessToken &&
        (this.stsTokenManager.updateFromServerResponse(t), (n = !0)),
        e && (await Ol(this)),
        await this.auth._persistUserIfCurrent(this),
        n && this.auth._notifyListenersIfCurrent(this)
    }
    async delete () {
      const t = await this.getIdToken()
      return (
        await Nl(
          this,
          (async function (t, e) {
            return Il(t, 'POST', '/v1/accounts:delete', e)
          })(this.auth, { idToken: t })
        ),
        this.stsTokenManager.clearRefreshToken(),
        this.auth.signOut()
      )
    }
    toJSON () {
      return Object.assign(
        Object.assign(
          {
            uid: this.uid,
            email: this.email || void 0,
            emailVerified: this.emailVerified,
            displayName: this.displayName || void 0,
            isAnonymous: this.isAnonymous,
            photoURL: this.photoURL || void 0,
            phoneNumber: this.phoneNumber || void 0,
            tenantId: this.tenantId || void 0,
            providerData: this.providerData.map(t => Object.assign({}, t)),
            stsTokenManager: this.stsTokenManager.toJSON(),
            _redirectEventId: this._redirectEventId
          },
          this.metadata.toJSON()
        ),
        { apiKey: this.auth.config.apiKey, appName: this.auth.name }
      )
    }
    get refreshToken () {
      return this.stsTokenManager.refreshToken || ''
    }
    static _fromJSON (t, e) {
      var n, i, s, r, o, a, c, h
      const u = null !== (n = e.displayName) && void 0 !== n ? n : void 0,
        l = null !== (i = e.email) && void 0 !== i ? i : void 0,
        d = null !== (s = e.phoneNumber) && void 0 !== s ? s : void 0,
        f = null !== (r = e.photoURL) && void 0 !== r ? r : void 0,
        p = null !== (o = e.tenantId) && void 0 !== o ? o : void 0,
        m = null !== (a = e._redirectEventId) && void 0 !== a ? a : void 0,
        g = null !== (c = e.createdAt) && void 0 !== c ? c : void 0,
        y = null !== (h = e.lastLoginAt) && void 0 !== h ? h : void 0,
        {
          uid: v,
          emailVerified: w,
          isAnonymous: I,
          providerData: T,
          stsTokenManager: E
        } = e
      al(v && E, t, 'internal-error')
      const b = Ll.fromJSON(this.name, E)
      al('string' == typeof v, t, 'internal-error'),
        Pl(u, t.name),
        Pl(l, t.name),
        al('boolean' == typeof w, t, 'internal-error'),
        al('boolean' == typeof I, t, 'internal-error'),
        Pl(d, t.name),
        Pl(f, t.name),
        Pl(p, t.name),
        Pl(m, t.name),
        Pl(g, t.name),
        Pl(y, t.name)
      const _ = new Ml({
        uid: v,
        auth: t,
        email: l,
        emailVerified: w,
        displayName: u,
        isAnonymous: I,
        photoURL: f,
        phoneNumber: d,
        tenantId: p,
        stsTokenManager: b,
        createdAt: g,
        lastLoginAt: y
      })
      return (
        T &&
          Array.isArray(T) &&
          (_.providerData = T.map(t => Object.assign({}, t))),
        m && (_._redirectEventId = m),
        _
      )
    }
    static async _fromIdTokenResponse (t, e, n = !1) {
      const i = new Ll()
      i.updateFromServerResponse(e)
      const s = new Ml({
        uid: e.localId,
        auth: t,
        stsTokenManager: i,
        isAnonymous: n
      })
      return await Ol(s), s
    }
  }
  class Ul {
    constructor () {
      ;(this.type = 'NONE'), (this.storage = {})
    }
    async _isAvailable () {
      return !0
    }
    async _set (t, e) {
      this.storage[t] = e
    }
    async _get (t) {
      const e = this.storage[t]
      return void 0 === e ? null : e
    }
    async _remove (t) {
      delete this.storage[t]
    }
    _addListener (t, e) {}
    _removeListener (t, e) {}
  }
  Ul.type = 'NONE'
  const xl = Ul
  function Vl (t, e, n) {
    return `firebase:${t}:${e}:${n}`
  }
  class Fl {
    constructor (t, e, n) {
      ;(this.persistence = t), (this.auth = e), (this.userKey = n)
      const { config: i, name: s } = this.auth
      ;(this.fullUserKey = Vl(this.userKey, i.apiKey, s)),
        (this.fullPersistenceKey = Vl('persistence', i.apiKey, s)),
        (this.boundEventHandler = e._onStorageEvent.bind(e)),
        this.persistence._addListener(this.fullUserKey, this.boundEventHandler)
    }
    setCurrentUser (t) {
      return this.persistence._set(this.fullUserKey, t.toJSON())
    }
    async getCurrentUser () {
      const t = await this.persistence._get(this.fullUserKey)
      return t ? Ml._fromJSON(this.auth, t) : null
    }
    removeCurrentUser () {
      return this.persistence._remove(this.fullUserKey)
    }
    savePersistenceForRedirect () {
      return this.persistence._set(
        this.fullPersistenceKey,
        this.persistence.type
      )
    }
    async setPersistence (t) {
      if (this.persistence === t) return
      const e = await this.getCurrentUser()
      return (
        await this.removeCurrentUser(),
        (this.persistence = t),
        e ? this.setCurrentUser(e) : void 0
      )
    }
    delete () {
      this.persistence._removeListener(this.fullUserKey, this.boundEventHandler)
    }
    static async create (t, e, n = 'authUser') {
      if (!e.length) return new Fl(ll(xl), t, n)
      const i = (
        await Promise.all(
          e.map(async t => {
            if (await t._isAvailable()) return t
          })
        )
      ).filter(t => t)
      let s = i[0] || ll(xl)
      const r = Vl(n, t.config.apiKey, t.name)
      let o = null
      for (const n of e)
        try {
          const e = await n._get(r)
          if (e) {
            const i = Ml._fromJSON(t, e)
            n !== s && (o = i), (s = n)
            break
          }
        } catch (t) {}
      const a = i.filter(t => t._shouldAllowMigration)
      return s._shouldAllowMigration && a.length
        ? ((s = a[0]),
          o && (await s._set(r, o.toJSON())),
          await Promise.all(
            e.map(async t => {
              if (t !== s)
                try {
                  await t._remove(r)
                } catch (t) {}
            })
          ),
          new Fl(s, t, n))
        : new Fl(s, t, n)
    }
  }
  function ql (t) {
    const e = t.toLowerCase()
    if (e.includes('opera/') || e.includes('opr/') || e.includes('opios/'))
      return 'Opera'
    if (Hl(e)) return 'IEMobile'
    if (e.includes('msie') || e.includes('trident/')) return 'IE'
    if (e.includes('edge/')) return 'Edge'
    if (jl(e)) return 'Firefox'
    if (e.includes('silk/')) return 'Silk'
    if (zl(e)) return 'Blackberry'
    if (Gl(e)) return 'Webos'
    if (Bl(e)) return 'Safari'
    if ((e.includes('chrome/') || $l(e)) && !e.includes('edge/'))
      return 'Chrome'
    if (Kl(e)) return 'Android'
    {
      const e = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,
        n = t.match(e)
      if (2 === (null == n ? void 0 : n.length)) return n[1]
    }
    return 'Other'
  }
  function jl (t = i()) {
    return /firefox\//i.test(t)
  }
  function Bl (t = i()) {
    const e = t.toLowerCase()
    return (
      e.includes('safari/') &&
      !e.includes('chrome/') &&
      !e.includes('crios/') &&
      !e.includes('android')
    )
  }
  function $l (t = i()) {
    return /crios\//i.test(t)
  }
  function Hl (t = i()) {
    return /iemobile/i.test(t)
  }
  function Kl (t = i()) {
    return /android/i.test(t)
  }
  function zl (t = i()) {
    return /blackberry/i.test(t)
  }
  function Gl (t = i()) {
    return /webos/i.test(t)
  }
  function Wl (t = i()) {
    return /iphone|ipad|ipod/i.test(t)
  }
  function Jl (t = i()) {
    return Wl(t) || Kl(t) || Gl(t) || zl(t) || /windows phone/i.test(t) || Hl(t)
  }
  function Ql (t, e = []) {
    let n
    switch (t) {
      case 'Browser':
        n = ql(i())
        break
      case 'Worker':
        n = `${ql(i())}-${t}`
        break
      default:
        n = t
    }
    return `${n}/JsCore/9.6.3/${e.length ? e.join(',') : 'FirebaseCore-web'}`
  }
  class Xl {
    constructor (t, e) {
      ;(this.app = t),
        (this.config = e),
        (this.currentUser = null),
        (this.emulatorConfig = null),
        (this.operations = Promise.resolve()),
        (this.authStateSubscription = new Zl(this)),
        (this.idTokenSubscription = new Zl(this)),
        (this.redirectUser = null),
        (this.isProactiveRefreshEnabled = !1),
        (this._canInitEmulator = !0),
        (this._isInitialized = !1),
        (this._deleted = !1),
        (this._initializationPromise = null),
        (this._popupRedirectResolver = null),
        (this._errorFactory = el),
        (this.lastNotifiedUid = void 0),
        (this.languageCode = null),
        (this.tenantId = null),
        (this.settings = { appVerificationDisabledForTesting: !1 }),
        (this.frameworks = []),
        (this.name = t.name),
        (this.clientVersion = e.sdkClientVersion)
    }
    _initializeWithPersistence (t, e) {
      return (
        e && (this._popupRedirectResolver = ll(e)),
        (this._initializationPromise = this.queue(async () => {
          var n, i
          if (
            !this._deleted &&
            ((this.persistenceManager = await Fl.create(this, t)),
            !this._deleted)
          ) {
            if (
              null === (n = this._popupRedirectResolver) || void 0 === n
                ? void 0
                : n._shouldInitProactively
            )
              try {
                await this._popupRedirectResolver._initialize(this)
              } catch (t) {}
            await this.initializeCurrentUser(e),
              (this.lastNotifiedUid =
                (null === (i = this.currentUser) || void 0 === i
                  ? void 0
                  : i.uid) || null),
              this._deleted || (this._isInitialized = !0)
          }
        })),
        this._initializationPromise
      )
    }
    async _onStorageEvent () {
      if (this._deleted) return
      const t = await this.assertedPersistence.getCurrentUser()
      return this.currentUser || t
        ? this.currentUser && t && this.currentUser.uid === t.uid
          ? (this._currentUser._assign(t),
            void (await this.currentUser.getIdToken()))
          : void (await this._updateCurrentUser(t))
        : void 0
    }
    async initializeCurrentUser (t) {
      var e
      let n = await this.assertedPersistence.getCurrentUser()
      if (t && this.config.authDomain) {
        await this.getOrInitRedirectPersistenceManager()
        const i =
            null === (e = this.redirectUser) || void 0 === e
              ? void 0
              : e._redirectEventId,
          s = null == n ? void 0 : n._redirectEventId,
          r = await this.tryRedirectSignIn(t)
        ;(i && i !== s) || !(null == r ? void 0 : r.user) || (n = r.user)
      }
      return n
        ? n._redirectEventId
          ? (al(this._popupRedirectResolver, this, 'argument-error'),
            await this.getOrInitRedirectPersistenceManager(),
            this.redirectUser &&
            this.redirectUser._redirectEventId === n._redirectEventId
              ? this.directlySetCurrentUser(n)
              : this.reloadAndSetCurrentUserOrClear(n))
          : this.reloadAndSetCurrentUserOrClear(n)
        : this.directlySetCurrentUser(null)
    }
    async tryRedirectSignIn (t) {
      let e = null
      try {
        e = await this._popupRedirectResolver._completeRedirectFn(this, t, !0)
      } catch (t) {
        await this._setRedirectUser(null)
      }
      return e
    }
    async reloadAndSetCurrentUserOrClear (t) {
      try {
        await Ol(t)
      } catch (t) {
        if ('auth/network-request-failed' !== t.code)
          return this.directlySetCurrentUser(null)
      }
      return this.directlySetCurrentUser(t)
    }
    useDeviceLanguage () {
      this.languageCode = (function () {
        if ('undefined' == typeof navigator) return null
        const t = navigator
        return (t.languages && t.languages[0]) || t.language || null
      })()
    }
    async _delete () {
      this._deleted = !0
    }
    async updateCurrentUser (t) {
      const e = t ? v(t) : null
      return (
        e &&
          al(
            e.auth.config.apiKey === this.config.apiKey,
            this,
            'invalid-user-token'
          ),
        this._updateCurrentUser(e && e._clone(this))
      )
    }
    async _updateCurrentUser (t) {
      if (!this._deleted)
        return (
          t && al(this.tenantId === t.tenantId, this, 'tenant-id-mismatch'),
          this.queue(async () => {
            await this.directlySetCurrentUser(t), this.notifyAuthListeners()
          })
        )
    }
    async signOut () {
      return (
        (this.redirectPersistenceManager || this._popupRedirectResolver) &&
          (await this._setRedirectUser(null)),
        this._updateCurrentUser(null)
      )
    }
    setPersistence (t) {
      return this.queue(async () => {
        await this.assertedPersistence.setPersistence(ll(t))
      })
    }
    _getPersistence () {
      return this.assertedPersistence.persistence.type
    }
    _updateErrorMap (t) {
      this._errorFactory = new h('auth', 'Firebase', t())
    }
    onAuthStateChanged (t, e, n) {
      return this.registerStateListener(this.authStateSubscription, t, e, n)
    }
    onIdTokenChanged (t, e, n) {
      return this.registerStateListener(this.idTokenSubscription, t, e, n)
    }
    toJSON () {
      var t
      return {
        apiKey: this.config.apiKey,
        authDomain: this.config.authDomain,
        appName: this.name,
        currentUser:
          null === (t = this._currentUser) || void 0 === t ? void 0 : t.toJSON()
      }
    }
    async _setRedirectUser (t, e) {
      const n = await this.getOrInitRedirectPersistenceManager(e)
      return null === t ? n.removeCurrentUser() : n.setCurrentUser(t)
    }
    async getOrInitRedirectPersistenceManager (t) {
      if (!this.redirectPersistenceManager) {
        const e = (t && ll(t)) || this._popupRedirectResolver
        al(e, this, 'argument-error'),
          (this.redirectPersistenceManager = await Fl.create(
            this,
            [ll(e._redirectPersistence)],
            'redirectUser'
          )),
          (this.redirectUser = await this.redirectPersistenceManager.getCurrentUser())
      }
      return this.redirectPersistenceManager
    }
    async _redirectUserForId (t) {
      var e, n
      return (
        this._isInitialized && (await this.queue(async () => {})),
        (null === (e = this._currentUser) || void 0 === e
          ? void 0
          : e._redirectEventId) === t
          ? this._currentUser
          : (null === (n = this.redirectUser) || void 0 === n
              ? void 0
              : n._redirectEventId) === t
          ? this.redirectUser
          : null
      )
    }
    async _persistUserIfCurrent (t) {
      if (t === this.currentUser)
        return this.queue(async () => this.directlySetCurrentUser(t))
    }
    _notifyListenersIfCurrent (t) {
      t === this.currentUser && this.notifyAuthListeners()
    }
    _key () {
      return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`
    }
    _startProactiveRefresh () {
      ;(this.isProactiveRefreshEnabled = !0),
        this.currentUser && this._currentUser._startProactiveRefresh()
    }
    _stopProactiveRefresh () {
      ;(this.isProactiveRefreshEnabled = !1),
        this.currentUser && this._currentUser._stopProactiveRefresh()
    }
    get _currentUser () {
      return this.currentUser
    }
    notifyAuthListeners () {
      var t, e
      if (!this._isInitialized) return
      this.idTokenSubscription.next(this.currentUser)
      const n =
        null !==
          (e =
            null === (t = this.currentUser) || void 0 === t ? void 0 : t.uid) &&
        void 0 !== e
          ? e
          : null
      this.lastNotifiedUid !== n &&
        ((this.lastNotifiedUid = n),
        this.authStateSubscription.next(this.currentUser))
    }
    registerStateListener (t, e, n, i) {
      if (this._deleted) return () => {}
      const s = 'function' == typeof e ? e : e.next.bind(e),
        r = this._isInitialized
          ? Promise.resolve()
          : this._initializationPromise
      return (
        al(r, this, 'internal-error'),
        r.then(() => s(this.currentUser)),
        'function' == typeof e ? t.addObserver(e, n, i) : t.addObserver(e)
      )
    }
    async directlySetCurrentUser (t) {
      this.currentUser &&
        this.currentUser !== t &&
        (this._currentUser._stopProactiveRefresh(),
        t && this.isProactiveRefreshEnabled && t._startProactiveRefresh()),
        (this.currentUser = t),
        t
          ? await this.assertedPersistence.setCurrentUser(t)
          : await this.assertedPersistence.removeCurrentUser()
    }
    queue (t) {
      return (this.operations = this.operations.then(t, t)), this.operations
    }
    get assertedPersistence () {
      return (
        al(this.persistenceManager, this, 'internal-error'),
        this.persistenceManager
      )
    }
    _logFramework (t) {
      t &&
        !this.frameworks.includes(t) &&
        (this.frameworks.push(t),
        this.frameworks.sort(),
        (this.clientVersion = Ql(
          this.config.clientPlatform,
          this._getFrameworks()
        )))
    }
    _getFrameworks () {
      return this.frameworks
    }
    async _getAdditionalHeaders () {
      const t = { 'X-Client-Version': this.clientVersion }
      return (
        this.app.options.appId &&
          (t['X-Firebase-gmpid'] = this.app.options.appId),
        t
      )
    }
  }
  function Yl (t) {
    return v(t)
  }
  class Zl {
    constructor (t) {
      ;(this.auth = t),
        (this.observer = null),
        (this.addObserver = (function (t, e) {
          const n = new g(t, void 0)
          return n.subscribe.bind(n)
        })(t => (this.observer = t)))
    }
    get next () {
      return (
        al(this.observer, this.auth, 'internal-error'),
        this.observer.next.bind(this.observer)
      )
    }
  }
  class td {
    constructor (t, e) {
      ;(this.providerId = t), (this.signInMethod = e)
    }
    toJSON () {
      return cl('not implemented')
    }
    _getIdTokenResponse (t) {
      return cl('not implemented')
    }
    _linkToIdToken (t, e) {
      return cl('not implemented')
    }
    _getReauthenticationResolver (t) {
      return cl('not implemented')
    }
  }
  class ed extends td {
    constructor (t, e, n, i = null) {
      super('password', n),
        (this._email = t),
        (this._password = e),
        (this._tenantId = i)
    }
    static _fromEmailAndPassword (t, e) {
      return new ed(t, e, 'password')
    }
    static _fromEmailAndCode (t, e, n = null) {
      return new ed(t, e, 'emailLink', n)
    }
    toJSON () {
      return {
        email: this._email,
        password: this._password,
        signInMethod: this.signInMethod,
        tenantId: this._tenantId
      }
    }
    static fromJSON (t) {
      const e = 'string' == typeof t ? JSON.parse(t) : t
      if ((null == e ? void 0 : e.email) && (null == e ? void 0 : e.password)) {
        if ('password' === e.signInMethod)
          return this._fromEmailAndPassword(e.email, e.password)
        if ('emailLink' === e.signInMethod)
          return this._fromEmailAndCode(e.email, e.password, e.tenantId)
      }
      return null
    }
    async _getIdTokenResponse (t) {
      switch (this.signInMethod) {
        case 'password':
          return (async function (t, e) {
            return El(t, 'POST', '/v1/accounts:signInWithPassword', wl(t, e))
          })(t, {
            returnSecureToken: !0,
            email: this._email,
            password: this._password
          })
        case 'emailLink':
          return (async function (t, e) {
            return El(t, 'POST', '/v1/accounts:signInWithEmailLink', wl(t, e))
          })(t, { email: this._email, oobCode: this._password })
        default:
          sl(t, 'internal-error')
      }
    }
    async _linkToIdToken (t, e) {
      switch (this.signInMethod) {
        case 'password':
          return (async function (t, e) {
            return Il(t, 'POST', '/v1/accounts:update', e)
          })(t, {
            idToken: e,
            returnSecureToken: !0,
            email: this._email,
            password: this._password
          })
        case 'emailLink':
          return (async function (t, e) {
            return El(t, 'POST', '/v1/accounts:signInWithEmailLink', wl(t, e))
          })(t, { idToken: e, email: this._email, oobCode: this._password })
        default:
          sl(t, 'internal-error')
      }
    }
    _getReauthenticationResolver (t) {
      return this._getIdTokenResponse(t)
    }
  }
  async function nd (t, e) {
    return El(t, 'POST', '/v1/accounts:signInWithIdp', wl(t, e))
  }
  class id extends td {
    constructor () {
      super(...arguments), (this.pendingToken = null)
    }
    static _fromParams (t) {
      const e = new id(t.providerId, t.signInMethod)
      return (
        t.idToken || t.accessToken
          ? (t.idToken && (e.idToken = t.idToken),
            t.accessToken && (e.accessToken = t.accessToken),
            t.nonce && !t.pendingToken && (e.nonce = t.nonce),
            t.pendingToken && (e.pendingToken = t.pendingToken))
          : t.oauthToken && t.oauthTokenSecret
          ? ((e.accessToken = t.oauthToken), (e.secret = t.oauthTokenSecret))
          : sl('argument-error'),
        e
      )
    }
    toJSON () {
      return {
        idToken: this.idToken,
        accessToken: this.accessToken,
        secret: this.secret,
        nonce: this.nonce,
        pendingToken: this.pendingToken,
        providerId: this.providerId,
        signInMethod: this.signInMethod
      }
    }
    static fromJSON (t) {
      const e = 'string' == typeof t ? JSON.parse(t) : t,
        { providerId: n, signInMethod: i } = e,
        s = Zu(e, ['providerId', 'signInMethod'])
      if (!n || !i) return null
      const r = new id(n, i)
      return (
        (r.idToken = s.idToken || void 0),
        (r.accessToken = s.accessToken || void 0),
        (r.secret = s.secret),
        (r.nonce = s.nonce),
        (r.pendingToken = s.pendingToken || null),
        r
      )
    }
    _getIdTokenResponse (t) {
      return nd(t, this.buildRequest())
    }
    _linkToIdToken (t, e) {
      const n = this.buildRequest()
      return (n.idToken = e), nd(t, n)
    }
    _getReauthenticationResolver (t) {
      const e = this.buildRequest()
      return (e.autoCreate = !1), nd(t, e)
    }
    buildRequest () {
      const t = { requestUri: 'http://localhost', returnSecureToken: !0 }
      if (this.pendingToken) t.pendingToken = this.pendingToken
      else {
        const e = {}
        this.idToken && (e.id_token = this.idToken),
          this.accessToken && (e.access_token = this.accessToken),
          this.secret && (e.oauth_token_secret = this.secret),
          (e.providerId = this.providerId),
          this.nonce && !this.pendingToken && (e.nonce = this.nonce),
          (t.postBody = f(e))
      }
      return t
    }
  }
  const sd = { USER_NOT_FOUND: 'user-not-found' }
  class rd extends td {
    constructor (t) {
      super('phone', 'phone'), (this.params = t)
    }
    static _fromVerification (t, e) {
      return new rd({ verificationId: t, verificationCode: e })
    }
    static _fromTokenResponse (t, e) {
      return new rd({ phoneNumber: t, temporaryProof: e })
    }
    _getIdTokenResponse (t) {
      return (async function (t, e) {
        return El(t, 'POST', '/v1/accounts:signInWithPhoneNumber', wl(t, e))
      })(t, this._makeVerificationRequest())
    }
    _linkToIdToken (t, e) {
      return (async function (t, e) {
        const n = await El(
          t,
          'POST',
          '/v1/accounts:signInWithPhoneNumber',
          wl(t, e)
        )
        if (n.temporaryProof)
          throw Sl(t, 'account-exists-with-different-credential', n)
        return n
      })(t, Object.assign({ idToken: e }, this._makeVerificationRequest()))
    }
    _getReauthenticationResolver (t) {
      return (async function (t, e) {
        return El(
          t,
          'POST',
          '/v1/accounts:signInWithPhoneNumber',
          wl(t, Object.assign(Object.assign({}, e), { operation: 'REAUTH' })),
          sd
        )
      })(t, this._makeVerificationRequest())
    }
    _makeVerificationRequest () {
      const {
        temporaryProof: t,
        phoneNumber: e,
        verificationId: n,
        verificationCode: i
      } = this.params
      return t && e
        ? { temporaryProof: t, phoneNumber: e }
        : { sessionInfo: n, code: i }
    }
    toJSON () {
      const t = { providerId: this.providerId }
      return (
        this.params.phoneNumber && (t.phoneNumber = this.params.phoneNumber),
        this.params.temporaryProof &&
          (t.temporaryProof = this.params.temporaryProof),
        this.params.verificationCode &&
          (t.verificationCode = this.params.verificationCode),
        this.params.verificationId &&
          (t.verificationId = this.params.verificationId),
        t
      )
    }
    static fromJSON (t) {
      'string' == typeof t && (t = JSON.parse(t))
      const {
        verificationId: e,
        verificationCode: n,
        phoneNumber: i,
        temporaryProof: s
      } = t
      return n || e || i || s
        ? new rd({
            verificationId: e,
            verificationCode: n,
            phoneNumber: i,
            temporaryProof: s
          })
        : null
    }
  }
  class od {
    constructor (t) {
      var e, n, i, s, r, o
      const a = p(m(t)),
        c = null !== (e = a.apiKey) && void 0 !== e ? e : null,
        h = null !== (n = a.oobCode) && void 0 !== n ? n : null,
        u = (function (t) {
          switch (t) {
            case 'recoverEmail':
              return 'RECOVER_EMAIL'
            case 'resetPassword':
              return 'PASSWORD_RESET'
            case 'signIn':
              return 'EMAIL_SIGNIN'
            case 'verifyEmail':
              return 'VERIFY_EMAIL'
            case 'verifyAndChangeEmail':
              return 'VERIFY_AND_CHANGE_EMAIL'
            case 'revertSecondFactorAddition':
              return 'REVERT_SECOND_FACTOR_ADDITION'
            default:
              return null
          }
        })(null !== (i = a.mode) && void 0 !== i ? i : null)
      al(c && h && u, 'argument-error'),
        (this.apiKey = c),
        (this.operation = u),
        (this.code = h),
        (this.continueUrl =
          null !== (s = a.continueUrl) && void 0 !== s ? s : null),
        (this.languageCode =
          null !== (r = a.languageCode) && void 0 !== r ? r : null),
        (this.tenantId = null !== (o = a.tenantId) && void 0 !== o ? o : null)
    }
    static parseLink (t) {
      const e = (function (t) {
        const e = p(m(t)).link,
          n = e ? p(m(e)).deep_link_id : null,
          i = p(m(t)).deep_link_id
        return (i ? p(m(i)).link : null) || i || n || e || t
      })(t)
      try {
        return new od(e)
      } catch (t) {
        return null
      }
    }
  }
  class ad {
    constructor () {
      this.providerId = ad.PROVIDER_ID
    }
    static credential (t, e) {
      return ed._fromEmailAndPassword(t, e)
    }
    static credentialWithLink (t, e) {
      const n = od.parseLink(e)
      return (
        al(n, 'argument-error'), ed._fromEmailAndCode(t, n.code, n.tenantId)
      )
    }
  }
  ;(ad.PROVIDER_ID = 'password'),
    (ad.EMAIL_PASSWORD_SIGN_IN_METHOD = 'password'),
    (ad.EMAIL_LINK_SIGN_IN_METHOD = 'emailLink')
  class cd {
    constructor (t) {
      ;(this.providerId = t),
        (this.defaultLanguageCode = null),
        (this.customParameters = {})
    }
    setDefaultLanguage (t) {
      this.defaultLanguageCode = t
    }
    setCustomParameters (t) {
      return (this.customParameters = t), this
    }
    getCustomParameters () {
      return this.customParameters
    }
  }
  class hd extends cd {
    constructor () {
      super(...arguments), (this.scopes = [])
    }
    addScope (t) {
      return this.scopes.includes(t) || this.scopes.push(t), this
    }
    getScopes () {
      return [...this.scopes]
    }
  }
  class ud extends hd {
    constructor () {
      super('facebook.com')
    }
    static credential (t) {
      return id._fromParams({
        providerId: ud.PROVIDER_ID,
        signInMethod: ud.FACEBOOK_SIGN_IN_METHOD,
        accessToken: t
      })
    }
    static credentialFromResult (t) {
      return ud.credentialFromTaggedObject(t)
    }
    static credentialFromError (t) {
      return ud.credentialFromTaggedObject(t.customData || {})
    }
    static credentialFromTaggedObject ({ _tokenResponse: t }) {
      if (!t || !('oauthAccessToken' in t)) return null
      if (!t.oauthAccessToken) return null
      try {
        return ud.credential(t.oauthAccessToken)
      } catch (t) {
        return null
      }
    }
  }
  ;(ud.FACEBOOK_SIGN_IN_METHOD = 'facebook.com'),
    (ud.PROVIDER_ID = 'facebook.com')
  class ld extends hd {
    constructor () {
      super('google.com'), this.addScope('profile')
    }
    static credential (t, e) {
      return id._fromParams({
        providerId: ld.PROVIDER_ID,
        signInMethod: ld.GOOGLE_SIGN_IN_METHOD,
        idToken: t,
        accessToken: e
      })
    }
    static credentialFromResult (t) {
      return ld.credentialFromTaggedObject(t)
    }
    static credentialFromError (t) {
      return ld.credentialFromTaggedObject(t.customData || {})
    }
    static credentialFromTaggedObject ({ _tokenResponse: t }) {
      if (!t) return null
      const { oauthIdToken: e, oauthAccessToken: n } = t
      if (!e && !n) return null
      try {
        return ld.credential(e, n)
      } catch (t) {
        return null
      }
    }
  }
  ;(ld.GOOGLE_SIGN_IN_METHOD = 'google.com'), (ld.PROVIDER_ID = 'google.com')
  class dd extends hd {
    constructor () {
      super('github.com')
    }
    static credential (t) {
      return id._fromParams({
        providerId: dd.PROVIDER_ID,
        signInMethod: dd.GITHUB_SIGN_IN_METHOD,
        accessToken: t
      })
    }
    static credentialFromResult (t) {
      return dd.credentialFromTaggedObject(t)
    }
    static credentialFromError (t) {
      return dd.credentialFromTaggedObject(t.customData || {})
    }
    static credentialFromTaggedObject ({ _tokenResponse: t }) {
      if (!t || !('oauthAccessToken' in t)) return null
      if (!t.oauthAccessToken) return null
      try {
        return dd.credential(t.oauthAccessToken)
      } catch (t) {
        return null
      }
    }
  }
  ;(dd.GITHUB_SIGN_IN_METHOD = 'github.com'), (dd.PROVIDER_ID = 'github.com')
  class fd extends hd {
    constructor () {
      super('twitter.com')
    }
    static credential (t, e) {
      return id._fromParams({
        providerId: fd.PROVIDER_ID,
        signInMethod: fd.TWITTER_SIGN_IN_METHOD,
        oauthToken: t,
        oauthTokenSecret: e
      })
    }
    static credentialFromResult (t) {
      return fd.credentialFromTaggedObject(t)
    }
    static credentialFromError (t) {
      return fd.credentialFromTaggedObject(t.customData || {})
    }
    static credentialFromTaggedObject ({ _tokenResponse: t }) {
      if (!t) return null
      const { oauthAccessToken: e, oauthTokenSecret: n } = t
      if (!e || !n) return null
      try {
        return fd.credential(e, n)
      } catch (t) {
        return null
      }
    }
  }
  ;(fd.TWITTER_SIGN_IN_METHOD = 'twitter.com'), (fd.PROVIDER_ID = 'twitter.com')
  class pd {
    constructor (t) {
      ;(this.user = t.user),
        (this.providerId = t.providerId),
        (this._tokenResponse = t._tokenResponse),
        (this.operationType = t.operationType)
    }
    static async _fromIdTokenResponse (t, e, n, i = !1) {
      const s = await Ml._fromIdTokenResponse(t, n, i),
        r = md(n)
      return new pd({
        user: s,
        providerId: r,
        _tokenResponse: n,
        operationType: e
      })
    }
    static async _forOperation (t, e, n) {
      await t._updateTokensIfNecessary(n, !0)
      const i = md(n)
      return new pd({
        user: t,
        providerId: i,
        _tokenResponse: n,
        operationType: e
      })
    }
  }
  function md (t) {
    return t.providerId ? t.providerId : 'phoneNumber' in t ? 'phone' : null
  }
  class gd extends c {
    constructor (t, e, n, i) {
      var s
      super(e.code, e.message),
        (this.operationType = n),
        (this.user = i),
        Object.setPrototypeOf(this, gd.prototype),
        (this.customData = {
          appName: t.name,
          tenantId: null !== (s = t.tenantId) && void 0 !== s ? s : void 0,
          _serverResponse: e.customData._serverResponse,
          operationType: n
        })
    }
    static _fromErrorAndOperation (t, e, n, i) {
      return new gd(t, e, n, i)
    }
  }
  function yd (t, e, n, i) {
    return ('reauthenticate' === e
      ? n._getReauthenticationResolver(t)
      : n._getIdTokenResponse(t)
    ).catch(n => {
      if ('auth/multi-factor-auth-required' === n.code)
        throw gd._fromErrorAndOperation(t, n, e, i)
      throw n
    })
  }
  function vd (t, e, n, i) {
    return v(t).onAuthStateChanged(e, n, i)
  }
  new WeakMap()
  const wd = '__sak'
  class Id {
    constructor (t, e) {
      ;(this.storageRetriever = t), (this.type = e)
    }
    _isAvailable () {
      try {
        return this.storage
          ? (this.storage.setItem(wd, '1'),
            this.storage.removeItem(wd),
            Promise.resolve(!0))
          : Promise.resolve(!1)
      } catch (t) {
        return Promise.resolve(!1)
      }
    }
    _set (t, e) {
      return this.storage.setItem(t, JSON.stringify(e)), Promise.resolve()
    }
    _get (t) {
      const e = this.storage.getItem(t)
      return Promise.resolve(e ? JSON.parse(e) : null)
    }
    _remove (t) {
      return this.storage.removeItem(t), Promise.resolve()
    }
    get storage () {
      return this.storageRetriever()
    }
  }
  class Td extends Id {
    constructor () {
      super(() => window.localStorage, 'LOCAL'),
        (this.boundEventHandler = (t, e) => this.onStorageEvent(t, e)),
        (this.listeners = {}),
        (this.localCache = {}),
        (this.pollTimer = null),
        (this.safariLocalStorageNotSynced =
          (function () {
            const t = i()
            return Bl(t) || Wl(t)
          })() &&
          (function () {
            try {
              return !(!window || window === window.top)
            } catch (t) {
              return !1
            }
          })()),
        (this.fallbackToPolling = Jl()),
        (this._shouldAllowMigration = !0)
    }
    forAllChangedKeys (t) {
      for (const e of Object.keys(this.listeners)) {
        const n = this.storage.getItem(e),
          i = this.localCache[e]
        n !== i && t(e, i, n)
      }
    }
    onStorageEvent (t, e = !1) {
      if (!t.key)
        return void this.forAllChangedKeys((t, e, n) => {
          this.notifyListeners(t, n)
        })
      const n = t.key
      if (
        (e ? this.detachListener() : this.stopPolling(),
        this.safariLocalStorageNotSynced)
      ) {
        const i = this.storage.getItem(n)
        if (t.newValue !== i)
          null !== t.newValue
            ? this.storage.setItem(n, t.newValue)
            : this.storage.removeItem(n)
        else if (this.localCache[n] === t.newValue && !e) return
      }
      const i = () => {
          const t = this.storage.getItem(n)
          ;(e || this.localCache[n] !== t) && this.notifyListeners(n, t)
        },
        s = this.storage.getItem(n)
      a() &&
      10 === document.documentMode &&
      s !== t.newValue &&
      t.newValue !== t.oldValue
        ? setTimeout(i, 10)
        : i()
    }
    notifyListeners (t, e) {
      this.localCache[t] = e
      const n = this.listeners[t]
      if (n) for (const t of Array.from(n)) t(e ? JSON.parse(e) : e)
    }
    startPolling () {
      this.stopPolling(),
        (this.pollTimer = setInterval(() => {
          this.forAllChangedKeys((t, e, n) => {
            this.onStorageEvent(
              new StorageEvent('storage', { key: t, oldValue: e, newValue: n }),
              !0
            )
          })
        }, 1e3))
    }
    stopPolling () {
      this.pollTimer && (clearInterval(this.pollTimer), (this.pollTimer = null))
    }
    attachListener () {
      window.addEventListener('storage', this.boundEventHandler)
    }
    detachListener () {
      window.removeEventListener('storage', this.boundEventHandler)
    }
    _addListener (t, e) {
      0 === Object.keys(this.listeners).length &&
        (this.fallbackToPolling ? this.startPolling() : this.attachListener()),
        this.listeners[t] ||
          ((this.listeners[t] = new Set()),
          (this.localCache[t] = this.storage.getItem(t))),
        this.listeners[t].add(e)
    }
    _removeListener (t, e) {
      this.listeners[t] &&
        (this.listeners[t].delete(e),
        0 === this.listeners[t].size && delete this.listeners[t]),
        0 === Object.keys(this.listeners).length &&
          (this.detachListener(), this.stopPolling())
    }
    async _set (t, e) {
      await super._set(t, e), (this.localCache[t] = JSON.stringify(e))
    }
    async _get (t) {
      const e = await super._get(t)
      return (this.localCache[t] = JSON.stringify(e)), e
    }
    async _remove (t) {
      await super._remove(t), delete this.localCache[t]
    }
  }
  Td.type = 'LOCAL'
  const Ed = Td
  class bd extends Id {
    constructor () {
      super(() => window.sessionStorage, 'SESSION')
    }
    _addListener (t, e) {}
    _removeListener (t, e) {}
  }
  bd.type = 'SESSION'
  const _d = bd
  class Sd {
    constructor (t) {
      ;(this.eventTarget = t),
        (this.handlersMap = {}),
        (this.boundEventHandler = this.handleEvent.bind(this))
    }
    static _getInstance (t) {
      const e = this.receivers.find(e => e.isListeningto(t))
      if (e) return e
      const n = new Sd(t)
      return this.receivers.push(n), n
    }
    isListeningto (t) {
      return this.eventTarget === t
    }
    async handleEvent (t) {
      const e = t,
        { eventId: n, eventType: i, data: s } = e.data,
        r = this.handlersMap[i]
      if (!(null == r ? void 0 : r.size)) return
      e.ports[0].postMessage({ status: 'ack', eventId: n, eventType: i })
      const o = Array.from(r).map(async t => t(e.origin, s)),
        a = await (function (t) {
          return Promise.all(
            t.map(async t => {
              try {
                return { fulfilled: !0, value: await t }
              } catch (t) {
                return { fulfilled: !1, reason: t }
              }
            })
          )
        })(o)
      e.ports[0].postMessage({
        status: 'done',
        eventId: n,
        eventType: i,
        response: a
      })
    }
    _subscribe (t, e) {
      0 === Object.keys(this.handlersMap).length &&
        this.eventTarget.addEventListener('message', this.boundEventHandler),
        this.handlersMap[t] || (this.handlersMap[t] = new Set()),
        this.handlersMap[t].add(e)
    }
    _unsubscribe (t, e) {
      this.handlersMap[t] && e && this.handlersMap[t].delete(e),
        (e && 0 !== this.handlersMap[t].size) || delete this.handlersMap[t],
        0 === Object.keys(this.handlersMap).length &&
          this.eventTarget.removeEventListener(
            'message',
            this.boundEventHandler
          )
    }
  }
  function kd (t = '', e = 10) {
    let n = ''
    for (let t = 0; t < e; t++) n += Math.floor(10 * Math.random())
    return t + n
  }
  Sd.receivers = []
  class Ad {
    constructor (t) {
      ;(this.target = t), (this.handlers = new Set())
    }
    removeMessageHandler (t) {
      t.messageChannel &&
        (t.messageChannel.port1.removeEventListener('message', t.onMessage),
        t.messageChannel.port1.close()),
        this.handlers.delete(t)
    }
    async _send (t, e, n = 50) {
      const i =
        'undefined' != typeof MessageChannel ? new MessageChannel() : null
      if (!i) throw new Error('connection_unavailable')
      let s, r
      return new Promise((o, a) => {
        const c = kd('', 20)
        i.port1.start()
        const h = setTimeout(() => {
          a(new Error('unsupported_event'))
        }, n)
        ;(r = {
          messageChannel: i,
          onMessage (t) {
            const e = t
            if (e.data.eventId === c)
              switch (e.data.status) {
                case 'ack':
                  clearTimeout(h),
                    (s = setTimeout(() => {
                      a(new Error('timeout'))
                    }, 3e3))
                  break
                case 'done':
                  clearTimeout(s), o(e.data.response)
                  break
                default:
                  clearTimeout(h),
                    clearTimeout(s),
                    a(new Error('invalid_response'))
              }
          }
        }),
          this.handlers.add(r),
          i.port1.addEventListener('message', r.onMessage),
          this.target.postMessage({ eventType: t, eventId: c, data: e }, [
            i.port2
          ])
      }).finally(() => {
        r && this.removeMessageHandler(r)
      })
    }
  }
  function Cd () {
    return window
  }
  function Nd () {
    return (
      void 0 !== Cd().WorkerGlobalScope &&
      'function' == typeof Cd().importScripts
    )
  }
  const Rd = 'firebaseLocalStorageDb',
    Dd = 'firebaseLocalStorage',
    Od = 'fbase_key'
  class Ld {
    constructor (t) {
      this.request = t
    }
    toPromise () {
      return new Promise((t, e) => {
        this.request.addEventListener('success', () => {
          t(this.request.result)
        }),
          this.request.addEventListener('error', () => {
            e(this.request.error)
          })
      })
    }
  }
  function Pd (t, e) {
    return t.transaction([Dd], e ? 'readwrite' : 'readonly').objectStore(Dd)
  }
  function Md () {
    const t = indexedDB.open(Rd, 1)
    return new Promise((e, n) => {
      t.addEventListener('error', () => {
        n(t.error)
      }),
        t.addEventListener('upgradeneeded', () => {
          const e = t.result
          try {
            e.createObjectStore(Dd, { keyPath: Od })
          } catch (t) {
            n(t)
          }
        }),
        t.addEventListener('success', async () => {
          const n = t.result
          n.objectStoreNames.contains(Dd)
            ? e(n)
            : (n.close(),
              await (function () {
                const t = indexedDB.deleteDatabase(Rd)
                return new Ld(t).toPromise()
              })(),
              e(await Md()))
        })
    })
  }
  async function Ud (t, e, n) {
    const i = Pd(t, !0).put({ [Od]: e, value: n })
    return new Ld(i).toPromise()
  }
  function xd (t, e) {
    const n = Pd(t, !0).delete(e)
    return new Ld(n).toPromise()
  }
  class Vd {
    constructor () {
      ;(this.type = 'LOCAL'),
        (this._shouldAllowMigration = !0),
        (this.listeners = {}),
        (this.localCache = {}),
        (this.pollTimer = null),
        (this.pendingWrites = 0),
        (this.receiver = null),
        (this.sender = null),
        (this.serviceWorkerReceiverAvailable = !1),
        (this.activeServiceWorker = null),
        (this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(
          () => {},
          () => {}
        ))
    }
    async _openDb () {
      return this.db || (this.db = await Md()), this.db
    }
    async _withRetries (t) {
      let e = 0
      for (;;)
        try {
          const e = await this._openDb()
          return await t(e)
        } catch (t) {
          if (e++ > 3) throw t
          this.db && (this.db.close(), (this.db = void 0))
        }
    }
    async initializeServiceWorkerMessaging () {
      return Nd() ? this.initializeReceiver() : this.initializeSender()
    }
    async initializeReceiver () {
      ;(this.receiver = Sd._getInstance(Nd() ? self : null)),
        this.receiver._subscribe('keyChanged', async (t, e) => ({
          keyProcessed: (await this._poll()).includes(e.key)
        })),
        this.receiver._subscribe('ping', async (t, e) => ['keyChanged'])
    }
    async initializeSender () {
      var t, e
      if (
        ((this.activeServiceWorker = await (async function () {
          if (
            !(null === navigator || void 0 === navigator
              ? void 0
              : navigator.serviceWorker)
          )
            return null
          try {
            return (await navigator.serviceWorker.ready).active
          } catch (t) {
            return null
          }
        })()),
        !this.activeServiceWorker)
      )
        return
      this.sender = new Ad(this.activeServiceWorker)
      const n = await this.sender._send('ping', {}, 800)
      n &&
        (null === (t = n[0]) || void 0 === t ? void 0 : t.fulfilled) &&
        (null === (e = n[0]) || void 0 === e
          ? void 0
          : e.value.includes('keyChanged')) &&
        (this.serviceWorkerReceiverAvailable = !0)
    }
    async notifyServiceWorker (t) {
      if (
        this.sender &&
        this.activeServiceWorker &&
        (function () {
          var t
          return (
            (null ===
              (t =
                null === navigator || void 0 === navigator
                  ? void 0
                  : navigator.serviceWorker) || void 0 === t
              ? void 0
              : t.controller) || null
          )
        })() === this.activeServiceWorker
      )
        try {
          await this.sender._send(
            'keyChanged',
            { key: t },
            this.serviceWorkerReceiverAvailable ? 800 : 50
          )
        } catch (t) {}
    }
    async _isAvailable () {
      try {
        if (!indexedDB) return !1
        const t = await Md()
        return await Ud(t, wd, '1'), await xd(t, wd), !0
      } catch (t) {}
      return !1
    }
    async _withPendingWrite (t) {
      this.pendingWrites++
      try {
        await t()
      } finally {
        this.pendingWrites--
      }
    }
    async _set (t, e) {
      return this._withPendingWrite(
        async () => (
          await this._withRetries(n => Ud(n, t, e)),
          (this.localCache[t] = e),
          this.notifyServiceWorker(t)
        )
      )
    }
    async _get (t) {
      const e = await this._withRetries(e =>
        (async function (t, e) {
          const n = Pd(t, !1).get(e),
            i = await new Ld(n).toPromise()
          return void 0 === i ? null : i.value
        })(e, t)
      )
      return (this.localCache[t] = e), e
    }
    async _remove (t) {
      return this._withPendingWrite(
        async () => (
          await this._withRetries(e => xd(e, t)),
          delete this.localCache[t],
          this.notifyServiceWorker(t)
        )
      )
    }
    async _poll () {
      const t = await this._withRetries(t => {
        const e = Pd(t, !1).getAll()
        return new Ld(e).toPromise()
      })
      if (!t) return []
      if (0 !== this.pendingWrites) return []
      const e = [],
        n = new Set()
      for (const { fbase_key: i, value: s } of t)
        n.add(i),
          JSON.stringify(this.localCache[i]) !== JSON.stringify(s) &&
            (this.notifyListeners(i, s), e.push(i))
      for (const t of Object.keys(this.localCache))
        this.localCache[t] &&
          !n.has(t) &&
          (this.notifyListeners(t, null), e.push(t))
      return e
    }
    notifyListeners (t, e) {
      this.localCache[t] = e
      const n = this.listeners[t]
      if (n) for (const t of Array.from(n)) t(e)
    }
    startPolling () {
      this.stopPolling(),
        (this.pollTimer = setInterval(async () => this._poll(), 800))
    }
    stopPolling () {
      this.pollTimer && (clearInterval(this.pollTimer), (this.pollTimer = null))
    }
    _addListener (t, e) {
      0 === Object.keys(this.listeners).length && this.startPolling(),
        this.listeners[t] || ((this.listeners[t] = new Set()), this._get(t)),
        this.listeners[t].add(e)
    }
    _removeListener (t, e) {
      this.listeners[t] &&
        (this.listeners[t].delete(e),
        0 === this.listeners[t].size && delete this.listeners[t]),
        0 === Object.keys(this.listeners).length && this.stopPolling()
    }
  }
  Vd.type = 'LOCAL'
  const Fd = Vd
  function qd (t) {
    return `__${t}${Math.floor(1e6 * Math.random())}`
  }
  qd('rcb'), new pl(3e4, 6e4)
  class jd {
    constructor (t) {
      ;(this.providerId = jd.PROVIDER_ID), (this.auth = Yl(t))
    }
    verifyPhoneNumber (t, e) {
      return (async function (t, e, n) {
        var i
        const s = await n.verify()
        try {
          let r
          if (
            (al('string' == typeof s, t, 'argument-error'),
            al('recaptcha' === n.type, t, 'argument-error'),
            (r = 'string' == typeof e ? { phoneNumber: e } : e),
            'session' in r)
          ) {
            const e = r.session
            if ('phoneNumber' in r) {
              al('enroll' === e.type, t, 'internal-error')
              const n = await (function (t, e) {
                return Il(
                  t,
                  'POST',
                  '/v2/accounts/mfaEnrollment:start',
                  wl(t, e)
                )
              })(t, {
                idToken: e.credential,
                phoneEnrollmentInfo: {
                  phoneNumber: r.phoneNumber,
                  recaptchaToken: s
                }
              })
              return n.phoneSessionInfo.sessionInfo
            }
            {
              al('signin' === e.type, t, 'internal-error')
              const n =
                (null === (i = r.multiFactorHint) || void 0 === i
                  ? void 0
                  : i.uid) || r.multiFactorUid
              al(n, t, 'missing-multi-factor-info')
              const o = await (function (t, e) {
                return Il(t, 'POST', '/v2/accounts/mfaSignIn:start', wl(t, e))
              })(t, {
                mfaPendingCredential: e.credential,
                mfaEnrollmentId: n,
                phoneSignInInfo: { recaptchaToken: s }
              })
              return o.phoneResponseInfo.sessionInfo
            }
          }
          {
            const { sessionInfo: e } = await (async function (t, e) {
              return Il(
                t,
                'POST',
                '/v1/accounts:sendVerificationCode',
                wl(t, e)
              )
            })(t, { phoneNumber: r.phoneNumber, recaptchaToken: s })
            return e
          }
        } finally {
          n._reset()
        }
      })(this.auth, t, v(e))
    }
    static credential (t, e) {
      return rd._fromVerification(t, e)
    }
    static credentialFromResult (t) {
      const e = t
      return jd.credentialFromTaggedObject(e)
    }
    static credentialFromError (t) {
      return jd.credentialFromTaggedObject(t.customData || {})
    }
    static credentialFromTaggedObject ({ _tokenResponse: t }) {
      if (!t) return null
      const { phoneNumber: e, temporaryProof: n } = t
      return e && n ? rd._fromTokenResponse(e, n) : null
    }
  }
  ;(jd.PROVIDER_ID = 'phone'), (jd.PHONE_SIGN_IN_METHOD = 'phone')
  class Bd extends td {
    constructor (t) {
      super('custom', 'custom'), (this.params = t)
    }
    _getIdTokenResponse (t) {
      return nd(t, this._buildIdpRequest())
    }
    _linkToIdToken (t, e) {
      return nd(t, this._buildIdpRequest(e))
    }
    _getReauthenticationResolver (t) {
      return nd(t, this._buildIdpRequest())
    }
    _buildIdpRequest (t) {
      const e = {
        requestUri: this.params.requestUri,
        sessionId: this.params.sessionId,
        postBody: this.params.postBody,
        tenantId: this.params.tenantId,
        pendingToken: this.params.pendingToken,
        returnSecureToken: !0,
        returnIdpCredential: !0
      }
      return t && (e.idToken = t), e
    }
  }
  function $d (t) {
    return (async function (t, e, n = !1) {
      const i = 'signIn',
        s = await yd(t, i, e),
        r = await pd._fromIdTokenResponse(t, i, s)
      return n || (await t._updateCurrentUser(r.user)), r
    })(t.auth, new Bd(t), t.bypassAuthState)
  }
  function Hd (t) {
    const { auth: e, user: n } = t
    return (
      al(n, e, 'internal-error'),
      (async function (t, e, n = !1) {
        const { auth: i } = t,
          s = 'reauthenticate'
        try {
          const r = await Nl(t, yd(i, s, e, t), n)
          al(r.idToken, i, 'internal-error')
          const o = Cl(r.idToken)
          al(o, i, 'internal-error')
          const { sub: a } = o
          return al(t.uid === a, i, 'user-mismatch'), pd._forOperation(t, s, r)
        } catch (t) {
          throw ('auth/user-not-found' === (null == t ? void 0 : t.code) &&
            sl(i, 'user-mismatch'),
          t)
        }
      })(n, new Bd(t), t.bypassAuthState)
    )
  }
  async function Kd (t) {
    const { auth: e, user: n } = t
    return (
      al(n, e, 'internal-error'),
      (async function (t, e, n = !1) {
        const i = await Nl(t, e._linkToIdToken(t.auth, await t.getIdToken()), n)
        return pd._forOperation(t, 'link', i)
      })(n, new Bd(t), t.bypassAuthState)
    )
  }
  class zd {
    constructor (t, e, n, i, s = !1) {
      ;(this.auth = t),
        (this.resolver = n),
        (this.user = i),
        (this.bypassAuthState = s),
        (this.pendingPromise = null),
        (this.eventManager = null),
        (this.filter = Array.isArray(e) ? e : [e])
    }
    execute () {
      return new Promise(async (t, e) => {
        this.pendingPromise = { resolve: t, reject: e }
        try {
          ;(this.eventManager = await this.resolver._initialize(this.auth)),
            await this.onExecution(),
            this.eventManager.registerConsumer(this)
        } catch (t) {
          this.reject(t)
        }
      })
    }
    async onAuthEvent (t) {
      const {
        urlResponse: e,
        sessionId: n,
        postBody: i,
        tenantId: s,
        error: r,
        type: o
      } = t
      if (r) return void this.reject(r)
      const a = {
        auth: this.auth,
        requestUri: e,
        sessionId: n,
        tenantId: s || void 0,
        postBody: i || void 0,
        user: this.user,
        bypassAuthState: this.bypassAuthState
      }
      try {
        this.resolve(await this.getIdpTask(o)(a))
      } catch (t) {
        this.reject(t)
      }
    }
    onError (t) {
      this.reject(t)
    }
    getIdpTask (t) {
      switch (t) {
        case 'signInViaPopup':
        case 'signInViaRedirect':
          return $d
        case 'linkViaPopup':
        case 'linkViaRedirect':
          return Kd
        case 'reauthViaPopup':
        case 'reauthViaRedirect':
          return Hd
        default:
          sl(this.auth, 'internal-error')
      }
    }
    resolve (t) {
      hl(this.pendingPromise, 'Pending promise was never set'),
        this.pendingPromise.resolve(t),
        this.unregisterAndCleanUp()
    }
    reject (t) {
      hl(this.pendingPromise, 'Pending promise was never set'),
        this.pendingPromise.reject(t),
        this.unregisterAndCleanUp()
    }
    unregisterAndCleanUp () {
      this.eventManager && this.eventManager.unregisterConsumer(this),
        (this.pendingPromise = null),
        this.cleanUp()
    }
  }
  const Gd = new pl(2e3, 1e4)
  class Wd extends zd {
    constructor (t, e, n, i, s) {
      super(t, e, i, s),
        (this.provider = n),
        (this.authWindow = null),
        (this.pollId = null),
        Wd.currentPopupAction && Wd.currentPopupAction.cancel(),
        (Wd.currentPopupAction = this)
    }
    async executeNotNull () {
      const t = await this.execute()
      return al(t, this.auth, 'internal-error'), t
    }
    async onExecution () {
      hl(1 === this.filter.length, 'Popup operations only handle one event')
      const t = kd()
      ;(this.authWindow = await this.resolver._openPopup(
        this.auth,
        this.provider,
        this.filter[0],
        t
      )),
        (this.authWindow.associatedEvent = t),
        this.resolver._originValidation(this.auth).catch(t => {
          this.reject(t)
        }),
        this.resolver._isIframeWebStorageSupported(this.auth, t => {
          t || this.reject(rl(this.auth, 'web-storage-unsupported'))
        }),
        this.pollUserCancellation()
    }
    get eventId () {
      var t
      return (
        (null === (t = this.authWindow) || void 0 === t
          ? void 0
          : t.associatedEvent) || null
      )
    }
    cancel () {
      this.reject(rl(this.auth, 'cancelled-popup-request'))
    }
    cleanUp () {
      this.authWindow && this.authWindow.close(),
        this.pollId && window.clearTimeout(this.pollId),
        (this.authWindow = null),
        (this.pollId = null),
        (Wd.currentPopupAction = null)
    }
    pollUserCancellation () {
      const t = () => {
        var e, n
        ;(null ===
          (n =
            null === (e = this.authWindow) || void 0 === e
              ? void 0
              : e.window) || void 0 === n
        ? void 0
        : n.closed)
          ? (this.pollId = window.setTimeout(() => {
              ;(this.pollId = null),
                this.reject(rl(this.auth, 'popup-closed-by-user'))
            }, 2e3))
          : (this.pollId = window.setTimeout(t, Gd.get()))
      }
      t()
    }
  }
  Wd.currentPopupAction = null
  const Jd = new Map()
  class Qd extends zd {
    constructor (t, e, n = !1) {
      super(
        t,
        [
          'signInViaRedirect',
          'linkViaRedirect',
          'reauthViaRedirect',
          'unknown'
        ],
        e,
        void 0,
        n
      ),
        (this.eventId = null)
    }
    async execute () {
      let t = Jd.get(this.auth._key())
      if (!t) {
        try {
          const e = await (async function (t, e) {
              const n = (function (t) {
                  return Vl('pendingRedirect', t.config.apiKey, t.name)
                })(e),
                i = (function (t) {
                  return ll(t._redirectPersistence)
                })(t)
              if (!(await i._isAvailable())) return !1
              const s = 'true' === (await i._get(n))
              return await i._remove(n), s
            })(this.resolver, this.auth),
            n = e ? await super.execute() : null
          t = () => Promise.resolve(n)
        } catch (e) {
          t = () => Promise.reject(e)
        }
        Jd.set(this.auth._key(), t)
      }
      return (
        this.bypassAuthState ||
          Jd.set(this.auth._key(), () => Promise.resolve(null)),
        t()
      )
    }
    async onAuthEvent (t) {
      if ('signInViaRedirect' === t.type) return super.onAuthEvent(t)
      if ('unknown' !== t.type) {
        if (t.eventId) {
          const e = await this.auth._redirectUserForId(t.eventId)
          if (e) return (this.user = e), super.onAuthEvent(t)
          this.resolve(null)
        }
      } else this.resolve(null)
    }
    async onExecution () {}
    cleanUp () {}
  }
  async function Xd (t, e, n = !1) {
    const i = Yl(t),
      s = (function (t, e) {
        return e
          ? ll(e)
          : (al(t._popupRedirectResolver, t, 'argument-error'),
            t._popupRedirectResolver)
      })(i, e),
      r = new Qd(i, s, n),
      o = await r.execute()
    return (
      o &&
        !n &&
        (delete o.user._redirectEventId,
        await i._persistUserIfCurrent(o.user),
        await i._setRedirectUser(null, e)),
      o
    )
  }
  class Yd {
    constructor (t) {
      ;(this.auth = t),
        (this.cachedEventUids = new Set()),
        (this.consumers = new Set()),
        (this.queuedRedirectEvent = null),
        (this.hasHandledPotentialRedirect = !1),
        (this.lastProcessedEventTime = Date.now())
    }
    registerConsumer (t) {
      this.consumers.add(t),
        this.queuedRedirectEvent &&
          this.isEventForConsumer(this.queuedRedirectEvent, t) &&
          (this.sendToConsumer(this.queuedRedirectEvent, t),
          this.saveEventToCache(this.queuedRedirectEvent),
          (this.queuedRedirectEvent = null))
    }
    unregisterConsumer (t) {
      this.consumers.delete(t)
    }
    onEvent (t) {
      if (this.hasEventBeenHandled(t)) return !1
      let e = !1
      return (
        this.consumers.forEach(n => {
          this.isEventForConsumer(t, n) &&
            ((e = !0), this.sendToConsumer(t, n), this.saveEventToCache(t))
        }),
        this.hasHandledPotentialRedirect ||
          !(function (t) {
            switch (t.type) {
              case 'signInViaRedirect':
              case 'linkViaRedirect':
              case 'reauthViaRedirect':
                return !0
              case 'unknown':
                return tf(t)
              default:
                return !1
            }
          })(t) ||
          ((this.hasHandledPotentialRedirect = !0),
          e || ((this.queuedRedirectEvent = t), (e = !0))),
        e
      )
    }
    sendToConsumer (t, e) {
      var n
      if (t.error && !tf(t)) {
        const i =
          (null === (n = t.error.code) || void 0 === n
            ? void 0
            : n.split('auth/')[1]) || 'internal-error'
        e.onError(rl(this.auth, i))
      } else e.onAuthEvent(t)
    }
    isEventForConsumer (t, e) {
      const n = null === e.eventId || (!!t.eventId && t.eventId === e.eventId)
      return e.filter.includes(t.type) && n
    }
    hasEventBeenHandled (t) {
      return (
        Date.now() - this.lastProcessedEventTime >= 6e5 &&
          this.cachedEventUids.clear(),
        this.cachedEventUids.has(Zd(t))
      )
    }
    saveEventToCache (t) {
      this.cachedEventUids.add(Zd(t)),
        (this.lastProcessedEventTime = Date.now())
    }
  }
  function Zd (t) {
    return [t.type, t.eventId, t.sessionId, t.tenantId].filter(t => t).join('-')
  }
  function tf ({ type: t, error: e }) {
    return (
      'unknown' === t && 'auth/no-auth-event' === (null == e ? void 0 : e.code)
    )
  }
  const ef = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
    nf = /^https?/
  function sf (t) {
    const e = dl(),
      { protocol: n, hostname: i } = new URL(e)
    if (t.startsWith('chrome-extension://')) {
      const s = new URL(t)
      return '' === s.hostname && '' === i
        ? 'chrome-extension:' === n &&
            t.replace('chrome-extension://', '') ===
              e.replace('chrome-extension://', '')
        : 'chrome-extension:' === n && s.hostname === i
    }
    if (!nf.test(n)) return !1
    if (ef.test(t)) return i === t
    const s = t.replace(/\./g, '\\.')
    return new RegExp('^(.+\\.' + s + '|' + s + ')$', 'i').test(i)
  }
  const rf = new pl(3e4, 6e4)
  function of () {
    const t = Cd().___jsl
    if (null == t ? void 0 : t.H)
      for (const e of Object.keys(t.H))
        if (
          ((t.H[e].r = t.H[e].r || []),
          (t.H[e].L = t.H[e].L || []),
          (t.H[e].r = [...t.H[e].L]),
          t.CP)
        )
          for (let e = 0; e < t.CP.length; e++) t.CP[e] = null
  }
  let af = null
  function cf (t) {
    return (
      (af =
        af ||
        (function (t) {
          return new Promise((e, n) => {
            var i, s, r, o
            function a () {
              of(),
                gapi.load('gapi.iframes', {
                  callback: () => {
                    e(gapi.iframes.getContext())
                  },
                  ontimeout: () => {
                    of(), n(rl(t, 'network-request-failed'))
                  },
                  timeout: rf.get()
                })
            }
            if (
              null ===
                (s =
                  null === (i = Cd().gapi) || void 0 === i
                    ? void 0
                    : i.iframes) || void 0 === s
                ? void 0
                : s.Iframe
            )
              e(gapi.iframes.getContext())
            else {
              if (
                !(null === (r = Cd().gapi) || void 0 === r ? void 0 : r.load)
              ) {
                const e = qd('iframefcb')
                return (
                  (Cd()[e] = () => {
                    gapi.load ? a() : n(rl(t, 'network-request-failed'))
                  }),
                  ((o = `https://apis.google.com/js/api.js?onload=${e}`),
                  new Promise((t, e) => {
                    const n = document.createElement('script')
                    n.setAttribute('src', o),
                      (n.onload = t),
                      (n.onerror = t => {
                        const n = rl('internal-error')
                        ;(n.customData = t), e(n)
                      }),
                      (n.type = 'text/javascript'),
                      (n.charset = 'UTF-8'),
                      (function () {
                        var t, e
                        return null !==
                          (e =
                            null ===
                              (t = document.getElementsByTagName('head')) ||
                            void 0 === t
                              ? void 0
                              : t[0]) && void 0 !== e
                          ? e
                          : document
                      })().appendChild(n)
                  })).catch(t => n(t))
                )
              }
              a()
            }
          }).catch(t => {
            throw ((af = null), t)
          })
        })(t)),
      af
    )
  }
  const hf = new pl(5e3, 15e3),
    uf = {
      style: {
        position: 'absolute',
        top: '-100px',
        width: '1px',
        height: '1px'
      },
      'aria-hidden': 'true',
      tabindex: '-1'
    },
    lf = new Map([
      ['identitytoolkit.googleapis.com', 'p'],
      ['staging-identitytoolkit.sandbox.googleapis.com', 's'],
      ['test-identitytoolkit.sandbox.googleapis.com', 't']
    ])
  function df (t) {
    const e = t.config
    al(e.authDomain, t, 'auth-domain-config-required')
    const n = e.emulator
        ? ml(e, 'emulator/auth/iframe')
        : `https://${t.config.authDomain}/__/auth/iframe`,
      i = { apiKey: e.apiKey, appName: t.name, v: H },
      s = lf.get(t.config.apiHost)
    s && (i.eid = s)
    const r = t._getFrameworks()
    return r.length && (i.fw = r.join(',')), `${n}?${f(i).slice(1)}`
  }
  const ff = {
    location: 'yes',
    resizable: 'yes',
    statusbar: 'yes',
    toolbar: 'no'
  }
  class pf {
    constructor (t) {
      ;(this.window = t), (this.associatedEvent = null)
    }
    close () {
      if (this.window)
        try {
          this.window.close()
        } catch (t) {}
    }
  }
  function mf (t, e, n, i, s, r) {
    al(t.config.authDomain, t, 'auth-domain-config-required'),
      al(t.config.apiKey, t, 'invalid-api-key')
    const o = {
      apiKey: t.config.apiKey,
      appName: t.name,
      authType: n,
      redirectUrl: i,
      v: H,
      eventId: s
    }
    if (e instanceof cd) {
      e.setDefaultLanguage(t.languageCode),
        (o.providerId = e.providerId || ''),
        (function (t) {
          for (const e in t)
            if (Object.prototype.hasOwnProperty.call(t, e)) return !1
          return !0
        })(e.getCustomParameters()) ||
          (o.customParameters = JSON.stringify(e.getCustomParameters()))
      for (const [t, e] of Object.entries(r || {})) o[t] = e
    }
    if (e instanceof hd) {
      const t = e.getScopes().filter(t => '' !== t)
      t.length > 0 && (o.scopes = t.join(','))
    }
    t.tenantId && (o.tid = t.tenantId)
    const a = o
    for (const t of Object.keys(a)) void 0 === a[t] && delete a[t]
    return `${(function ({ config: t }) {
      return t.emulator
        ? ml(t, 'emulator/auth/handler')
        : `https://${t.authDomain}/__/auth/handler`
    })(t)}?${f(a).slice(1)}`
  }
  const gf = 'webStorageSupport',
    yf = class {
      constructor () {
        ;(this.eventManagers = {}),
          (this.iframes = {}),
          (this.originValidationPromises = {}),
          (this._redirectPersistence = _d),
          (this._completeRedirectFn = Xd)
      }
      async _openPopup (t, e, n, s) {
        var r
        return (
          hl(
            null === (r = this.eventManagers[t._key()]) || void 0 === r
              ? void 0
              : r.manager,
            '_initialize() not called before _openPopup()'
          ),
          (function (t, e, n, s = 500, r = 600) {
            const o = Math.max(
                (window.screen.availHeight - r) / 2,
                0
              ).toString(),
              a = Math.max((window.screen.availWidth - s) / 2, 0).toString()
            let c = ''
            const h = Object.assign(Object.assign({}, ff), {
                width: s.toString(),
                height: r.toString(),
                top: o,
                left: a
              }),
              u = i().toLowerCase()
            n && (c = $l(u) ? '_blank' : n),
              jl(u) && ((e = e || 'http://localhost'), (h.scrollbars = 'yes'))
            const l = Object.entries(h).reduce(
              (t, [e, n]) => `${t}${e}=${n},`,
              ''
            )
            if (
              (function (t = i()) {
                var e
                return (
                  Wl(t) &&
                  !!(null === (e = window.navigator) || void 0 === e
                    ? void 0
                    : e.standalone)
                )
              })(u) &&
              '_self' !== c
            )
              return (
                (function (t, e) {
                  const n = document.createElement('a')
                  ;(n.href = t), (n.target = e)
                  const i = document.createEvent('MouseEvent')
                  i.initMouseEvent(
                    'click',
                    !0,
                    !0,
                    window,
                    1,
                    0,
                    0,
                    0,
                    0,
                    !1,
                    !1,
                    !1,
                    !1,
                    1,
                    null
                  ),
                    n.dispatchEvent(i)
                })(e || '', c),
                new pf(null)
              )
            const d = window.open(e || '', c, l)
            al(d, t, 'popup-blocked')
            try {
              d.focus()
            } catch (t) {}
            return new pf(d)
          })(t, mf(t, e, n, dl(), s), kd())
        )
      }
      async _openRedirect (t, e, n, i) {
        var s
        return (
          await this._originValidation(t),
          (s = mf(t, e, n, dl(), i)),
          (Cd().location.href = s),
          new Promise(() => {})
        )
      }
      _initialize (t) {
        const e = t._key()
        if (this.eventManagers[e]) {
          const { manager: t, promise: n } = this.eventManagers[e]
          return t
            ? Promise.resolve(t)
            : (hl(n, 'If manager is not set, promise should be'), n)
        }
        const n = this.initAndGetManager(t)
        return (
          (this.eventManagers[e] = { promise: n }),
          n.catch(() => {
            delete this.eventManagers[e]
          }),
          n
        )
      }
      async initAndGetManager (t) {
        const e = await (async function (t) {
            const e = await cf(t),
              n = Cd().gapi
            return (
              al(n, t, 'internal-error'),
              e.open(
                {
                  where: document.body,
                  url: df(t),
                  messageHandlersFilter: n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
                  attributes: uf,
                  dontclear: !0
                },
                e =>
                  new Promise(async (n, i) => {
                    await e.restyle({ setHideOnLeave: !1 })
                    const s = rl(t, 'network-request-failed'),
                      r = Cd().setTimeout(() => {
                        i(s)
                      }, hf.get())
                    function o () {
                      Cd().clearTimeout(r), n(e)
                    }
                    e.ping(o).then(o, () => {
                      i(s)
                    })
                  })
              )
            )
          })(t),
          n = new Yd(t)
        return (
          e.register(
            'authEvent',
            e => (
              al(null == e ? void 0 : e.authEvent, t, 'invalid-auth-event'),
              { status: n.onEvent(e.authEvent) ? 'ACK' : 'ERROR' }
            ),
            gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
          ),
          (this.eventManagers[t._key()] = { manager: n }),
          (this.iframes[t._key()] = e),
          n
        )
      }
      _isIframeWebStorageSupported (t, e) {
        this.iframes[t._key()].send(
          gf,
          { type: gf },
          n => {
            var i
            const s =
              null === (i = null == n ? void 0 : n[0]) || void 0 === i
                ? void 0
                : i.webStorageSupport
            void 0 !== s && e(!!s), sl(t, 'internal-error')
          },
          gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
        )
      }
      _originValidation (t) {
        const e = t._key()
        return (
          this.originValidationPromises[e] ||
            (this.originValidationPromises[e] = (async function (t) {
              if (t.config.emulator) return
              const { authorizedDomains: e } = await (async function (
                t,
                e = {}
              ) {
                return Il(t, 'GET', '/v1/projects', e)
              })(t)
              for (const t of e)
                try {
                  if (sf(t)) return
                } catch (t) {}
              sl(t, 'unauthorized-domain')
            })(t)),
          this.originValidationPromises[e]
        )
      }
      get _shouldInitProactively () {
        return Jl() || Bl() || Wl()
      }
    }
  var vf,
    wf = '@firebase/auth',
    If = '0.19.5'
  class Tf {
    constructor (t) {
      ;(this.auth = t), (this.internalListeners = new Map())
    }
    getUid () {
      var t
      return (
        this.assertAuthConfigured(),
        (null === (t = this.auth.currentUser) || void 0 === t
          ? void 0
          : t.uid) || null
      )
    }
    async getToken (t) {
      return (
        this.assertAuthConfigured(),
        await this.auth._initializationPromise,
        this.auth.currentUser
          ? { accessToken: await this.auth.currentUser.getIdToken(t) }
          : null
      )
    }
    addAuthTokenListener (t) {
      if ((this.assertAuthConfigured(), this.internalListeners.has(t))) return
      const e = this.auth.onIdTokenChanged(e => {
        var n
        t(
          (null === (n = e) || void 0 === n
            ? void 0
            : n.stsTokenManager.accessToken) || null
        )
      })
      this.internalListeners.set(t, e), this.updateProactiveRefresh()
    }
    removeAuthTokenListener (t) {
      this.assertAuthConfigured()
      const e = this.internalListeners.get(t)
      e &&
        (this.internalListeners.delete(t), e(), this.updateProactiveRefresh())
    }
    assertAuthConfigured () {
      al(
        this.auth._initializationPromise,
        'dependent-sdk-initialized-before-auth'
      )
    }
    updateProactiveRefresh () {
      this.internalListeners.size > 0
        ? this.auth._startProactiveRefresh()
        : this.auth._stopProactiveRefresh()
    }
  }
  ;(vf = 'Browser'),
    F(
      new w(
        'auth',
        (t, { options: e }) => {
          const n = t.getProvider('app').getImmediate(),
            { apiKey: i, authDomain: s } = n.options
          return (t => {
            al(i && !i.includes(':'), 'invalid-api-key', { appName: t.name }),
              al(!(null == s ? void 0 : s.includes(':')), 'argument-error', {
                appName: t.name
              })
            const n = {
                apiKey: i,
                authDomain: s,
                clientPlatform: vf,
                apiHost: 'identitytoolkit.googleapis.com',
                tokenApiHost: 'securetoken.googleapis.com',
                apiScheme: 'https',
                sdkClientVersion: Ql(vf)
              },
              r = new Xl(t, n)
            return (
              (function (t, e) {
                const n = (null == e ? void 0 : e.persistence) || [],
                  i = (Array.isArray(n) ? n : [n]).map(ll)
                ;(null == e ? void 0 : e.errorMap) &&
                  t._updateErrorMap(e.errorMap),
                  t._initializeWithPersistence(
                    i,
                    null == e ? void 0 : e.popupRedirectResolver
                  )
              })(r, e),
              r
            )
          })(n)
        },
        'PUBLIC'
      )
        .setInstantiationMode('EXPLICIT')
        .setInstanceCreatedCallback((t, e, n) => {
          t.getProvider('auth-internal').initialize()
        })
    ),
    F(
      new w(
        'auth-internal',
        t => (t => new Tf(t))(Yl(t.getProvider('auth').getImmediate())),
        'PRIVATE'
      ).setInstantiationMode('EXPLICIT')
    ),
    z(wf, If, void 0),
    z(wf, If, 'esm2017'),
    (function (t, e = {}) {
      'object' != typeof e && (e = { name: e })
      const n = Object.assign(
          { name: '[DEFAULT]', automaticDataCollectionEnabled: !1 },
          e
        ),
        i = n.name
      if ('string' != typeof i || !i)
        throw j.create('bad-app-name', { appName: String(i) })
      const s = U.get(i)
      if (s) {
        if (l(t, s.options) && l(n, s.config)) return s
        throw j.create('duplicate-app', { appName: i })
      }
      const r = new E(i)
      for (const t of x.values()) r.addComponent(t)
      const o = new B(t, n, r)
      U.set(i, o)
    })({
      apiKey: 'AIzaSyC5xMwQV50IkgQqmqUvmoztLqohUimy8us',
      authDomain: 'unicctools.firebaseapp.com',
      projectId: 'unicctools',
      storageBucket: 'unicctools.appspot.com',
      messagingSenderId: '220105354397',
      appId: '1:220105354397:web:ba52dae0235e12934d7874'
    })
  const Ef = (function (t = K()) {
      return q(t, 'firestore').getImmediate()
    })(),
    bf = (function (t = K()) {
      const e = q(t, 'auth')
      return e.isInitialized()
        ? e.getImmediate()
        : (function (t, e) {
            const n = q(t, 'auth')
            if (n.isInitialized()) {
              const t = n.getImmediate()
              if (l(n.getOptions(), null != e ? e : {})) return t
              sl(t, 'already-initialized')
            }
            return n.initialize({ options: e })
          })(t, { popupRedirectResolver: yf, persistence: [Fd, Ed, _d] })
    })(),
    _f = fu(Ef, 'unicctoolsusers'),
    Sf = fu(Ef, 'unicctoolshistory'),
    kf =
      (fu(Ef, 'unicctoolspurchse'),
      fu(Ef, 'unicctoolsothers'),
      fu(Ef, 'unicctoolsdashboard'),
      fu(Ef, 'unicctoolscreditcards'),
      fu(Ef, 'unicctoolsshoppingscript'),
      fu(Ef, 'unicctoolslogincredentials'),
      fu(Ef, 'unicctoolstutorials'),
      fu(Ef, 'unicctoolsapikeys'),
      fu(Ef, 'unicctoolsuids'),
      fu(Ef, 'unicctoolssupport'))
  var Af,
    Cf,
    Nf,
    Rf = document.getElementById('myModal'),
    Df = document.getElementById('myLoadingModal'),
    Of = document.getElementById('myMessageModal'),
    Lf =
      (document.getElementById('PaymentModal'),
      document.getElementById('LookupModal'),
      [])
  function Pf () {
    Df.style.display = 'block'
  }
  function Mf () {
    Df.style.display = 'none'
  }
  function Uf (t, e, n, i) {
    ;(Of.style.display = 'block'),
      $('#myMessageModal .modal-exit').click(() => {
        ;(Of.style.display = 'none'), i()
      }),
      $('#myMessageModal .modal-cancel').click(() => {
        ;(Of.style.display = 'none'), i()
      }),
      $('#myMessageModal .modal-content').css('color', '#ffffff'),
      $('#myMessageModal .modal-content').css('background', n),
      $('#myMessageModal .modal-content').css('border', 'none'),
      $('#myMessageModal h2').text(t),
      $('#myMessageModal p').text(e),
      (window.onclick = function (t) {
        t.target == Rf && (Of.style.display = 'none')
      })
  }
  function xf () {
    Pf(),
      (Rf.style.display = 'none'),
      (function (t, e, n, i) {
        Pf(),
          Yu(pu(t, e), n)
            .then(() => {
              Mf(),
                i &&
                  Uf(
                    'Success',
                    'Document successfully added',
                    '#009e1a',
                    () => {}
                  )
            })
            .catch(t => {
              Mf(), Uf('Error', t, '#b60b0b', () => {})
            })
      })(Sf, Ff(10), {
        history: `You signed out of your account @ ${Date()}`,
        id: Af.email
      }),
      bf.signOut().then(() => {
        Mf(),
          localStorage.setItem('login', 'false'),
          localStorage.removeItem('email'),
          localStorage.removeItem('uid'),
          localStorage.removeItem('username'),
          localStorage.removeItem('balance'),
          localStorage.removeItem('verified'),
          localStorage.removeItem('password'),
          location.replace('/auth.html')
      })
  }
  function Vf () {
    var t
    ;(t = xf), confirm('Do you really want to logout from this account?') && t()
  }
  function Ff (t) {
    var e = '0123456789'
    return [...Array(t)].reduce(t => t + e[~~(Math.random() * e.length)], '')
  }
  function qf (t) {
    document.querySelector('nav').innerHTML = t
      ? '\x3c!-- Primary navigation menu --\x3e\n  <input id="close" class="close" type="button" value="X">\n\n  <ul class="primary-nav">\n      <li class="current"><a href="/index.html">Home</a></li>\n      <li><a href="/buy.html">Buy</a></li>\n      <li><a href="/account.html">Account</a></li>\n      <li><a href="/about.html">About</a></li>\n      <li><a href="/support.html">Support</a></li>\n  </ul>\n  \x3c!-- Secondary navigation menu --\x3e\n  <ul class="secondary-nav">\n      \n          <input type="button" id="sign-id" class="auth-class" value="Signout">\n     \n  </ul>'
      : '\x3c!-- Primary navigation menu --\x3e\n  <input id="close" class="close" type="button" value="X">\n\n  <ul class="primary-nav">\n      <li class="current"><a href="/index.html">Home</a></li>\n      <li><a href="/buy.html">Buy</a></li>\n      <li><a href="/about.html">About</a></li>\n      <li><a href="/support.html">Support</a></li>\n  </ul>\n  \x3c!-- Secondary navigation menu --\x3e\n  <ul class="secondary-nav">\n     \n      <input type="button" id="auth-id" class="auth-class" value="Authenticate">\n    \n  </ul>'
  }
  vd(bf, t => {
    ;(Af = t),
      t
        ? (qf(t),
          (Cf = (function (t, ...e) {
            for (const n of e) t = n._apply(t)
            return t
          })(
            _f,
            (function (t, e, n) {
              const i = Bu('where', 'email')
              return new Wu(i, '==', n)
            })(0, 0, t.email)
          )),
          (function (t, ...e) {
            var n, i, s
            t = v(t)
            let r = { includeMetadataChanges: !1 },
              o = 0
            'object' != typeof e[o] || gu(e[o]) || ((r = e[o]), o++)
            const a = { includeMetadataChanges: r.includeMetadataChanges }
            if (gu(e[o])) {
              const t = e[o]
              ;(e[o] =
                null === (n = t.next) || void 0 === n ? void 0 : n.bind(t)),
                (e[o + 1] =
                  null === (i = t.error) || void 0 === i ? void 0 : i.bind(t)),
                (e[o + 2] =
                  null === (s = t.complete) || void 0 === s
                    ? void 0
                    : s.bind(t))
            }
            let c, h, u
            if (t instanceof uu)
              (h = au(t.firestore, yu)),
                (u = Ur(t._key.path)),
                (c = {
                  next: n => {
                    e[o] &&
                      e[o](
                        (function (t, e, n) {
                          const i = n.docs.get(e._key),
                            s = new Xu(t)
                          return new Hu(
                            t,
                            s,
                            e._key,
                            i,
                            new $u(n.hasPendingWrites, n.fromCache),
                            e.converter
                          )
                        })(h, t, n)
                      )
                  },
                  error: e[o + 1],
                  complete: e[o + 2]
                })
            else {
              const n = au(t, lu)
              ;(h = au(n.firestore, yu)), (u = n._query)
              const i = new Xu(h)
              ;(c = {
                next: t => {
                  e[o] && e[o](new zu(h, i, n, t))
                },
                error: e[o + 1],
                complete: e[o + 2]
              }),
                (function (t) {
                  if (Vr(t) && 0 === t.explicitOrderBy.length)
                    throw new ys(
                      gs.UNIMPLEMENTED,
                      'limitToLast() queries require specifying at least one orderBy() clause'
                    )
                })(t._query)
            }
            !(function (t, e, n, i) {
              const s = new Jh(i),
                r = new Eh(e, s, n)
              t.asyncQueue.enqueueAndForget(async () =>
                (async function (t, e) {
                  const n = ms(t),
                    i = e.query
                  let s = !1,
                    r = n.queries.get(i)
                  if ((r || ((s = !0), (r = new yh())), s))
                    try {
                      r.so = await n.onListen(i)
                    } catch (t) {
                      const n = fh(
                        t,
                        `Initialization of query '${zr(e.query)}' failed`
                      )
                      return void e.onError(n)
                    }
                  n.queries.set(i, r),
                    r.listeners.push(e),
                    e.ro(n.onlineState),
                    r.so && e.oo(r.so) && Th(n)
                })(await Zh(t), r)
              )
            })(vu(h), u, a, c)
          })(Cf, t => {
            t.docs.forEach(t => {
              Lf.push({ ...t.data(), uid: t.id })
            })
          }))
        : (qf(t), console.log('NO!, user detected'))
  }),
    $('#auth-div-on #auth-id').click(t => {
      t.preventDefault(), Vf()
    }),
    $('.telegram').click(() => {
      window.open('https://t.me/betwayx10')
    }),
    $(document).ready(() => {
      !(function () {
        var t = document.querySelector('#auth-id')
        null !== t &&
          t.addEventListener('click', t => {
            location.replace('/auth.html')
          })
        var e = document.querySelector('#sign-id')
        null !== e &&
          e.addEventListener('click', t => {
            Vf()
          })
      })(),
        null !== document.querySelector('.year') &&
          (document.querySelector('.year').innerHTML = new Date().getFullYear())
    }),
    vd(bf, t => {
      t && (t.email, (Nf = t.uid))
    }),
    $(document).ready(() => {
      document.querySelector('.send').addEventListener('click', t => {
        t.preventDefault(),
          (function () {
            var t, e, n, i
            ;(t = $('#support .username').val()),
              (e = $('#support .message').val()),
              (n = $('#support .useremail').val()),
              (i = Ff(10)),
              '' === n
                ? ($('#support').attr('value', 'enter something'),
                  Uf(
                    'Error',
                    "Please don't leave the email input field  empty",
                    '#b60b0b',
                    () => {}
                  ))
                : '' === t
                ? ($('#support').attr('value', 'enter something'),
                  Uf(
                    'Error',
                    "Please don't leave the title input field empty",
                    '#b60b0b',
                    () => {}
                  ))
                : '' === e
                ? ($('#support').attr('value', 'enter something'),
                  Uf(
                    'Error',
                    "Please don't leave the input message field empty",
                    '#b60b0b',
                    () => {}
                  ))
                : Yu(pu(kf, i), {
                    uid: Nf,
                    message: e,
                    title: t,
                    date: Date(),
                    ticket: i,
                    email: n
                  }).then(() => {
                    $('#support .username').text(''),
                      $('#support .message').text(''),
                      $('#support .useremail').text(''),
                      Uf(
                        `${i} Placed`,
                        `Your message with ticket id ${i} has been sent successfully for further assistance.`,
                        '#009e1a',
                        () => {}
                      ),
                      document.querySelector('.sendmsg').reset()
                  })
          })()
      })
    })
})()
