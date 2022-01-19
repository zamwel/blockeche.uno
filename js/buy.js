/*! For license information please see buy.js.LICENSE.txt */
;(() => {
  var e = {
      846: (e, t, n) => {
        !(function () {
          'use strict'
          var t = n(418),
            s = n(181),
            i = {
              origin: '*',
              methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
              preflightContinue: !1,
              optionsSuccessStatus: 204
            }
          function r (e) {
            return 'string' == typeof e || e instanceof String
          }
          function o (e, t) {
            if (Array.isArray(t)) {
              for (var n = 0; n < t.length; ++n) if (o(e, t[n])) return !0
              return !1
            }
            return r(t) ? e === t : t instanceof RegExp ? t.test(e) : !!t
          }
          function a (e, t) {
            var n,
              s = t.headers.origin,
              i = []
            return (
              e.origin && '*' !== e.origin
                ? r(e.origin)
                  ? (i.push([
                      { key: 'Access-Control-Allow-Origin', value: e.origin }
                    ]),
                    i.push([{ key: 'Vary', value: 'Origin' }]))
                  : ((n = o(s, e.origin)),
                    i.push([
                      { key: 'Access-Control-Allow-Origin', value: !!n && s }
                    ]),
                    i.push([{ key: 'Vary', value: 'Origin' }]))
                : i.push([{ key: 'Access-Control-Allow-Origin', value: '*' }]),
              i
            )
          }
          function c (e) {
            return !0 === e.credentials
              ? { key: 'Access-Control-Allow-Credentials', value: 'true' }
              : null
          }
          function l (e) {
            var t = e.exposedHeaders
            return t
              ? (t.join && (t = t.join(',')),
                t && t.length
                  ? { key: 'Access-Control-Expose-Headers', value: t }
                  : null)
              : null
          }
          function u (e, t) {
            for (var n = 0, i = e.length; n < i; n++) {
              var r = e[n]
              r &&
                (Array.isArray(r)
                  ? u(r, t)
                  : 'Vary' === r.key && r.value
                  ? s(t, r.value)
                  : r.value && t.setHeader(r.key, r.value))
            }
          }
          e.exports = function (e) {
            var n = null
            return (
              (n =
                'function' == typeof e
                  ? e
                  : function (t, n) {
                      n(null, e)
                    }),
              function (e, s, r) {
                n(e, function (n, o) {
                  if (n) r(n)
                  else {
                    var h = t({}, i, o),
                      d = null
                    h.origin && 'function' == typeof h.origin
                      ? (d = h.origin)
                      : h.origin &&
                        (d = function (e, t) {
                          t(null, h.origin)
                        }),
                      d
                        ? d(e.headers.origin, function (t, n) {
                            t || !n
                              ? r(t)
                              : ((h.origin = n),
                                (function (e, t, n, s) {
                                  var i = []
                                  'OPTIONS' ===
                                  (t.method &&
                                    t.method.toUpperCase &&
                                    t.method.toUpperCase())
                                    ? (i.push(a(e, t)),
                                      i.push(c(e)),
                                      i.push(
                                        (function (e) {
                                          var t = e.methods
                                          return (
                                            t.join && (t = e.methods.join(',')),
                                            {
                                              key:
                                                'Access-Control-Allow-Methods',
                                              value: t
                                            }
                                          )
                                        })(e)
                                      ),
                                      i.push(
                                        (function (e, t) {
                                          var n = e.allowedHeaders || e.headers,
                                            s = []
                                          return (
                                            n
                                              ? n.join && (n = n.join(','))
                                              : ((n =
                                                  t.headers[
                                                    'access-control-request-headers'
                                                  ]),
                                                s.push([
                                                  {
                                                    key: 'Vary',
                                                    value:
                                                      'Access-Control-Request-Headers'
                                                  }
                                                ])),
                                            n &&
                                              n.length &&
                                              s.push([
                                                {
                                                  key:
                                                    'Access-Control-Allow-Headers',
                                                  value: n
                                                }
                                              ]),
                                            s
                                          )
                                        })(e, t)
                                      ),
                                      i.push(
                                        (function (e) {
                                          var t =
                                            ('number' == typeof e.maxAge ||
                                              e.maxAge) &&
                                            e.maxAge.toString()
                                          return t && t.length
                                            ? {
                                                key: 'Access-Control-Max-Age',
                                                value: t
                                              }
                                            : null
                                        })(e)
                                      ),
                                      i.push(l(e)),
                                      u(i, n),
                                      e.preflightContinue
                                        ? s()
                                        : ((n.statusCode =
                                            e.optionsSuccessStatus),
                                          n.setHeader('Content-Length', '0'),
                                          n.end()))
                                    : (i.push(a(e, t)),
                                      i.push(c(e)),
                                      i.push(l(e)),
                                      u(i, n),
                                      s())
                                })(h, e, s, r))
                          })
                        : r()
                  }
                })
              }
            )
          }
        })()
      },
      418: e => {
        'use strict'
        var t = Object.getOwnPropertySymbols,
          n = Object.prototype.hasOwnProperty,
          s = Object.prototype.propertyIsEnumerable
        function i (e) {
          if (null == e)
            throw new TypeError(
              'Object.assign cannot be called with null or undefined'
            )
          return Object(e)
        }
        e.exports = (function () {
          try {
            if (!Object.assign) return !1
            var e = new String('abc')
            if (((e[5] = 'de'), '5' === Object.getOwnPropertyNames(e)[0]))
              return !1
            for (var t = {}, n = 0; n < 10; n++)
              t['_' + String.fromCharCode(n)] = n
            if (
              '0123456789' !==
              Object.getOwnPropertyNames(t)
                .map(function (e) {
                  return t[e]
                })
                .join('')
            )
              return !1
            var s = {}
            return (
              'abcdefghijklmnopqrst'.split('').forEach(function (e) {
                s[e] = e
              }),
              'abcdefghijklmnopqrst' ===
                Object.keys(Object.assign({}, s)).join('')
            )
          } catch (e) {
            return !1
          }
        })()
          ? Object.assign
          : function (e, r) {
              for (var o, a, c = i(e), l = 1; l < arguments.length; l++) {
                for (var u in (o = Object(arguments[l])))
                  n.call(o, u) && (c[u] = o[u])
                if (t) {
                  a = t(o)
                  for (var h = 0; h < a.length; h++)
                    s.call(o, a[h]) && (c[a[h]] = o[a[h]])
                }
              }
              return c
            }
      },
      181: e => {
        'use strict'
        ;(e.exports = function (e, t) {
          if (!e || !e.getHeader || !e.setHeader)
            throw new TypeError('res argument is required')
          var s = e.getHeader('Vary') || '',
            i = Array.isArray(s) ? s.join(', ') : String(s)
          ;(s = n(i, t)) && e.setHeader('Vary', s)
        }),
          (e.exports.append = n)
        var t = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/
        function n (e, n) {
          if ('string' != typeof e)
            throw new TypeError('header argument is required')
          if (!n) throw new TypeError('field argument is required')
          for (
            var i = Array.isArray(n) ? n : s(String(n)), r = 0;
            r < i.length;
            r++
          )
            if (!t.test(i[r]))
              throw new TypeError(
                'field argument contains an invalid header name'
              )
          if ('*' === e) return e
          var o = e,
            a = s(e.toLowerCase())
          if (-1 !== i.indexOf('*') || -1 !== a.indexOf('*')) return '*'
          for (var c = 0; c < i.length; c++) {
            var l = i[c].toLowerCase()
            ;-1 === a.indexOf(l) &&
              (a.push(l), (o = o ? o + ', ' + i[c] : i[c]))
          }
          return o
        }
        function s (e) {
          for (var t = 0, n = [], s = 0, i = 0, r = e.length; i < r; i++)
            switch (e.charCodeAt(i)) {
              case 32:
                s === t && (s = t = i + 1)
                break
              case 44:
                n.push(e.substring(s, t)), (s = t = i + 1)
                break
              default:
                t = i + 1
            }
          return n.push(e.substring(s, t)), n
        }
      }
    },
    t = {}
  function n (s) {
    var i = t[s]
    if (void 0 !== i) return i.exports
    var r = (t[s] = { exports: {} })
    return e[s](r, r.exports, n), r.exports
  }
  ;(n.g = (function () {
    if ('object' == typeof globalThis) return globalThis
    try {
      return this || new Function('return this')()
    } catch (e) {
      if ('object' == typeof window) return window
    }
  })()),
    (() => {
      'use strict'
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
        encodeByteArray (e, t) {
          if (!Array.isArray(e))
            throw Error('encodeByteArray takes an array as a parameter')
          this.init_()
          const n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
            s = []
          for (let t = 0; t < e.length; t += 3) {
            const i = e[t],
              r = t + 1 < e.length,
              o = r ? e[t + 1] : 0,
              a = t + 2 < e.length,
              c = a ? e[t + 2] : 0,
              l = i >> 2,
              u = ((3 & i) << 4) | (o >> 4)
            let h = ((15 & o) << 2) | (c >> 6),
              d = 63 & c
            a || ((d = 64), r || (h = 64)), s.push(n[l], n[u], n[h], n[d])
          }
          return s.join('')
        },
        encodeString (e, t) {
          return this.HAS_NATIVE_SUPPORT && !t
            ? btoa(e)
            : this.encodeByteArray(
                (function (e) {
                  const t = []
                  let n = 0
                  for (let s = 0; s < e.length; s++) {
                    let i = e.charCodeAt(s)
                    i < 128
                      ? (t[n++] = i)
                      : i < 2048
                      ? ((t[n++] = (i >> 6) | 192), (t[n++] = (63 & i) | 128))
                      : 55296 == (64512 & i) &&
                        s + 1 < e.length &&
                        56320 == (64512 & e.charCodeAt(s + 1))
                      ? ((i =
                          65536 +
                          ((1023 & i) << 10) +
                          (1023 & e.charCodeAt(++s))),
                        (t[n++] = (i >> 18) | 240),
                        (t[n++] = ((i >> 12) & 63) | 128),
                        (t[n++] = ((i >> 6) & 63) | 128),
                        (t[n++] = (63 & i) | 128))
                      : ((t[n++] = (i >> 12) | 224),
                        (t[n++] = ((i >> 6) & 63) | 128),
                        (t[n++] = (63 & i) | 128))
                  }
                  return t
                })(e),
                t
              )
        },
        decodeString (e, t) {
          return this.HAS_NATIVE_SUPPORT && !t
            ? atob(e)
            : (function (e) {
                const t = []
                let n = 0,
                  s = 0
                for (; n < e.length; ) {
                  const i = e[n++]
                  if (i < 128) t[s++] = String.fromCharCode(i)
                  else if (i > 191 && i < 224) {
                    const r = e[n++]
                    t[s++] = String.fromCharCode(((31 & i) << 6) | (63 & r))
                  } else if (i > 239 && i < 365) {
                    const r =
                      (((7 & i) << 18) |
                        ((63 & e[n++]) << 12) |
                        ((63 & e[n++]) << 6) |
                        (63 & e[n++])) -
                      65536
                    ;(t[s++] = String.fromCharCode(55296 + (r >> 10))),
                      (t[s++] = String.fromCharCode(56320 + (1023 & r)))
                  } else {
                    const r = e[n++],
                      o = e[n++]
                    t[s++] = String.fromCharCode(
                      ((15 & i) << 12) | ((63 & r) << 6) | (63 & o)
                    )
                  }
                }
                return t.join('')
              })(this.decodeStringToByteArray(e, t))
        },
        decodeStringToByteArray (e, t) {
          this.init_()
          const n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
            s = []
          for (let t = 0; t < e.length; ) {
            const i = n[e.charAt(t++)],
              r = t < e.length ? n[e.charAt(t)] : 0
            ++t
            const o = t < e.length ? n[e.charAt(t)] : 64
            ++t
            const a = t < e.length ? n[e.charAt(t)] : 64
            if ((++t, null == i || null == r || null == o || null == a))
              throw Error()
            const c = (i << 2) | (r >> 4)
            if ((s.push(c), 64 !== o)) {
              const e = ((r << 4) & 240) | (o >> 2)
              if ((s.push(e), 64 !== a)) {
                const e = ((o << 6) & 192) | a
                s.push(e)
              }
            }
          }
          return s
        },
        init_ () {
          if (!this.byteToCharMap_) {
            ;(this.byteToCharMap_ = {}),
              (this.charToByteMap_ = {}),
              (this.byteToCharMapWebSafe_ = {}),
              (this.charToByteMapWebSafe_ = {})
            for (let e = 0; e < this.ENCODED_VALS.length; e++)
              (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
                (this.charToByteMap_[this.byteToCharMap_[e]] = e),
                (this.byteToCharMapWebSafe_[
                  e
                ] = this.ENCODED_VALS_WEBSAFE.charAt(e)),
                (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e),
                e >= this.ENCODED_VALS_BASE.length &&
                  ((this.charToByteMap_[
                    this.ENCODED_VALS_WEBSAFE.charAt(e)
                  ] = e),
                  (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e))
          }
        }
      }
      class t {
        constructor () {
          ;(this.reject = () => {}),
            (this.resolve = () => {}),
            (this.promise = new Promise((e, t) => {
              ;(this.resolve = e), (this.reject = t)
            }))
        }
        wrapCallback (e) {
          return (t, n) => {
            t ? this.reject(t) : this.resolve(n),
              'function' == typeof e &&
                (this.promise.catch(() => {}), 1 === e.length ? e(t) : e(t, n))
          }
        }
      }
      function s () {
        return 'undefined' != typeof navigator &&
          'string' == typeof navigator.userAgent
          ? navigator.userAgent
          : ''
      }
      function i () {
        return (
          'undefined' != typeof window &&
          !!(window.cordova || window.phonegap || window.PhoneGap) &&
          /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(s())
        )
      }
      function r () {
        const e =
          'object' == typeof chrome
            ? chrome.runtime
            : 'object' == typeof browser
            ? browser.runtime
            : void 0
        return 'object' == typeof e && void 0 !== e.id
      }
      function o () {
        return (
          'object' == typeof navigator && 'ReactNative' === navigator.product
        )
      }
      function a () {
        const e = s()
        return e.indexOf('MSIE ') >= 0 || e.indexOf('Trident/') >= 0
      }
      class c extends Error {
        constructor (e, t, n) {
          super(t),
            (this.code = e),
            (this.customData = n),
            (this.name = 'FirebaseError'),
            Object.setPrototypeOf(this, c.prototype),
            Error.captureStackTrace &&
              Error.captureStackTrace(this, l.prototype.create)
        }
      }
      class l {
        constructor (e, t, n) {
          ;(this.service = e), (this.serviceName = t), (this.errors = n)
        }
        create (e, ...t) {
          const n = t[0] || {},
            s = `${this.service}/${e}`,
            i = this.errors[e],
            r = i
              ? (function (e, t) {
                  return e.replace(u, (e, n) => {
                    const s = t[n]
                    return null != s ? String(s) : `<${n}?>`
                  })
                })(i, n)
              : 'Error',
            o = `${this.serviceName}: ${r} (${s}).`
          return new c(s, o, n)
        }
      }
      const u = /\{\$([^}]+)}/g
      function h (e, t) {
        if (e === t) return !0
        const n = Object.keys(e),
          s = Object.keys(t)
        for (const i of n) {
          if (!s.includes(i)) return !1
          const n = e[i],
            r = t[i]
          if (d(n) && d(r)) {
            if (!h(n, r)) return !1
          } else if (n !== r) return !1
        }
        for (const e of s) if (!n.includes(e)) return !1
        return !0
      }
      function d (e) {
        return null !== e && 'object' == typeof e
      }
      function f (e) {
        const t = []
        for (const [n, s] of Object.entries(e))
          Array.isArray(s)
            ? s.forEach(e => {
                t.push(encodeURIComponent(n) + '=' + encodeURIComponent(e))
              })
            : t.push(encodeURIComponent(n) + '=' + encodeURIComponent(s))
        return t.length ? '&' + t.join('&') : ''
      }
      function p (e) {
        const t = {}
        return (
          e
            .replace(/^\?/, '')
            .split('&')
            .forEach(e => {
              if (e) {
                const [n, s] = e.split('=')
                t[decodeURIComponent(n)] = decodeURIComponent(s)
              }
            }),
          t
        )
      }
      function m (e) {
        const t = e.indexOf('?')
        if (!t) return ''
        const n = e.indexOf('#', t)
        return e.substring(t, n > 0 ? n : void 0)
      }
      class g {
        constructor (e, t) {
          ;(this.observers = []),
            (this.unsubscribes = []),
            (this.observerCount = 0),
            (this.task = Promise.resolve()),
            (this.finalized = !1),
            (this.onNoObservers = t),
            this.task
              .then(() => {
                e(this)
              })
              .catch(e => {
                this.error(e)
              })
        }
        next (e) {
          this.forEachObserver(t => {
            t.next(e)
          })
        }
        error (e) {
          this.forEachObserver(t => {
            t.error(e)
          }),
            this.close(e)
        }
        complete () {
          this.forEachObserver(e => {
            e.complete()
          }),
            this.close()
        }
        subscribe (e, t, n) {
          let s
          if (void 0 === e && void 0 === t && void 0 === n)
            throw new Error('Missing Observer.')
          ;(s = (function (e, t) {
            if ('object' != typeof e || null === e) return !1
            for (const t of ['next', 'error', 'complete'])
              if (t in e && 'function' == typeof e[t]) return !0
            return !1
          })(e)
            ? e
            : { next: e, error: t, complete: n }),
            void 0 === s.next && (s.next = y),
            void 0 === s.error && (s.error = y),
            void 0 === s.complete && (s.complete = y)
          const i = this.unsubscribeOne.bind(this, this.observers.length)
          return (
            this.finalized &&
              this.task.then(() => {
                try {
                  this.finalError ? s.error(this.finalError) : s.complete()
                } catch (e) {}
              }),
            this.observers.push(s),
            i
          )
        }
        unsubscribeOne (e) {
          void 0 !== this.observers &&
            void 0 !== this.observers[e] &&
            (delete this.observers[e],
            (this.observerCount -= 1),
            0 === this.observerCount &&
              void 0 !== this.onNoObservers &&
              this.onNoObservers(this))
        }
        forEachObserver (e) {
          if (!this.finalized)
            for (let t = 0; t < this.observers.length; t++) this.sendOne(t, e)
        }
        sendOne (e, t) {
          this.task.then(() => {
            if (void 0 !== this.observers && void 0 !== this.observers[e])
              try {
                t(this.observers[e])
              } catch (e) {
                'undefined' != typeof console &&
                  console.error &&
                  console.error(e)
              }
          })
        }
        close (e) {
          this.finalized ||
            ((this.finalized = !0),
            void 0 !== e && (this.finalError = e),
            this.task.then(() => {
              ;(this.observers = void 0), (this.onNoObservers = void 0)
            }))
        }
      }
      function y () {}
      function v (e) {
        return e && e._delegate ? e._delegate : e
      }
      class w {
        constructor (e, t, n) {
          ;(this.name = e),
            (this.instanceFactory = t),
            (this.type = n),
            (this.multipleInstances = !1),
            (this.serviceProps = {}),
            (this.instantiationMode = 'LAZY'),
            (this.onInstanceCreated = null)
        }
        setInstantiationMode (e) {
          return (this.instantiationMode = e), this
        }
        setMultipleInstances (e) {
          return (this.multipleInstances = e), this
        }
        setServiceProps (e) {
          return (this.serviceProps = e), this
        }
        setInstanceCreatedCallback (e) {
          return (this.onInstanceCreated = e), this
        }
      }
      const I = '[DEFAULT]'
      class T {
        constructor (e, t) {
          ;(this.name = e),
            (this.container = t),
            (this.component = null),
            (this.instances = new Map()),
            (this.instancesDeferred = new Map()),
            (this.instancesOptions = new Map()),
            (this.onInitCallbacks = new Map())
        }
        get (e) {
          const n = this.normalizeInstanceIdentifier(e)
          if (!this.instancesDeferred.has(n)) {
            const e = new t()
            if (
              (this.instancesDeferred.set(n, e),
              this.isInitialized(n) || this.shouldAutoInitialize())
            )
              try {
                const t = this.getOrInitializeService({ instanceIdentifier: n })
                t && e.resolve(t)
              } catch (e) {}
          }
          return this.instancesDeferred.get(n).promise
        }
        getImmediate (e) {
          var t
          const n = this.normalizeInstanceIdentifier(
              null == e ? void 0 : e.identifier
            ),
            s =
              null !== (t = null == e ? void 0 : e.optional) &&
              void 0 !== t &&
              t
          if (!this.isInitialized(n) && !this.shouldAutoInitialize()) {
            if (s) return null
            throw Error(`Service ${this.name} is not available`)
          }
          try {
            return this.getOrInitializeService({ instanceIdentifier: n })
          } catch (e) {
            if (s) return null
            throw e
          }
        }
        getComponent () {
          return this.component
        }
        setComponent (e) {
          if (e.name !== this.name)
            throw Error(
              `Mismatching Component ${e.name} for Provider ${this.name}.`
            )
          if (this.component)
            throw Error(`Component for ${this.name} has already been provided`)
          if (((this.component = e), this.shouldAutoInitialize())) {
            if (
              (function (e) {
                return 'EAGER' === e.instantiationMode
              })(e)
            )
              try {
                this.getOrInitializeService({ instanceIdentifier: I })
              } catch (e) {}
            for (const [e, t] of this.instancesDeferred.entries()) {
              const n = this.normalizeInstanceIdentifier(e)
              try {
                const e = this.getOrInitializeService({ instanceIdentifier: n })
                t.resolve(e)
              } catch (e) {}
            }
          }
        }
        clearInstance (e = '[DEFAULT]') {
          this.instancesDeferred.delete(e),
            this.instancesOptions.delete(e),
            this.instances.delete(e)
        }
        async delete () {
          const e = Array.from(this.instances.values())
          await Promise.all([
            ...e.filter(e => 'INTERNAL' in e).map(e => e.INTERNAL.delete()),
            ...e.filter(e => '_delete' in e).map(e => e._delete())
          ])
        }
        isComponentSet () {
          return null != this.component
        }
        isInitialized (e = '[DEFAULT]') {
          return this.instances.has(e)
        }
        getOptions (e = '[DEFAULT]') {
          return this.instancesOptions.get(e) || {}
        }
        initialize (e = {}) {
          const { options: t = {} } = e,
            n = this.normalizeInstanceIdentifier(e.instanceIdentifier)
          if (this.isInitialized(n))
            throw Error(`${this.name}(${n}) has already been initialized`)
          if (!this.isComponentSet())
            throw Error(`Component ${this.name} has not been registered yet`)
          const s = this.getOrInitializeService({
            instanceIdentifier: n,
            options: t
          })
          for (const [e, t] of this.instancesDeferred.entries())
            n === this.normalizeInstanceIdentifier(e) && t.resolve(s)
          return s
        }
        onInit (e, t) {
          var n
          const s = this.normalizeInstanceIdentifier(t),
            i =
              null !== (n = this.onInitCallbacks.get(s)) && void 0 !== n
                ? n
                : new Set()
          i.add(e), this.onInitCallbacks.set(s, i)
          const r = this.instances.get(s)
          return (
            r && e(r, s),
            () => {
              i.delete(e)
            }
          )
        }
        invokeOnInitCallbacks (e, t) {
          const n = this.onInitCallbacks.get(t)
          if (n)
            for (const s of n)
              try {
                s(e, t)
              } catch (e) {}
        }
        getOrInitializeService ({ instanceIdentifier: e, options: t = {} }) {
          let n = this.instances.get(e)
          if (
            !n &&
            this.component &&
            ((n = this.component.instanceFactory(this.container, {
              instanceIdentifier: ((s = e), s === I ? void 0 : s),
              options: t
            })),
            this.instances.set(e, n),
            this.instancesOptions.set(e, t),
            this.invokeOnInitCallbacks(n, e),
            this.component.onInstanceCreated)
          )
            try {
              this.component.onInstanceCreated(this.container, e, n)
            } catch (e) {}
          var s
          return n || null
        }
        normalizeInstanceIdentifier (e = '[DEFAULT]') {
          return this.component ? (this.component.multipleInstances ? e : I) : e
        }
        shouldAutoInitialize () {
          return (
            !!this.component && 'EXPLICIT' !== this.component.instantiationMode
          )
        }
      }
      class E {
        constructor (e) {
          ;(this.name = e), (this.providers = new Map())
        }
        addComponent (e) {
          const t = this.getProvider(e.name)
          if (t.isComponentSet())
            throw new Error(
              `Component ${e.name} has already been registered with ${this.name}`
            )
          t.setComponent(e)
        }
        addOrOverwriteComponent (e) {
          this.getProvider(e.name).isComponentSet() &&
            this.providers.delete(e.name),
            this.addComponent(e)
        }
        getProvider (e) {
          if (this.providers.has(e)) return this.providers.get(e)
          const t = new T(e, this)
          return this.providers.set(e, t), t
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
        N = (e, t, ...n) => {
          if (t < e.logLevel) return
          const s = new Date().toISOString(),
            i = C[t]
          if (!i)
            throw new Error(
              `Attempted to log a message with an invalid logType (value: ${t})`
            )
          console[i](`[${s}]  ${e.name}:`, ...n)
        }
      class R {
        constructor (e) {
          ;(this.name = e),
            (this._logLevel = A),
            (this._logHandler = N),
            (this._userLogHandler = null),
            b.push(this)
        }
        get logLevel () {
          return this._logLevel
        }
        set logLevel (e) {
          if (!(e in _))
            throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``)
          this._logLevel = e
        }
        setLogLevel (e) {
          this._logLevel = 'string' == typeof e ? k[e] : e
        }
        get logHandler () {
          return this._logHandler
        }
        set logHandler (e) {
          if ('function' != typeof e)
            throw new TypeError(
              'Value assigned to `logHandler` must be a function'
            )
          this._logHandler = e
        }
        get userLogHandler () {
          return this._userLogHandler
        }
        set userLogHandler (e) {
          this._userLogHandler = e
        }
        debug (...e) {
          this._userLogHandler && this._userLogHandler(this, _.DEBUG, ...e),
            this._logHandler(this, _.DEBUG, ...e)
        }
        log (...e) {
          this._userLogHandler && this._userLogHandler(this, _.VERBOSE, ...e),
            this._logHandler(this, _.VERBOSE, ...e)
        }
        info (...e) {
          this._userLogHandler && this._userLogHandler(this, _.INFO, ...e),
            this._logHandler(this, _.INFO, ...e)
        }
        warn (...e) {
          this._userLogHandler && this._userLogHandler(this, _.WARN, ...e),
            this._logHandler(this, _.WARN, ...e)
        }
        error (...e) {
          this._userLogHandler && this._userLogHandler(this, _.ERROR, ...e),
            this._logHandler(this, _.ERROR, ...e)
        }
      }
      class D {
        constructor (e) {
          this.container = e
        }
        getPlatformInfoString () {
          return this.container
            .getProviders()
            .map(e => {
              if (
                (function (e) {
                  const t = e.getComponent()
                  return 'VERSION' === (null == t ? void 0 : t.type)
                })(e)
              ) {
                const t = e.getImmediate()
                return `${t.library}/${t.version}`
              }
              return null
            })
            .filter(e => e)
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
        x = new Map(),
        U = new Map()
      function V (e, t) {
        try {
          e.container.addComponent(t)
        } catch (n) {
          P.debug(
            `Component ${t.name} failed to register with FirebaseApp ${e.name}`,
            n
          )
        }
      }
      function F (e) {
        const t = e.name
        if (U.has(t))
          return (
            P.debug(`There were multiple attempts to register component ${t}.`),
            !1
          )
        U.set(t, e)
        for (const t of x.values()) V(t, e)
        return !0
      }
      function q (e, t) {
        return e.container.getProvider(t)
      }
      const j = new l('app', 'Firebase', {
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
        constructor (e, t, n) {
          ;(this._isDeleted = !1),
            (this._options = Object.assign({}, e)),
            (this._config = Object.assign({}, t)),
            (this._name = t.name),
            (this._automaticDataCollectionEnabled =
              t.automaticDataCollectionEnabled),
            (this._container = n),
            this.container.addComponent(new w('app', () => this, 'PUBLIC'))
        }
        get automaticDataCollectionEnabled () {
          return this.checkDestroyed(), this._automaticDataCollectionEnabled
        }
        set automaticDataCollectionEnabled (e) {
          this.checkDestroyed(), (this._automaticDataCollectionEnabled = e)
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
        set isDeleted (e) {
          this._isDeleted = e
        }
        checkDestroyed () {
          if (this.isDeleted)
            throw j.create('app-deleted', { appName: this._name })
        }
      }
      const H = '9.6.3'
      function K (e = '[DEFAULT]') {
        const t = x.get(e)
        if (!t) throw j.create('no-app', { appName: e })
        return t
      }
      function z (e, t, n) {
        var s
        let i = null !== (s = M[e]) && void 0 !== s ? s : e
        n && (i += `-${n}`)
        const r = i.match(/\s|\//),
          o = t.match(/\s|\//)
        if (r || o) {
          const e = [`Unable to register library "${i}" with version "${t}":`]
          return (
            r &&
              e.push(
                `library name "${i}" contains illegal characters (whitespace or "/")`
              ),
            r && o && e.push('and'),
            o &&
              e.push(
                `version name "${t}" contains illegal characters (whitespace or "/")`
              ),
            void P.warn(e.join(' '))
          )
        }
        F(new w(`${i}-version`, () => ({ library: i, version: t }), 'VERSION'))
      }
      F(new w('platform-logger', e => new D(e), 'PRIVATE')),
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
            : void 0 !== n.g
            ? n.g
            : 'undefined' != typeof self
            ? self
            : {},
        Q = {},
        X = X || {},
        Y = W || self
      function J () {}
      function Z (e) {
        var t = typeof e
        return (
          'array' ==
            (t =
              'object' != t
                ? t
                : e
                ? Array.isArray(e)
                  ? 'array'
                  : t
                : 'null') ||
          ('object' == t && 'number' == typeof e.length)
        )
      }
      function ee (e) {
        var t = typeof e
        return ('object' == t && null != e) || 'function' == t
      }
      var te = 'closure_uid_' + ((1e9 * Math.random()) >>> 0),
        ne = 0
      function se (e, t, n) {
        return e.call.apply(e.bind, arguments)
      }
      function ie (e, t, n) {
        if (!e) throw Error()
        if (2 < arguments.length) {
          var s = Array.prototype.slice.call(arguments, 2)
          return function () {
            var n = Array.prototype.slice.call(arguments)
            return Array.prototype.unshift.apply(n, s), e.apply(t, n)
          }
        }
        return function () {
          return e.apply(t, arguments)
        }
      }
      function re (e, t, n) {
        return (re =
          Function.prototype.bind &&
          -1 != Function.prototype.bind.toString().indexOf('native code')
            ? se
            : ie).apply(null, arguments)
      }
      function oe (e, t) {
        var n = Array.prototype.slice.call(arguments, 1)
        return function () {
          var t = n.slice()
          return t.push.apply(t, arguments), e.apply(this, t)
        }
      }
      function ae (e, t) {
        function n () {}
        ;(n.prototype = t.prototype),
          (e.Z = t.prototype),
          (e.prototype = new n()),
          (e.prototype.constructor = e),
          (e.Vb = function (e, n, s) {
            for (
              var i = Array(arguments.length - 2), r = 2;
              r < arguments.length;
              r++
            )
              i[r - 2] = arguments[r]
            return t.prototype[n].apply(e, i)
          })
      }
      function ce () {
        ;(this.s = this.s), (this.o = this.o)
      }
      var le = {}
      ;(ce.prototype.s = !1),
        (ce.prototype.na = function () {
          if (!this.s && ((this.s = !0), this.M(), 0)) {
            var e = (function (e) {
              return (
                (Object.prototype.hasOwnProperty.call(e, te) && e[te]) ||
                (e[te] = ++ne)
              )
            })(this)
            delete le[e]
          }
        }),
        (ce.prototype.M = function () {
          if (this.o) for (; this.o.length; ) this.o.shift()()
        })
      const ue = Array.prototype.indexOf
          ? function (e, t) {
              return Array.prototype.indexOf.call(e, t, void 0)
            }
          : function (e, t) {
              if ('string' == typeof e)
                return 'string' != typeof t || 1 != t.length
                  ? -1
                  : e.indexOf(t, 0)
              for (let n = 0; n < e.length; n++)
                if (n in e && e[n] === t) return n
              return -1
            },
        he = Array.prototype.forEach
          ? function (e, t, n) {
              Array.prototype.forEach.call(e, t, n)
            }
          : function (e, t, n) {
              const s = e.length,
                i = 'string' == typeof e ? e.split('') : e
              for (let r = 0; r < s; r++) r in i && t.call(n, i[r], r, e)
            }
      function de (e) {
        return Array.prototype.concat.apply([], arguments)
      }
      function fe (e) {
        const t = e.length
        if (0 < t) {
          const n = Array(t)
          for (let s = 0; s < t; s++) n[s] = e[s]
          return n
        }
        return []
      }
      function pe (e) {
        return /^[\s\xa0]*$/.test(e)
      }
      var me,
        ge = String.prototype.trim
          ? function (e) {
              return e.trim()
            }
          : function (e) {
              return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(e)[1]
            }
      function ye (e, t) {
        return -1 != e.indexOf(t)
      }
      function ve (e, t) {
        return e < t ? -1 : e > t ? 1 : 0
      }
      e: {
        var we = Y.navigator
        if (we) {
          var Ie = we.userAgent
          if (Ie) {
            me = Ie
            break e
          }
        }
        me = ''
      }
      function Te (e, t, n) {
        for (const s in e) t.call(n, e[s], s, e)
      }
      function Ee (e) {
        const t = {}
        for (const n in e) t[n] = e[n]
        return t
      }
      var be = 'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(
        ' '
      )
      function _e (e, t) {
        let n, s
        for (let t = 1; t < arguments.length; t++) {
          for (n in ((s = arguments[t]), s)) e[n] = s[n]
          for (let t = 0; t < be.length; t++)
            (n = be[t]),
              Object.prototype.hasOwnProperty.call(s, n) && (e[n] = s[n])
        }
      }
      function Se (e) {
        return Se[' '](e), e
      }
      Se[' '] = J
      var ke,
        Ae,
        Ce = ye(me, 'Opera'),
        Ne = ye(me, 'Trident') || ye(me, 'MSIE'),
        Re = ye(me, 'Edge'),
        De = Re || Ne,
        Oe =
          ye(me, 'Gecko') &&
          !(ye(me.toLowerCase(), 'webkit') && !ye(me, 'Edge')) &&
          !(ye(me, 'Trident') || ye(me, 'MSIE')) &&
          !ye(me, 'Edge'),
        Le = ye(me.toLowerCase(), 'webkit') && !ye(me, 'Edge')
      function Pe () {
        var e = Y.document
        return e ? e.documentMode : void 0
      }
      e: {
        var Me = '',
          xe =
            ((Ae = me),
            Oe
              ? /rv:([^\);]+)(\)|;)/.exec(Ae)
              : Re
              ? /Edge\/([\d\.]+)/.exec(Ae)
              : Ne
              ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(Ae)
              : Le
              ? /WebKit\/(\S+)/.exec(Ae)
              : Ce
              ? /(?:Version)[ \/]?(\S+)/.exec(Ae)
              : void 0)
        if ((xe && (Me = xe ? xe[1] : ''), Ne)) {
          var Ue = Pe()
          if (null != Ue && Ue > parseFloat(Me)) {
            ke = String(Ue)
            break e
          }
        }
        ke = Me
      }
      var Ve,
        Fe = {}
      function qe () {
        return (
          (e = Fe),
          Object.prototype.hasOwnProperty.call(e, 9)
            ? e[9]
            : (e[9] = (function () {
                let e = 0
                const t = ge(String(ke)).split('.'),
                  n = ge('9').split('.'),
                  s = Math.max(t.length, n.length)
                for (let o = 0; 0 == e && o < s; o++) {
                  var i = t[o] || '',
                    r = n[o] || ''
                  do {
                    if (
                      ((i = /(\d*)(\D*)(.*)/.exec(i) || ['', '', '', '']),
                      (r = /(\d*)(\D*)(.*)/.exec(r) || ['', '', '', '']),
                      0 == i[0].length && 0 == r[0].length)
                    )
                      break
                    ;(e =
                      ve(
                        0 == i[1].length ? 0 : parseInt(i[1], 10),
                        0 == r[1].length ? 0 : parseInt(r[1], 10)
                      ) ||
                      ve(0 == i[2].length, 0 == r[2].length) ||
                      ve(i[2], r[2])),
                      (i = i[3]),
                      (r = r[3])
                  } while (0 == e)
                }
                return 0 <= e
              })())
        )
        var e
      }
      Y.document && Ne
        ? (Ve = Pe() || parseInt(ke, 10) || void 0)
        : (Ve = void 0)
      var $e = Ve,
        je = (function () {
          if (!Y.addEventListener || !Object.defineProperty) return !1
          var e = !1,
            t = Object.defineProperty({}, 'passive', {
              get: function () {
                e = !0
              }
            })
          try {
            Y.addEventListener('test', J, t),
              Y.removeEventListener('test', J, t)
          } catch (e) {}
          return e
        })()
      function Be (e, t) {
        ;(this.type = e),
          (this.g = this.target = t),
          (this.defaultPrevented = !1)
      }
      function He (e, t) {
        if (
          (Be.call(this, e ? e.type : ''),
          (this.relatedTarget = this.g = this.target = null),
          (this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0),
          (this.key = ''),
          (this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1),
          (this.state = null),
          (this.pointerId = 0),
          (this.pointerType = ''),
          (this.i = null),
          e)
        ) {
          var n = (this.type = e.type),
            s =
              e.changedTouches && e.changedTouches.length
                ? e.changedTouches[0]
                : null
          if (
            ((this.target = e.target || e.srcElement),
            (this.g = t),
            (t = e.relatedTarget))
          ) {
            if (Oe) {
              e: {
                try {
                  Se(t.nodeName)
                  var i = !0
                  break e
                } catch (e) {}
                i = !1
              }
              i || (t = null)
            }
          } else
            'mouseover' == n
              ? (t = e.fromElement)
              : 'mouseout' == n && (t = e.toElement)
          ;(this.relatedTarget = t),
            s
              ? ((this.clientX = void 0 !== s.clientX ? s.clientX : s.pageX),
                (this.clientY = void 0 !== s.clientY ? s.clientY : s.pageY),
                (this.screenX = s.screenX || 0),
                (this.screenY = s.screenY || 0))
              : ((this.clientX = void 0 !== e.clientX ? e.clientX : e.pageX),
                (this.clientY = void 0 !== e.clientY ? e.clientY : e.pageY),
                (this.screenX = e.screenX || 0),
                (this.screenY = e.screenY || 0)),
            (this.button = e.button),
            (this.key = e.key || ''),
            (this.ctrlKey = e.ctrlKey),
            (this.altKey = e.altKey),
            (this.shiftKey = e.shiftKey),
            (this.metaKey = e.metaKey),
            (this.pointerId = e.pointerId || 0),
            (this.pointerType =
              'string' == typeof e.pointerType
                ? e.pointerType
                : Ke[e.pointerType] || ''),
            (this.state = e.state),
            (this.i = e),
            e.defaultPrevented && He.Z.h.call(this)
        }
      }
      ;(Be.prototype.h = function () {
        this.defaultPrevented = !0
      }),
        ae(He, Be)
      var Ke = { 2: 'touch', 3: 'pen', 4: 'mouse' }
      He.prototype.h = function () {
        He.Z.h.call(this)
        var e = this.i
        e.preventDefault ? e.preventDefault() : (e.returnValue = !1)
      }
      var ze = 'closure_listenable_' + ((1e6 * Math.random()) | 0),
        Ge = 0
      function We (e, t, n, s, i) {
        ;(this.listener = e),
          (this.proxy = null),
          (this.src = t),
          (this.type = n),
          (this.capture = !!s),
          (this.ia = i),
          (this.key = ++Ge),
          (this.ca = this.fa = !1)
      }
      function Qe (e) {
        ;(e.ca = !0),
          (e.listener = null),
          (e.proxy = null),
          (e.src = null),
          (e.ia = null)
      }
      function Xe (e) {
        ;(this.src = e), (this.g = {}), (this.h = 0)
      }
      function Ye (e, t) {
        var n = t.type
        if (n in e.g) {
          var s,
            i = e.g[n],
            r = ue(i, t)
          ;(s = 0 <= r) && Array.prototype.splice.call(i, r, 1),
            s && (Qe(t), 0 == e.g[n].length && (delete e.g[n], e.h--))
        }
      }
      function Je (e, t, n, s) {
        for (var i = 0; i < e.length; ++i) {
          var r = e[i]
          if (!r.ca && r.listener == t && r.capture == !!n && r.ia == s)
            return i
        }
        return -1
      }
      Xe.prototype.add = function (e, t, n, s, i) {
        var r = e.toString()
        ;(e = this.g[r]) || ((e = this.g[r] = []), this.h++)
        var o = Je(e, t, s, i)
        return (
          -1 < o
            ? ((t = e[o]), n || (t.fa = !1))
            : (((t = new We(t, this.src, r, !!s, i)).fa = n), e.push(t)),
          t
        )
      }
      var Ze = 'closure_lm_' + ((1e6 * Math.random()) | 0),
        et = {}
      function tt (e, t, n, s, i) {
        if (s && s.once) return st(e, t, n, s, i)
        if (Array.isArray(t)) {
          for (var r = 0; r < t.length; r++) tt(e, t[r], n, s, i)
          return null
        }
        return (
          (n = ut(n)),
          e && e[ze]
            ? e.N(t, n, ee(s) ? !!s.capture : !!s, i)
            : nt(e, t, n, !1, s, i)
        )
      }
      function nt (e, t, n, s, i, r) {
        if (!t) throw Error('Invalid event type')
        var o = ee(i) ? !!i.capture : !!i,
          a = ct(e)
        if ((a || (e[Ze] = a = new Xe(e)), (n = a.add(t, n, s, o, r)).proxy))
          return n
        if (
          ((s = (function () {
            var e = at
            return function t (n) {
              return e.call(t.src, t.listener, n)
            }
          })()),
          (n.proxy = s),
          (s.src = e),
          (s.listener = n),
          e.addEventListener)
        )
          je || (i = o),
            void 0 === i && (i = !1),
            e.addEventListener(t.toString(), s, i)
        else if (e.attachEvent) e.attachEvent(ot(t.toString()), s)
        else {
          if (!e.addListener || !e.removeListener)
            throw Error('addEventListener and attachEvent are unavailable.')
          e.addListener(s)
        }
        return n
      }
      function st (e, t, n, s, i) {
        if (Array.isArray(t)) {
          for (var r = 0; r < t.length; r++) st(e, t[r], n, s, i)
          return null
        }
        return (
          (n = ut(n)),
          e && e[ze]
            ? e.O(t, n, ee(s) ? !!s.capture : !!s, i)
            : nt(e, t, n, !0, s, i)
        )
      }
      function it (e, t, n, s, i) {
        if (Array.isArray(t))
          for (var r = 0; r < t.length; r++) it(e, t[r], n, s, i)
        else
          (s = ee(s) ? !!s.capture : !!s),
            (n = ut(n)),
            e && e[ze]
              ? ((e = e.i),
                (t = String(t).toString()) in e.g &&
                  -1 < (n = Je((r = e.g[t]), n, s, i)) &&
                  (Qe(r[n]),
                  Array.prototype.splice.call(r, n, 1),
                  0 == r.length && (delete e.g[t], e.h--)))
              : e &&
                (e = ct(e)) &&
                ((t = e.g[t.toString()]),
                (e = -1),
                t && (e = Je(t, n, s, i)),
                (n = -1 < e ? t[e] : null) && rt(n))
      }
      function rt (e) {
        if ('number' != typeof e && e && !e.ca) {
          var t = e.src
          if (t && t[ze]) Ye(t.i, e)
          else {
            var n = e.type,
              s = e.proxy
            t.removeEventListener
              ? t.removeEventListener(n, s, e.capture)
              : t.detachEvent
              ? t.detachEvent(ot(n), s)
              : t.addListener && t.removeListener && t.removeListener(s),
              (n = ct(t))
                ? (Ye(n, e), 0 == n.h && ((n.src = null), (t[Ze] = null)))
                : Qe(e)
          }
        }
      }
      function ot (e) {
        return e in et ? et[e] : (et[e] = 'on' + e)
      }
      function at (e, t) {
        if (e.ca) e = !0
        else {
          t = new He(t, this)
          var n = e.listener,
            s = e.ia || e.src
          e.fa && rt(e), (e = n.call(s, t))
        }
        return e
      }
      function ct (e) {
        return (e = e[Ze]) instanceof Xe ? e : null
      }
      var lt = '__closure_events_fn_' + ((1e9 * Math.random()) >>> 0)
      function ut (e) {
        return 'function' == typeof e
          ? e
          : (e[lt] ||
              (e[lt] = function (t) {
                return e.handleEvent(t)
              }),
            e[lt])
      }
      function ht () {
        ce.call(this), (this.i = new Xe(this)), (this.P = this), (this.I = null)
      }
      function dt (e, t) {
        var n,
          s = e.I
        if (s) for (n = []; s; s = s.I) n.push(s)
        if (((e = e.P), (s = t.type || t), 'string' == typeof t))
          t = new Be(t, e)
        else if (t instanceof Be) t.target = t.target || e
        else {
          var i = t
          _e((t = new Be(s, e)), i)
        }
        if (((i = !0), n))
          for (var r = n.length - 1; 0 <= r; r--) {
            var o = (t.g = n[r])
            i = ft(o, s, !0, t) && i
          }
        if (
          ((i = ft((o = t.g = e), s, !0, t) && i),
          (i = ft(o, s, !1, t) && i),
          n)
        )
          for (r = 0; r < n.length; r++) i = ft((o = t.g = n[r]), s, !1, t) && i
      }
      function ft (e, t, n, s) {
        if (!(t = e.i.g[String(t)])) return !0
        t = t.concat()
        for (var i = !0, r = 0; r < t.length; ++r) {
          var o = t[r]
          if (o && !o.ca && o.capture == n) {
            var a = o.listener,
              c = o.ia || o.src
            o.fa && Ye(e.i, o), (i = !1 !== a.call(c, s) && i)
          }
        }
        return i && !s.defaultPrevented
      }
      ae(ht, ce),
        (ht.prototype[ze] = !0),
        (ht.prototype.removeEventListener = function (e, t, n, s) {
          it(this, e, t, n, s)
        }),
        (ht.prototype.M = function () {
          if ((ht.Z.M.call(this), this.i)) {
            var e,
              t = this.i
            for (e in t.g) {
              for (var n = t.g[e], s = 0; s < n.length; s++) Qe(n[s])
              delete t.g[e], t.h--
            }
          }
          this.I = null
        }),
        (ht.prototype.N = function (e, t, n, s) {
          return this.i.add(String(e), t, !1, n, s)
        }),
        (ht.prototype.O = function (e, t, n, s) {
          return this.i.add(String(e), t, !0, n, s)
        })
      var pt = Y.JSON.stringify
      function mt () {
        var e = Et
        let t = null
        return (
          e.g &&
            ((t = e.g), (e.g = e.g.next), e.g || (e.h = null), (t.next = null)),
          t
        )
      }
      var gt,
        yt = new (class {
          constructor (e, t) {
            ;(this.i = e), (this.j = t), (this.h = 0), (this.g = null)
          }
          get () {
            let e
            return (
              0 < this.h
                ? (this.h--, (e = this.g), (this.g = e.next), (e.next = null))
                : (e = this.i()),
              e
            )
          }
        })(
          () => new vt(),
          e => e.reset()
        )
      class vt {
        constructor () {
          this.next = this.g = this.h = null
        }
        set (e, t) {
          ;(this.h = e), (this.g = t), (this.next = null)
        }
        reset () {
          this.next = this.g = this.h = null
        }
      }
      function wt (e) {
        Y.setTimeout(() => {
          throw e
        }, 0)
      }
      function It (e, t) {
        gt ||
          (function () {
            var e = Y.Promise.resolve(void 0)
            gt = function () {
              e.then(bt)
            }
          })(),
          Tt || (gt(), (Tt = !0)),
          Et.add(e, t)
      }
      var Tt = !1,
        Et = new (class {
          constructor () {
            this.h = this.g = null
          }
          add (e, t) {
            const n = yt.get()
            n.set(e, t), this.h ? (this.h.next = n) : (this.g = n), (this.h = n)
          }
        })()
      function bt () {
        for (var e; (e = mt()); ) {
          try {
            e.h.call(e.g)
          } catch (e) {
            wt(e)
          }
          var t = yt
          t.j(e), 100 > t.h && (t.h++, (e.next = t.g), (t.g = e))
        }
        Tt = !1
      }
      function _t (e, t) {
        ht.call(this),
          (this.h = e || 1),
          (this.g = t || Y),
          (this.j = re(this.kb, this)),
          (this.l = Date.now())
      }
      function St (e) {
        ;(e.da = !1), e.S && (e.g.clearTimeout(e.S), (e.S = null))
      }
      function kt (e, t, n) {
        if ('function' == typeof e) n && (e = re(e, n))
        else {
          if (!e || 'function' != typeof e.handleEvent)
            throw Error('Invalid listener argument')
          e = re(e.handleEvent, e)
        }
        return 2147483647 < Number(t) ? -1 : Y.setTimeout(e, t || 0)
      }
      function At (e) {
        e.g = kt(() => {
          ;(e.g = null), e.i && ((e.i = !1), At(e))
        }, e.j)
        const t = e.h
        ;(e.h = null), e.m.apply(null, t)
      }
      ae(_t, ht),
        ((G = _t.prototype).da = !1),
        (G.S = null),
        (G.kb = function () {
          if (this.da) {
            var e = Date.now() - this.l
            0 < e && e < 0.8 * this.h
              ? (this.S = this.g.setTimeout(this.j, this.h - e))
              : (this.S && (this.g.clearTimeout(this.S), (this.S = null)),
                dt(this, 'tick'),
                this.da && (St(this), this.start()))
          }
        }),
        (G.start = function () {
          ;(this.da = !0),
            this.S ||
              ((this.S = this.g.setTimeout(this.j, this.h)),
              (this.l = Date.now()))
        }),
        (G.M = function () {
          _t.Z.M.call(this), St(this), delete this.g
        })
      class Ct extends ce {
        constructor (e, t) {
          super(),
            (this.m = e),
            (this.j = t),
            (this.h = null),
            (this.i = !1),
            (this.g = null)
        }
        l (e) {
          ;(this.h = arguments), this.g ? (this.i = !0) : At(this)
        }
        M () {
          super.M(),
            this.g &&
              (Y.clearTimeout(this.g),
              (this.g = null),
              (this.i = !1),
              (this.h = null))
        }
      }
      function Nt (e) {
        ce.call(this), (this.h = e), (this.g = {})
      }
      ae(Nt, ce)
      var Rt = []
      function Dt (e, t, n, s) {
        Array.isArray(n) || (n && (Rt[0] = n.toString()), (n = Rt))
        for (var i = 0; i < n.length; i++) {
          var r = tt(t, n[i], s || e.handleEvent, !1, e.h || e)
          if (!r) break
          e.g[r.key] = r
        }
      }
      function Ot (e) {
        Te(
          e.g,
          function (e, t) {
            this.g.hasOwnProperty(t) && rt(e)
          },
          e
        ),
          (e.g = {})
      }
      function Lt () {
        this.g = !0
      }
      function Pt (e, t, n, s) {
        e.info(function () {
          return (
            'XMLHTTP TEXT (' +
            t +
            '): ' +
            (function (e, t) {
              if (!e.g) return t
              if (!t) return null
              try {
                var n = JSON.parse(t)
                if (n)
                  for (e = 0; e < n.length; e++)
                    if (Array.isArray(n[e])) {
                      var s = n[e]
                      if (!(2 > s.length)) {
                        var i = s[1]
                        if (Array.isArray(i) && !(1 > i.length)) {
                          var r = i[0]
                          if ('noop' != r && 'stop' != r && 'close' != r)
                            for (var o = 1; o < i.length; o++) i[o] = ''
                        }
                      }
                    }
                return pt(n)
              } catch (e) {
                return t
              }
            })(e, n) +
            (s ? ' ' + s : '')
          )
        })
      }
      ;(Nt.prototype.M = function () {
        Nt.Z.M.call(this), Ot(this)
      }),
        (Nt.prototype.handleEvent = function () {
          throw Error('EventHandler.handleEvent not implemented')
        }),
        (Lt.prototype.Aa = function () {
          this.g = !1
        }),
        (Lt.prototype.info = function () {})
      var Mt = {},
        xt = null
      function Ut () {
        return (xt = xt || new ht())
      }
      function Vt (e) {
        Be.call(this, Mt.Ma, e)
      }
      function Ft (e) {
        const t = Ut()
        dt(t, new Vt(t, e))
      }
      function qt (e, t) {
        Be.call(this, Mt.STAT_EVENT, e), (this.stat = t)
      }
      function $t (e) {
        const t = Ut()
        dt(t, new qt(t, e))
      }
      function jt (e, t) {
        Be.call(this, Mt.Na, e), (this.size = t)
      }
      function Bt (e, t) {
        if ('function' != typeof e)
          throw Error('Fn must not be null and must be a function')
        return Y.setTimeout(function () {
          e()
        }, t)
      }
      ;(Mt.Ma = 'serverreachability'),
        ae(Vt, Be),
        (Mt.STAT_EVENT = 'statevent'),
        ae(qt, Be),
        (Mt.Na = 'timingevent'),
        ae(jt, Be)
      var Ht = {
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
        Kt = {
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
      function zt () {}
      function Gt (e) {
        return e.h || (e.h = e.i())
      }
      function Wt () {}
      zt.prototype.h = null
      var Qt,
        Xt = { OPEN: 'a', pb: 'b', Ka: 'c', Bb: 'd' }
      function Yt () {
        Be.call(this, 'd')
      }
      function Jt () {
        Be.call(this, 'c')
      }
      function Zt () {}
      function en (e, t, n, s) {
        ;(this.l = e),
          (this.j = t),
          (this.m = n),
          (this.X = s || 1),
          (this.V = new Nt(this)),
          (this.P = nn),
          (e = De ? 125 : void 0),
          (this.W = new _t(e)),
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
          (this.h = new tn())
      }
      function tn () {
        ;(this.i = null), (this.g = ''), (this.h = !1)
      }
      ae(Yt, Be),
        ae(Jt, Be),
        ae(Zt, zt),
        (Zt.prototype.g = function () {
          return new XMLHttpRequest()
        }),
        (Zt.prototype.i = function () {
          return {}
        }),
        (Qt = new Zt())
      var nn = 45e3,
        sn = {},
        rn = {}
      function on (e, t, n) {
        ;(e.K = 1), (e.v = Nn(bn(t))), (e.s = n), (e.U = !0), an(e, null)
      }
      function an (e, t) {
        ;(e.F = Date.now()), hn(e), (e.A = bn(e.v))
        var n = e.A,
          s = e.X
        Array.isArray(s) || (s = [String(s)]),
          jn(n.h, 't', s),
          (e.C = 0),
          (n = e.l.H),
          (e.h = new tn()),
          (e.g = js(e.l, n ? t : null, !e.s)),
          0 < e.O && (e.L = new Ct(re(e.Ia, e, e.g), e.O)),
          Dt(e.V, e.g, 'readystatechange', e.gb),
          (t = e.H ? Ee(e.H) : {}),
          e.s
            ? (e.u || (e.u = 'POST'),
              (t['Content-Type'] = 'application/x-www-form-urlencoded'),
              e.g.ea(e.A, e.u, e.s, t))
            : ((e.u = 'GET'), e.g.ea(e.A, e.u, null, t)),
          Ft(1),
          (function (e, t, n, s, i, r) {
            e.info(function () {
              if (e.g)
                if (r)
                  for (var o = '', a = r.split('&'), c = 0; c < a.length; c++) {
                    var l = a[c].split('=')
                    if (1 < l.length) {
                      var u = l[0]
                      l = l[1]
                      var h = u.split('_')
                      o =
                        2 <= h.length && 'type' == h[1]
                          ? o + (u + '=') + l + '&'
                          : o + (u + '=redacted&')
                    }
                  }
                else o = null
              else o = r
              return (
                'XMLHTTP REQ (' +
                s +
                ') [attempt ' +
                i +
                ']: ' +
                t +
                '\n' +
                n +
                '\n' +
                o
              )
            })
          })(e.j, e.u, e.A, e.m, e.X, e.s)
      }
      function cn (e) {
        return !!e.g && 'GET' == e.u && 2 != e.K && e.l.Ba
      }
      function ln (e, t, n) {
        let s,
          i = !0
        for (; !e.I && e.C < n.length; ) {
          if (((s = un(e, n)), s == rn)) {
            4 == t && ((e.o = 4), $t(14), (i = !1)),
              Pt(e.j, e.m, null, '[Incomplete Response]')
            break
          }
          if (s == sn) {
            ;(e.o = 4), $t(15), Pt(e.j, e.m, n, '[Invalid Chunk]'), (i = !1)
            break
          }
          Pt(e.j, e.m, s, null), gn(e, s)
        }
        cn(e) && s != rn && s != sn && ((e.h.g = ''), (e.C = 0)),
          4 != t || 0 != n.length || e.h.h || ((e.o = 1), $t(16), (i = !1)),
          (e.i = e.i && i),
          i
            ? 0 < n.length &&
              !e.aa &&
              ((e.aa = !0),
              (t = e.l).g == e &&
                t.$ &&
                !t.L &&
                (t.h.info(
                  'Great, no buffering proxy detected. Bytes received: ' +
                    n.length
                ),
                Ps(t),
                (t.L = !0),
                $t(11)))
            : (Pt(e.j, e.m, n, '[Invalid Chunked Response]'), mn(e), pn(e))
      }
      function un (e, t) {
        var n = e.C,
          s = t.indexOf('\n', n)
        return -1 == s
          ? rn
          : ((n = Number(t.substring(n, s))),
            isNaN(n)
              ? sn
              : (s += 1) + n > t.length
              ? rn
              : ((t = t.substr(s, n)), (e.C = s + n), t))
      }
      function hn (e) {
        ;(e.Y = Date.now() + e.P), dn(e, e.P)
      }
      function dn (e, t) {
        if (null != e.B) throw Error('WatchDog timer not null')
        e.B = Bt(re(e.eb, e), t)
      }
      function fn (e) {
        e.B && (Y.clearTimeout(e.B), (e.B = null))
      }
      function pn (e) {
        0 == e.l.G || e.I || Us(e.l, e)
      }
      function mn (e) {
        fn(e)
        var t = e.L
        t && 'function' == typeof t.na && t.na(),
          (e.L = null),
          St(e.W),
          Ot(e.V),
          e.g && ((t = e.g), (e.g = null), t.abort(), t.na())
      }
      function gn (e, t) {
        try {
          var n = e.l
          if (0 != n.G && (n.g == e || Wn(n.i, e)))
            if (((n.I = e.N), !e.J && Wn(n.i, e) && 3 == n.G)) {
              try {
                var s = n.Ca.g.parse(t)
              } catch (e) {
                s = null
              }
              if (Array.isArray(s) && 3 == s.length) {
                var i = s
                if (0 == i[0]) {
                  e: if (!n.u) {
                    if (n.g) {
                      if (!(n.g.F + 3e3 < e.F)) break e
                      xs(n), Ss(n)
                    }
                    Ls(n), $t(18)
                  }
                } else
                  (n.ta = i[1]),
                    0 < n.ta - n.U &&
                      37500 > i[2] &&
                      n.N &&
                      0 == n.A &&
                      !n.v &&
                      (n.v = Bt(re(n.ab, n), 6e3))
                if (1 >= Gn(n.i) && n.ka) {
                  try {
                    n.ka()
                  } catch (e) {}
                  n.ka = void 0
                }
              } else Fs(n, 11)
            } else if (((e.J || n.g == e) && xs(n), !pe(t)))
              for (i = n.Ca.g.parse(t), t = 0; t < i.length; t++) {
                let l = i[t]
                if (((n.U = l[0]), (l = l[1]), 2 == n.G))
                  if ('c' == l[0]) {
                    ;(n.J = l[1]), (n.la = l[2])
                    const t = l[3]
                    null != t && ((n.ma = t), n.h.info('VER=' + n.ma))
                    const i = l[4]
                    null != i && ((n.za = i), n.h.info('SVER=' + n.za))
                    const u = l[5]
                    null != u &&
                      'number' == typeof u &&
                      0 < u &&
                      ((s = 1.5 * u),
                      (n.K = s),
                      n.h.info('backChannelRequestTimeoutMs_=' + s)),
                      (s = n)
                    const h = e.g
                    if (h) {
                      const e = h.g
                        ? h.g.getResponseHeader('X-Client-Wire-Protocol')
                        : null
                      if (e) {
                        var r = s.i
                        !r.g &&
                          (ye(e, 'spdy') || ye(e, 'quic') || ye(e, 'h2')) &&
                          ((r.j = r.l),
                          (r.g = new Set()),
                          r.h && (Qn(r, r.h), (r.h = null)))
                      }
                      if (s.D) {
                        const e = h.g
                          ? h.g.getResponseHeader('X-HTTP-Session-Id')
                          : null
                        e && ((s.sa = e), Cn(s.F, s.D, e))
                      }
                    }
                    ;(n.G = 3),
                      n.j && n.j.xa(),
                      n.$ &&
                        ((n.O = Date.now() - e.F),
                        n.h.info('Handshake RTT: ' + n.O + 'ms'))
                    var o = e
                    if ((((s = n).oa = $s(s, s.H ? s.la : null, s.W)), o.J)) {
                      Xn(s.i, o)
                      var a = o,
                        c = s.K
                      c && a.setTimeout(c), a.B && (fn(a), hn(a)), (s.g = o)
                    } else Os(s)
                    0 < n.l.length && Cs(n)
                  } else ('stop' != l[0] && 'close' != l[0]) || Fs(n, 7)
                else
                  3 == n.G &&
                    ('stop' == l[0] || 'close' == l[0]
                      ? 'stop' == l[0]
                        ? Fs(n, 7)
                        : _s(n)
                      : 'noop' != l[0] && n.j && n.j.wa(l),
                    (n.A = 0))
              }
          Ft(4)
        } catch (e) {}
      }
      function yn (e, t) {
        if (e.forEach && 'function' == typeof e.forEach) e.forEach(t, void 0)
        else if (Z(e) || 'string' == typeof e) he(e, t, void 0)
        else {
          if (e.T && 'function' == typeof e.T) var n = e.T()
          else if (e.R && 'function' == typeof e.R) n = void 0
          else if (Z(e) || 'string' == typeof e) {
            n = []
            for (var s = e.length, i = 0; i < s; i++) n.push(i)
          } else for (i in ((n = []), (s = 0), e)) n[s++] = i
          ;(s = (function (e) {
            if (e.R && 'function' == typeof e.R) return e.R()
            if ('string' == typeof e) return e.split('')
            if (Z(e)) {
              for (var t = [], n = e.length, s = 0; s < n; s++) t.push(e[s])
              return t
            }
            for (s in ((t = []), (n = 0), e)) t[n++] = e[s]
            return t
          })(e)),
            (i = s.length)
          for (var r = 0; r < i; r++) t.call(void 0, s[r], n && n[r], e)
        }
      }
      function vn (e, t) {
        ;(this.h = {}), (this.g = []), (this.i = 0)
        var n = arguments.length
        if (1 < n) {
          if (n % 2) throw Error('Uneven number of arguments')
          for (var s = 0; s < n; s += 2)
            this.set(arguments[s], arguments[s + 1])
        } else if (e)
          if (e instanceof vn)
            for (n = e.T(), s = 0; s < n.length; s++)
              this.set(n[s], e.get(n[s]))
          else for (s in e) this.set(s, e[s])
      }
      function wn (e) {
        if (e.i != e.g.length) {
          for (var t = 0, n = 0; t < e.g.length; ) {
            var s = e.g[t]
            In(e.h, s) && (e.g[n++] = s), t++
          }
          e.g.length = n
        }
        if (e.i != e.g.length) {
          var i = {}
          for (n = t = 0; t < e.g.length; )
            In(i, (s = e.g[t])) || ((e.g[n++] = s), (i[s] = 1)), t++
          e.g.length = n
        }
      }
      function In (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
      }
      ;((G = en.prototype).setTimeout = function (e) {
        this.P = e
      }),
        (G.gb = function (e) {
          e = e.target
          const t = this.L
          t && 3 == ws(e) ? t.l() : this.Ia(e)
        }),
        (G.Ia = function (e) {
          try {
            if (e == this.g)
              e: {
                const u = ws(this.g)
                var t = this.g.Da()
                const h = this.g.ba()
                if (
                  !(3 > u) &&
                  (3 != u ||
                    De ||
                    (this.g && (this.h.h || this.g.ga() || Is(this.g))))
                ) {
                  this.I || 4 != u || 7 == t || Ft(8 == t || 0 >= h ? 3 : 2),
                    fn(this)
                  var n = this.g.ba()
                  this.N = n
                  t: if (cn(this)) {
                    var s = Is(this.g)
                    e = ''
                    var i = s.length,
                      r = 4 == ws(this.g)
                    if (!this.h.i) {
                      if ('undefined' == typeof TextDecoder) {
                        mn(this), pn(this)
                        var o = ''
                        break t
                      }
                      this.h.i = new Y.TextDecoder()
                    }
                    for (t = 0; t < i; t++)
                      (this.h.h = !0),
                        (e += this.h.i.decode(s[t], {
                          stream: r && t == i - 1
                        }))
                    s.splice(0, i),
                      (this.h.g += e),
                      (this.C = 0),
                      (o = this.h.g)
                  } else o = this.g.ga()
                  if (
                    ((this.i = 200 == n),
                    (function (e, t, n, s, i, r, o) {
                      e.info(function () {
                        return (
                          'XMLHTTP RESP (' +
                          s +
                          ') [ attempt ' +
                          i +
                          ']: ' +
                          t +
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
                      t: {
                        if (this.g) {
                          var a,
                            c = this.g
                          if (
                            (a = c.g
                              ? c.g.getResponseHeader('X-HTTP-Initial-Response')
                              : null) &&
                            !pe(a)
                          ) {
                            var l = a
                            break t
                          }
                        }
                        l = null
                      }
                      if (!(n = l)) {
                        ;(this.i = !1), (this.o = 3), $t(12), mn(this), pn(this)
                        break e
                      }
                      Pt(
                        this.j,
                        this.m,
                        n,
                        'Initial handshake response via X-HTTP-Initial-Response'
                      ),
                        (this.J = !0),
                        gn(this, n)
                    }
                    this.U
                      ? (ln(this, u, o),
                        De &&
                          this.i &&
                          3 == u &&
                          (Dt(this.V, this.W, 'tick', this.fb), this.W.start()))
                      : (Pt(this.j, this.m, o, null), gn(this, o)),
                      4 == u && mn(this),
                      this.i &&
                        !this.I &&
                        (4 == u ? Us(this.l, this) : ((this.i = !1), hn(this)))
                  } else
                    400 == n && 0 < o.indexOf('Unknown SID')
                      ? ((this.o = 3), $t(12))
                      : ((this.o = 0), $t(13)),
                      mn(this),
                      pn(this)
                }
              }
          } catch (e) {}
        }),
        (G.fb = function () {
          if (this.g) {
            var e = ws(this.g),
              t = this.g.ga()
            this.C < t.length &&
              (fn(this), ln(this, e, t), this.i && 4 != e && hn(this))
          }
        }),
        (G.cancel = function () {
          ;(this.I = !0), mn(this)
        }),
        (G.eb = function () {
          this.B = null
          const e = Date.now()
          0 <= e - this.Y
            ? ((function (e, t) {
                e.info(function () {
                  return 'TIMEOUT: ' + t
                })
              })(this.j, this.A),
              2 != this.K && (Ft(3), $t(17)),
              mn(this),
              (this.o = 2),
              pn(this))
            : dn(this, this.Y - e)
        }),
        ((G = vn.prototype).R = function () {
          wn(this)
          for (var e = [], t = 0; t < this.g.length; t++)
            e.push(this.h[this.g[t]])
          return e
        }),
        (G.T = function () {
          return wn(this), this.g.concat()
        }),
        (G.get = function (e, t) {
          return In(this.h, e) ? this.h[e] : t
        }),
        (G.set = function (e, t) {
          In(this.h, e) || (this.i++, this.g.push(e)), (this.h[e] = t)
        }),
        (G.forEach = function (e, t) {
          for (var n = this.T(), s = 0; s < n.length; s++) {
            var i = n[s],
              r = this.get(i)
            e.call(t, r, i, this)
          }
        })
      var Tn = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/
      function En (e, t) {
        if (
          ((this.i = this.s = this.j = ''),
          (this.m = null),
          (this.o = this.l = ''),
          (this.g = !1),
          e instanceof En)
        ) {
          ;(this.g = void 0 !== t ? t : e.g),
            _n(this, e.j),
            (this.s = e.s),
            Sn(this, e.i),
            kn(this, e.m),
            (this.l = e.l),
            (t = e.h)
          var n = new Vn()
          ;(n.i = t.i),
            t.g && ((n.g = new vn(t.g)), (n.h = t.h)),
            An(this, n),
            (this.o = e.o)
        } else
          e && (n = String(e).match(Tn))
            ? ((this.g = !!t),
              _n(this, n[1] || '', !0),
              (this.s = Rn(n[2] || '')),
              Sn(this, n[3] || '', !0),
              kn(this, n[4]),
              (this.l = Rn(n[5] || '', !0)),
              An(this, n[6] || '', !0),
              (this.o = Rn(n[7] || '')))
            : ((this.g = !!t), (this.h = new Vn(null, this.g)))
      }
      function bn (e) {
        return new En(e)
      }
      function _n (e, t, n) {
        ;(e.j = n ? Rn(t, !0) : t), e.j && (e.j = e.j.replace(/:$/, ''))
      }
      function Sn (e, t, n) {
        e.i = n ? Rn(t, !0) : t
      }
      function kn (e, t) {
        if (t) {
          if (((t = Number(t)), isNaN(t) || 0 > t))
            throw Error('Bad port number ' + t)
          e.m = t
        } else e.m = null
      }
      function An (e, t, n) {
        t instanceof Vn
          ? ((e.h = t),
            (function (e, t) {
              t &&
                !e.j &&
                (Fn(e),
                (e.i = null),
                e.g.forEach(function (e, t) {
                  var n = t.toLowerCase()
                  t != n && (qn(this, t), jn(this, n, e))
                }, e)),
                (e.j = t)
            })(e.h, e.g))
          : (n || (t = Dn(t, xn)), (e.h = new Vn(t, e.g)))
      }
      function Cn (e, t, n) {
        e.h.set(t, n)
      }
      function Nn (e) {
        return (
          Cn(
            e,
            'zx',
            Math.floor(2147483648 * Math.random()).toString(36) +
              Math.abs(
                Math.floor(2147483648 * Math.random()) ^ Date.now()
              ).toString(36)
          ),
          e
        )
      }
      function Rn (e, t) {
        return e
          ? t
            ? decodeURI(e.replace(/%25/g, '%2525'))
            : decodeURIComponent(e)
          : ''
      }
      function Dn (e, t, n) {
        return 'string' == typeof e
          ? ((e = encodeURI(e).replace(t, On)),
            n && (e = e.replace(/%25([0-9a-fA-F]{2})/g, '%$1')),
            e)
          : null
      }
      function On (e) {
        return (
          '%' +
          (((e = e.charCodeAt(0)) >> 4) & 15).toString(16) +
          (15 & e).toString(16)
        )
      }
      En.prototype.toString = function () {
        var e = [],
          t = this.j
        t && e.push(Dn(t, Ln, !0), ':')
        var n = this.i
        return (
          (n || 'file' == t) &&
            (e.push('//'),
            (t = this.s) && e.push(Dn(t, Ln, !0), '@'),
            e.push(
              encodeURIComponent(String(n)).replace(
                /%25([0-9a-fA-F]{2})/g,
                '%$1'
              )
            ),
            null != (n = this.m) && e.push(':', String(n))),
          (n = this.l) &&
            (this.i && '/' != n.charAt(0) && e.push('/'),
            e.push(Dn(n, '/' == n.charAt(0) ? Mn : Pn, !0))),
          (n = this.h.toString()) && e.push('?', n),
          (n = this.o) && e.push('#', Dn(n, Un)),
          e.join('')
        )
      }
      var Ln = /[#\/\?@]/g,
        Pn = /[#\?:]/g,
        Mn = /[#\?]/g,
        xn = /[#\?@]/g,
        Un = /#/g
      function Vn (e, t) {
        ;(this.h = this.g = null), (this.i = e || null), (this.j = !!t)
      }
      function Fn (e) {
        e.g ||
          ((e.g = new vn()),
          (e.h = 0),
          e.i &&
            (function (e, t) {
              if (e) {
                e = e.split('&')
                for (var n = 0; n < e.length; n++) {
                  var s = e[n].indexOf('='),
                    i = null
                  if (0 <= s) {
                    var r = e[n].substring(0, s)
                    i = e[n].substring(s + 1)
                  } else r = e[n]
                  t(r, i ? decodeURIComponent(i.replace(/\+/g, ' ')) : '')
                }
              }
            })(e.i, function (t, n) {
              e.add(decodeURIComponent(t.replace(/\+/g, ' ')), n)
            }))
      }
      function qn (e, t) {
        Fn(e),
          (t = Bn(e, t)),
          In(e.g.h, t) &&
            ((e.i = null),
            (e.h -= e.g.get(t).length),
            In((e = e.g).h, t) &&
              (delete e.h[t], e.i--, e.g.length > 2 * e.i && wn(e)))
      }
      function $n (e, t) {
        return Fn(e), (t = Bn(e, t)), In(e.g.h, t)
      }
      function jn (e, t, n) {
        qn(e, t),
          0 < n.length &&
            ((e.i = null), e.g.set(Bn(e, t), fe(n)), (e.h += n.length))
      }
      function Bn (e, t) {
        return (t = String(t)), e.j && (t = t.toLowerCase()), t
      }
      function Hn (e) {
        ;(this.l = e || Kn),
          (e = Y.PerformanceNavigationTiming
            ? 0 < (e = Y.performance.getEntriesByType('navigation')).length &&
              ('hq' == e[0].nextHopProtocol || 'h2' == e[0].nextHopProtocol)
            : !!(Y.g && Y.g.Ea && Y.g.Ea() && Y.g.Ea().Zb)),
          (this.j = e ? this.l : 1),
          (this.g = null),
          1 < this.j && (this.g = new Set()),
          (this.h = null),
          (this.i = [])
      }
      ;((G = Vn.prototype).add = function (e, t) {
        Fn(this), (this.i = null), (e = Bn(this, e))
        var n = this.g.get(e)
        return n || this.g.set(e, (n = [])), n.push(t), (this.h += 1), this
      }),
        (G.forEach = function (e, t) {
          Fn(this),
            this.g.forEach(function (n, s) {
              he(
                n,
                function (n) {
                  e.call(t, n, s, this)
                },
                this
              )
            }, this)
        }),
        (G.T = function () {
          Fn(this)
          for (
            var e = this.g.R(), t = this.g.T(), n = [], s = 0;
            s < t.length;
            s++
          )
            for (var i = e[s], r = 0; r < i.length; r++) n.push(t[s])
          return n
        }),
        (G.R = function (e) {
          Fn(this)
          var t = []
          if ('string' == typeof e)
            $n(this, e) && (t = de(t, this.g.get(Bn(this, e))))
          else {
            e = this.g.R()
            for (var n = 0; n < e.length; n++) t = de(t, e[n])
          }
          return t
        }),
        (G.set = function (e, t) {
          return (
            Fn(this),
            (this.i = null),
            $n(this, (e = Bn(this, e))) && (this.h -= this.g.get(e).length),
            this.g.set(e, [t]),
            (this.h += 1),
            this
          )
        }),
        (G.get = function (e, t) {
          return e && 0 < (e = this.R(e)).length ? String(e[0]) : t
        }),
        (G.toString = function () {
          if (this.i) return this.i
          if (!this.g) return ''
          for (var e = [], t = this.g.T(), n = 0; n < t.length; n++) {
            var s = t[n],
              i = encodeURIComponent(String(s))
            s = this.R(s)
            for (var r = 0; r < s.length; r++) {
              var o = i
              '' !== s[r] && (o += '=' + encodeURIComponent(String(s[r]))),
                e.push(o)
            }
          }
          return (this.i = e.join('&'))
        })
      var Kn = 10
      function zn (e) {
        return !!e.h || (!!e.g && e.g.size >= e.j)
      }
      function Gn (e) {
        return e.h ? 1 : e.g ? e.g.size : 0
      }
      function Wn (e, t) {
        return e.h ? e.h == t : !!e.g && e.g.has(t)
      }
      function Qn (e, t) {
        e.g ? e.g.add(t) : (e.h = t)
      }
      function Xn (e, t) {
        e.h && e.h == t ? (e.h = null) : e.g && e.g.has(t) && e.g.delete(t)
      }
      function Yn (e) {
        if (null != e.h) return e.i.concat(e.h.D)
        if (null != e.g && 0 !== e.g.size) {
          let t = e.i
          for (const n of e.g.values()) t = t.concat(n.D)
          return t
        }
        return fe(e.i)
      }
      function Jn () {}
      function Zn () {
        this.g = new Jn()
      }
      function es (e, t, n) {
        const s = n || ''
        try {
          yn(e, function (e, n) {
            let i = e
            ee(e) && (i = pt(e)), t.push(s + n + '=' + encodeURIComponent(i))
          })
        } catch (e) {
          throw (t.push(s + 'type=' + encodeURIComponent('_badmap')), e)
        }
      }
      function ts (e, t, n, s, i) {
        try {
          ;(t.onload = null),
            (t.onerror = null),
            (t.onabort = null),
            (t.ontimeout = null),
            i(s)
        } catch (e) {}
      }
      function ns (e) {
        ;(this.l = e.$b || null), (this.j = e.ib || !1)
      }
      function ss (e, t) {
        ht.call(this),
          (this.D = e),
          (this.u = t),
          (this.m = void 0),
          (this.readyState = is),
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
        if (((this.i = Yn(this)), this.h)) this.h.cancel(), (this.h = null)
        else if (this.g && 0 !== this.g.size) {
          for (const e of this.g.values()) e.cancel()
          this.g.clear()
        }
      }),
        (Jn.prototype.stringify = function (e) {
          return Y.JSON.stringify(e, void 0)
        }),
        (Jn.prototype.parse = function (e) {
          return Y.JSON.parse(e, void 0)
        }),
        ae(ns, zt),
        (ns.prototype.g = function () {
          return new ss(this.l, this.j)
        }),
        (ns.prototype.i = (function (e) {
          return function () {
            return e
          }
        })({})),
        ae(ss, ht)
      var is = 0
      function rs (e) {
        e.j
          .read()
          .then(e.Sa.bind(e))
          .catch(e.ha.bind(e))
      }
      function os (e) {
        ;(e.readyState = 4), (e.l = null), (e.j = null), (e.A = null), as(e)
      }
      function as (e) {
        e.onreadystatechange && e.onreadystatechange.call(e)
      }
      ;((G = ss.prototype).open = function (e, t) {
        if (this.readyState != is)
          throw (this.abort(), Error('Error reopening a connection'))
        ;(this.C = e), (this.B = t), (this.readyState = 1), as(this)
      }),
        (G.send = function (e) {
          if (1 != this.readyState)
            throw (this.abort(), Error('need to call open() first. '))
          this.g = !0
          const t = {
            headers: this.v,
            method: this.C,
            credentials: this.m,
            cache: void 0
          }
          e && (t.body = e),
            (this.D || Y)
              .fetch(new Request(this.B, t))
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
              ((this.g = !1), os(this)),
            (this.readyState = is)
        }),
        (G.Va = function (e) {
          if (
            this.g &&
            ((this.l = e),
            this.h ||
              ((this.status = this.l.status),
              (this.statusText = this.l.statusText),
              (this.h = e.headers),
              (this.readyState = 2),
              as(this)),
            this.g && ((this.readyState = 3), as(this), this.g))
          )
            if ('arraybuffer' === this.responseType)
              e.arrayBuffer().then(this.Ta.bind(this), this.ha.bind(this))
            else if (void 0 !== Y.ReadableStream && 'body' in e) {
              if (((this.j = e.body.getReader()), this.u)) {
                if (this.responseType)
                  throw Error(
                    'responseType must be empty for "streamBinaryChunks" mode responses.'
                  )
                this.response = []
              } else
                (this.response = this.responseText = ''),
                  (this.A = new TextDecoder())
              rs(this)
            } else e.text().then(this.Ua.bind(this), this.ha.bind(this))
        }),
        (G.Sa = function (e) {
          if (this.g) {
            if (this.u && e.value) this.response.push(e.value)
            else if (!this.u) {
              var t = e.value ? e.value : new Uint8Array(0)
              ;(t = this.A.decode(t, { stream: !e.done })) &&
                (this.response = this.responseText += t)
            }
            e.done ? os(this) : as(this), 3 == this.readyState && rs(this)
          }
        }),
        (G.Ua = function (e) {
          this.g && ((this.response = this.responseText = e), os(this))
        }),
        (G.Ta = function (e) {
          this.g && ((this.response = e), os(this))
        }),
        (G.ha = function () {
          this.g && os(this)
        }),
        (G.setRequestHeader = function (e, t) {
          this.v.append(e, t)
        }),
        (G.getResponseHeader = function (e) {
          return (this.h && this.h.get(e.toLowerCase())) || ''
        }),
        (G.getAllResponseHeaders = function () {
          if (!this.h) return ''
          const e = [],
            t = this.h.entries()
          for (var n = t.next(); !n.done; )
            (n = n.value), e.push(n[0] + ': ' + n[1]), (n = t.next())
          return e.join('\r\n')
        }),
        Object.defineProperty(ss.prototype, 'withCredentials', {
          get: function () {
            return 'include' === this.m
          },
          set: function (e) {
            this.m = e ? 'include' : 'same-origin'
          }
        })
      var cs = Y.JSON.parse
      function ls (e) {
        ht.call(this),
          (this.headers = new vn()),
          (this.u = e || null),
          (this.h = !1),
          (this.C = this.g = null),
          (this.H = ''),
          (this.m = 0),
          (this.j = ''),
          (this.l = this.F = this.v = this.D = !1),
          (this.B = 0),
          (this.A = null),
          (this.J = us),
          (this.K = this.L = !1)
      }
      ae(ls, ht)
      var us = '',
        hs = /^https?$/i,
        ds = ['POST', 'PUT']
      function fs (e) {
        return 'content-type' == e.toLowerCase()
      }
      function ps (e, t) {
        ;(e.h = !1),
          e.g && ((e.l = !0), e.g.abort(), (e.l = !1)),
          (e.j = t),
          (e.m = 5),
          ms(e),
          ys(e)
      }
      function ms (e) {
        e.D || ((e.D = !0), dt(e, 'complete'), dt(e, 'error'))
      }
      function gs (e) {
        if (e.h && void 0 !== X && (!e.C[1] || 4 != ws(e) || 2 != e.ba()))
          if (e.v && 4 == ws(e)) kt(e.Fa, 0, e)
          else if ((dt(e, 'readystatechange'), 4 == ws(e))) {
            e.h = !1
            try {
              const a = e.ba()
              e: switch (a) {
                case 200:
                case 201:
                case 202:
                case 204:
                case 206:
                case 304:
                case 1223:
                  var t = !0
                  break e
                default:
                  t = !1
              }
              var n
              if (!(n = t)) {
                var s
                if ((s = 0 === a)) {
                  var i = String(e.H).match(Tn)[1] || null
                  if (!i && Y.self && Y.self.location) {
                    var r = Y.self.location.protocol
                    i = r.substr(0, r.length - 1)
                  }
                  s = !hs.test(i ? i.toLowerCase() : '')
                }
                n = s
              }
              if (n) dt(e, 'complete'), dt(e, 'success')
              else {
                e.m = 6
                try {
                  var o = 2 < ws(e) ? e.g.statusText : ''
                } catch (e) {
                  o = ''
                }
                ;(e.j = o + ' [' + e.ba() + ']'), ms(e)
              }
            } finally {
              ys(e)
            }
          }
      }
      function ys (e, t) {
        if (e.g) {
          vs(e)
          const n = e.g,
            s = e.C[0] ? J : null
          ;(e.g = null), (e.C = null), t || dt(e, 'ready')
          try {
            n.onreadystatechange = s
          } catch (e) {}
        }
      }
      function vs (e) {
        e.g && e.K && (e.g.ontimeout = null),
          e.A && (Y.clearTimeout(e.A), (e.A = null))
      }
      function ws (e) {
        return e.g ? e.g.readyState : 0
      }
      function Is (e) {
        try {
          if (!e.g) return null
          if ('response' in e.g) return e.g.response
          switch (e.J) {
            case us:
            case 'text':
              return e.g.responseText
            case 'arraybuffer':
              if ('mozResponseArrayBuffer' in e.g)
                return e.g.mozResponseArrayBuffer
          }
          return null
        } catch (e) {
          return null
        }
      }
      function Ts (e, t, n) {
        e: {
          for (s in n) {
            var s = !1
            break e
          }
          s = !0
        }
        s ||
          ((n = (function (e) {
            let t = ''
            return (
              Te(e, function (e, n) {
                ;(t += n), (t += ':'), (t += e), (t += '\r\n')
              }),
              t
            )
          })(n)),
          'string' == typeof e
            ? null != n && encodeURIComponent(String(n))
            : Cn(e, t, n))
      }
      function Es (e, t, n) {
        return (n && n.internalChannelParams && n.internalChannelParams[e]) || t
      }
      function bs (e) {
        ;(this.za = 0),
          (this.l = []),
          (this.h = new Lt()),
          (this.la = this.oa = this.F = this.W = this.g = this.sa = this.D = this.aa = this.o = this.P = this.s = null),
          (this.Za = this.V = 0),
          (this.Xa = Es('failFast', !1, e)),
          (this.N = this.v = this.u = this.m = this.j = null),
          (this.X = !0),
          (this.I = this.ta = this.U = -1),
          (this.Y = this.A = this.C = 0),
          (this.Pa = Es('baseRetryDelayMs', 5e3, e)),
          (this.$a = Es('retryDelaySeedMs', 1e4, e)),
          (this.Ya = Es('forwardChannelMaxRetries', 2, e)),
          (this.ra = Es('forwardChannelRequestTimeoutMs', 2e4, e)),
          (this.qa = (e && e.xmlHttpFactory) || void 0),
          (this.Ba = (e && e.Yb) || !1),
          (this.K = void 0),
          (this.H = (e && e.supportsCrossDomainXhr) || !1),
          (this.J = ''),
          (this.i = new Hn(e && e.concurrentRequestLimit)),
          (this.Ca = new Zn()),
          (this.ja = (e && e.fastHandshake) || !1),
          (this.Ra = (e && e.Wb) || !1),
          e && e.Aa && this.h.Aa(),
          e && e.forceLongPolling && (this.X = !1),
          (this.$ = (!this.ja && this.X && e && e.detectBufferingProxy) || !1),
          (this.ka = void 0),
          (this.O = 0),
          (this.L = !1),
          (this.B = null),
          (this.Wa = !e || !1 !== e.Xb)
      }
      function _s (e) {
        if ((ks(e), 3 == e.G)) {
          var t = e.V++,
            n = bn(e.F)
          Cn(n, 'SID', e.J),
            Cn(n, 'RID', t),
            Cn(n, 'TYPE', 'terminate'),
            Rs(e, n),
            ((t = new en(e, e.h, t, void 0)).K = 2),
            (t.v = Nn(bn(n))),
            (n = !1),
            Y.navigator &&
              Y.navigator.sendBeacon &&
              (n = Y.navigator.sendBeacon(t.v.toString(), '')),
            !n && Y.Image && ((new Image().src = t.v), (n = !0)),
            n || ((t.g = js(t.l, null)), t.g.ea(t.v)),
            (t.F = Date.now()),
            hn(t)
        }
        qs(e)
      }
      function Ss (e) {
        e.g && (Ps(e), e.g.cancel(), (e.g = null))
      }
      function ks (e) {
        Ss(e),
          e.u && (Y.clearTimeout(e.u), (e.u = null)),
          xs(e),
          e.i.cancel(),
          e.m && ('number' == typeof e.m && Y.clearTimeout(e.m), (e.m = null))
      }
      function As (e, t) {
        e.l.push(
          new (class {
            constructor (e, t) {
              ;(this.h = e), (this.g = t)
            }
          })(e.Za++, t)
        ),
          3 == e.G && Cs(e)
      }
      function Cs (e) {
        zn(e.i) || e.m || ((e.m = !0), It(e.Ha, e), (e.C = 0))
      }
      function Ns (e, t) {
        var n
        n = t ? t.m : e.V++
        const s = bn(e.F)
        Cn(s, 'SID', e.J),
          Cn(s, 'RID', n),
          Cn(s, 'AID', e.U),
          Rs(e, s),
          e.o && e.s && Ts(s, e.o, e.s),
          (n = new en(e, e.h, n, e.C + 1)),
          null === e.o && (n.H = e.s),
          t && (e.l = t.D.concat(e.l)),
          (t = Ds(e, n, 1e3)),
          n.setTimeout(
            Math.round(0.5 * e.ra) + Math.round(0.5 * e.ra * Math.random())
          ),
          Qn(e.i, n),
          on(n, s, t)
      }
      function Rs (e, t) {
        e.j &&
          yn({}, function (e, n) {
            Cn(t, n, e)
          })
      }
      function Ds (e, t, n) {
        n = Math.min(e.l.length, n)
        var s = e.j ? re(e.j.Oa, e.j, e) : null
        e: {
          var i = e.l
          let t = -1
          for (;;) {
            const e = ['count=' + n]
            ;-1 == t
              ? 0 < n
                ? ((t = i[0].h), e.push('ofs=' + t))
                : (t = 0)
              : e.push('ofs=' + t)
            let r = !0
            for (let o = 0; o < n; o++) {
              let n = i[o].h
              const a = i[o].g
              if (((n -= t), 0 > n)) (t = Math.max(0, i[o].h - 100)), (r = !1)
              else
                try {
                  es(a, e, 'req' + n + '_')
                } catch (e) {
                  s && s(a)
                }
            }
            if (r) {
              s = e.join('&')
              break e
            }
          }
        }
        return (e = e.l.splice(0, n)), (t.D = e), s
      }
      function Os (e) {
        e.g || e.u || ((e.Y = 1), It(e.Ga, e), (e.A = 0))
      }
      function Ls (e) {
        return !(
          e.g ||
          e.u ||
          3 <= e.A ||
          (e.Y++, (e.u = Bt(re(e.Ga, e), Vs(e, e.A))), e.A++, 0)
        )
      }
      function Ps (e) {
        null != e.B && (Y.clearTimeout(e.B), (e.B = null))
      }
      function Ms (e) {
        ;(e.g = new en(e, e.h, 'rpc', e.Y)),
          null === e.o && (e.g.H = e.s),
          (e.g.O = 0)
        var t = bn(e.oa)
        Cn(t, 'RID', 'rpc'),
          Cn(t, 'SID', e.J),
          Cn(t, 'CI', e.N ? '0' : '1'),
          Cn(t, 'AID', e.U),
          Rs(e, t),
          Cn(t, 'TYPE', 'xmlhttp'),
          e.o && e.s && Ts(t, e.o, e.s),
          e.K && e.g.setTimeout(e.K)
        var n = e.g
        ;(e = e.la),
          (n.K = 1),
          (n.v = Nn(bn(t))),
          (n.s = null),
          (n.U = !0),
          an(n, e)
      }
      function xs (e) {
        null != e.v && (Y.clearTimeout(e.v), (e.v = null))
      }
      function Us (e, t) {
        var n = null
        if (e.g == t) {
          xs(e), Ps(e), (e.g = null)
          var s = 2
        } else {
          if (!Wn(e.i, t)) return
          ;(n = t.D), Xn(e.i, t), (s = 1)
        }
        if (((e.I = t.N), 0 != e.G))
          if (t.i)
            if (1 == s) {
              ;(n = t.s ? t.s.length : 0), (t = Date.now() - t.F)
              var i = e.C
              dt((s = Ut()), new jt(s, n, t, i)), Cs(e)
            } else Os(e)
          else if (
            3 == (i = t.o) ||
            (0 == i && 0 < e.I) ||
            !(
              (1 == s &&
                (function (e, t) {
                  return !(
                    Gn(e.i) >= e.i.j - (e.m ? 1 : 0) ||
                    (e.m
                      ? ((e.l = t.D.concat(e.l)), 0)
                      : 1 == e.G ||
                        2 == e.G ||
                        e.C >= (e.Xa ? 0 : e.Ya) ||
                        ((e.m = Bt(re(e.Ha, e, t), Vs(e, e.C))), e.C++, 0))
                  )
                })(e, t)) ||
              (2 == s && Ls(e))
            )
          )
            switch (
              (n && 0 < n.length && ((t = e.i), (t.i = t.i.concat(n))), i)
            ) {
              case 1:
                Fs(e, 5)
                break
              case 4:
                Fs(e, 10)
                break
              case 3:
                Fs(e, 6)
                break
              default:
                Fs(e, 2)
            }
      }
      function Vs (e, t) {
        let n = e.Pa + Math.floor(Math.random() * e.$a)
        return e.j || (n *= 2), n * t
      }
      function Fs (e, t) {
        if ((e.h.info('Error code ' + t), 2 == t)) {
          var n = null
          e.j && (n = null)
          var s = re(e.jb, e)
          n ||
            ((n = new En('//www.google.com/images/cleardot.gif')),
            (Y.location && 'http' == Y.location.protocol) || _n(n, 'https'),
            Nn(n)),
            (function (e, t) {
              const n = new Lt()
              if (Y.Image) {
                const s = new Image()
                ;(s.onload = oe(ts, n, s, 'TestLoadImage: loaded', !0, t)),
                  (s.onerror = oe(ts, n, s, 'TestLoadImage: error', !1, t)),
                  (s.onabort = oe(ts, n, s, 'TestLoadImage: abort', !1, t)),
                  (s.ontimeout = oe(ts, n, s, 'TestLoadImage: timeout', !1, t)),
                  Y.setTimeout(function () {
                    s.ontimeout && s.ontimeout()
                  }, 1e4),
                  (s.src = e)
              } else t(!1)
            })(n.toString(), s)
        } else $t(2)
        ;(e.G = 0), e.j && e.j.va(t), qs(e), ks(e)
      }
      function qs (e) {
        ;(e.G = 0),
          (e.I = -1),
          e.j &&
            ((0 == Yn(e.i).length && 0 == e.l.length) ||
              ((e.i.i.length = 0), fe(e.l), (e.l.length = 0)),
            e.j.ua())
      }
      function $s (e, t, n) {
        let s = (function (e) {
          return e instanceof En ? bn(e) : new En(e, void 0)
        })(n)
        if ('' != s.i) t && Sn(s, t + '.' + s.i), kn(s, s.m)
        else {
          const e = Y.location
          s = (function (e, t, n, s) {
            var i = new En(null, void 0)
            return (
              e && _n(i, e), t && Sn(i, t), n && kn(i, n), s && (i.l = s), i
            )
          })(e.protocol, t ? t + '.' + e.hostname : e.hostname, +e.port, n)
        }
        return (
          e.aa &&
            Te(e.aa, function (e, t) {
              Cn(s, t, e)
            }),
          (t = e.D),
          (n = e.sa),
          t && n && Cn(s, t, n),
          Cn(s, 'VER', e.ma),
          Rs(e, s),
          s
        )
      }
      function js (e, t, n) {
        if (t && !e.H)
          throw Error("Can't create secondary domain capable XhrIo object.")
        return (
          ((t =
            n && e.Ba && !e.qa ? new ls(new ns({ ib: !0 })) : new ls(e.qa)).L =
            e.H),
          t
        )
      }
      function Bs () {}
      function Hs () {
        if (Ne && !(10 <= Number($e)))
          throw Error('Environmental error: no available transport.')
      }
      function Ks (e, t) {
        ht.call(this),
          (this.g = new bs(t)),
          (this.l = e),
          (this.h = (t && t.messageUrlParams) || null),
          (e = (t && t.messageHeaders) || null),
          t &&
            t.clientProtocolHeaderRequired &&
            (e
              ? (e['X-Client-Protocol'] = 'webchannel')
              : (e = { 'X-Client-Protocol': 'webchannel' })),
          (this.g.s = e),
          (e = (t && t.initMessageHeaders) || null),
          t &&
            t.messageContentType &&
            (e
              ? (e['X-WebChannel-Content-Type'] = t.messageContentType)
              : (e = { 'X-WebChannel-Content-Type': t.messageContentType })),
          t &&
            t.ya &&
            (e
              ? (e['X-WebChannel-Client-Profile'] = t.ya)
              : (e = { 'X-WebChannel-Client-Profile': t.ya })),
          (this.g.P = e),
          (e = t && t.httpHeadersOverwriteParam) && !pe(e) && (this.g.o = e),
          (this.A = (t && t.supportsCrossDomainXhr) || !1),
          (this.v = (t && t.sendRawJson) || !1),
          (t = t && t.httpSessionIdParam) &&
            !pe(t) &&
            ((this.g.D = t),
            null !== (e = this.h) &&
              t in e &&
              t in (e = this.h) &&
              delete e[t]),
          (this.j = new Ws(this))
      }
      function zs (e) {
        Yt.call(this)
        var t = e.__sm__
        if (t) {
          e: {
            for (const n in t) {
              e = n
              break e
            }
            e = void 0
          }
          ;(this.i = e) &&
            ((e = this.i), (t = null !== t && e in t ? t[e] : void 0)),
            (this.data = t)
        } else this.data = e
      }
      function Gs () {
        Jt.call(this), (this.status = 1)
      }
      function Ws (e) {
        this.g = e
      }
      ;((G = ls.prototype).ea = function (e, t, n, s) {
        if (this.g)
          throw Error(
            '[goog.net.XhrIo] Object is active with another request=' +
              this.H +
              '; newUri=' +
              e
          )
        ;(t = t ? t.toUpperCase() : 'GET'),
          (this.H = e),
          (this.j = ''),
          (this.m = 0),
          (this.D = !1),
          (this.h = !0),
          (this.g = this.u ? this.u.g() : Qt.g()),
          (this.C = this.u ? Gt(this.u) : Gt(Qt)),
          (this.g.onreadystatechange = re(this.Fa, this))
        try {
          ;(this.F = !0), this.g.open(t, String(e), !0), (this.F = !1)
        } catch (e) {
          return void ps(this, e)
        }
        e = n || ''
        const i = new vn(this.headers)
        s &&
          yn(s, function (e, t) {
            i.set(t, e)
          }),
          (s = (function (e) {
            e: {
              var t = fs
              const n = e.length,
                s = 'string' == typeof e ? e.split('') : e
              for (let i = 0; i < n; i++)
                if (i in s && t.call(void 0, s[i], i, e)) {
                  t = i
                  break e
                }
              t = -1
            }
            return 0 > t ? null : 'string' == typeof e ? e.charAt(t) : e[t]
          })(i.T())),
          (n = Y.FormData && e instanceof Y.FormData),
          !(0 <= ue(ds, t)) ||
            s ||
            n ||
            i.set(
              'Content-Type',
              'application/x-www-form-urlencoded;charset=utf-8'
            ),
          i.forEach(function (e, t) {
            this.g.setRequestHeader(t, e)
          }, this),
          this.J && (this.g.responseType = this.J),
          'withCredentials' in this.g &&
            this.g.withCredentials !== this.L &&
            (this.g.withCredentials = this.L)
        try {
          vs(this),
            0 < this.B &&
              ((this.K = (function (e) {
                return (
                  Ne &&
                  qe() &&
                  'number' == typeof e.timeout &&
                  void 0 !== e.ontimeout
                )
              })(this.g))
                ? ((this.g.timeout = this.B),
                  (this.g.ontimeout = re(this.pa, this)))
                : (this.A = kt(this.pa, this.B, this))),
            (this.v = !0),
            this.g.send(e),
            (this.v = !1)
        } catch (e) {
          ps(this, e)
        }
      }),
        (G.pa = function () {
          void 0 !== X &&
            this.g &&
            ((this.j = 'Timed out after ' + this.B + 'ms, aborting'),
            (this.m = 8),
            dt(this, 'timeout'),
            this.abort(8))
        }),
        (G.abort = function (e) {
          this.g &&
            this.h &&
            ((this.h = !1),
            (this.l = !0),
            this.g.abort(),
            (this.l = !1),
            (this.m = e || 7),
            dt(this, 'complete'),
            dt(this, 'abort'),
            ys(this))
        }),
        (G.M = function () {
          this.g &&
            (this.h &&
              ((this.h = !1), (this.l = !0), this.g.abort(), (this.l = !1)),
            ys(this, !0)),
            ls.Z.M.call(this)
        }),
        (G.Fa = function () {
          this.s || (this.F || this.v || this.l ? gs(this) : this.cb())
        }),
        (G.cb = function () {
          gs(this)
        }),
        (G.ba = function () {
          try {
            return 2 < ws(this) ? this.g.status : -1
          } catch (e) {
            return -1
          }
        }),
        (G.ga = function () {
          try {
            return this.g ? this.g.responseText : ''
          } catch (e) {
            return ''
          }
        }),
        (G.Qa = function (e) {
          if (this.g) {
            var t = this.g.responseText
            return e && 0 == t.indexOf(e) && (t = t.substring(e.length)), cs(t)
          }
        }),
        (G.Da = function () {
          return this.m
        }),
        (G.La = function () {
          return 'string' == typeof this.j ? this.j : String(this.j)
        }),
        ((G = bs.prototype).ma = 8),
        (G.G = 1),
        (G.hb = function (e) {
          try {
            this.h.info('Origin Trials invoked: ' + e)
          } catch (e) {}
        }),
        (G.Ha = function (e) {
          if (this.m)
            if (((this.m = null), 1 == this.G)) {
              if (!e) {
                ;(this.V = Math.floor(1e5 * Math.random())), (e = this.V++)
                const i = new en(this, this.h, e, void 0)
                let r = this.s
                if (
                  (this.P && (r ? ((r = Ee(r)), _e(r, this.P)) : (r = this.P)),
                  null === this.o && (i.H = r),
                  this.ja)
                )
                  e: {
                    for (var t = 0, n = 0; n < this.l.length; n++) {
                      var s = this.l[n]
                      if (
                        void 0 ===
                        (s =
                          '__data__' in s.g &&
                          'string' == typeof (s = s.g.__data__)
                            ? s.length
                            : void 0)
                      )
                        break
                      if (4096 < (t += s)) {
                        t = n
                        break e
                      }
                      if (4096 === t || n === this.l.length - 1) {
                        t = n + 1
                        break e
                      }
                    }
                    t = 1e3
                  }
                else t = 1e3
                ;(t = Ds(this, i, t)),
                  Cn((n = bn(this.F)), 'RID', e),
                  Cn(n, 'CVER', 22),
                  this.D && Cn(n, 'X-HTTP-Session-Id', this.D),
                  Rs(this, n),
                  this.o && r && Ts(n, this.o, r),
                  Qn(this.i, i),
                  this.Ra && Cn(n, 'TYPE', 'init'),
                  this.ja
                    ? (Cn(n, '$req', t),
                      Cn(n, 'SID', 'null'),
                      (i.$ = !0),
                      on(i, n, null))
                    : on(i, n, t),
                  (this.G = 2)
              }
            } else
              3 == this.G &&
                (e ? Ns(this, e) : 0 == this.l.length || zn(this.i) || Ns(this))
        }),
        (G.Ga = function () {
          if (
            ((this.u = null),
            Ms(this),
            this.$ && !(this.L || null == this.g || 0 >= this.O))
          ) {
            var e = 2 * this.O
            this.h.info('BP detection timer enabled: ' + e),
              (this.B = Bt(re(this.bb, this), e))
          }
        }),
        (G.bb = function () {
          this.B &&
            ((this.B = null),
            this.h.info('BP detection timeout reached.'),
            this.h.info('Buffering proxy detected and switch to long-polling!'),
            (this.N = !1),
            (this.L = !0),
            $t(10),
            Ss(this),
            Ms(this))
        }),
        (G.ab = function () {
          null != this.v && ((this.v = null), Ss(this), Ls(this), $t(19))
        }),
        (G.jb = function (e) {
          e
            ? (this.h.info('Successfully pinged google.com'), $t(2))
            : (this.h.info('Failed to ping google.com'), $t(1))
        }),
        ((G = Bs.prototype).xa = function () {}),
        (G.wa = function () {}),
        (G.va = function () {}),
        (G.ua = function () {}),
        (G.Oa = function () {}),
        (Hs.prototype.g = function (e, t) {
          return new Ks(e, t)
        }),
        ae(Ks, ht),
        (Ks.prototype.m = function () {
          ;(this.g.j = this.j), this.A && (this.g.H = !0)
          var e = this.g,
            t = this.l,
            n = this.h || void 0
          e.Wa && (e.h.info('Origin Trials enabled.'), It(re(e.hb, e, t))),
            $t(0),
            (e.W = t),
            (e.aa = n || {}),
            (e.N = e.X),
            (e.F = $s(e, null, e.W)),
            Cs(e)
        }),
        (Ks.prototype.close = function () {
          _s(this.g)
        }),
        (Ks.prototype.u = function (e) {
          if ('string' == typeof e) {
            var t = {}
            ;(t.__data__ = e), As(this.g, t)
          } else
            this.v
              ? (((t = {}).__data__ = pt(e)), As(this.g, t))
              : As(this.g, e)
        }),
        (Ks.prototype.M = function () {
          ;(this.g.j = null),
            delete this.j,
            _s(this.g),
            delete this.g,
            Ks.Z.M.call(this)
        }),
        ae(zs, Yt),
        ae(Gs, Jt),
        ae(Ws, Bs),
        (Ws.prototype.xa = function () {
          dt(this.g, 'a')
        }),
        (Ws.prototype.wa = function (e) {
          dt(this.g, new zs(e))
        }),
        (Ws.prototype.va = function (e) {
          dt(this.g, new Gs(e))
        }),
        (Ws.prototype.ua = function () {
          dt(this.g, 'b')
        }),
        (Hs.prototype.createWebChannel = Hs.prototype.g),
        (Ks.prototype.send = Ks.prototype.u),
        (Ks.prototype.open = Ks.prototype.m),
        (Ks.prototype.close = Ks.prototype.close),
        (Ht.NO_ERROR = 0),
        (Ht.TIMEOUT = 8),
        (Ht.HTTP_ERROR = 6),
        (Kt.COMPLETE = 'complete'),
        (Wt.EventType = Xt),
        (Xt.OPEN = 'a'),
        (Xt.CLOSE = 'b'),
        (Xt.ERROR = 'c'),
        (Xt.MESSAGE = 'd'),
        (ht.prototype.listen = ht.prototype.N),
        (ls.prototype.listenOnce = ls.prototype.O),
        (ls.prototype.getLastError = ls.prototype.La),
        (ls.prototype.getLastErrorCode = ls.prototype.Da),
        (ls.prototype.getStatus = ls.prototype.ba),
        (ls.prototype.getResponseJson = ls.prototype.Qa),
        (ls.prototype.getResponseText = ls.prototype.ga),
        (ls.prototype.send = ls.prototype.ea)
      var Qs = (Q.createWebChannelTransport = function () {
          return new Hs()
        }),
        Xs = (Q.getStatEventTarget = function () {
          return Ut()
        }),
        Ys = (Q.ErrorCode = Ht),
        Js = (Q.EventType = Kt),
        Zs = (Q.Event = Mt),
        ei = (Q.Stat = {
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
        ti = (Q.FetchXmlHttpFactory = ns),
        ni = (Q.WebChannel = Wt),
        si = (Q.XhrIo = ls)
      const ii = '@firebase/firestore'
      class ri {
        constructor (e) {
          this.uid = e
        }
        isAuthenticated () {
          return null != this.uid
        }
        toKey () {
          return this.isAuthenticated() ? 'uid:' + this.uid : 'anonymous-user'
        }
        isEqual (e) {
          return e.uid === this.uid
        }
      }
      ;(ri.UNAUTHENTICATED = new ri(null)),
        (ri.GOOGLE_CREDENTIALS = new ri('google-credentials-uid')),
        (ri.FIRST_PARTY = new ri('first-party-uid')),
        (ri.MOCK_USER = new ri('mock-user'))
      let oi = '9.6.3'
      const ai = new R('@firebase/firestore')
      function ci () {
        return ai.logLevel
      }
      function li (e, ...t) {
        if (ai.logLevel <= _.DEBUG) {
          const n = t.map(di)
          ai.debug(`Firestore (${oi}): ${e}`, ...n)
        }
      }
      function ui (e, ...t) {
        if (ai.logLevel <= _.ERROR) {
          const n = t.map(di)
          ai.error(`Firestore (${oi}): ${e}`, ...n)
        }
      }
      function hi (e, ...t) {
        if (ai.logLevel <= _.WARN) {
          const n = t.map(di)
          ai.warn(`Firestore (${oi}): ${e}`, ...n)
        }
      }
      function di (e) {
        if ('string' == typeof e) return e
        try {
          return (t = e), JSON.stringify(t)
        } catch (t) {
          return e
        }
        var t
      }
      function fi (e = 'Unexpected state') {
        const t = `FIRESTORE (${oi}) INTERNAL ASSERTION FAILED: ` + e
        throw (ui(t), new Error(t))
      }
      function pi (e, t) {
        e || fi()
      }
      function mi (e, t) {
        return e
      }
      const gi = {
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
      class yi extends c {
        constructor (e, t) {
          super(e, t),
            (this.code = e),
            (this.message = t),
            (this.toString = () =>
              `${this.name}: [code=${this.code}]: ${this.message}`)
        }
      }
      class vi {
        constructor () {
          this.promise = new Promise((e, t) => {
            ;(this.resolve = e), (this.reject = t)
          })
        }
      }
      class wi {
        constructor (e, t) {
          ;(this.user = t),
            (this.type = 'OAuth'),
            (this.headers = new Map()),
            this.headers.set('Authorization', `Bearer ${e}`)
        }
      }
      class Ii {
        getToken () {
          return Promise.resolve(null)
        }
        invalidateToken () {}
        start (e, t) {
          e.enqueueRetryable(() => t(ri.UNAUTHENTICATED))
        }
        shutdown () {}
      }
      class Ti {
        constructor (e) {
          ;(this.t = e),
            (this.currentUser = ri.UNAUTHENTICATED),
            (this.i = 0),
            (this.forceRefresh = !1),
            (this.auth = null)
        }
        start (e, t) {
          let n = this.i
          const s = e =>
            this.i !== n ? ((n = this.i), t(e)) : Promise.resolve()
          let i = new vi()
          this.o = () => {
            this.i++,
              (this.currentUser = this.u()),
              i.resolve(),
              (i = new vi()),
              e.enqueueRetryable(() => s(this.currentUser))
          }
          const r = () => {
              const t = i
              e.enqueueRetryable(async () => {
                await t.promise, await s(this.currentUser)
              })
            },
            o = e => {
              li('FirebaseAuthCredentialsProvider', 'Auth detected'),
                (this.auth = e),
                this.auth.addAuthTokenListener(this.o),
                r()
            }
          this.t.onInit(e => o(e)),
            setTimeout(() => {
              if (!this.auth) {
                const e = this.t.getImmediate({ optional: !0 })
                e
                  ? o(e)
                  : (li(
                      'FirebaseAuthCredentialsProvider',
                      'Auth not yet detected'
                    ),
                    i.resolve(),
                    (i = new vi()))
              }
            }, 0),
            r()
        }
        getToken () {
          const e = this.i,
            t = this.forceRefresh
          return (
            (this.forceRefresh = !1),
            this.auth
              ? this.auth
                  .getToken(t)
                  .then(t =>
                    this.i !== e
                      ? (li(
                          'FirebaseAuthCredentialsProvider',
                          'getToken aborted due to token change.'
                        ),
                        this.getToken())
                      : t
                      ? (pi('string' == typeof t.accessToken),
                        new wi(t.accessToken, this.currentUser))
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
          const e = this.auth && this.auth.getUid()
          return pi(null === e || 'string' == typeof e), new ri(e)
        }
      }
      class Ei {
        constructor (e, t, n) {
          ;(this.type = 'FirstParty'),
            (this.user = ri.FIRST_PARTY),
            (this.headers = new Map()),
            this.headers.set('X-Goog-AuthUser', t)
          const s = e.auth.getAuthHeaderValueForFirstParty([])
          s && this.headers.set('Authorization', s),
            n && this.headers.set('X-Goog-Iam-Authorization-Token', n)
        }
      }
      class bi {
        constructor (e, t, n) {
          ;(this.h = e), (this.l = t), (this.m = n)
        }
        getToken () {
          return Promise.resolve(new Ei(this.h, this.l, this.m))
        }
        start (e, t) {
          e.enqueueRetryable(() => t(ri.FIRST_PARTY))
        }
        shutdown () {}
        invalidateToken () {}
      }
      class _i {
        constructor (e) {
          ;(this.value = e),
            (this.type = 'AppCheck'),
            (this.headers = new Map()),
            e &&
              e.length > 0 &&
              this.headers.set('x-firebase-appcheck', this.value)
        }
      }
      class Si {
        constructor (e) {
          ;(this.g = e), (this.forceRefresh = !1), (this.appCheck = null)
        }
        start (e, t) {
          this.o = n => {
            e.enqueueRetryable(() =>
              (e => (
                null != e.error &&
                  li(
                    'FirebaseAppCheckTokenProvider',
                    `Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`
                  ),
                t(e.token)
              ))(n)
            )
          }
          const n = e => {
            li('FirebaseAppCheckTokenProvider', 'AppCheck detected'),
              (this.appCheck = e),
              this.appCheck.addTokenListener(this.o)
          }
          this.g.onInit(e => n(e)),
            setTimeout(() => {
              if (!this.appCheck) {
                const e = this.g.getImmediate({ optional: !0 })
                e
                  ? n(e)
                  : li(
                      'FirebaseAppCheckTokenProvider',
                      'AppCheck not yet detected'
                    )
              }
            }, 0)
        }
        getToken () {
          const e = this.forceRefresh
          return (
            (this.forceRefresh = !1),
            this.appCheck
              ? this.appCheck
                  .getToken(e)
                  .then(e =>
                    e ? (pi('string' == typeof e.token), new _i(e.token)) : null
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
      class ki {
        constructor (e, t) {
          ;(this.previousValue = e),
            t &&
              ((t.sequenceNumberHandler = e => this.p(e)),
              (this.T = e => t.writeSequenceNumber(e)))
        }
        p (e) {
          return (
            (this.previousValue = Math.max(e, this.previousValue)),
            this.previousValue
          )
        }
        next () {
          const e = ++this.previousValue
          return this.T && this.T(e), e
        }
      }
      function Ai (e) {
        const t = 'undefined' != typeof self && (self.crypto || self.msCrypto),
          n = new Uint8Array(e)
        if (t && 'function' == typeof t.getRandomValues) t.getRandomValues(n)
        else for (let t = 0; t < e; t++) n[t] = Math.floor(256 * Math.random())
        return n
      }
      ki.I = -1
      class Ci {
        static A () {
          const e =
              'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            t = Math.floor(256 / e.length) * e.length
          let n = ''
          for (; n.length < 20; ) {
            const s = Ai(40)
            for (let i = 0; i < s.length; ++i)
              n.length < 20 && s[i] < t && (n += e.charAt(s[i] % e.length))
          }
          return n
        }
      }
      function Ni (e, t) {
        return e < t ? -1 : e > t ? 1 : 0
      }
      function Ri (e, t, n) {
        return e.length === t.length && e.every((e, s) => n(e, t[s]))
      }
      class Di {
        constructor (e, t) {
          if (((this.seconds = e), (this.nanoseconds = t), t < 0))
            throw new yi(
              gi.INVALID_ARGUMENT,
              'Timestamp nanoseconds out of range: ' + t
            )
          if (t >= 1e9)
            throw new yi(
              gi.INVALID_ARGUMENT,
              'Timestamp nanoseconds out of range: ' + t
            )
          if (e < -62135596800)
            throw new yi(
              gi.INVALID_ARGUMENT,
              'Timestamp seconds out of range: ' + e
            )
          if (e >= 253402300800)
            throw new yi(
              gi.INVALID_ARGUMENT,
              'Timestamp seconds out of range: ' + e
            )
        }
        static now () {
          return Di.fromMillis(Date.now())
        }
        static fromDate (e) {
          return Di.fromMillis(e.getTime())
        }
        static fromMillis (e) {
          const t = Math.floor(e / 1e3),
            n = Math.floor(1e6 * (e - 1e3 * t))
          return new Di(t, n)
        }
        toDate () {
          return new Date(this.toMillis())
        }
        toMillis () {
          return 1e3 * this.seconds + this.nanoseconds / 1e6
        }
        _compareTo (e) {
          return this.seconds === e.seconds
            ? Ni(this.nanoseconds, e.nanoseconds)
            : Ni(this.seconds, e.seconds)
        }
        isEqual (e) {
          return (
            e.seconds === this.seconds && e.nanoseconds === this.nanoseconds
          )
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
          const e = this.seconds - -62135596800
          return (
            String(e).padStart(12, '0') +
            '.' +
            String(this.nanoseconds).padStart(9, '0')
          )
        }
      }
      class Oi {
        constructor (e) {
          this.timestamp = e
        }
        static fromTimestamp (e) {
          return new Oi(e)
        }
        static min () {
          return new Oi(new Di(0, 0))
        }
        compareTo (e) {
          return this.timestamp._compareTo(e.timestamp)
        }
        isEqual (e) {
          return this.timestamp.isEqual(e.timestamp)
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
      function Li (e) {
        let t = 0
        for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t++
        return t
      }
      function Pi (e, t) {
        for (const n in e)
          Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n])
      }
      function Mi (e) {
        for (const t in e)
          if (Object.prototype.hasOwnProperty.call(e, t)) return !1
        return !0
      }
      class xi {
        constructor (e, t, n) {
          void 0 === t ? (t = 0) : t > e.length && fi(),
            void 0 === n ? (n = e.length - t) : n > e.length - t && fi(),
            (this.segments = e),
            (this.offset = t),
            (this.len = n)
        }
        get length () {
          return this.len
        }
        isEqual (e) {
          return 0 === xi.comparator(this, e)
        }
        child (e) {
          const t = this.segments.slice(this.offset, this.limit())
          return (
            e instanceof xi
              ? e.forEach(e => {
                  t.push(e)
                })
              : t.push(e),
            this.construct(t)
          )
        }
        limit () {
          return this.offset + this.length
        }
        popFirst (e) {
          return (
            (e = void 0 === e ? 1 : e),
            this.construct(this.segments, this.offset + e, this.length - e)
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
        get (e) {
          return this.segments[this.offset + e]
        }
        isEmpty () {
          return 0 === this.length
        }
        isPrefixOf (e) {
          if (e.length < this.length) return !1
          for (let t = 0; t < this.length; t++)
            if (this.get(t) !== e.get(t)) return !1
          return !0
        }
        isImmediateParentOf (e) {
          if (this.length + 1 !== e.length) return !1
          for (let t = 0; t < this.length; t++)
            if (this.get(t) !== e.get(t)) return !1
          return !0
        }
        forEach (e) {
          for (let t = this.offset, n = this.limit(); t < n; t++)
            e(this.segments[t])
        }
        toArray () {
          return this.segments.slice(this.offset, this.limit())
        }
        static comparator (e, t) {
          const n = Math.min(e.length, t.length)
          for (let s = 0; s < n; s++) {
            const n = e.get(s),
              i = t.get(s)
            if (n < i) return -1
            if (n > i) return 1
          }
          return e.length < t.length ? -1 : e.length > t.length ? 1 : 0
        }
      }
      class Ui extends xi {
        construct (e, t, n) {
          return new Ui(e, t, n)
        }
        canonicalString () {
          return this.toArray().join('/')
        }
        toString () {
          return this.canonicalString()
        }
        static fromString (...e) {
          const t = []
          for (const n of e) {
            if (n.indexOf('//') >= 0)
              throw new yi(
                gi.INVALID_ARGUMENT,
                `Invalid segment (${n}). Paths must not contain // in them.`
              )
            t.push(...n.split('/').filter(e => e.length > 0))
          }
          return new Ui(t)
        }
        static emptyPath () {
          return new Ui([])
        }
      }
      const Vi = /^[_a-zA-Z][_a-zA-Z0-9]*$/
      class Fi extends xi {
        construct (e, t, n) {
          return new Fi(e, t, n)
        }
        static isValidIdentifier (e) {
          return Vi.test(e)
        }
        canonicalString () {
          return this.toArray()
            .map(
              e => (
                (e = e.replace(/\\/g, '\\\\').replace(/`/g, '\\`')),
                Fi.isValidIdentifier(e) || (e = '`' + e + '`'),
                e
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
          return new Fi(['__name__'])
        }
        static fromServerFormat (e) {
          const t = []
          let n = '',
            s = 0
          const i = () => {
            if (0 === n.length)
              throw new yi(
                gi.INVALID_ARGUMENT,
                `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`
              )
            t.push(n), (n = '')
          }
          let r = !1
          for (; s < e.length; ) {
            const t = e[s]
            if ('\\' === t) {
              if (s + 1 === e.length)
                throw new yi(
                  gi.INVALID_ARGUMENT,
                  'Path has trailing escape character: ' + e
                )
              const t = e[s + 1]
              if ('\\' !== t && '.' !== t && '`' !== t)
                throw new yi(
                  gi.INVALID_ARGUMENT,
                  'Path has invalid escape sequence: ' + e
                )
              ;(n += t), (s += 2)
            } else
              '`' === t
                ? ((r = !r), s++)
                : '.' !== t || r
                ? ((n += t), s++)
                : (i(), s++)
          }
          if ((i(), r))
            throw new yi(gi.INVALID_ARGUMENT, 'Unterminated ` in path: ' + e)
          return new Fi(t)
        }
        static emptyPath () {
          return new Fi([])
        }
      }
      class qi {
        constructor (e) {
          ;(this.fields = e), e.sort(Fi.comparator)
        }
        covers (e) {
          for (const t of this.fields) if (t.isPrefixOf(e)) return !0
          return !1
        }
        isEqual (e) {
          return Ri(this.fields, e.fields, (e, t) => e.isEqual(t))
        }
      }
      class $i {
        constructor (e) {
          this.binaryString = e
        }
        static fromBase64String (e) {
          const t = atob(e)
          return new $i(t)
        }
        static fromUint8Array (e) {
          const t = (function (e) {
            let t = ''
            for (let n = 0; n < e.length; ++n) t += String.fromCharCode(e[n])
            return t
          })(e)
          return new $i(t)
        }
        [Symbol.iterator] () {
          let e = 0
          return {
            next: () =>
              e < this.binaryString.length
                ? { value: this.binaryString.charCodeAt(e++), done: !1 }
                : { value: void 0, done: !0 }
          }
        }
        toBase64 () {
          return (e = this.binaryString), btoa(e)
          var e
        }
        toUint8Array () {
          return (function (e) {
            const t = new Uint8Array(e.length)
            for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n)
            return t
          })(this.binaryString)
        }
        approximateByteSize () {
          return 2 * this.binaryString.length
        }
        compareTo (e) {
          return Ni(this.binaryString, e.binaryString)
        }
        isEqual (e) {
          return this.binaryString === e.binaryString
        }
      }
      $i.EMPTY_BYTE_STRING = new $i('')
      const ji = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/)
      function Bi (e) {
        if ((pi(!!e), 'string' == typeof e)) {
          let t = 0
          const n = ji.exec(e)
          if ((pi(!!n), n[1])) {
            let e = n[1]
            ;(e = (e + '000000000').substr(0, 9)), (t = Number(e))
          }
          const s = new Date(e)
          return { seconds: Math.floor(s.getTime() / 1e3), nanos: t }
        }
        return { seconds: Hi(e.seconds), nanos: Hi(e.nanos) }
      }
      function Hi (e) {
        return 'number' == typeof e ? e : 'string' == typeof e ? Number(e) : 0
      }
      function Ki (e) {
        return 'string' == typeof e
          ? $i.fromBase64String(e)
          : $i.fromUint8Array(e)
      }
      function zi (e) {
        var t, n
        return (
          'server_timestamp' ===
          (null ===
            (n = (
              (null === (t = null == e ? void 0 : e.mapValue) || void 0 === t
                ? void 0
                : t.fields) || {}
            ).__type__) || void 0 === n
            ? void 0
            : n.stringValue)
        )
      }
      function Gi (e) {
        const t = e.mapValue.fields.__previous_value__
        return zi(t) ? Gi(t) : t
      }
      function Wi (e) {
        const t = Bi(e.mapValue.fields.__local_write_time__.timestampValue)
        return new Di(t.seconds, t.nanos)
      }
      function Qi (e) {
        return null == e
      }
      function Xi (e) {
        return 0 === e && 1 / e == -1 / 0
      }
      class Yi {
        constructor (e) {
          this.path = e
        }
        static fromPath (e) {
          return new Yi(Ui.fromString(e))
        }
        static fromName (e) {
          return new Yi(Ui.fromString(e).popFirst(5))
        }
        hasCollectionId (e) {
          return (
            this.path.length >= 2 && this.path.get(this.path.length - 2) === e
          )
        }
        isEqual (e) {
          return null !== e && 0 === Ui.comparator(this.path, e.path)
        }
        toString () {
          return this.path.toString()
        }
        static comparator (e, t) {
          return Ui.comparator(e.path, t.path)
        }
        static isDocumentKey (e) {
          return e.length % 2 == 0
        }
        static fromSegments (e) {
          return new Yi(new Ui(e.slice()))
        }
      }
      function Ji (e) {
        return 'nullValue' in e
          ? 0
          : 'booleanValue' in e
          ? 1
          : 'integerValue' in e || 'doubleValue' in e
          ? 2
          : 'timestampValue' in e
          ? 3
          : 'stringValue' in e
          ? 5
          : 'bytesValue' in e
          ? 6
          : 'referenceValue' in e
          ? 7
          : 'geoPointValue' in e
          ? 8
          : 'arrayValue' in e
          ? 9
          : 'mapValue' in e
          ? zi(e)
            ? 4
            : 10
          : fi()
      }
      function Zi (e, t) {
        if (e === t) return !0
        const n = Ji(e)
        if (n !== Ji(t)) return !1
        switch (n) {
          case 0:
            return !0
          case 1:
            return e.booleanValue === t.booleanValue
          case 4:
            return Wi(e).isEqual(Wi(t))
          case 3:
            return (function (e, t) {
              if (
                'string' == typeof e.timestampValue &&
                'string' == typeof t.timestampValue &&
                e.timestampValue.length === t.timestampValue.length
              )
                return e.timestampValue === t.timestampValue
              const n = Bi(e.timestampValue),
                s = Bi(t.timestampValue)
              return n.seconds === s.seconds && n.nanos === s.nanos
            })(e, t)
          case 5:
            return e.stringValue === t.stringValue
          case 6:
            return (function (e, t) {
              return Ki(e.bytesValue).isEqual(Ki(t.bytesValue))
            })(e, t)
          case 7:
            return e.referenceValue === t.referenceValue
          case 8:
            return (function (e, t) {
              return (
                Hi(e.geoPointValue.latitude) === Hi(t.geoPointValue.latitude) &&
                Hi(e.geoPointValue.longitude) === Hi(t.geoPointValue.longitude)
              )
            })(e, t)
          case 2:
            return (function (e, t) {
              if ('integerValue' in e && 'integerValue' in t)
                return Hi(e.integerValue) === Hi(t.integerValue)
              if ('doubleValue' in e && 'doubleValue' in t) {
                const n = Hi(e.doubleValue),
                  s = Hi(t.doubleValue)
                return n === s ? Xi(n) === Xi(s) : isNaN(n) && isNaN(s)
              }
              return !1
            })(e, t)
          case 9:
            return Ri(e.arrayValue.values || [], t.arrayValue.values || [], Zi)
          case 10:
            return (function (e, t) {
              const n = e.mapValue.fields || {},
                s = t.mapValue.fields || {}
              if (Li(n) !== Li(s)) return !1
              for (const e in n)
                if (n.hasOwnProperty(e) && (void 0 === s[e] || !Zi(n[e], s[e])))
                  return !1
              return !0
            })(e, t)
          default:
            return fi()
        }
      }
      function er (e, t) {
        return void 0 !== (e.values || []).find(e => Zi(e, t))
      }
      function tr (e, t) {
        if (e === t) return 0
        const n = Ji(e),
          s = Ji(t)
        if (n !== s) return Ni(n, s)
        switch (n) {
          case 0:
            return 0
          case 1:
            return Ni(e.booleanValue, t.booleanValue)
          case 2:
            return (function (e, t) {
              const n = Hi(e.integerValue || e.doubleValue),
                s = Hi(t.integerValue || t.doubleValue)
              return n < s
                ? -1
                : n > s
                ? 1
                : n === s
                ? 0
                : isNaN(n)
                ? isNaN(s)
                  ? 0
                  : -1
                : 1
            })(e, t)
          case 3:
            return nr(e.timestampValue, t.timestampValue)
          case 4:
            return nr(Wi(e), Wi(t))
          case 5:
            return Ni(e.stringValue, t.stringValue)
          case 6:
            return (function (e, t) {
              const n = Ki(e),
                s = Ki(t)
              return n.compareTo(s)
            })(e.bytesValue, t.bytesValue)
          case 7:
            return (function (e, t) {
              const n = e.split('/'),
                s = t.split('/')
              for (let e = 0; e < n.length && e < s.length; e++) {
                const t = Ni(n[e], s[e])
                if (0 !== t) return t
              }
              return Ni(n.length, s.length)
            })(e.referenceValue, t.referenceValue)
          case 8:
            return (function (e, t) {
              const n = Ni(Hi(e.latitude), Hi(t.latitude))
              return 0 !== n ? n : Ni(Hi(e.longitude), Hi(t.longitude))
            })(e.geoPointValue, t.geoPointValue)
          case 9:
            return (function (e, t) {
              const n = e.values || [],
                s = t.values || []
              for (let e = 0; e < n.length && e < s.length; ++e) {
                const t = tr(n[e], s[e])
                if (t) return t
              }
              return Ni(n.length, s.length)
            })(e.arrayValue, t.arrayValue)
          case 10:
            return (function (e, t) {
              const n = e.fields || {},
                s = Object.keys(n),
                i = t.fields || {},
                r = Object.keys(i)
              s.sort(), r.sort()
              for (let e = 0; e < s.length && e < r.length; ++e) {
                const t = Ni(s[e], r[e])
                if (0 !== t) return t
                const o = tr(n[s[e]], i[r[e]])
                if (0 !== o) return o
              }
              return Ni(s.length, r.length)
            })(e.mapValue, t.mapValue)
          default:
            throw fi()
        }
      }
      function nr (e, t) {
        if (
          'string' == typeof e &&
          'string' == typeof t &&
          e.length === t.length
        )
          return Ni(e, t)
        const n = Bi(e),
          s = Bi(t),
          i = Ni(n.seconds, s.seconds)
        return 0 !== i ? i : Ni(n.nanos, s.nanos)
      }
      function sr (e) {
        return ir(e)
      }
      function ir (e) {
        return 'nullValue' in e
          ? 'null'
          : 'booleanValue' in e
          ? '' + e.booleanValue
          : 'integerValue' in e
          ? '' + e.integerValue
          : 'doubleValue' in e
          ? '' + e.doubleValue
          : 'timestampValue' in e
          ? (function (e) {
              const t = Bi(e)
              return `time(${t.seconds},${t.nanos})`
            })(e.timestampValue)
          : 'stringValue' in e
          ? e.stringValue
          : 'bytesValue' in e
          ? Ki(e.bytesValue).toBase64()
          : 'referenceValue' in e
          ? ((n = e.referenceValue), Yi.fromName(n).toString())
          : 'geoPointValue' in e
          ? `geo(${(t = e.geoPointValue).latitude},${t.longitude})`
          : 'arrayValue' in e
          ? (function (e) {
              let t = '[',
                n = !0
              for (const s of e.values || [])
                n ? (n = !1) : (t += ','), (t += ir(s))
              return t + ']'
            })(e.arrayValue)
          : 'mapValue' in e
          ? (function (e) {
              const t = Object.keys(e.fields || {}).sort()
              let n = '{',
                s = !0
              for (const i of t)
                s ? (s = !1) : (n += ','), (n += `${i}:${ir(e.fields[i])}`)
              return n + '}'
            })(e.mapValue)
          : fi()
        var t, n
      }
      function rr (e, t) {
        return {
          referenceValue: `projects/${e.projectId}/databases/${
            e.database
          }/documents/${t.path.canonicalString()}`
        }
      }
      function or (e) {
        return !!e && 'integerValue' in e
      }
      function ar (e) {
        return !!e && 'arrayValue' in e
      }
      function cr (e) {
        return !!e && 'nullValue' in e
      }
      function lr (e) {
        return !!e && 'doubleValue' in e && isNaN(Number(e.doubleValue))
      }
      function ur (e) {
        return !!e && 'mapValue' in e
      }
      function hr (e) {
        if (e.geoPointValue)
          return { geoPointValue: Object.assign({}, e.geoPointValue) }
        if (e.timestampValue && 'object' == typeof e.timestampValue)
          return { timestampValue: Object.assign({}, e.timestampValue) }
        if (e.mapValue) {
          const t = { mapValue: { fields: {} } }
          return (
            Pi(e.mapValue.fields, (e, n) => (t.mapValue.fields[e] = hr(n))), t
          )
        }
        if (e.arrayValue) {
          const t = { arrayValue: { values: [] } }
          for (let n = 0; n < (e.arrayValue.values || []).length; ++n)
            t.arrayValue.values[n] = hr(e.arrayValue.values[n])
          return t
        }
        return Object.assign({}, e)
      }
      class dr {
        constructor (e) {
          this.value = e
        }
        static empty () {
          return new dr({ mapValue: {} })
        }
        field (e) {
          if (e.isEmpty()) return this.value
          {
            let t = this.value
            for (let n = 0; n < e.length - 1; ++n)
              if (((t = (t.mapValue.fields || {})[e.get(n)]), !ur(t)))
                return null
            return (t = (t.mapValue.fields || {})[e.lastSegment()]), t || null
          }
        }
        set (e, t) {
          this.getFieldsMap(e.popLast())[e.lastSegment()] = hr(t)
        }
        setAll (e) {
          let t = Fi.emptyPath(),
            n = {},
            s = []
          e.forEach((e, i) => {
            if (!t.isImmediateParentOf(i)) {
              const e = this.getFieldsMap(t)
              this.applyChanges(e, n, s), (n = {}), (s = []), (t = i.popLast())
            }
            e ? (n[i.lastSegment()] = hr(e)) : s.push(i.lastSegment())
          })
          const i = this.getFieldsMap(t)
          this.applyChanges(i, n, s)
        }
        delete (e) {
          const t = this.field(e.popLast())
          ur(t) &&
            t.mapValue.fields &&
            delete t.mapValue.fields[e.lastSegment()]
        }
        isEqual (e) {
          return Zi(this.value, e.value)
        }
        getFieldsMap (e) {
          let t = this.value
          t.mapValue.fields || (t.mapValue = { fields: {} })
          for (let n = 0; n < e.length; ++n) {
            let s = t.mapValue.fields[e.get(n)]
            ;(ur(s) && s.mapValue.fields) ||
              ((s = { mapValue: { fields: {} } }),
              (t.mapValue.fields[e.get(n)] = s)),
              (t = s)
          }
          return t.mapValue.fields
        }
        applyChanges (e, t, n) {
          Pi(t, (t, n) => (e[t] = n))
          for (const t of n) delete e[t]
        }
        clone () {
          return new dr(hr(this.value))
        }
      }
      function fr (e) {
        const t = []
        return (
          Pi(e.fields, (e, n) => {
            const s = new Fi([e])
            if (ur(n)) {
              const e = fr(n.mapValue).fields
              if (0 === e.length) t.push(s)
              else for (const n of e) t.push(s.child(n))
            } else t.push(s)
          }),
          new qi(t)
        )
      }
      class pr {
        constructor (e, t, n, s, i) {
          ;(this.key = e),
            (this.documentType = t),
            (this.version = n),
            (this.data = s),
            (this.documentState = i)
        }
        static newInvalidDocument (e) {
          return new pr(e, 0, Oi.min(), dr.empty(), 0)
        }
        static newFoundDocument (e, t, n) {
          return new pr(e, 1, t, n, 0)
        }
        static newNoDocument (e, t) {
          return new pr(e, 2, t, dr.empty(), 0)
        }
        static newUnknownDocument (e, t) {
          return new pr(e, 3, t, dr.empty(), 2)
        }
        convertToFoundDocument (e, t) {
          return (
            (this.version = e),
            (this.documentType = 1),
            (this.data = t),
            (this.documentState = 0),
            this
          )
        }
        convertToNoDocument (e) {
          return (
            (this.version = e),
            (this.documentType = 2),
            (this.data = dr.empty()),
            (this.documentState = 0),
            this
          )
        }
        convertToUnknownDocument (e) {
          return (
            (this.version = e),
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
        isEqual (e) {
          return (
            e instanceof pr &&
            this.key.isEqual(e.key) &&
            this.version.isEqual(e.version) &&
            this.documentType === e.documentType &&
            this.documentState === e.documentState &&
            this.data.isEqual(e.data)
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
        constructor (
          e,
          t = null,
          n = [],
          s = [],
          i = null,
          r = null,
          o = null
        ) {
          ;(this.path = e),
            (this.collectionGroup = t),
            (this.orderBy = n),
            (this.filters = s),
            (this.limit = i),
            (this.startAt = r),
            (this.endAt = o),
            (this.R = null)
        }
      }
      function gr (e, t = null, n = [], s = [], i = null, r = null, o = null) {
        return new mr(e, t, n, s, i, r, o)
      }
      function yr (e) {
        const t = mi(e)
        if (null === t.R) {
          let e = t.path.canonicalString()
          null !== t.collectionGroup && (e += '|cg:' + t.collectionGroup),
            (e += '|f:'),
            (e += t.filters
              .map(e =>
                (function (e) {
                  return (
                    e.field.canonicalString() + e.op.toString() + sr(e.value)
                  )
                })(e)
              )
              .join(',')),
            (e += '|ob:'),
            (e += t.orderBy
              .map(e =>
                (function (e) {
                  return e.field.canonicalString() + e.dir
                })(e)
              )
              .join(',')),
            Qi(t.limit) || ((e += '|l:'), (e += t.limit)),
            t.startAt && ((e += '|lb:'), (e += Rr(t.startAt))),
            t.endAt && ((e += '|ub:'), (e += Rr(t.endAt))),
            (t.R = e)
        }
        return t.R
      }
      function vr (e, t) {
        if (e.limit !== t.limit) return !1
        if (e.orderBy.length !== t.orderBy.length) return !1
        for (let n = 0; n < e.orderBy.length; n++)
          if (!Or(e.orderBy[n], t.orderBy[n])) return !1
        if (e.filters.length !== t.filters.length) return !1
        for (let i = 0; i < e.filters.length; i++)
          if (
            ((n = e.filters[i]),
            (s = t.filters[i]),
            n.op !== s.op || !n.field.isEqual(s.field) || !Zi(n.value, s.value))
          )
            return !1
        var n, s
        return (
          e.collectionGroup === t.collectionGroup &&
          !!e.path.isEqual(t.path) &&
          !!Pr(e.startAt, t.startAt) &&
          Pr(e.endAt, t.endAt)
        )
      }
      function wr (e) {
        return (
          Yi.isDocumentKey(e.path) &&
          null === e.collectionGroup &&
          0 === e.filters.length
        )
      }
      class Ir extends class {} {
        constructor (e, t, n) {
          super(), (this.field = e), (this.op = t), (this.value = n)
        }
        static create (e, t, n) {
          return e.isKeyField()
            ? 'in' === t || 'not-in' === t
              ? this.P(e, t, n)
              : new Tr(e, t, n)
            : 'array-contains' === t
            ? new Sr(e, n)
            : 'in' === t
            ? new kr(e, n)
            : 'not-in' === t
            ? new Ar(e, n)
            : 'array-contains-any' === t
            ? new Cr(e, n)
            : new Ir(e, t, n)
        }
        static P (e, t, n) {
          return 'in' === t ? new Er(e, n) : new br(e, n)
        }
        matches (e) {
          const t = e.data.field(this.field)
          return '!=' === this.op
            ? null !== t && this.v(tr(t, this.value))
            : null !== t &&
                Ji(this.value) === Ji(t) &&
                this.v(tr(t, this.value))
        }
        v (e) {
          switch (this.op) {
            case '<':
              return e < 0
            case '<=':
              return e <= 0
            case '==':
              return 0 === e
            case '!=':
              return 0 !== e
            case '>':
              return e > 0
            case '>=':
              return e >= 0
            default:
              return fi()
          }
        }
        V () {
          return ['<', '<=', '>', '>=', '!=', 'not-in'].indexOf(this.op) >= 0
        }
      }
      class Tr extends Ir {
        constructor (e, t, n) {
          super(e, t, n), (this.key = Yi.fromName(n.referenceValue))
        }
        matches (e) {
          const t = Yi.comparator(e.key, this.key)
          return this.v(t)
        }
      }
      class Er extends Ir {
        constructor (e, t) {
          super(e, 'in', t), (this.keys = _r(0, t))
        }
        matches (e) {
          return this.keys.some(t => t.isEqual(e.key))
        }
      }
      class br extends Ir {
        constructor (e, t) {
          super(e, 'not-in', t), (this.keys = _r(0, t))
        }
        matches (e) {
          return !this.keys.some(t => t.isEqual(e.key))
        }
      }
      function _r (e, t) {
        var n
        return (
          (null === (n = t.arrayValue) || void 0 === n ? void 0 : n.values) ||
          []
        ).map(e => Yi.fromName(e.referenceValue))
      }
      class Sr extends Ir {
        constructor (e, t) {
          super(e, 'array-contains', t)
        }
        matches (e) {
          const t = e.data.field(this.field)
          return ar(t) && er(t.arrayValue, this.value)
        }
      }
      class kr extends Ir {
        constructor (e, t) {
          super(e, 'in', t)
        }
        matches (e) {
          const t = e.data.field(this.field)
          return null !== t && er(this.value.arrayValue, t)
        }
      }
      class Ar extends Ir {
        constructor (e, t) {
          super(e, 'not-in', t)
        }
        matches (e) {
          if (er(this.value.arrayValue, { nullValue: 'NULL_VALUE' })) return !1
          const t = e.data.field(this.field)
          return null !== t && !er(this.value.arrayValue, t)
        }
      }
      class Cr extends Ir {
        constructor (e, t) {
          super(e, 'array-contains-any', t)
        }
        matches (e) {
          const t = e.data.field(this.field)
          return (
            !(!ar(t) || !t.arrayValue.values) &&
            t.arrayValue.values.some(e => er(this.value.arrayValue, e))
          )
        }
      }
      class Nr {
        constructor (e, t) {
          ;(this.position = e), (this.before = t)
        }
      }
      function Rr (e) {
        return `${e.before ? 'b' : 'a'}:${e.position.map(e => sr(e)).join(',')}`
      }
      class Dr {
        constructor (e, t = 'asc') {
          ;(this.field = e), (this.dir = t)
        }
      }
      function Or (e, t) {
        return e.dir === t.dir && e.field.isEqual(t.field)
      }
      function Lr (e, t, n) {
        let s = 0
        for (let i = 0; i < e.position.length; i++) {
          const r = t[i],
            o = e.position[i]
          if (
            ((s = r.field.isKeyField()
              ? Yi.comparator(Yi.fromName(o.referenceValue), n.key)
              : tr(o, n.data.field(r.field))),
            'desc' === r.dir && (s *= -1),
            0 !== s)
          )
            break
        }
        return e.before ? s <= 0 : s < 0
      }
      function Pr (e, t) {
        if (null === e) return null === t
        if (null === t) return !1
        if (e.before !== t.before || e.position.length !== t.position.length)
          return !1
        for (let n = 0; n < e.position.length; n++)
          if (!Zi(e.position[n], t.position[n])) return !1
        return !0
      }
      class Mr {
        constructor (
          e,
          t = null,
          n = [],
          s = [],
          i = null,
          r = 'F',
          o = null,
          a = null
        ) {
          ;(this.path = e),
            (this.collectionGroup = t),
            (this.explicitOrderBy = n),
            (this.filters = s),
            (this.limit = i),
            (this.limitType = r),
            (this.startAt = o),
            (this.endAt = a),
            (this.S = null),
            (this.D = null),
            this.startAt,
            this.endAt
        }
      }
      function xr (e) {
        return new Mr(e)
      }
      function Ur (e) {
        return !Qi(e.limit) && 'F' === e.limitType
      }
      function Vr (e) {
        return !Qi(e.limit) && 'L' === e.limitType
      }
      function Fr (e) {
        return e.explicitOrderBy.length > 0 ? e.explicitOrderBy[0].field : null
      }
      function qr (e) {
        for (const t of e.filters) if (t.V()) return t.field
        return null
      }
      function $r (e) {
        return null !== e.collectionGroup
      }
      function jr (e) {
        const t = mi(e)
        if (null === t.S) {
          t.S = []
          const e = qr(t),
            n = Fr(t)
          if (null !== e && null === n)
            e.isKeyField() || t.S.push(new Dr(e)),
              t.S.push(new Dr(Fi.keyField(), 'asc'))
          else {
            let e = !1
            for (const n of t.explicitOrderBy)
              t.S.push(n), n.field.isKeyField() && (e = !0)
            if (!e) {
              const e =
                t.explicitOrderBy.length > 0
                  ? t.explicitOrderBy[t.explicitOrderBy.length - 1].dir
                  : 'asc'
              t.S.push(new Dr(Fi.keyField(), e))
            }
          }
        }
        return t.S
      }
      function Br (e) {
        const t = mi(e)
        if (!t.D)
          if ('F' === t.limitType)
            t.D = gr(
              t.path,
              t.collectionGroup,
              jr(t),
              t.filters,
              t.limit,
              t.startAt,
              t.endAt
            )
          else {
            const e = []
            for (const n of jr(t)) {
              const t = 'desc' === n.dir ? 'asc' : 'desc'
              e.push(new Dr(n.field, t))
            }
            const n = t.endAt
                ? new Nr(t.endAt.position, !t.endAt.before)
                : null,
              s = t.startAt
                ? new Nr(t.startAt.position, !t.startAt.before)
                : null
            t.D = gr(t.path, t.collectionGroup, e, t.filters, t.limit, n, s)
          }
        return t.D
      }
      function Hr (e, t) {
        return vr(Br(e), Br(t)) && e.limitType === t.limitType
      }
      function Kr (e) {
        return `${yr(Br(e))}|lt:${e.limitType}`
      }
      function zr (e) {
        return `Query(target=${(function (e) {
          let t = e.path.canonicalString()
          return (
            null !== e.collectionGroup &&
              (t += ' collectionGroup=' + e.collectionGroup),
            e.filters.length > 0 &&
              (t += `, filters: [${e.filters
                .map(e => {
                  return `${(t = e).field.canonicalString()} ${t.op} ${sr(
                    t.value
                  )}`
                  var t
                })
                .join(', ')}]`),
            Qi(e.limit) || (t += ', limit: ' + e.limit),
            e.orderBy.length > 0 &&
              (t += `, orderBy: [${e.orderBy
                .map(e =>
                  (function (e) {
                    return `${e.field.canonicalString()} (${e.dir})`
                  })(e)
                )
                .join(', ')}]`),
            e.startAt && (t += ', startAt: ' + Rr(e.startAt)),
            e.endAt && (t += ', endAt: ' + Rr(e.endAt)),
            `Target(${t})`
          )
        })(Br(e))}; limitType=${e.limitType})`
      }
      function Gr (e, t) {
        return (
          t.isFoundDocument() &&
          (function (e, t) {
            const n = t.key.path
            return null !== e.collectionGroup
              ? t.key.hasCollectionId(e.collectionGroup) && e.path.isPrefixOf(n)
              : Yi.isDocumentKey(e.path)
              ? e.path.isEqual(n)
              : e.path.isImmediateParentOf(n)
          })(e, t) &&
          (function (e, t) {
            for (const n of e.explicitOrderBy)
              if (!n.field.isKeyField() && null === t.data.field(n.field))
                return !1
            return !0
          })(e, t) &&
          (function (e, t) {
            for (const n of e.filters) if (!n.matches(t)) return !1
            return !0
          })(e, t) &&
          (function (e, t) {
            return !(
              (e.startAt && !Lr(e.startAt, jr(e), t)) ||
              (e.endAt && Lr(e.endAt, jr(e), t))
            )
          })(e, t)
        )
      }
      function Wr (e) {
        return (t, n) => {
          let s = !1
          for (const i of jr(e)) {
            const e = Qr(i, t, n)
            if (0 !== e) return e
            s = s || i.field.isKeyField()
          }
          return 0
        }
      }
      function Qr (e, t, n) {
        const s = e.field.isKeyField()
          ? Yi.comparator(t.key, n.key)
          : (function (e, t, n) {
              const s = t.data.field(e),
                i = n.data.field(e)
              return null !== s && null !== i ? tr(s, i) : fi()
            })(e.field, t, n)
        switch (e.dir) {
          case 'asc':
            return s
          case 'desc':
            return -1 * s
          default:
            return fi()
        }
      }
      function Xr (e, t) {
        if (e.C) {
          if (isNaN(t)) return { doubleValue: 'NaN' }
          if (t === 1 / 0) return { doubleValue: 'Infinity' }
          if (t === -1 / 0) return { doubleValue: '-Infinity' }
        }
        return { doubleValue: Xi(t) ? '-0' : t }
      }
      function Yr (e) {
        return { integerValue: '' + e }
      }
      function Jr (e, t) {
        return (function (e) {
          return (
            'number' == typeof e &&
            Number.isInteger(e) &&
            !Xi(e) &&
            e <= Number.MAX_SAFE_INTEGER &&
            e >= Number.MIN_SAFE_INTEGER
          )
        })(t)
          ? Yr(t)
          : Xr(e, t)
      }
      class Zr {
        constructor () {
          this._ = void 0
        }
      }
      function eo (e, t, n) {
        return e instanceof so
          ? (function (e, t) {
              const n = {
                fields: {
                  __type__: { stringValue: 'server_timestamp' },
                  __local_write_time__: {
                    timestampValue: { seconds: e.seconds, nanos: e.nanoseconds }
                  }
                }
              }
              return t && (n.fields.__previous_value__ = t), { mapValue: n }
            })(n, t)
          : e instanceof io
          ? ro(e, t)
          : e instanceof oo
          ? ao(e, t)
          : (function (e, t) {
              const n = no(e, t),
                s = lo(n) + lo(e.N)
              return or(n) && or(e.N) ? Yr(s) : Xr(e.k, s)
            })(e, t)
      }
      function to (e, t, n) {
        return e instanceof io ? ro(e, t) : e instanceof oo ? ao(e, t) : n
      }
      function no (e, t) {
        return e instanceof co
          ? or((n = t)) ||
            (function (e) {
              return !!e && 'doubleValue' in e
            })(n)
            ? t
            : { integerValue: 0 }
          : null
        var n
      }
      class so extends Zr {}
      class io extends Zr {
        constructor (e) {
          super(), (this.elements = e)
        }
      }
      function ro (e, t) {
        const n = uo(t)
        for (const t of e.elements) n.some(e => Zi(e, t)) || n.push(t)
        return { arrayValue: { values: n } }
      }
      class oo extends Zr {
        constructor (e) {
          super(), (this.elements = e)
        }
      }
      function ao (e, t) {
        let n = uo(t)
        for (const t of e.elements) n = n.filter(e => !Zi(e, t))
        return { arrayValue: { values: n } }
      }
      class co extends Zr {
        constructor (e, t) {
          super(), (this.k = e), (this.N = t)
        }
      }
      function lo (e) {
        return Hi(e.integerValue || e.doubleValue)
      }
      function uo (e) {
        return ar(e) && e.arrayValue.values ? e.arrayValue.values.slice() : []
      }
      class ho {
        constructor (e, t) {
          ;(this.version = e), (this.transformResults = t)
        }
      }
      class fo {
        constructor (e, t) {
          ;(this.updateTime = e), (this.exists = t)
        }
        static none () {
          return new fo()
        }
        static exists (e) {
          return new fo(void 0, e)
        }
        static updateTime (e) {
          return new fo(e)
        }
        get isNone () {
          return void 0 === this.updateTime && void 0 === this.exists
        }
        isEqual (e) {
          return (
            this.exists === e.exists &&
            (this.updateTime
              ? !!e.updateTime && this.updateTime.isEqual(e.updateTime)
              : !e.updateTime)
          )
        }
      }
      function po (e, t) {
        return void 0 !== e.updateTime
          ? t.isFoundDocument() && t.version.isEqual(e.updateTime)
          : void 0 === e.exists || e.exists === t.isFoundDocument()
      }
      class mo {}
      function go (e, t, n) {
        e instanceof To
          ? (function (e, t, n) {
              const s = e.value.clone(),
                i = _o(e.fieldTransforms, t, n.transformResults)
              s.setAll(i),
                t
                  .convertToFoundDocument(n.version, s)
                  .setHasCommittedMutations()
            })(e, t, n)
          : e instanceof Eo
          ? (function (e, t, n) {
              if (!po(e.precondition, t))
                return void t.convertToUnknownDocument(n.version)
              const s = _o(e.fieldTransforms, t, n.transformResults),
                i = t.data
              i.setAll(bo(e)),
                i.setAll(s),
                t
                  .convertToFoundDocument(n.version, i)
                  .setHasCommittedMutations()
            })(e, t, n)
          : (function (e, t, n) {
              t.convertToNoDocument(n.version).setHasCommittedMutations()
            })(0, t, n)
      }
      function yo (e, t, n) {
        e instanceof To
          ? (function (e, t, n) {
              if (!po(e.precondition, t)) return
              const s = e.value.clone(),
                i = So(e.fieldTransforms, n, t)
              s.setAll(i),
                t.convertToFoundDocument(Io(t), s).setHasLocalMutations()
            })(e, t, n)
          : e instanceof Eo
          ? (function (e, t, n) {
              if (!po(e.precondition, t)) return
              const s = So(e.fieldTransforms, n, t),
                i = t.data
              i.setAll(bo(e)),
                i.setAll(s),
                t.convertToFoundDocument(Io(t), i).setHasLocalMutations()
            })(e, t, n)
          : (function (e, t) {
              po(e.precondition, t) && t.convertToNoDocument(Oi.min())
            })(e, t)
      }
      function vo (e, t) {
        let n = null
        for (const s of e.fieldTransforms) {
          const e = t.data.field(s.field),
            i = no(s.transform, e || null)
          null != i && (null == n && (n = dr.empty()), n.set(s.field, i))
        }
        return n || null
      }
      function wo (e, t) {
        return (
          e.type === t.type &&
          !!e.key.isEqual(t.key) &&
          !!e.precondition.isEqual(t.precondition) &&
          !!(function (e, t) {
            return (
              (void 0 === e && void 0 === t) ||
              (!(!e || !t) &&
                Ri(e, t, (e, t) =>
                  (function (e, t) {
                    return (
                      e.field.isEqual(t.field) &&
                      (function (e, t) {
                        return (e instanceof io && t instanceof io) ||
                          (e instanceof oo && t instanceof oo)
                          ? Ri(e.elements, t.elements, Zi)
                          : e instanceof co && t instanceof co
                          ? Zi(e.N, t.N)
                          : e instanceof so && t instanceof so
                      })(e.transform, t.transform)
                    )
                  })(e, t)
                ))
            )
          })(e.fieldTransforms, t.fieldTransforms) &&
          (0 === e.type
            ? e.value.isEqual(t.value)
            : 1 !== e.type ||
              (e.data.isEqual(t.data) && e.fieldMask.isEqual(t.fieldMask)))
        )
      }
      function Io (e) {
        return e.isFoundDocument() ? e.version : Oi.min()
      }
      class To extends mo {
        constructor (e, t, n, s = []) {
          super(),
            (this.key = e),
            (this.value = t),
            (this.precondition = n),
            (this.fieldTransforms = s),
            (this.type = 0)
        }
      }
      class Eo extends mo {
        constructor (e, t, n, s, i = []) {
          super(),
            (this.key = e),
            (this.data = t),
            (this.fieldMask = n),
            (this.precondition = s),
            (this.fieldTransforms = i),
            (this.type = 1)
        }
      }
      function bo (e) {
        const t = new Map()
        return (
          e.fieldMask.fields.forEach(n => {
            if (!n.isEmpty()) {
              const s = e.data.field(n)
              t.set(n, s)
            }
          }),
          t
        )
      }
      function _o (e, t, n) {
        const s = new Map()
        pi(e.length === n.length)
        for (let i = 0; i < n.length; i++) {
          const r = e[i],
            o = r.transform,
            a = t.data.field(r.field)
          s.set(r.field, to(o, a, n[i]))
        }
        return s
      }
      function So (e, t, n) {
        const s = new Map()
        for (const i of e) {
          const e = i.transform,
            r = n.data.field(i.field)
          s.set(i.field, eo(e, r, t))
        }
        return s
      }
      class ko extends mo {
        constructor (e, t) {
          super(),
            (this.key = e),
            (this.precondition = t),
            (this.type = 2),
            (this.fieldTransforms = [])
        }
      }
      class Ao extends mo {
        constructor (e, t) {
          super(),
            (this.key = e),
            (this.precondition = t),
            (this.type = 3),
            (this.fieldTransforms = [])
        }
      }
      class Co {
        constructor (e) {
          this.count = e
        }
      }
      var No, Ro
      function Do (e) {
        if (void 0 === e) return ui('GRPC error has no .code'), gi.UNKNOWN
        switch (e) {
          case No.OK:
            return gi.OK
          case No.CANCELLED:
            return gi.CANCELLED
          case No.UNKNOWN:
            return gi.UNKNOWN
          case No.DEADLINE_EXCEEDED:
            return gi.DEADLINE_EXCEEDED
          case No.RESOURCE_EXHAUSTED:
            return gi.RESOURCE_EXHAUSTED
          case No.INTERNAL:
            return gi.INTERNAL
          case No.UNAVAILABLE:
            return gi.UNAVAILABLE
          case No.UNAUTHENTICATED:
            return gi.UNAUTHENTICATED
          case No.INVALID_ARGUMENT:
            return gi.INVALID_ARGUMENT
          case No.NOT_FOUND:
            return gi.NOT_FOUND
          case No.ALREADY_EXISTS:
            return gi.ALREADY_EXISTS
          case No.PERMISSION_DENIED:
            return gi.PERMISSION_DENIED
          case No.FAILED_PRECONDITION:
            return gi.FAILED_PRECONDITION
          case No.ABORTED:
            return gi.ABORTED
          case No.OUT_OF_RANGE:
            return gi.OUT_OF_RANGE
          case No.UNIMPLEMENTED:
            return gi.UNIMPLEMENTED
          case No.DATA_LOSS:
            return gi.DATA_LOSS
          default:
            return fi()
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
        constructor (e, t) {
          ;(this.comparator = e), (this.root = t || Po.EMPTY)
        }
        insert (e, t) {
          return new Oo(
            this.comparator,
            this.root
              .insert(e, t, this.comparator)
              .copy(null, null, Po.BLACK, null, null)
          )
        }
        remove (e) {
          return new Oo(
            this.comparator,
            this.root
              .remove(e, this.comparator)
              .copy(null, null, Po.BLACK, null, null)
          )
        }
        get (e) {
          let t = this.root
          for (; !t.isEmpty(); ) {
            const n = this.comparator(e, t.key)
            if (0 === n) return t.value
            n < 0 ? (t = t.left) : n > 0 && (t = t.right)
          }
          return null
        }
        indexOf (e) {
          let t = 0,
            n = this.root
          for (; !n.isEmpty(); ) {
            const s = this.comparator(e, n.key)
            if (0 === s) return t + n.left.size
            s < 0 ? (n = n.left) : ((t += n.left.size + 1), (n = n.right))
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
        inorderTraversal (e) {
          return this.root.inorderTraversal(e)
        }
        forEach (e) {
          this.inorderTraversal((t, n) => (e(t, n), !1))
        }
        toString () {
          const e = []
          return (
            this.inorderTraversal((t, n) => (e.push(`${t}:${n}`), !1)),
            `{${e.join(', ')}}`
          )
        }
        reverseTraversal (e) {
          return this.root.reverseTraversal(e)
        }
        getIterator () {
          return new Lo(this.root, null, this.comparator, !1)
        }
        getIteratorFrom (e) {
          return new Lo(this.root, e, this.comparator, !1)
        }
        getReverseIterator () {
          return new Lo(this.root, null, this.comparator, !0)
        }
        getReverseIteratorFrom (e) {
          return new Lo(this.root, e, this.comparator, !0)
        }
      }
      class Lo {
        constructor (e, t, n, s) {
          ;(this.isReverse = s), (this.nodeStack = [])
          let i = 1
          for (; !e.isEmpty(); )
            if (((i = t ? n(e.key, t) : 1), s && (i *= -1), i < 0))
              e = this.isReverse ? e.left : e.right
            else {
              if (0 === i) {
                this.nodeStack.push(e)
                break
              }
              this.nodeStack.push(e), (e = this.isReverse ? e.right : e.left)
            }
        }
        getNext () {
          let e = this.nodeStack.pop()
          const t = { key: e.key, value: e.value }
          if (this.isReverse)
            for (e = e.left; !e.isEmpty(); )
              this.nodeStack.push(e), (e = e.right)
          else
            for (e = e.right; !e.isEmpty(); )
              this.nodeStack.push(e), (e = e.left)
          return t
        }
        hasNext () {
          return this.nodeStack.length > 0
        }
        peek () {
          if (0 === this.nodeStack.length) return null
          const e = this.nodeStack[this.nodeStack.length - 1]
          return { key: e.key, value: e.value }
        }
      }
      class Po {
        constructor (e, t, n, s, i) {
          ;(this.key = e),
            (this.value = t),
            (this.color = null != n ? n : Po.RED),
            (this.left = null != s ? s : Po.EMPTY),
            (this.right = null != i ? i : Po.EMPTY),
            (this.size = this.left.size + 1 + this.right.size)
        }
        copy (e, t, n, s, i) {
          return new Po(
            null != e ? e : this.key,
            null != t ? t : this.value,
            null != n ? n : this.color,
            null != s ? s : this.left,
            null != i ? i : this.right
          )
        }
        isEmpty () {
          return !1
        }
        inorderTraversal (e) {
          return (
            this.left.inorderTraversal(e) ||
            e(this.key, this.value) ||
            this.right.inorderTraversal(e)
          )
        }
        reverseTraversal (e) {
          return (
            this.right.reverseTraversal(e) ||
            e(this.key, this.value) ||
            this.left.reverseTraversal(e)
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
        insert (e, t, n) {
          let s = this
          const i = n(e, s.key)
          return (
            (s =
              i < 0
                ? s.copy(null, null, null, s.left.insert(e, t, n), null)
                : 0 === i
                ? s.copy(null, t, null, null, null)
                : s.copy(null, null, null, null, s.right.insert(e, t, n))),
            s.fixUp()
          )
        }
        removeMin () {
          if (this.left.isEmpty()) return Po.EMPTY
          let e = this
          return (
            e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()),
            (e = e.copy(null, null, null, e.left.removeMin(), null)),
            e.fixUp()
          )
        }
        remove (e, t) {
          let n,
            s = this
          if (t(e, s.key) < 0)
            s.left.isEmpty() ||
              s.left.isRed() ||
              s.left.left.isRed() ||
              (s = s.moveRedLeft()),
              (s = s.copy(null, null, null, s.left.remove(e, t), null))
          else {
            if (
              (s.left.isRed() && (s = s.rotateRight()),
              s.right.isEmpty() ||
                s.right.isRed() ||
                s.right.left.isRed() ||
                (s = s.moveRedRight()),
              0 === t(e, s.key))
            ) {
              if (s.right.isEmpty()) return Po.EMPTY
              ;(n = s.right.min()),
                (s = s.copy(n.key, n.value, null, null, s.right.removeMin()))
            }
            s = s.copy(null, null, null, null, s.right.remove(e, t))
          }
          return s.fixUp()
        }
        isRed () {
          return this.color
        }
        fixUp () {
          let e = this
          return (
            e.right.isRed() && !e.left.isRed() && (e = e.rotateLeft()),
            e.left.isRed() && e.left.left.isRed() && (e = e.rotateRight()),
            e.left.isRed() && e.right.isRed() && (e = e.colorFlip()),
            e
          )
        }
        moveRedLeft () {
          let e = this.colorFlip()
          return (
            e.right.left.isRed() &&
              ((e = e.copy(null, null, null, null, e.right.rotateRight())),
              (e = e.rotateLeft()),
              (e = e.colorFlip())),
            e
          )
        }
        moveRedRight () {
          let e = this.colorFlip()
          return (
            e.left.left.isRed() && ((e = e.rotateRight()), (e = e.colorFlip())),
            e
          )
        }
        rotateLeft () {
          const e = this.copy(null, null, Po.RED, null, this.right.left)
          return this.right.copy(null, null, this.color, e, null)
        }
        rotateRight () {
          const e = this.copy(null, null, Po.RED, this.left.right, null)
          return this.left.copy(null, null, this.color, null, e)
        }
        colorFlip () {
          const e = this.left.copy(null, null, !this.left.color, null, null),
            t = this.right.copy(null, null, !this.right.color, null, null)
          return this.copy(null, null, !this.color, e, t)
        }
        checkMaxDepth () {
          const e = this.check()
          return Math.pow(2, e) <= this.size + 1
        }
        check () {
          if (this.isRed() && this.left.isRed()) throw fi()
          if (this.right.isRed()) throw fi()
          const e = this.left.check()
          if (e !== this.right.check()) throw fi()
          return e + (this.isRed() ? 0 : 1)
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
            throw fi()
          }
          get value () {
            throw fi()
          }
          get color () {
            throw fi()
          }
          get left () {
            throw fi()
          }
          get right () {
            throw fi()
          }
          copy (e, t, n, s, i) {
            return this
          }
          insert (e, t, n) {
            return new Po(e, t)
          }
          remove (e, t) {
            return this
          }
          isEmpty () {
            return !0
          }
          inorderTraversal (e) {
            return !1
          }
          reverseTraversal (e) {
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
        constructor (e) {
          ;(this.comparator = e), (this.data = new Oo(this.comparator))
        }
        has (e) {
          return null !== this.data.get(e)
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
        indexOf (e) {
          return this.data.indexOf(e)
        }
        forEach (e) {
          this.data.inorderTraversal((t, n) => (e(t), !1))
        }
        forEachInRange (e, t) {
          const n = this.data.getIteratorFrom(e[0])
          for (; n.hasNext(); ) {
            const s = n.getNext()
            if (this.comparator(s.key, e[1]) >= 0) return
            t(s.key)
          }
        }
        forEachWhile (e, t) {
          let n
          for (
            n =
              void 0 !== t
                ? this.data.getIteratorFrom(t)
                : this.data.getIterator();
            n.hasNext();

          )
            if (!e(n.getNext().key)) return
        }
        firstAfterOrEqual (e) {
          const t = this.data.getIteratorFrom(e)
          return t.hasNext() ? t.getNext().key : null
        }
        getIterator () {
          return new xo(this.data.getIterator())
        }
        getIteratorFrom (e) {
          return new xo(this.data.getIteratorFrom(e))
        }
        add (e) {
          return this.copy(this.data.remove(e).insert(e, !0))
        }
        delete (e) {
          return this.has(e) ? this.copy(this.data.remove(e)) : this
        }
        isEmpty () {
          return this.data.isEmpty()
        }
        unionWith (e) {
          let t = this
          return (
            t.size < e.size && ((t = e), (e = this)),
            e.forEach(e => {
              t = t.add(e)
            }),
            t
          )
        }
        isEqual (e) {
          if (!(e instanceof Mo)) return !1
          if (this.size !== e.size) return !1
          const t = this.data.getIterator(),
            n = e.data.getIterator()
          for (; t.hasNext(); ) {
            const e = t.getNext().key,
              s = n.getNext().key
            if (0 !== this.comparator(e, s)) return !1
          }
          return !0
        }
        toArray () {
          const e = []
          return (
            this.forEach(t => {
              e.push(t)
            }),
            e
          )
        }
        toString () {
          const e = []
          return this.forEach(t => e.push(t)), 'SortedSet(' + e.toString() + ')'
        }
        copy (e) {
          const t = new Mo(this.comparator)
          return (t.data = e), t
        }
      }
      class xo {
        constructor (e) {
          this.iter = e
        }
        getNext () {
          return this.iter.getNext().key
        }
        hasNext () {
          return this.iter.hasNext()
        }
      }
      const Uo = new Oo(Yi.comparator)
      function Vo () {
        return Uo
      }
      const Fo = new Oo(Yi.comparator)
      function qo () {
        return Fo
      }
      const $o = new Oo(Yi.comparator)
      const jo = new Mo(Yi.comparator)
      function Bo (...e) {
        let t = jo
        for (const n of e) t = t.add(n)
        return t
      }
      const Ho = new Mo(Ni)
      function Ko () {
        return Ho
      }
      class zo {
        constructor (e, t, n, s, i) {
          ;(this.snapshotVersion = e),
            (this.targetChanges = t),
            (this.targetMismatches = n),
            (this.documentUpdates = s),
            (this.resolvedLimboDocuments = i)
        }
        static createSynthesizedRemoteEventForCurrentChange (e, t) {
          const n = new Map()
          return (
            n.set(e, Go.createSynthesizedTargetChangeForCurrentChange(e, t)),
            new zo(Oi.min(), n, Ko(), Vo(), Bo())
          )
        }
      }
      class Go {
        constructor (e, t, n, s, i) {
          ;(this.resumeToken = e),
            (this.current = t),
            (this.addedDocuments = n),
            (this.modifiedDocuments = s),
            (this.removedDocuments = i)
        }
        static createSynthesizedTargetChangeForCurrentChange (e, t) {
          return new Go($i.EMPTY_BYTE_STRING, t, Bo(), Bo(), Bo())
        }
      }
      class Wo {
        constructor (e, t, n, s) {
          ;(this.$ = e),
            (this.removedTargetIds = t),
            (this.key = n),
            (this.O = s)
        }
      }
      class Qo {
        constructor (e, t) {
          ;(this.targetId = e), (this.M = t)
        }
      }
      class Xo {
        constructor (e, t, n = $i.EMPTY_BYTE_STRING, s = null) {
          ;(this.state = e),
            (this.targetIds = t),
            (this.resumeToken = n),
            (this.cause = s)
        }
      }
      class Yo {
        constructor () {
          ;(this.F = 0),
            (this.L = ea()),
            (this.B = $i.EMPTY_BYTE_STRING),
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
        W (e) {
          e.approximateByteSize() > 0 && ((this.q = !0), (this.B = e))
        }
        G () {
          let e = Bo(),
            t = Bo(),
            n = Bo()
          return (
            this.L.forEach((s, i) => {
              switch (i) {
                case 0:
                  e = e.add(s)
                  break
                case 2:
                  t = t.add(s)
                  break
                case 1:
                  n = n.add(s)
                  break
                default:
                  fi()
              }
            }),
            new Go(this.B, this.U, e, t, n)
          )
        }
        H () {
          ;(this.q = !1), (this.L = ea())
        }
        J (e, t) {
          ;(this.q = !0), (this.L = this.L.insert(e, t))
        }
        Y (e) {
          ;(this.q = !0), (this.L = this.L.remove(e))
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
      class Jo {
        constructor (e) {
          ;(this.et = e),
            (this.nt = new Map()),
            (this.st = Vo()),
            (this.it = Zo()),
            (this.rt = new Mo(Ni))
        }
        ot (e) {
          for (const t of e.$)
            e.O && e.O.isFoundDocument()
              ? this.ct(t, e.O)
              : this.at(t, e.key, e.O)
          for (const t of e.removedTargetIds) this.at(t, e.key, e.O)
        }
        ut (e) {
          this.forEachTarget(e, t => {
            const n = this.ht(t)
            switch (e.state) {
              case 0:
                this.lt(t) && n.W(e.resumeToken)
                break
              case 1:
                n.Z(), n.K || n.H(), n.W(e.resumeToken)
                break
              case 2:
                n.Z(), n.K || this.removeTarget(t)
                break
              case 3:
                this.lt(t) && (n.tt(), n.W(e.resumeToken))
                break
              case 4:
                this.lt(t) && (this.ft(t), n.W(e.resumeToken))
                break
              default:
                fi()
            }
          })
        }
        forEachTarget (e, t) {
          e.targetIds.length > 0
            ? e.targetIds.forEach(t)
            : this.nt.forEach((e, n) => {
                this.lt(n) && t(n)
              })
        }
        dt (e) {
          const t = e.targetId,
            n = e.M.count,
            s = this.wt(t)
          if (s) {
            const e = s.target
            if (wr(e))
              if (0 === n) {
                const n = new Yi(e.path)
                this.at(t, n, pr.newNoDocument(n, Oi.min()))
              } else pi(1 === n)
            else this._t(t) !== n && (this.ft(t), (this.rt = this.rt.add(t)))
          }
        }
        gt (e) {
          const t = new Map()
          this.nt.forEach((n, s) => {
            const i = this.wt(s)
            if (i) {
              if (n.current && wr(i.target)) {
                const t = new Yi(i.target.path)
                null !== this.st.get(t) ||
                  this.yt(s, t) ||
                  this.at(s, t, pr.newNoDocument(t, e))
              }
              n.j && (t.set(s, n.G()), n.H())
            }
          })
          let n = Bo()
          this.it.forEach((e, t) => {
            let s = !0
            t.forEachWhile(e => {
              const t = this.wt(e)
              return !t || 2 === t.purpose || ((s = !1), !1)
            }),
              s && (n = n.add(e))
          })
          const s = new zo(e, t, this.rt, this.st, n)
          return (this.st = Vo()), (this.it = Zo()), (this.rt = new Mo(Ni)), s
        }
        ct (e, t) {
          if (!this.lt(e)) return
          const n = this.yt(e, t.key) ? 2 : 0
          this.ht(e).J(t.key, n),
            (this.st = this.st.insert(t.key, t)),
            (this.it = this.it.insert(t.key, this.Tt(t.key).add(e)))
        }
        at (e, t, n) {
          if (!this.lt(e)) return
          const s = this.ht(e)
          this.yt(e, t) ? s.J(t, 1) : s.Y(t),
            (this.it = this.it.insert(t, this.Tt(t).delete(e))),
            n && (this.st = this.st.insert(t, n))
        }
        removeTarget (e) {
          this.nt.delete(e)
        }
        _t (e) {
          const t = this.ht(e).G()
          return (
            this.et.getRemoteKeysForTarget(e).size +
            t.addedDocuments.size -
            t.removedDocuments.size
          )
        }
        X (e) {
          this.ht(e).X()
        }
        ht (e) {
          let t = this.nt.get(e)
          return t || ((t = new Yo()), this.nt.set(e, t)), t
        }
        Tt (e) {
          let t = this.it.get(e)
          return t || ((t = new Mo(Ni)), (this.it = this.it.insert(e, t))), t
        }
        lt (e) {
          const t = null !== this.wt(e)
          return (
            t || li('WatchChangeAggregator', 'Detected inactive target', e), t
          )
        }
        wt (e) {
          const t = this.nt.get(e)
          return t && t.K ? null : this.et.Et(e)
        }
        ft (e) {
          this.nt.set(e, new Yo()),
            this.et.getRemoteKeysForTarget(e).forEach(t => {
              this.at(e, t, null)
            })
        }
        yt (e, t) {
          return this.et.getRemoteKeysForTarget(e).has(t)
        }
      }
      function Zo () {
        return new Oo(Yi.comparator)
      }
      function ea () {
        return new Oo(Yi.comparator)
      }
      const ta = { asc: 'ASCENDING', desc: 'DESCENDING' },
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
      class sa {
        constructor (e, t) {
          ;(this.databaseId = e), (this.C = t)
        }
      }
      function ia (e, t) {
        return e.C
          ? `${new Date(1e3 * t.seconds)
              .toISOString()
              .replace(/\.\d*/, '')
              .replace('Z', '')}.${('000000000' + t.nanoseconds).slice(-9)}Z`
          : { seconds: '' + t.seconds, nanos: t.nanoseconds }
      }
      function ra (e, t) {
        return e.C ? t.toBase64() : t.toUint8Array()
      }
      function oa (e, t) {
        return ia(e, t.toTimestamp())
      }
      function aa (e) {
        return (
          pi(!!e),
          Oi.fromTimestamp(
            (function (e) {
              const t = Bi(e)
              return new Di(t.seconds, t.nanos)
            })(e)
          )
        )
      }
      function ca (e, t) {
        return (function (e) {
          return new Ui(['projects', e.projectId, 'databases', e.database])
        })(e)
          .child('documents')
          .child(t)
          .canonicalString()
      }
      function la (e) {
        const t = Ui.fromString(e)
        return pi(Na(t)), t
      }
      function ua (e, t) {
        return ca(e.databaseId, t.path)
      }
      function ha (e, t) {
        const n = la(t)
        if (n.get(1) !== e.databaseId.projectId)
          throw new yi(
            gi.INVALID_ARGUMENT,
            'Tried to deserialize key from different project: ' +
              n.get(1) +
              ' vs ' +
              e.databaseId.projectId
          )
        if (n.get(3) !== e.databaseId.database)
          throw new yi(
            gi.INVALID_ARGUMENT,
            'Tried to deserialize key from different database: ' +
              n.get(3) +
              ' vs ' +
              e.databaseId.database
          )
        return new Yi(pa(n))
      }
      function da (e, t) {
        return ca(e.databaseId, t)
      }
      function fa (e) {
        return new Ui([
          'projects',
          e.databaseId.projectId,
          'databases',
          e.databaseId.database
        ]).canonicalString()
      }
      function pa (e) {
        return pi(e.length > 4 && 'documents' === e.get(4)), e.popFirst(5)
      }
      function ma (e, t, n) {
        return { name: ua(e, t), fields: n.value.mapValue.fields }
      }
      function ga (e, t) {
        return { documents: [da(e, t.path)] }
      }
      function ya (e, t) {
        const n = { structuredQuery: {} },
          s = t.path
        null !== t.collectionGroup
          ? ((n.parent = da(e, s)),
            (n.structuredQuery.from = [
              { collectionId: t.collectionGroup, allDescendants: !0 }
            ]))
          : ((n.parent = da(e, s.popLast())),
            (n.structuredQuery.from = [{ collectionId: s.lastSegment() }]))
        const i = (function (e) {
          if (0 === e.length) return
          const t = e.map(e =>
            (function (e) {
              if ('==' === e.op) {
                if (lr(e.value))
                  return { unaryFilter: { field: _a(e.field), op: 'IS_NAN' } }
                if (cr(e.value))
                  return { unaryFilter: { field: _a(e.field), op: 'IS_NULL' } }
              } else if ('!=' === e.op) {
                if (lr(e.value))
                  return {
                    unaryFilter: { field: _a(e.field), op: 'IS_NOT_NAN' }
                  }
                if (cr(e.value))
                  return {
                    unaryFilter: { field: _a(e.field), op: 'IS_NOT_NULL' }
                  }
              }
              return {
                fieldFilter: {
                  field: _a(e.field),
                  op: ba(e.op),
                  value: e.value
                }
              }
            })(e)
          )
          return 1 === t.length
            ? t[0]
            : { compositeFilter: { op: 'AND', filters: t } }
        })(t.filters)
        i && (n.structuredQuery.where = i)
        const r = (function (e) {
          if (0 !== e.length)
            return e.map(e =>
              (function (e) {
                return { field: _a(e.field), direction: Ea(e.dir) }
              })(e)
            )
        })(t.orderBy)
        r && (n.structuredQuery.orderBy = r)
        const o = (function (e, t) {
          return e.C || Qi(t) ? t : { value: t }
        })(e, t.limit)
        return (
          null !== o && (n.structuredQuery.limit = o),
          t.startAt && (n.structuredQuery.startAt = Ia(t.startAt)),
          t.endAt && (n.structuredQuery.endAt = Ia(t.endAt)),
          n
        )
      }
      function va (e) {
        let t = (function (e) {
          const t = la(e)
          return 4 === t.length ? Ui.emptyPath() : pa(t)
        })(e.parent)
        const n = e.structuredQuery,
          s = n.from ? n.from.length : 0
        let i = null
        if (s > 0) {
          pi(1 === s)
          const e = n.from[0]
          e.allDescendants
            ? (i = e.collectionId)
            : (t = t.child(e.collectionId))
        }
        let r = []
        n.where && (r = wa(n.where))
        let o = []
        n.orderBy &&
          (o = n.orderBy.map(e =>
            (function (e) {
              return new Dr(
                Sa(e.field),
                (function (e) {
                  switch (e) {
                    case 'ASCENDING':
                      return 'asc'
                    case 'DESCENDING':
                      return 'desc'
                    default:
                      return
                  }
                })(e.direction)
              )
            })(e)
          ))
        let a = null
        n.limit &&
          (a = (function (e) {
            let t
            return (t = 'object' == typeof e ? e.value : e), Qi(t) ? null : t
          })(n.limit))
        let c = null
        n.startAt && (c = Ta(n.startAt))
        let l = null
        return (
          n.endAt && (l = Ta(n.endAt)),
          (function (e, t, n, s, i, r, o, a) {
            return new Mr(e, t, n, s, i, r, o, a)
          })(t, i, o, r, a, 'F', c, l)
        )
      }
      function wa (e) {
        return e
          ? void 0 !== e.unaryFilter
            ? [Aa(e)]
            : void 0 !== e.fieldFilter
            ? [ka(e)]
            : void 0 !== e.compositeFilter
            ? e.compositeFilter.filters
                .map(e => wa(e))
                .reduce((e, t) => e.concat(t))
            : fi()
          : []
      }
      function Ia (e) {
        return { before: e.before, values: e.position }
      }
      function Ta (e) {
        const t = !!e.before,
          n = e.values || []
        return new Nr(n, t)
      }
      function Ea (e) {
        return ta[e]
      }
      function ba (e) {
        return na[e]
      }
      function _a (e) {
        return { fieldPath: e.canonicalString() }
      }
      function Sa (e) {
        return Fi.fromServerFormat(e.fieldPath)
      }
      function ka (e) {
        return Ir.create(
          Sa(e.fieldFilter.field),
          (function (e) {
            switch (e) {
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
                return fi()
            }
          })(e.fieldFilter.op),
          e.fieldFilter.value
        )
      }
      function Aa (e) {
        switch (e.unaryFilter.op) {
          case 'IS_NAN':
            const t = Sa(e.unaryFilter.field)
            return Ir.create(t, '==', { doubleValue: NaN })
          case 'IS_NULL':
            const n = Sa(e.unaryFilter.field)
            return Ir.create(n, '==', { nullValue: 'NULL_VALUE' })
          case 'IS_NOT_NAN':
            const s = Sa(e.unaryFilter.field)
            return Ir.create(s, '!=', { doubleValue: NaN })
          case 'IS_NOT_NULL':
            const i = Sa(e.unaryFilter.field)
            return Ir.create(i, '!=', { nullValue: 'NULL_VALUE' })
          default:
            return fi()
        }
      }
      function Ca (e) {
        const t = []
        return (
          e.fields.forEach(e => t.push(e.canonicalString())), { fieldPaths: t }
        )
      }
      function Na (e) {
        return (
          e.length >= 4 && 'projects' === e.get(0) && 'databases' === e.get(2)
        )
      }
      function Ra (e) {
        let t = ''
        for (let n = 0; n < e.length; n++)
          t.length > 0 && (t = Oa(t)), (t = Da(e.get(n), t))
        return Oa(t)
      }
      function Da (e, t) {
        let n = t
        const s = e.length
        for (let t = 0; t < s; t++) {
          const s = e.charAt(t)
          switch (s) {
            case '\0':
              n += ''
              break
            case '':
              n += ''
              break
            default:
              n += s
          }
        }
        return n
      }
      function Oa (e) {
        return e + ''
      }
      class La {
        constructor (e, t, n) {
          ;(this.ownerId = e),
            (this.allowTabSynchronization = t),
            (this.leaseTimestampMs = n)
        }
      }
      ;(La.store = 'owner'), (La.key = 'owner')
      class Pa {
        constructor (e, t, n) {
          ;(this.userId = e),
            (this.lastAcknowledgedBatchId = t),
            (this.lastStreamToken = n)
        }
      }
      ;(Pa.store = 'mutationQueues'), (Pa.keyPath = 'userId')
      class Ma {
        constructor (e, t, n, s, i) {
          ;(this.userId = e),
            (this.batchId = t),
            (this.localWriteTimeMs = n),
            (this.baseMutations = s),
            (this.mutations = i)
        }
      }
      ;(Ma.store = 'mutations'),
        (Ma.keyPath = 'batchId'),
        (Ma.userMutationsIndex = 'userMutationsIndex'),
        (Ma.userMutationsKeyPath = ['userId', 'batchId'])
      class xa {
        constructor () {}
        static prefixForUser (e) {
          return [e]
        }
        static prefixForPath (e, t) {
          return [e, Ra(t)]
        }
        static key (e, t, n) {
          return [e, Ra(t), n]
        }
      }
      ;(xa.store = 'documentMutations'), (xa.PLACEHOLDER = new xa())
      class Ua {
        constructor (e, t, n, s, i, r) {
          ;(this.unknownDocument = e),
            (this.noDocument = t),
            (this.document = n),
            (this.hasCommittedMutations = s),
            (this.readTime = i),
            (this.parentPath = r)
        }
      }
      ;(Ua.store = 'remoteDocuments'),
        (Ua.readTimeIndex = 'readTimeIndex'),
        (Ua.readTimeIndexPath = 'readTime'),
        (Ua.collectionReadTimeIndex = 'collectionReadTimeIndex'),
        (Ua.collectionReadTimeIndexPath = ['parentPath', 'readTime'])
      class Va {
        constructor (e) {
          this.byteSize = e
        }
      }
      ;(Va.store = 'remoteDocumentGlobal'), (Va.key = 'remoteDocumentGlobalKey')
      class Fa {
        constructor (e, t, n, s, i, r, o) {
          ;(this.targetId = e),
            (this.canonicalId = t),
            (this.readTime = n),
            (this.resumeToken = s),
            (this.lastListenSequenceNumber = i),
            (this.lastLimboFreeSnapshotVersion = r),
            (this.query = o)
        }
      }
      ;(Fa.store = 'targets'),
        (Fa.keyPath = 'targetId'),
        (Fa.queryTargetsIndexName = 'queryTargetsIndex'),
        (Fa.queryTargetsKeyPath = ['canonicalId', 'targetId'])
      class qa {
        constructor (e, t, n) {
          ;(this.targetId = e), (this.path = t), (this.sequenceNumber = n)
        }
      }
      ;(qa.store = 'targetDocuments'),
        (qa.keyPath = ['targetId', 'path']),
        (qa.documentTargetsIndex = 'documentTargetsIndex'),
        (qa.documentTargetsKeyPath = ['path', 'targetId'])
      class $a {
        constructor (e, t, n, s) {
          ;(this.highestTargetId = e),
            (this.highestListenSequenceNumber = t),
            (this.lastRemoteSnapshotVersion = n),
            (this.targetCount = s)
        }
      }
      ;($a.key = 'targetGlobalKey'), ($a.store = 'targetGlobal')
      class ja {
        constructor (e, t) {
          ;(this.collectionId = e), (this.parent = t)
        }
      }
      ;(ja.store = 'collectionParents'),
        (ja.keyPath = ['collectionId', 'parent'])
      class Ba {
        constructor (e, t, n, s) {
          ;(this.clientId = e),
            (this.updateTimeMs = t),
            (this.networkEnabled = n),
            (this.inForeground = s)
        }
      }
      ;(Ba.store = 'clientMetadata'), (Ba.keyPath = 'clientId')
      class Ha {
        constructor (e, t, n) {
          ;(this.bundleId = e), (this.createTime = t), (this.version = n)
        }
      }
      ;(Ha.store = 'bundles'), (Ha.keyPath = 'bundleId')
      class Ka {
        constructor (e, t, n) {
          ;(this.name = e), (this.readTime = t), (this.bundledQuery = n)
        }
      }
      ;(Ka.store = 'namedQueries'),
        (Ka.keyPath = 'name'),
        Pa.store,
        Ma.store,
        xa.store,
        Ua.store,
        Fa.store,
        La.store,
        $a.store,
        qa.store,
        Ba.store,
        Va.store,
        ja.store,
        Ha.store,
        Ka.store
      class za {
        constructor (e) {
          ;(this.nextCallback = null),
            (this.catchCallback = null),
            (this.result = void 0),
            (this.error = void 0),
            (this.isDone = !1),
            (this.callbackAttached = !1),
            e(
              e => {
                ;(this.isDone = !0),
                  (this.result = e),
                  this.nextCallback && this.nextCallback(e)
              },
              e => {
                ;(this.isDone = !0),
                  (this.error = e),
                  this.catchCallback && this.catchCallback(e)
              }
            )
        }
        catch (e) {
          return this.next(void 0, e)
        }
        next (e, t) {
          return (
            this.callbackAttached && fi(),
            (this.callbackAttached = !0),
            this.isDone
              ? this.error
                ? this.wrapFailure(t, this.error)
                : this.wrapSuccess(e, this.result)
              : new za((n, s) => {
                  ;(this.nextCallback = t => {
                    this.wrapSuccess(e, t).next(n, s)
                  }),
                    (this.catchCallback = e => {
                      this.wrapFailure(t, e).next(n, s)
                    })
                })
          )
        }
        toPromise () {
          return new Promise((e, t) => {
            this.next(e, t)
          })
        }
        wrapUserFunction (e) {
          try {
            const t = e()
            return t instanceof za ? t : za.resolve(t)
          } catch (e) {
            return za.reject(e)
          }
        }
        wrapSuccess (e, t) {
          return e ? this.wrapUserFunction(() => e(t)) : za.resolve(t)
        }
        wrapFailure (e, t) {
          return e ? this.wrapUserFunction(() => e(t)) : za.reject(t)
        }
        static resolve (e) {
          return new za((t, n) => {
            t(e)
          })
        }
        static reject (e) {
          return new za((t, n) => {
            n(e)
          })
        }
        static waitFor (e) {
          return new za((t, n) => {
            let s = 0,
              i = 0,
              r = !1
            e.forEach(e => {
              ++s,
                e.next(
                  () => {
                    ++i, r && i === s && t()
                  },
                  e => n(e)
                )
            }),
              (r = !0),
              i === s && t()
          })
        }
        static or (e) {
          let t = za.resolve(!1)
          for (const n of e) t = t.next(e => (e ? za.resolve(e) : n()))
          return t
        }
        static forEach (e, t) {
          const n = []
          return (
            e.forEach((e, s) => {
              n.push(t.call(this, e, s))
            }),
            this.waitFor(n)
          )
        }
      }
      function Ga (e) {
        return 'IndexedDbTransactionError' === e.name
      }
      class Wa {
        constructor (e, t, n, s) {
          ;(this.batchId = e),
            (this.localWriteTime = t),
            (this.baseMutations = n),
            (this.mutations = s)
        }
        applyToRemoteDocument (e, t) {
          const n = t.mutationResults
          for (let t = 0; t < this.mutations.length; t++) {
            const s = this.mutations[t]
            s.key.isEqual(e.key) && go(s, e, n[t])
          }
        }
        applyToLocalView (e) {
          for (const t of this.baseMutations)
            t.key.isEqual(e.key) && yo(t, e, this.localWriteTime)
          for (const t of this.mutations)
            t.key.isEqual(e.key) && yo(t, e, this.localWriteTime)
        }
        applyToLocalDocumentSet (e) {
          this.mutations.forEach(t => {
            const n = e.get(t.key),
              s = n
            this.applyToLocalView(s),
              n.isValidDocument() || s.convertToNoDocument(Oi.min())
          })
        }
        keys () {
          return this.mutations.reduce((e, t) => e.add(t.key), Bo())
        }
        isEqual (e) {
          return (
            this.batchId === e.batchId &&
            Ri(this.mutations, e.mutations, (e, t) => wo(e, t)) &&
            Ri(this.baseMutations, e.baseMutations, (e, t) => wo(e, t))
          )
        }
      }
      class Qa {
        constructor (e, t, n, s) {
          ;(this.batch = e),
            (this.commitVersion = t),
            (this.mutationResults = n),
            (this.docVersions = s)
        }
        static from (e, t, n) {
          pi(e.mutations.length === n.length)
          let s = $o
          const i = e.mutations
          for (let e = 0; e < i.length; e++)
            s = s.insert(i[e].key, n[e].version)
          return new Qa(e, t, n, s)
        }
      }
      class Xa {
        constructor (
          e,
          t,
          n,
          s,
          i = Oi.min(),
          r = Oi.min(),
          o = $i.EMPTY_BYTE_STRING
        ) {
          ;(this.target = e),
            (this.targetId = t),
            (this.purpose = n),
            (this.sequenceNumber = s),
            (this.snapshotVersion = i),
            (this.lastLimboFreeSnapshotVersion = r),
            (this.resumeToken = o)
        }
        withSequenceNumber (e) {
          return new Xa(
            this.target,
            this.targetId,
            this.purpose,
            e,
            this.snapshotVersion,
            this.lastLimboFreeSnapshotVersion,
            this.resumeToken
          )
        }
        withResumeToken (e, t) {
          return new Xa(
            this.target,
            this.targetId,
            this.purpose,
            this.sequenceNumber,
            t,
            this.lastLimboFreeSnapshotVersion,
            e
          )
        }
        withLastLimboFreeSnapshotVersion (e) {
          return new Xa(
            this.target,
            this.targetId,
            this.purpose,
            this.sequenceNumber,
            this.snapshotVersion,
            e,
            this.resumeToken
          )
        }
      }
      class Ya {
        constructor (e) {
          this.Gt = e
        }
      }
      function Ja (e) {
        const t = va({ parent: e.parent, structuredQuery: e.structuredQuery })
        return 'LAST' === e.limitType
          ? (function (e, t, n) {
              return new Mr(
                e.path,
                e.collectionGroup,
                e.explicitOrderBy.slice(),
                e.filters.slice(),
                t,
                n,
                e.startAt,
                e.endAt
              )
            })(t, t.limit, 'L')
          : t
      }
      class Za {
        constructor () {
          this.zt = new ec()
        }
        addToCollectionParentIndex (e, t) {
          return this.zt.add(t), za.resolve()
        }
        getCollectionParents (e, t) {
          return za.resolve(this.zt.getEntries(t))
        }
      }
      class ec {
        constructor () {
          this.index = {}
        }
        add (e) {
          const t = e.lastSegment(),
            n = e.popLast(),
            s = this.index[t] || new Mo(Ui.comparator),
            i = !s.has(n)
          return (this.index[t] = s.add(n)), i
        }
        has (e) {
          const t = e.lastSegment(),
            n = e.popLast(),
            s = this.index[t]
          return s && s.has(n)
        }
        getEntries (e) {
          return (this.index[e] || new Mo(Ui.comparator)).toArray()
        }
      }
      class tc {
        constructor (e, t, n) {
          ;(this.cacheSizeCollectionThreshold = e),
            (this.percentileToCollect = t),
            (this.maximumSequenceNumbersToCollect = n)
        }
        static withCacheSize (e) {
          return new tc(
            e,
            tc.DEFAULT_COLLECTION_PERCENTILE,
            tc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT
          )
        }
      }
      ;(tc.DEFAULT_COLLECTION_PERCENTILE = 10),
        (tc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3),
        (tc.DEFAULT = new tc(
          41943040,
          tc.DEFAULT_COLLECTION_PERCENTILE,
          tc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT
        )),
        (tc.DISABLED = new tc(-1, 0, 0))
      class nc {
        constructor (e) {
          this.se = e
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
      async function sc (e) {
        if (
          e.code !== gi.FAILED_PRECONDITION ||
          'The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.' !==
            e.message
        )
          throw e
        li('LocalStore', 'Unexpectedly lost primary lease')
      }
      class ic {
        constructor (e, t) {
          ;(this.mapKeyFn = e), (this.equalsFn = t), (this.inner = {})
        }
        get (e) {
          const t = this.mapKeyFn(e),
            n = this.inner[t]
          if (void 0 !== n)
            for (const [t, s] of n) if (this.equalsFn(t, e)) return s
        }
        has (e) {
          return void 0 !== this.get(e)
        }
        set (e, t) {
          const n = this.mapKeyFn(e),
            s = this.inner[n]
          if (void 0 !== s) {
            for (let n = 0; n < s.length; n++)
              if (this.equalsFn(s[n][0], e)) return void (s[n] = [e, t])
            s.push([e, t])
          } else this.inner[n] = [[e, t]]
        }
        delete (e) {
          const t = this.mapKeyFn(e),
            n = this.inner[t]
          if (void 0 === n) return !1
          for (let s = 0; s < n.length; s++)
            if (this.equalsFn(n[s][0], e))
              return 1 === n.length ? delete this.inner[t] : n.splice(s, 1), !0
          return !1
        }
        forEach (e) {
          Pi(this.inner, (t, n) => {
            for (const [t, s] of n) e(t, s)
          })
        }
        isEmpty () {
          return Mi(this.inner)
        }
      }
      class rc {
        constructor (e, t, n) {
          ;(this.Je = e), (this.An = t), (this.Jt = n)
        }
        Rn (e, t) {
          return this.An.getAllMutationBatchesAffectingDocumentKey(e, t).next(
            n => this.bn(e, t, n)
          )
        }
        bn (e, t, n) {
          return this.Je.getEntry(e, t).next(e => {
            for (const t of n) t.applyToLocalView(e)
            return e
          })
        }
        Pn (e, t) {
          e.forEach((e, n) => {
            for (const e of t) e.applyToLocalView(n)
          })
        }
        vn (e, t) {
          return this.Je.getEntries(e, t).next(t => this.Vn(e, t).next(() => t))
        }
        Vn (e, t) {
          return this.An.getAllMutationBatchesAffectingDocumentKeys(e, t).next(
            e => this.Pn(t, e)
          )
        }
        getDocumentsMatchingQuery (e, t, n) {
          return (function (e) {
            return (
              Yi.isDocumentKey(e.path) &&
              null === e.collectionGroup &&
              0 === e.filters.length
            )
          })(t)
            ? this.Sn(e, t.path)
            : $r(t)
            ? this.Dn(e, t, n)
            : this.Cn(e, t, n)
        }
        Sn (e, t) {
          return this.Rn(e, new Yi(t)).next(e => {
            let t = qo()
            return e.isFoundDocument() && (t = t.insert(e.key, e)), t
          })
        }
        Dn (e, t, n) {
          const s = t.collectionGroup
          let i = qo()
          return this.Jt.getCollectionParents(e, s).next(r =>
            za
              .forEach(r, r => {
                const o = (function (e, t) {
                  return new Mr(
                    t,
                    null,
                    e.explicitOrderBy.slice(),
                    e.filters.slice(),
                    e.limit,
                    e.limitType,
                    e.startAt,
                    e.endAt
                  )
                })(t, r.child(s))
                return this.Cn(e, o, n).next(e => {
                  e.forEach((e, t) => {
                    i = i.insert(e, t)
                  })
                })
              })
              .next(() => i)
          )
        }
        Cn (e, t, n) {
          let s, i
          return this.Je.getDocumentsMatchingQuery(e, t, n)
            .next(
              n => ((s = n), this.An.getAllMutationBatchesAffectingQuery(e, t))
            )
            .next(
              t => (
                (i = t),
                this.Nn(e, i, s).next(e => {
                  s = e
                  for (const e of i)
                    for (const t of e.mutations) {
                      const n = t.key
                      let i = s.get(n)
                      null == i &&
                        ((i = pr.newInvalidDocument(n)), (s = s.insert(n, i))),
                        yo(t, i, e.localWriteTime),
                        i.isFoundDocument() || (s = s.remove(n))
                    }
                })
              )
            )
            .next(
              () => (
                s.forEach((e, n) => {
                  Gr(t, n) || (s = s.remove(e))
                }),
                s
              )
            )
        }
        Nn (e, t, n) {
          let s = Bo()
          for (const e of t)
            for (const t of e.mutations)
              t instanceof Eo && null === n.get(t.key) && (s = s.add(t.key))
          let i = n
          return this.Je.getEntries(e, s).next(
            e => (
              e.forEach((e, t) => {
                t.isFoundDocument() && (i = i.insert(e, t))
              }),
              i
            )
          )
        }
      }
      class oc {
        constructor (e, t, n, s) {
          ;(this.targetId = e),
            (this.fromCache = t),
            (this.kn = n),
            (this.xn = s)
        }
        static $n (e, t) {
          let n = Bo(),
            s = Bo()
          for (const e of t.docChanges)
            switch (e.type) {
              case 0:
                n = n.add(e.doc.key)
                break
              case 1:
                s = s.add(e.doc.key)
            }
          return new oc(e, t.fromCache, n, s)
        }
      }
      class ac {
        On (e) {
          this.Mn = e
        }
        getDocumentsMatchingQuery (e, t, n, s) {
          return (function (e) {
            return (
              0 === e.filters.length &&
              null === e.limit &&
              null == e.startAt &&
              null == e.endAt &&
              (0 === e.explicitOrderBy.length ||
                (1 === e.explicitOrderBy.length &&
                  e.explicitOrderBy[0].field.isKeyField()))
            )
          })(t) || n.isEqual(Oi.min())
            ? this.Fn(e, t)
            : this.Mn.vn(e, s).next(i => {
                const r = this.Ln(t, i)
                return (Ur(t) || Vr(t)) && this.Bn(t.limitType, r, s, n)
                  ? this.Fn(e, t)
                  : (ci() <= _.DEBUG &&
                      li(
                        'QueryEngine',
                        'Re-using previous result from %s to execute query: %s',
                        n.toString(),
                        zr(t)
                      ),
                    this.Mn.getDocumentsMatchingQuery(e, t, n).next(
                      e => (
                        r.forEach(t => {
                          e = e.insert(t.key, t)
                        }),
                        e
                      )
                    ))
              })
        }
        Ln (e, t) {
          let n = new Mo(Wr(e))
          return (
            t.forEach((t, s) => {
              Gr(e, s) && (n = n.add(s))
            }),
            n
          )
        }
        Bn (e, t, n, s) {
          if (n.size !== t.size) return !0
          const i = 'F' === e ? t.last() : t.first()
          return !!i && (i.hasPendingWrites || i.version.compareTo(s) > 0)
        }
        Fn (e, t) {
          return (
            ci() <= _.DEBUG &&
              li(
                'QueryEngine',
                'Using full collection scan to execute query:',
                zr(t)
              ),
            this.Mn.getDocumentsMatchingQuery(e, t, Oi.min())
          )
        }
      }
      class cc {
        constructor (e, t, n, s) {
          ;(this.persistence = e),
            (this.Un = t),
            (this.k = s),
            (this.qn = new Oo(Ni)),
            (this.Kn = new ic(e => yr(e), vr)),
            (this.jn = Oi.min()),
            (this.An = e.getMutationQueue(n)),
            (this.Qn = e.getRemoteDocumentCache()),
            (this.He = e.getTargetCache()),
            (this.Wn = new rc(
              this.Qn,
              this.An,
              this.persistence.getIndexManager()
            )),
            (this.Ye = e.getBundleCache()),
            this.Un.On(this.Wn)
        }
        collectGarbage (e) {
          return this.persistence.runTransaction(
            'Collect garbage',
            'readwrite-primary',
            t => e.collect(t, this.qn)
          )
        }
      }
      async function lc (e, t) {
        const n = mi(e)
        let s = n.An,
          i = n.Wn
        const r = await n.persistence.runTransaction(
          'Handle user change',
          'readonly',
          e => {
            let r
            return n.An.getAllMutationBatches(e)
              .next(
                o => (
                  (r = o),
                  (s = n.persistence.getMutationQueue(t)),
                  (i = new rc(n.Qn, s, n.persistence.getIndexManager())),
                  s.getAllMutationBatches(e)
                )
              )
              .next(t => {
                const n = [],
                  s = []
                let o = Bo()
                for (const e of r) {
                  n.push(e.batchId)
                  for (const t of e.mutations) o = o.add(t.key)
                }
                for (const e of t) {
                  s.push(e.batchId)
                  for (const t of e.mutations) o = o.add(t.key)
                }
                return i
                  .vn(e, o)
                  .next(e => ({ Gn: e, removedBatchIds: n, addedBatchIds: s }))
              })
          }
        )
        return (n.An = s), (n.Wn = i), n.Un.On(n.Wn), r
      }
      function uc (e) {
        const t = mi(e)
        return t.persistence.runTransaction(
          'Get last remote snapshot version',
          'readonly',
          e => t.He.getLastRemoteSnapshotVersion(e)
        )
      }
      function hc (e, t) {
        const n = mi(e)
        return n.persistence.runTransaction(
          'Get next mutation batch',
          'readonly',
          e => (
            void 0 === t && (t = -1),
            n.An.getNextMutationBatchAfterBatchId(e, t)
          )
        )
      }
      async function dc (e, t, n) {
        const s = mi(e),
          i = s.qn.get(t),
          r = n ? 'readwrite' : 'readwrite-primary'
        try {
          n ||
            (await s.persistence.runTransaction('Release target', r, e =>
              s.persistence.referenceDelegate.removeTarget(e, i)
            ))
        } catch (e) {
          if (!Ga(e)) throw e
          li(
            'LocalStore',
            `Failed to update sequence numbers for target ${t}: ${e}`
          )
        }
        ;(s.qn = s.qn.remove(t)), s.Kn.delete(i.target)
      }
      function fc (e, t, n) {
        const s = mi(e)
        let i = Oi.min(),
          r = Bo()
        return s.persistence.runTransaction('Execute query', 'readonly', e =>
          (function (e, t, n) {
            const s = mi(e),
              i = s.Kn.get(n)
            return void 0 !== i
              ? za.resolve(s.qn.get(i))
              : s.He.getTargetData(t, n)
          })(s, e, Br(t))
            .next(t => {
              if (t)
                return (
                  (i = t.lastLimboFreeSnapshotVersion),
                  s.He.getMatchingKeysForTargetId(e, t.targetId).next(e => {
                    r = e
                  })
                )
            })
            .next(() =>
              s.Un.getDocumentsMatchingQuery(
                e,
                t,
                n ? i : Oi.min(),
                n ? r : Bo()
              )
            )
            .next(e => ({ documents: e, zn: r }))
        )
      }
      class pc {
        constructor (e) {
          ;(this.k = e), (this.Xn = new Map()), (this.Zn = new Map())
        }
        getBundleMetadata (e, t) {
          return za.resolve(this.Xn.get(t))
        }
        saveBundleMetadata (e, t) {
          var n
          return (
            this.Xn.set(t.id, {
              id: (n = t).id,
              version: n.version,
              createTime: aa(n.createTime)
            }),
            za.resolve()
          )
        }
        getNamedQuery (e, t) {
          return za.resolve(this.Zn.get(t))
        }
        saveNamedQuery (e, t) {
          return (
            this.Zn.set(
              t.name,
              (function (e) {
                return {
                  name: e.name,
                  query: Ja(e.bundledQuery),
                  readTime: aa(e.readTime)
                }
              })(t)
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
        addReference (e, t) {
          const n = new gc(e, t)
          ;(this.ts = this.ts.add(n)), (this.ns = this.ns.add(n))
        }
        rs (e, t) {
          e.forEach(e => this.addReference(e, t))
        }
        removeReference (e, t) {
          this.os(new gc(e, t))
        }
        cs (e, t) {
          e.forEach(e => this.removeReference(e, t))
        }
        us (e) {
          const t = new Yi(new Ui([])),
            n = new gc(t, e),
            s = new gc(t, e + 1),
            i = []
          return (
            this.ns.forEachInRange([n, s], e => {
              this.os(e), i.push(e.key)
            }),
            i
          )
        }
        hs () {
          this.ts.forEach(e => this.os(e))
        }
        os (e) {
          ;(this.ts = this.ts.delete(e)), (this.ns = this.ns.delete(e))
        }
        ls (e) {
          const t = new Yi(new Ui([])),
            n = new gc(t, e),
            s = new gc(t, e + 1)
          let i = Bo()
          return (
            this.ns.forEachInRange([n, s], e => {
              i = i.add(e.key)
            }),
            i
          )
        }
        containsKey (e) {
          const t = new gc(e, 0),
            n = this.ts.firstAfterOrEqual(t)
          return null !== n && e.isEqual(n.key)
        }
      }
      class gc {
        constructor (e, t) {
          ;(this.key = e), (this.fs = t)
        }
        static es (e, t) {
          return Yi.comparator(e.key, t.key) || Ni(e.fs, t.fs)
        }
        static ss (e, t) {
          return Ni(e.fs, t.fs) || Yi.comparator(e.key, t.key)
        }
      }
      class yc {
        constructor (e, t) {
          ;(this.Jt = e),
            (this.referenceDelegate = t),
            (this.An = []),
            (this.ds = 1),
            (this.ws = new Mo(gc.es))
        }
        checkEmpty (e) {
          return za.resolve(0 === this.An.length)
        }
        addMutationBatch (e, t, n, s) {
          const i = this.ds
          this.ds++, this.An.length > 0 && this.An[this.An.length - 1]
          const r = new Wa(i, t, n, s)
          this.An.push(r)
          for (const t of s)
            (this.ws = this.ws.add(new gc(t.key, i))),
              this.Jt.addToCollectionParentIndex(e, t.key.path.popLast())
          return za.resolve(r)
        }
        lookupMutationBatch (e, t) {
          return za.resolve(this._s(t))
        }
        getNextMutationBatchAfterBatchId (e, t) {
          const n = t + 1,
            s = this.gs(n),
            i = s < 0 ? 0 : s
          return za.resolve(this.An.length > i ? this.An[i] : null)
        }
        getHighestUnacknowledgedBatchId () {
          return za.resolve(0 === this.An.length ? -1 : this.ds - 1)
        }
        getAllMutationBatches (e) {
          return za.resolve(this.An.slice())
        }
        getAllMutationBatchesAffectingDocumentKey (e, t) {
          const n = new gc(t, 0),
            s = new gc(t, Number.POSITIVE_INFINITY),
            i = []
          return (
            this.ws.forEachInRange([n, s], e => {
              const t = this._s(e.fs)
              i.push(t)
            }),
            za.resolve(i)
          )
        }
        getAllMutationBatchesAffectingDocumentKeys (e, t) {
          let n = new Mo(Ni)
          return (
            t.forEach(e => {
              const t = new gc(e, 0),
                s = new gc(e, Number.POSITIVE_INFINITY)
              this.ws.forEachInRange([t, s], e => {
                n = n.add(e.fs)
              })
            }),
            za.resolve(this.ys(n))
          )
        }
        getAllMutationBatchesAffectingQuery (e, t) {
          const n = t.path,
            s = n.length + 1
          let i = n
          Yi.isDocumentKey(i) || (i = i.child(''))
          const r = new gc(new Yi(i), 0)
          let o = new Mo(Ni)
          return (
            this.ws.forEachWhile(e => {
              const t = e.key.path
              return (
                !!n.isPrefixOf(t) && (t.length === s && (o = o.add(e.fs)), !0)
              )
            }, r),
            za.resolve(this.ys(o))
          )
        }
        ys (e) {
          const t = []
          return (
            e.forEach(e => {
              const n = this._s(e)
              null !== n && t.push(n)
            }),
            t
          )
        }
        removeMutationBatch (e, t) {
          pi(0 === this.ps(t.batchId, 'removed')), this.An.shift()
          let n = this.ws
          return za
            .forEach(t.mutations, s => {
              const i = new gc(s.key, t.batchId)
              return (
                (n = n.delete(i)),
                this.referenceDelegate.markPotentiallyOrphaned(e, s.key)
              )
            })
            .next(() => {
              this.ws = n
            })
        }
        ee (e) {}
        containsKey (e, t) {
          const n = new gc(t, 0),
            s = this.ws.firstAfterOrEqual(n)
          return za.resolve(t.isEqual(s && s.key))
        }
        performConsistencyCheck (e) {
          return this.An.length, za.resolve()
        }
        ps (e, t) {
          return this.gs(e)
        }
        gs (e) {
          return 0 === this.An.length ? 0 : e - this.An[0].batchId
        }
        _s (e) {
          const t = this.gs(e)
          return t < 0 || t >= this.An.length ? null : this.An[t]
        }
      }
      class vc {
        constructor (e, t) {
          ;(this.Jt = e),
            (this.Ts = t),
            (this.docs = new Oo(Yi.comparator)),
            (this.size = 0)
        }
        addEntry (e, t, n) {
          const s = t.key,
            i = this.docs.get(s),
            r = i ? i.size : 0,
            o = this.Ts(t)
          return (
            (this.docs = this.docs.insert(s, {
              document: t.mutableCopy(),
              size: o,
              readTime: n
            })),
            (this.size += o - r),
            this.Jt.addToCollectionParentIndex(e, s.path.popLast())
          )
        }
        removeEntry (e) {
          const t = this.docs.get(e)
          t && ((this.docs = this.docs.remove(e)), (this.size -= t.size))
        }
        getEntry (e, t) {
          const n = this.docs.get(t)
          return za.resolve(
            n ? n.document.mutableCopy() : pr.newInvalidDocument(t)
          )
        }
        getEntries (e, t) {
          let n = Vo()
          return (
            t.forEach(e => {
              const t = this.docs.get(e)
              n = n.insert(
                e,
                t ? t.document.mutableCopy() : pr.newInvalidDocument(e)
              )
            }),
            za.resolve(n)
          )
        }
        getDocumentsMatchingQuery (e, t, n) {
          let s = Vo()
          const i = new Yi(t.path.child('')),
            r = this.docs.getIteratorFrom(i)
          for (; r.hasNext(); ) {
            const {
              key: e,
              value: { document: i, readTime: o }
            } = r.getNext()
            if (!t.path.isPrefixOf(e.path)) break
            o.compareTo(n) <= 0 ||
              (Gr(t, i) && (s = s.insert(i.key, i.mutableCopy())))
          }
          return za.resolve(s)
        }
        Es (e, t) {
          return za.forEach(this.docs, e => t(e))
        }
        newChangeBuffer (e) {
          return new wc(this)
        }
        getSize (e) {
          return za.resolve(this.size)
        }
      }
      class wc extends class {
        constructor () {
          ;(this.changes = new ic(
            e => e.toString(),
            (e, t) => e.isEqual(t)
          )),
            (this.changesApplied = !1)
        }
        getReadTime (e) {
          const t = this.changes.get(e)
          return t ? t.readTime : Oi.min()
        }
        addEntry (e, t) {
          this.assertNotApplied(),
            this.changes.set(e.key, { document: e, readTime: t })
        }
        removeEntry (e, t = null) {
          this.assertNotApplied(),
            this.changes.set(e, {
              document: pr.newInvalidDocument(e),
              readTime: t
            })
        }
        getEntry (e, t) {
          this.assertNotApplied()
          const n = this.changes.get(t)
          return void 0 !== n ? za.resolve(n.document) : this.getFromCache(e, t)
        }
        getEntries (e, t) {
          return this.getAllFromCache(e, t)
        }
        apply (e) {
          return (
            this.assertNotApplied(),
            (this.changesApplied = !0),
            this.applyChanges(e)
          )
        }
        assertNotApplied () {}
      } {
        constructor (e) {
          super(), (this.De = e)
        }
        applyChanges (e) {
          const t = []
          return (
            this.changes.forEach((n, s) => {
              s.document.isValidDocument()
                ? t.push(this.De.addEntry(e, s.document, this.getReadTime(n)))
                : this.De.removeEntry(n)
            }),
            za.waitFor(t)
          )
        }
        getFromCache (e, t) {
          return this.De.getEntry(e, t)
        }
        getAllFromCache (e, t) {
          return this.De.getEntries(e, t)
        }
      }
      class Ic {
        constructor (e) {
          ;(this.persistence = e),
            (this.Is = new ic(e => yr(e), vr)),
            (this.lastRemoteSnapshotVersion = Oi.min()),
            (this.highestTargetId = 0),
            (this.As = 0),
            (this.Rs = new mc()),
            (this.targetCount = 0),
            (this.bs = nc.ie())
        }
        forEachTarget (e, t) {
          return this.Is.forEach((e, n) => t(n)), za.resolve()
        }
        getLastRemoteSnapshotVersion (e) {
          return za.resolve(this.lastRemoteSnapshotVersion)
        }
        getHighestSequenceNumber (e) {
          return za.resolve(this.As)
        }
        allocateTargetId (e) {
          return (
            (this.highestTargetId = this.bs.next()),
            za.resolve(this.highestTargetId)
          )
        }
        setTargetsMetadata (e, t, n) {
          return (
            n && (this.lastRemoteSnapshotVersion = n),
            t > this.As && (this.As = t),
            za.resolve()
          )
        }
        ae (e) {
          this.Is.set(e.target, e)
          const t = e.targetId
          t > this.highestTargetId &&
            ((this.bs = new nc(t)), (this.highestTargetId = t)),
            e.sequenceNumber > this.As && (this.As = e.sequenceNumber)
        }
        addTargetData (e, t) {
          return this.ae(t), (this.targetCount += 1), za.resolve()
        }
        updateTargetData (e, t) {
          return this.ae(t), za.resolve()
        }
        removeTargetData (e, t) {
          return (
            this.Is.delete(t.target),
            this.Rs.us(t.targetId),
            (this.targetCount -= 1),
            za.resolve()
          )
        }
        removeTargets (e, t, n) {
          let s = 0
          const i = []
          return (
            this.Is.forEach((r, o) => {
              o.sequenceNumber <= t &&
                null === n.get(o.targetId) &&
                (this.Is.delete(r),
                i.push(this.removeMatchingKeysForTargetId(e, o.targetId)),
                s++)
            }),
            za.waitFor(i).next(() => s)
          )
        }
        getTargetCount (e) {
          return za.resolve(this.targetCount)
        }
        getTargetData (e, t) {
          const n = this.Is.get(t) || null
          return za.resolve(n)
        }
        addMatchingKeys (e, t, n) {
          return this.Rs.rs(t, n), za.resolve()
        }
        removeMatchingKeys (e, t, n) {
          this.Rs.cs(t, n)
          const s = this.persistence.referenceDelegate,
            i = []
          return (
            s &&
              t.forEach(t => {
                i.push(s.markPotentiallyOrphaned(e, t))
              }),
            za.waitFor(i)
          )
        }
        removeMatchingKeysForTargetId (e, t) {
          return this.Rs.us(t), za.resolve()
        }
        getMatchingKeysForTargetId (e, t) {
          const n = this.Rs.ls(t)
          return za.resolve(n)
        }
        containsKey (e, t) {
          return za.resolve(this.Rs.containsKey(t))
        }
      }
      class Tc {
        constructor (e, t) {
          ;(this.Ps = {}),
            (this.Be = new ki(0)),
            (this.Ue = !1),
            (this.Ue = !0),
            (this.referenceDelegate = e(this)),
            (this.He = new Ic(this)),
            (this.Jt = new Za()),
            (this.Je = (function (e, t) {
              return new vc(e, t)
            })(this.Jt, e => this.referenceDelegate.vs(e))),
            (this.k = new Ya(t)),
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
        getMutationQueue (e) {
          let t = this.Ps[e.toKey()]
          return (
            t ||
              ((t = new yc(this.Jt, this.referenceDelegate)),
              (this.Ps[e.toKey()] = t)),
            t
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
        runTransaction (e, t, n) {
          li('MemoryPersistence', 'Starting transaction:', e)
          const s = new Ec(this.Be.next())
          return (
            this.referenceDelegate.Vs(),
            n(s)
              .next(e => this.referenceDelegate.Ss(s).next(() => e))
              .toPromise()
              .then(e => (s.raiseOnCommittedEvent(), e))
          )
        }
        Ds (e, t) {
          return za.or(
            Object.values(this.Ps).map(n => () => n.containsKey(e, t))
          )
        }
      }
      class Ec extends class {
        constructor () {
          this.onCommittedListeners = []
        }
        addOnCommittedListener (e) {
          this.onCommittedListeners.push(e)
        }
        raiseOnCommittedEvent () {
          this.onCommittedListeners.forEach(e => e())
        }
      } {
        constructor (e) {
          super(), (this.currentSequenceNumber = e)
        }
      }
      class bc {
        constructor (e) {
          ;(this.persistence = e), (this.Cs = new mc()), (this.Ns = null)
        }
        static ks (e) {
          return new bc(e)
        }
        get xs () {
          if (this.Ns) return this.Ns
          throw fi()
        }
        addReference (e, t, n) {
          return (
            this.Cs.addReference(n, t),
            this.xs.delete(n.toString()),
            za.resolve()
          )
        }
        removeReference (e, t, n) {
          return (
            this.Cs.removeReference(n, t),
            this.xs.add(n.toString()),
            za.resolve()
          )
        }
        markPotentiallyOrphaned (e, t) {
          return this.xs.add(t.toString()), za.resolve()
        }
        removeTarget (e, t) {
          this.Cs.us(t.targetId).forEach(e => this.xs.add(e.toString()))
          const n = this.persistence.getTargetCache()
          return n
            .getMatchingKeysForTargetId(e, t.targetId)
            .next(e => {
              e.forEach(e => this.xs.add(e.toString()))
            })
            .next(() => n.removeTargetData(e, t))
        }
        Vs () {
          this.Ns = new Set()
        }
        Ss (e) {
          const t = this.persistence.getRemoteDocumentCache().newChangeBuffer()
          return za
            .forEach(this.xs, n => {
              const s = Yi.fromPath(n)
              return this.$s(e, s).next(e => {
                e || t.removeEntry(s)
              })
            })
            .next(() => ((this.Ns = null), t.apply(e)))
        }
        updateLimboDocument (e, t) {
          return this.$s(e, t).next(e => {
            e ? this.xs.delete(t.toString()) : this.xs.add(t.toString())
          })
        }
        vs (e) {
          return 0
        }
        $s (e, t) {
          return za.or([
            () => za.resolve(this.Cs.containsKey(t)),
            () => this.persistence.getTargetCache().containsKey(e, t),
            () => this.persistence.Ds(e, t)
          ])
        }
      }
      class _c {
        constructor () {
          this.activeTargetIds = Ko()
        }
        Fs (e) {
          this.activeTargetIds = this.activeTargetIds.add(e)
        }
        Ls (e) {
          this.activeTargetIds = this.activeTargetIds.delete(e)
        }
        Ms () {
          const e = {
            activeTargetIds: this.activeTargetIds.toArray(),
            updateTimeMs: Date.now()
          }
          return JSON.stringify(e)
        }
      }
      class Sc {
        constructor () {
          ;(this.pi = new _c()),
            (this.Ti = {}),
            (this.onlineStateHandler = null),
            (this.sequenceNumberHandler = null)
        }
        addPendingMutation (e) {}
        updateMutationState (e, t, n) {}
        addLocalQueryTarget (e) {
          return this.pi.Fs(e), this.Ti[e] || 'not-current'
        }
        updateQueryState (e, t, n) {
          this.Ti[e] = t
        }
        removeLocalQueryTarget (e) {
          this.pi.Ls(e)
        }
        isLocalQueryTarget (e) {
          return this.pi.activeTargetIds.has(e)
        }
        clearQueryState (e) {
          delete this.Ti[e]
        }
        getAllActiveQueryTargets () {
          return this.pi.activeTargetIds
        }
        isActiveQueryTarget (e) {
          return this.pi.activeTargetIds.has(e)
        }
        start () {
          return (this.pi = new _c()), Promise.resolve()
        }
        handleUserChange (e, t, n) {}
        setOnlineState (e) {}
        shutdown () {}
        writeSequenceNumber (e) {}
        notifyBundleLoaded () {}
      }
      class kc {
        Ei (e) {}
        shutdown () {}
      }
      class Ac {
        constructor () {
          ;(this.Ii = () => this.Ai()),
            (this.Ri = () => this.bi()),
            (this.Pi = []),
            this.vi()
        }
        Ei (e) {
          this.Pi.push(e)
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
          li('ConnectivityMonitor', 'Network connectivity changed: AVAILABLE')
          for (const e of this.Pi) e(0)
        }
        bi () {
          li('ConnectivityMonitor', 'Network connectivity changed: UNAVAILABLE')
          for (const e of this.Pi) e(1)
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
        constructor (e) {
          ;(this.Vi = e.Vi), (this.Si = e.Si)
        }
        Di (e) {
          this.Ci = e
        }
        Ni (e) {
          this.ki = e
        }
        onMessage (e) {
          this.xi = e
        }
        close () {
          this.Si()
        }
        send (e) {
          this.Vi(e)
        }
        $i () {
          this.Ci()
        }
        Oi (e) {
          this.ki(e)
        }
        Mi (e) {
          this.xi(e)
        }
      }
      class Rc extends class {
        constructor (e) {
          ;(this.databaseInfo = e), (this.databaseId = e.databaseId)
          const t = e.ssl ? 'https' : 'http'
          ;(this.Fi = t + '://' + e.host),
            (this.Li =
              'projects/' +
              this.databaseId.projectId +
              '/databases/' +
              this.databaseId.database +
              '/documents')
        }
        Bi (e, t, n, s, i) {
          const r = this.Ui(e, t)
          li('RestConnection', 'Sending: ', r, n)
          const o = {}
          return (
            this.qi(o, s, i),
            this.Ki(e, r, o, n).then(
              e => (li('RestConnection', 'Received: ', e), e),
              t => {
                throw (hi(
                  'RestConnection',
                  `${e} failed with error: `,
                  t,
                  'url: ',
                  r,
                  'request:',
                  n
                ),
                t)
              }
            )
          )
        }
        ji (e, t, n, s, i) {
          return this.Bi(e, t, n, s, i)
        }
        qi (e, t, n) {
          ;(e['X-Goog-Api-Client'] = 'gl-js/ fire/' + oi),
            (e['Content-Type'] = 'text/plain'),
            this.databaseInfo.appId &&
              (e['X-Firebase-GMPID'] = this.databaseInfo.appId),
            t && t.headers.forEach((t, n) => (e[n] = t)),
            n && n.headers.forEach((t, n) => (e[n] = t))
        }
        Ui (e, t) {
          const n = Cc[e]
          return `${this.Fi}/v1/${t}:${n}`
        }
      } {
        constructor (e) {
          super(e),
            (this.forceLongPolling = e.forceLongPolling),
            (this.autoDetectLongPolling = e.autoDetectLongPolling),
            (this.useFetchStreams = e.useFetchStreams)
        }
        Ki (e, t, n, s) {
          return new Promise((i, r) => {
            const o = new si()
            o.listenOnce(Js.COMPLETE, () => {
              try {
                switch (o.getLastErrorCode()) {
                  case Ys.NO_ERROR:
                    const t = o.getResponseJson()
                    li('Connection', 'XHR received:', JSON.stringify(t)), i(t)
                    break
                  case Ys.TIMEOUT:
                    li('Connection', 'RPC "' + e + '" timed out'),
                      r(new yi(gi.DEADLINE_EXCEEDED, 'Request time out'))
                    break
                  case Ys.HTTP_ERROR:
                    const n = o.getStatus()
                    if (
                      (li(
                        'Connection',
                        'RPC "' + e + '" failed with status:',
                        n,
                        'response text:',
                        o.getResponseText()
                      ),
                      n > 0)
                    ) {
                      const e = o.getResponseJson().error
                      if (e && e.status && e.message) {
                        const t = (function (e) {
                          const t = e.toLowerCase().replace(/_/g, '-')
                          return Object.values(gi).indexOf(t) >= 0
                            ? t
                            : gi.UNKNOWN
                        })(e.status)
                        r(new yi(t, e.message))
                      } else
                        r(
                          new yi(
                            gi.UNKNOWN,
                            'Server responded with status ' + o.getStatus()
                          )
                        )
                    } else r(new yi(gi.UNAVAILABLE, 'Connection failed.'))
                    break
                  default:
                    fi()
                }
              } finally {
                li('Connection', 'RPC "' + e + '" completed.')
              }
            })
            const a = JSON.stringify(s)
            o.send(t, 'POST', a, n, 15)
          })
        }
        Qi (e, t, n) {
          const c = [
              this.Fi,
              '/',
              'google.firestore.v1.Firestore',
              '/',
              e,
              '/channel'
            ],
            l = Qs(),
            u = Xs(),
            h = {
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
          this.useFetchStreams && (h.xmlHttpFactory = new ti({})),
            this.qi(h.initMessageHeaders, t, n),
            i() ||
              o() ||
              s().indexOf('Electron/') >= 0 ||
              a() ||
              s().indexOf('MSAppHost/') >= 0 ||
              r() ||
              (h.httpHeadersOverwriteParam = '$httpHeaders')
          const d = c.join('')
          li('Connection', 'Creating WebChannel: ' + d, h)
          const f = l.createWebChannel(d, h)
          let p = !1,
            m = !1
          const g = new Nc({
              Vi: e => {
                m
                  ? li(
                      'Connection',
                      'Not sending because WebChannel is closed:',
                      e
                    )
                  : (p ||
                      (li('Connection', 'Opening WebChannel transport.'),
                      f.open(),
                      (p = !0)),
                    li('Connection', 'WebChannel sending:', e),
                    f.send(e))
              },
              Si: () => f.close()
            }),
            y = (e, t, n) => {
              e.listen(t, e => {
                try {
                  n(e)
                } catch (e) {
                  setTimeout(() => {
                    throw e
                  }, 0)
                }
              })
            }
          return (
            y(f, ni.EventType.OPEN, () => {
              m || li('Connection', 'WebChannel transport opened.')
            }),
            y(f, ni.EventType.CLOSE, () => {
              m ||
                ((m = !0),
                li('Connection', 'WebChannel transport closed'),
                g.Oi())
            }),
            y(f, ni.EventType.ERROR, e => {
              m ||
                ((m = !0),
                hi('Connection', 'WebChannel transport errored:', e),
                g.Oi(
                  new yi(gi.UNAVAILABLE, 'The operation could not be completed')
                ))
            }),
            y(f, ni.EventType.MESSAGE, e => {
              var t
              if (!m) {
                const n = e.data[0]
                pi(!!n)
                const s = n,
                  i =
                    s.error ||
                    (null === (t = s[0]) || void 0 === t ? void 0 : t.error)
                if (i) {
                  li('Connection', 'WebChannel received error:', i)
                  const e = i.status
                  let t = (function (e) {
                      const t = No[e]
                      if (void 0 !== t) return Do(t)
                    })(e),
                    n = i.message
                  void 0 === t &&
                    ((t = gi.INTERNAL),
                    (n =
                      'Unknown error status: ' +
                      e +
                      ' with message ' +
                      i.message)),
                    (m = !0),
                    g.Oi(new yi(t, n)),
                    f.close()
                } else li('Connection', 'WebChannel received:', n), g.Mi(n)
              }
            }),
            y(u, Zs.STAT_EVENT, e => {
              e.stat === ei.PROXY
                ? li('Connection', 'Detected buffering proxy')
                : e.stat === ei.NOPROXY &&
                  li('Connection', 'Detected no buffering proxy')
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
      function Oc (e) {
        return new sa(e, !0)
      }
      class Lc {
        constructor (e, t, n = 1e3, s = 1.5, i = 6e4) {
          ;(this.Me = e),
            (this.timerId = t),
            (this.Wi = n),
            (this.Gi = s),
            (this.zi = i),
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
        Zi (e) {
          this.cancel()
          const t = Math.floor(this.Hi + this.tr()),
            n = Math.max(0, Date.now() - this.Yi),
            s = Math.max(0, t - n)
          s > 0 &&
            li(
              'ExponentialBackoff',
              `Backing off for ${s} ms (base delay: ${this.Hi} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`
            ),
            (this.Ji = this.Me.enqueueAfterDelay(
              this.timerId,
              s,
              () => ((this.Yi = Date.now()), e())
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
        constructor (e, t, n, s, i, r, o, a) {
          ;(this.Me = e),
            (this.nr = n),
            (this.sr = s),
            (this.ir = i),
            (this.authCredentialsProvider = r),
            (this.appCheckCredentialsProvider = o),
            (this.listener = a),
            (this.state = 0),
            (this.rr = 0),
            (this.cr = null),
            (this.ar = null),
            (this.stream = null),
            (this.ur = new Lc(e, t))
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
        gr (e) {
          this.yr(), this.stream.send(e)
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
        async close (e, t) {
          this.yr(),
            this.pr(),
            this.ur.cancel(),
            this.rr++,
            4 !== e
              ? this.ur.reset()
              : t && t.code === gi.RESOURCE_EXHAUSTED
              ? (ui(t.toString()),
                ui(
                  'Using maximum backoff delay to prevent overloading the backend.'
                ),
                this.ur.Xi())
              : t &&
                t.code === gi.UNAUTHENTICATED &&
                3 !== this.state &&
                (this.authCredentialsProvider.invalidateToken(),
                this.appCheckCredentialsProvider.invalidateToken()),
            null !== this.stream &&
              (this.Tr(), this.stream.close(), (this.stream = null)),
            (this.state = e),
            await this.listener.Ni(t)
        }
        Tr () {}
        auth () {
          this.state = 1
          const e = this.Er(this.rr),
            t = this.rr
          Promise.all([
            this.authCredentialsProvider.getToken(),
            this.appCheckCredentialsProvider.getToken()
          ]).then(
            ([e, n]) => {
              this.rr === t && this.Ir(e, n)
            },
            t => {
              e(() => {
                const e = new yi(
                  gi.UNKNOWN,
                  'Fetching auth token failed: ' + t.message
                )
                return this.Ar(e)
              })
            }
          )
        }
        Ir (e, t) {
          const n = this.Er(this.rr)
          ;(this.stream = this.Rr(e, t)),
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
            this.stream.Ni(e => {
              n(() => this.Ar(e))
            }),
            this.stream.onMessage(e => {
              n(() => this.onMessage(e))
            })
        }
        dr () {
          ;(this.state = 5),
            this.ur.Zi(async () => {
              ;(this.state = 0), this.start()
            })
        }
        Ar (e) {
          return (
            li('PersistentStream', `close with error: ${e}`),
            (this.stream = null),
            this.close(4, e)
          )
        }
        Er (e) {
          return t => {
            this.Me.enqueueAndForget(() =>
              this.rr === e
                ? t()
                : (li(
                    'PersistentStream',
                    'stream callback skipped by getCloseGuardedDispatcher.'
                  ),
                  Promise.resolve())
            )
          }
        }
      }
      class Mc extends Pc {
        constructor (e, t, n, s, i, r) {
          super(
            e,
            'listen_stream_connection_backoff',
            'listen_stream_idle',
            'health_check_timeout',
            t,
            n,
            s,
            r
          ),
            (this.k = i)
        }
        Rr (e, t) {
          return this.ir.Qi('Listen', e, t)
        }
        onMessage (e) {
          this.ur.reset()
          const t = (function (e, t) {
              let n
              if ('targetChange' in t) {
                t.targetChange
                const s = (function (e) {
                    return 'NO_CHANGE' === e
                      ? 0
                      : 'ADD' === e
                      ? 1
                      : 'REMOVE' === e
                      ? 2
                      : 'CURRENT' === e
                      ? 3
                      : 'RESET' === e
                      ? 4
                      : fi()
                  })(t.targetChange.targetChangeType || 'NO_CHANGE'),
                  i = t.targetChange.targetIds || [],
                  r = (function (e, t) {
                    return e.C
                      ? (pi(void 0 === t || 'string' == typeof t),
                        $i.fromBase64String(t || ''))
                      : (pi(void 0 === t || t instanceof Uint8Array),
                        $i.fromUint8Array(t || new Uint8Array()))
                  })(e, t.targetChange.resumeToken),
                  o = t.targetChange.cause,
                  a =
                    o &&
                    (function (e) {
                      const t = void 0 === e.code ? gi.UNKNOWN : Do(e.code)
                      return new yi(t, e.message || '')
                    })(o)
                n = new Xo(s, i, r, a || null)
              } else if ('documentChange' in t) {
                t.documentChange
                const s = t.documentChange
                s.document, s.document.name, s.document.updateTime
                const i = ha(e, s.document.name),
                  r = aa(s.document.updateTime),
                  o = new dr({ mapValue: { fields: s.document.fields } }),
                  a = pr.newFoundDocument(i, r, o),
                  c = s.targetIds || [],
                  l = s.removedTargetIds || []
                n = new Wo(c, l, a.key, a)
              } else if ('documentDelete' in t) {
                t.documentDelete
                const s = t.documentDelete
                s.document
                const i = ha(e, s.document),
                  r = s.readTime ? aa(s.readTime) : Oi.min(),
                  o = pr.newNoDocument(i, r),
                  a = s.removedTargetIds || []
                n = new Wo([], a, o.key, o)
              } else if ('documentRemove' in t) {
                t.documentRemove
                const s = t.documentRemove
                s.document
                const i = ha(e, s.document),
                  r = s.removedTargetIds || []
                n = new Wo([], r, i, null)
              } else {
                if (!('filter' in t)) return fi()
                {
                  t.filter
                  const e = t.filter
                  e.targetId
                  const s = e.count || 0,
                    i = new Co(s),
                    r = e.targetId
                  n = new Qo(r, i)
                }
              }
              return n
            })(this.k, e),
            n = (function (e) {
              if (!('targetChange' in e)) return Oi.min()
              const t = e.targetChange
              return t.targetIds && t.targetIds.length
                ? Oi.min()
                : t.readTime
                ? aa(t.readTime)
                : Oi.min()
            })(e)
          return this.listener.br(t, n)
        }
        Pr (e) {
          const t = {}
          ;(t.database = fa(this.k)),
            (t.addTarget = (function (e, t) {
              let n
              const s = t.target
              return (
                (n = wr(s) ? { documents: ga(e, s) } : { query: ya(e, s) }),
                (n.targetId = t.targetId),
                t.resumeToken.approximateByteSize() > 0
                  ? (n.resumeToken = ra(e, t.resumeToken))
                  : t.snapshotVersion.compareTo(Oi.min()) > 0 &&
                    (n.readTime = ia(e, t.snapshotVersion.toTimestamp())),
                n
              )
            })(this.k, e))
          const n = (function (e, t) {
            const n = (function (e, t) {
              switch (t) {
                case 0:
                  return null
                case 1:
                  return 'existence-filter-mismatch'
                case 2:
                  return 'limbo-document'
                default:
                  return fi()
              }
            })(0, t.purpose)
            return null == n ? null : { 'goog-listen-tags': n }
          })(this.k, e)
          n && (t.labels = n), this.gr(t)
        }
        vr (e) {
          const t = {}
          ;(t.database = fa(this.k)), (t.removeTarget = e), this.gr(t)
        }
      }
      class xc extends Pc {
        constructor (e, t, n, s, i, r) {
          super(
            e,
            'write_stream_connection_backoff',
            'write_stream_idle',
            'health_check_timeout',
            t,
            n,
            s,
            r
          ),
            (this.k = i),
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
        Rr (e, t) {
          return this.ir.Qi('Write', e, t)
        }
        onMessage (e) {
          if (
            (pi(!!e.streamToken),
            (this.lastStreamToken = e.streamToken),
            this.Vr)
          ) {
            this.ur.reset()
            const t = (function (e, t) {
                return e && e.length > 0
                  ? (pi(void 0 !== t),
                    e.map(e =>
                      (function (e, t) {
                        let n = e.updateTime ? aa(e.updateTime) : aa(t)
                        return (
                          n.isEqual(Oi.min()) && (n = aa(t)),
                          new ho(n, e.transformResults || [])
                        )
                      })(e, t)
                    ))
                  : []
              })(e.writeResults, e.commitTime),
              n = aa(e.commitTime)
            return this.listener.Cr(n, t)
          }
          return (
            pi(!e.writeResults || 0 === e.writeResults.length),
            (this.Vr = !0),
            this.listener.Nr()
          )
        }
        kr () {
          const e = {}
          ;(e.database = fa(this.k)), this.gr(e)
        }
        Dr (e) {
          const t = {
            streamToken: this.lastStreamToken,
            writes: e.map(e =>
              (function (e, t) {
                let n
                if (t instanceof To) n = { update: ma(e, t.key, t.value) }
                else if (t instanceof ko) n = { delete: ua(e, t.key) }
                else if (t instanceof Eo)
                  n = {
                    update: ma(e, t.key, t.data),
                    updateMask: Ca(t.fieldMask)
                  }
                else {
                  if (!(t instanceof Ao)) return fi()
                  n = { verify: ua(e, t.key) }
                }
                return (
                  t.fieldTransforms.length > 0 &&
                    (n.updateTransforms = t.fieldTransforms.map(e =>
                      (function (e, t) {
                        const n = t.transform
                        if (n instanceof so)
                          return {
                            fieldPath: t.field.canonicalString(),
                            setToServerValue: 'REQUEST_TIME'
                          }
                        if (n instanceof io)
                          return {
                            fieldPath: t.field.canonicalString(),
                            appendMissingElements: { values: n.elements }
                          }
                        if (n instanceof oo)
                          return {
                            fieldPath: t.field.canonicalString(),
                            removeAllFromArray: { values: n.elements }
                          }
                        if (n instanceof co)
                          return {
                            fieldPath: t.field.canonicalString(),
                            increment: n.N
                          }
                        throw fi()
                      })(0, e)
                    )),
                  t.precondition.isNone ||
                    (n.currentDocument = (function (e, t) {
                      return void 0 !== t.updateTime
                        ? { updateTime: oa(e, t.updateTime) }
                        : void 0 !== t.exists
                        ? { exists: t.exists }
                        : fi()
                    })(e, t.precondition)),
                  n
                )
              })(this.k, e)
            )
          }
          this.gr(t)
        }
      }
      class Uc extends class {} {
        constructor (e, t, n, s) {
          super(),
            (this.authCredentials = e),
            (this.appCheckCredentials = t),
            (this.ir = n),
            (this.k = s),
            (this.$r = !1)
        }
        Or () {
          if (this.$r)
            throw new yi(
              gi.FAILED_PRECONDITION,
              'The client has already been terminated.'
            )
        }
        Bi (e, t, n) {
          return (
            this.Or(),
            Promise.all([
              this.authCredentials.getToken(),
              this.appCheckCredentials.getToken()
            ])
              .then(([s, i]) => this.ir.Bi(e, t, n, s, i))
              .catch(e => {
                throw 'FirebaseError' === e.name
                  ? (e.code === gi.UNAUTHENTICATED &&
                      (this.authCredentials.invalidateToken(),
                      this.appCheckCredentials.invalidateToken()),
                    e)
                  : new yi(gi.UNKNOWN, e.toString())
              })
          )
        }
        ji (e, t, n) {
          return (
            this.Or(),
            Promise.all([
              this.authCredentials.getToken(),
              this.appCheckCredentials.getToken()
            ])
              .then(([s, i]) => this.ir.ji(e, t, n, s, i))
              .catch(e => {
                throw 'FirebaseError' === e.name
                  ? (e.code === gi.UNAUTHENTICATED &&
                      (this.authCredentials.invalidateToken(),
                      this.appCheckCredentials.invalidateToken()),
                    e)
                  : new yi(gi.UNKNOWN, e.toString())
              })
          )
        }
        terminate () {
          this.$r = !0
        }
      }
      class Vc {
        constructor (e, t) {
          ;(this.asyncQueue = e),
            (this.onlineStateHandler = t),
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
        Kr (e) {
          'Online' === this.state
            ? this.Ur('Unknown')
            : (this.Mr++,
              this.Mr >= 1 &&
                (this.jr(),
                this.qr(
                  `Connection failed 1 times. Most recent error: ${e.toString()}`
                ),
                this.Ur('Offline')))
        }
        set (e) {
          this.jr(), (this.Mr = 0), 'Online' === e && (this.Lr = !1), this.Ur(e)
        }
        Ur (e) {
          e !== this.state && ((this.state = e), this.onlineStateHandler(e))
        }
        qr (e) {
          const t = `Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`
          this.Lr ? (ui(t), (this.Lr = !1)) : li('OnlineStateTracker', t)
        }
        jr () {
          null !== this.Fr && (this.Fr.cancel(), (this.Fr = null))
        }
      }
      class Fc {
        constructor (e, t, n, s, i) {
          ;(this.localStore = e),
            (this.datastore = t),
            (this.asyncQueue = n),
            (this.remoteSyncer = {}),
            (this.Qr = []),
            (this.Wr = new Map()),
            (this.Gr = new Set()),
            (this.zr = []),
            (this.Hr = i),
            this.Hr.Ei(e => {
              n.enqueueAndForget(async () => {
                Wc(this) &&
                  (li(
                    'RemoteStore',
                    'Restarting streams for network reachability change.'
                  ),
                  await (async function (e) {
                    const t = mi(e)
                    t.Gr.add(4),
                      await $c(t),
                      t.Jr.set('Unknown'),
                      t.Gr.delete(4),
                      await qc(t)
                  })(this))
              })
            }),
            (this.Jr = new Vc(n, s))
        }
      }
      async function qc (e) {
        if (Wc(e)) for (const t of e.zr) await t(!0)
      }
      async function $c (e) {
        for (const t of e.zr) await t(!1)
      }
      function jc (e, t) {
        const n = mi(e)
        n.Wr.has(t.targetId) ||
          (n.Wr.set(t.targetId, t), Gc(n) ? zc(n) : ul(n).lr() && Hc(n, t))
      }
      function Bc (e, t) {
        const n = mi(e),
          s = ul(n)
        n.Wr.delete(t),
          s.lr() && Kc(n, t),
          0 === n.Wr.size && (s.lr() ? s._r() : Wc(n) && n.Jr.set('Unknown'))
      }
      function Hc (e, t) {
        e.Yr.X(t.targetId), ul(e).Pr(t)
      }
      function Kc (e, t) {
        e.Yr.X(t), ul(e).vr(t)
      }
      function zc (e) {
        ;(e.Yr = new Jo({
          getRemoteKeysForTarget: t => e.remoteSyncer.getRemoteKeysForTarget(t),
          Et: t => e.Wr.get(t) || null
        })),
          ul(e).start(),
          e.Jr.Br()
      }
      function Gc (e) {
        return Wc(e) && !ul(e).hr() && e.Wr.size > 0
      }
      function Wc (e) {
        return 0 === mi(e).Gr.size
      }
      function Qc (e) {
        e.Yr = void 0
      }
      async function Xc (e) {
        e.Wr.forEach((t, n) => {
          Hc(e, t)
        })
      }
      async function Yc (e, t) {
        Qc(e), Gc(e) ? (e.Jr.Kr(t), zc(e)) : e.Jr.set('Unknown')
      }
      async function Jc (e, t, n) {
        if ((e.Jr.set('Online'), t instanceof Xo && 2 === t.state && t.cause))
          try {
            await (async function (e, t) {
              const n = t.cause
              for (const s of t.targetIds)
                e.Wr.has(s) &&
                  (await e.remoteSyncer.rejectListen(s, n),
                  e.Wr.delete(s),
                  e.Yr.removeTarget(s))
            })(e, t)
          } catch (n) {
            li(
              'RemoteStore',
              'Failed to remove targets %s: %s ',
              t.targetIds.join(','),
              n
            ),
              await Zc(e, n)
          }
        else if (
          (t instanceof Wo
            ? e.Yr.ot(t)
            : t instanceof Qo
            ? e.Yr.dt(t)
            : e.Yr.ut(t),
          !n.isEqual(Oi.min()))
        )
          try {
            const t = await uc(e.localStore)
            n.compareTo(t) >= 0 &&
              (await (function (e, t) {
                const n = e.Yr.gt(t)
                return (
                  n.targetChanges.forEach((n, s) => {
                    if (n.resumeToken.approximateByteSize() > 0) {
                      const i = e.Wr.get(s)
                      i && e.Wr.set(s, i.withResumeToken(n.resumeToken, t))
                    }
                  }),
                  n.targetMismatches.forEach(t => {
                    const n = e.Wr.get(t)
                    if (!n) return
                    e.Wr.set(
                      t,
                      n.withResumeToken($i.EMPTY_BYTE_STRING, n.snapshotVersion)
                    ),
                      Kc(e, t)
                    const s = new Xa(n.target, t, 1, n.sequenceNumber)
                    Hc(e, s)
                  }),
                  e.remoteSyncer.applyRemoteEvent(n)
                )
              })(e, n))
          } catch (t) {
            li('RemoteStore', 'Failed to raise snapshot:', t), await Zc(e, t)
          }
      }
      async function Zc (e, t, n) {
        if (!Ga(t)) throw t
        e.Gr.add(1),
          await $c(e),
          e.Jr.set('Offline'),
          n || (n = () => uc(e.localStore)),
          e.asyncQueue.enqueueRetryable(async () => {
            li('RemoteStore', 'Retrying IndexedDB access'),
              await n(),
              e.Gr.delete(1),
              await qc(e)
          })
      }
      function el (e, t) {
        return t().catch(n => Zc(e, n, t))
      }
      async function tl (e) {
        const t = mi(e),
          n = hl(t)
        let s = t.Qr.length > 0 ? t.Qr[t.Qr.length - 1].batchId : -1
        for (; nl(t); )
          try {
            const e = await hc(t.localStore, s)
            if (null === e) {
              0 === t.Qr.length && n._r()
              break
            }
            ;(s = e.batchId), sl(t, e)
          } catch (e) {
            await Zc(t, e)
          }
        il(t) && rl(t)
      }
      function nl (e) {
        return Wc(e) && e.Qr.length < 10
      }
      function sl (e, t) {
        e.Qr.push(t)
        const n = hl(e)
        n.lr() && n.Sr && n.Dr(t.mutations)
      }
      function il (e) {
        return Wc(e) && !hl(e).hr() && e.Qr.length > 0
      }
      function rl (e) {
        hl(e).start()
      }
      async function ol (e) {
        hl(e).kr()
      }
      async function al (e) {
        const t = hl(e)
        for (const n of e.Qr) t.Dr(n.mutations)
      }
      async function cl (e, t, n) {
        const s = e.Qr.shift(),
          i = Qa.from(s, t, n)
        await el(e, () => e.remoteSyncer.applySuccessfulWrite(i)), await tl(e)
      }
      async function ll (e, t) {
        t &&
          hl(e).Sr &&
          (await (async function (e, t) {
            if (
              (function (e) {
                switch (e) {
                  default:
                    return fi()
                  case gi.CANCELLED:
                  case gi.UNKNOWN:
                  case gi.DEADLINE_EXCEEDED:
                  case gi.RESOURCE_EXHAUSTED:
                  case gi.INTERNAL:
                  case gi.UNAVAILABLE:
                  case gi.UNAUTHENTICATED:
                    return !1
                  case gi.INVALID_ARGUMENT:
                  case gi.NOT_FOUND:
                  case gi.ALREADY_EXISTS:
                  case gi.PERMISSION_DENIED:
                  case gi.FAILED_PRECONDITION:
                  case gi.ABORTED:
                  case gi.OUT_OF_RANGE:
                  case gi.UNIMPLEMENTED:
                  case gi.DATA_LOSS:
                    return !0
                }
              })((n = t.code)) &&
              n !== gi.ABORTED
            ) {
              const n = e.Qr.shift()
              hl(e).wr(),
                await el(e, () =>
                  e.remoteSyncer.rejectFailedWrite(n.batchId, t)
                ),
                await tl(e)
            }
            var n
          })(e, t)),
          il(e) && rl(e)
      }
      function ul (e) {
        return (
          e.Xr ||
            ((e.Xr = (function (e, t, n) {
              const s = mi(e)
              return (
                s.Or(),
                new Mc(
                  t,
                  s.ir,
                  s.authCredentials,
                  s.appCheckCredentials,
                  s.k,
                  n
                )
              )
            })(e.datastore, e.asyncQueue, {
              Di: Xc.bind(null, e),
              Ni: Yc.bind(null, e),
              br: Jc.bind(null, e)
            })),
            e.zr.push(async t => {
              t
                ? (e.Xr.wr(), Gc(e) ? zc(e) : e.Jr.set('Unknown'))
                : (await e.Xr.stop(), Qc(e))
            })),
          e.Xr
        )
      }
      function hl (e) {
        return (
          e.Zr ||
            ((e.Zr = (function (e, t, n) {
              const s = mi(e)
              return (
                s.Or(),
                new xc(
                  t,
                  s.ir,
                  s.authCredentials,
                  s.appCheckCredentials,
                  s.k,
                  n
                )
              )
            })(e.datastore, e.asyncQueue, {
              Di: ol.bind(null, e),
              Ni: ll.bind(null, e),
              Nr: al.bind(null, e),
              Cr: cl.bind(null, e)
            })),
            e.zr.push(async t => {
              t
                ? (e.Zr.wr(), await tl(e))
                : (await e.Zr.stop(),
                  e.Qr.length > 0 &&
                    (li(
                      'RemoteStore',
                      `Stopping write stream with ${e.Qr.length} pending writes`
                    ),
                    (e.Qr = [])))
            })),
          e.Zr
        )
      }
      class dl {
        constructor (e, t, n, s, i) {
          ;(this.asyncQueue = e),
            (this.timerId = t),
            (this.targetTimeMs = n),
            (this.op = s),
            (this.removalCallback = i),
            (this.deferred = new vi()),
            (this.then = this.deferred.promise.then.bind(
              this.deferred.promise
            )),
            this.deferred.promise.catch(e => {})
        }
        static createAndSchedule (e, t, n, s, i) {
          const r = Date.now() + n,
            o = new dl(e, t, r, s, i)
          return o.start(n), o
        }
        start (e) {
          this.timerHandle = setTimeout(() => this.handleDelayElapsed(), e)
        }
        skipDelay () {
          return this.handleDelayElapsed()
        }
        cancel (e) {
          null !== this.timerHandle &&
            (this.clearTimeout(),
            this.deferred.reject(
              new yi(gi.CANCELLED, 'Operation cancelled' + (e ? ': ' + e : ''))
            ))
        }
        handleDelayElapsed () {
          this.asyncQueue.enqueueAndForget(() =>
            null !== this.timerHandle
              ? (this.clearTimeout(),
                this.op().then(e => this.deferred.resolve(e)))
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
      function fl (e, t) {
        if ((ui('AsyncQueue', `${t}: ${e}`), Ga(e)))
          return new yi(gi.UNAVAILABLE, `${t}: ${e}`)
        throw e
      }
      class pl {
        constructor (e) {
          ;(this.comparator = e
            ? (t, n) => e(t, n) || Yi.comparator(t.key, n.key)
            : (e, t) => Yi.comparator(e.key, t.key)),
            (this.keyedMap = qo()),
            (this.sortedSet = new Oo(this.comparator))
        }
        static emptySet (e) {
          return new pl(e.comparator)
        }
        has (e) {
          return null != this.keyedMap.get(e)
        }
        get (e) {
          return this.keyedMap.get(e)
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
        indexOf (e) {
          const t = this.keyedMap.get(e)
          return t ? this.sortedSet.indexOf(t) : -1
        }
        get size () {
          return this.sortedSet.size
        }
        forEach (e) {
          this.sortedSet.inorderTraversal((t, n) => (e(t), !1))
        }
        add (e) {
          const t = this.delete(e.key)
          return t.copy(
            t.keyedMap.insert(e.key, e),
            t.sortedSet.insert(e, null)
          )
        }
        delete (e) {
          const t = this.get(e)
          return t
            ? this.copy(this.keyedMap.remove(e), this.sortedSet.remove(t))
            : this
        }
        isEqual (e) {
          if (!(e instanceof pl)) return !1
          if (this.size !== e.size) return !1
          const t = this.sortedSet.getIterator(),
            n = e.sortedSet.getIterator()
          for (; t.hasNext(); ) {
            const e = t.getNext().key,
              s = n.getNext().key
            if (!e.isEqual(s)) return !1
          }
          return !0
        }
        toString () {
          const e = []
          return (
            this.forEach(t => {
              e.push(t.toString())
            }),
            0 === e.length
              ? 'DocumentSet ()'
              : 'DocumentSet (\n  ' + e.join('  \n') + '\n)'
          )
        }
        copy (e, t) {
          const n = new pl()
          return (
            (n.comparator = this.comparator),
            (n.keyedMap = e),
            (n.sortedSet = t),
            n
          )
        }
      }
      class ml {
        constructor () {
          this.eo = new Oo(Yi.comparator)
        }
        track (e) {
          const t = e.doc.key,
            n = this.eo.get(t)
          n
            ? 0 !== e.type && 3 === n.type
              ? (this.eo = this.eo.insert(t, e))
              : 3 === e.type && 1 !== n.type
              ? (this.eo = this.eo.insert(t, { type: n.type, doc: e.doc }))
              : 2 === e.type && 2 === n.type
              ? (this.eo = this.eo.insert(t, { type: 2, doc: e.doc }))
              : 2 === e.type && 0 === n.type
              ? (this.eo = this.eo.insert(t, { type: 0, doc: e.doc }))
              : 1 === e.type && 0 === n.type
              ? (this.eo = this.eo.remove(t))
              : 1 === e.type && 2 === n.type
              ? (this.eo = this.eo.insert(t, { type: 1, doc: n.doc }))
              : 0 === e.type && 1 === n.type
              ? (this.eo = this.eo.insert(t, { type: 2, doc: e.doc }))
              : fi()
            : (this.eo = this.eo.insert(t, e))
        }
        no () {
          const e = []
          return (
            this.eo.inorderTraversal((t, n) => {
              e.push(n)
            }),
            e
          )
        }
      }
      class gl {
        constructor (e, t, n, s, i, r, o, a) {
          ;(this.query = e),
            (this.docs = t),
            (this.oldDocs = n),
            (this.docChanges = s),
            (this.mutatedKeys = i),
            (this.fromCache = r),
            (this.syncStateChanged = o),
            (this.excludesMetadataChanges = a)
        }
        static fromInitialDocuments (e, t, n, s) {
          const i = []
          return (
            t.forEach(e => {
              i.push({ type: 0, doc: e })
            }),
            new gl(e, t, pl.emptySet(t), i, n, s, !0, !1)
          )
        }
        get hasPendingWrites () {
          return !this.mutatedKeys.isEmpty()
        }
        isEqual (e) {
          if (
            !(
              this.fromCache === e.fromCache &&
              this.syncStateChanged === e.syncStateChanged &&
              this.mutatedKeys.isEqual(e.mutatedKeys) &&
              Hr(this.query, e.query) &&
              this.docs.isEqual(e.docs) &&
              this.oldDocs.isEqual(e.oldDocs)
            )
          )
            return !1
          const t = this.docChanges,
            n = e.docChanges
          if (t.length !== n.length) return !1
          for (let e = 0; e < t.length; e++)
            if (t[e].type !== n[e].type || !t[e].doc.isEqual(n[e].doc))
              return !1
          return !0
        }
      }
      class yl {
        constructor () {
          ;(this.so = void 0), (this.listeners = [])
        }
      }
      class vl {
        constructor () {
          ;(this.queries = new ic(e => Kr(e), Hr)),
            (this.onlineState = 'Unknown'),
            (this.io = new Set())
        }
      }
      function wl (e, t) {
        const n = mi(e)
        let s = !1
        for (const e of t) {
          const t = e.query,
            i = n.queries.get(t)
          if (i) {
            for (const t of i.listeners) t.oo(e) && (s = !0)
            i.so = e
          }
        }
        s && Tl(n)
      }
      function Il (e, t, n) {
        const s = mi(e),
          i = s.queries.get(t)
        if (i) for (const e of i.listeners) e.onError(n)
        s.queries.delete(t)
      }
      function Tl (e) {
        e.io.forEach(e => {
          e.next()
        })
      }
      class El {
        constructor (e, t, n) {
          ;(this.query = e),
            (this.co = t),
            (this.ao = !1),
            (this.uo = null),
            (this.onlineState = 'Unknown'),
            (this.options = n || {})
        }
        oo (e) {
          if (!this.options.includeMetadataChanges) {
            const t = []
            for (const n of e.docChanges) 3 !== n.type && t.push(n)
            e = new gl(
              e.query,
              e.docs,
              e.oldDocs,
              t,
              e.mutatedKeys,
              e.fromCache,
              e.syncStateChanged,
              !0
            )
          }
          let t = !1
          return (
            this.ao
              ? this.ho(e) && (this.co.next(e), (t = !0))
              : this.lo(e, this.onlineState) && (this.fo(e), (t = !0)),
            (this.uo = e),
            t
          )
        }
        onError (e) {
          this.co.error(e)
        }
        ro (e) {
          this.onlineState = e
          let t = !1
          return (
            this.uo &&
              !this.ao &&
              this.lo(this.uo, e) &&
              (this.fo(this.uo), (t = !0)),
            t
          )
        }
        lo (e, t) {
          if (!e.fromCache) return !0
          const n = 'Offline' !== t
          return !(
            (this.options.wo && n) ||
            (e.docs.isEmpty() && 'Offline' !== t)
          )
        }
        ho (e) {
          if (e.docChanges.length > 0) return !0
          const t = this.uo && this.uo.hasPendingWrites !== e.hasPendingWrites
          return (
            !(!e.syncStateChanged && !t) &&
            !0 === this.options.includeMetadataChanges
          )
        }
        fo (e) {
          ;(e = gl.fromInitialDocuments(
            e.query,
            e.docs,
            e.mutatedKeys,
            e.fromCache
          )),
            (this.ao = !0),
            this.co.next(e)
        }
      }
      class bl {
        constructor (e) {
          this.key = e
        }
      }
      class _l {
        constructor (e) {
          this.key = e
        }
      }
      class Sl {
        constructor (e, t) {
          ;(this.query = e),
            (this.To = t),
            (this.Eo = null),
            (this.current = !1),
            (this.Io = Bo()),
            (this.mutatedKeys = Bo()),
            (this.Ao = Wr(e)),
            (this.Ro = new pl(this.Ao))
        }
        get bo () {
          return this.To
        }
        Po (e, t) {
          const n = t ? t.vo : new ml(),
            s = t ? t.Ro : this.Ro
          let i = t ? t.mutatedKeys : this.mutatedKeys,
            r = s,
            o = !1
          const a =
              Ur(this.query) && s.size === this.query.limit ? s.last() : null,
            c = Vr(this.query) && s.size === this.query.limit ? s.first() : null
          if (
            (e.inorderTraversal((e, t) => {
              const l = s.get(e),
                u = Gr(this.query, t) ? t : null,
                h = !!l && this.mutatedKeys.has(l.key),
                d =
                  !!u &&
                  (u.hasLocalMutations ||
                    (this.mutatedKeys.has(u.key) && u.hasCommittedMutations))
              let f = !1
              l && u
                ? l.data.isEqual(u.data)
                  ? h !== d && (n.track({ type: 3, doc: u }), (f = !0))
                  : this.Vo(l, u) ||
                    (n.track({ type: 2, doc: u }),
                    (f = !0),
                    ((a && this.Ao(u, a) > 0) || (c && this.Ao(u, c) < 0)) &&
                      (o = !0))
                : !l && u
                ? (n.track({ type: 0, doc: u }), (f = !0))
                : l &&
                  !u &&
                  (n.track({ type: 1, doc: l }),
                  (f = !0),
                  (a || c) && (o = !0)),
                f &&
                  (u
                    ? ((r = r.add(u)), (i = d ? i.add(e) : i.delete(e)))
                    : ((r = r.delete(e)), (i = i.delete(e))))
            }),
            Ur(this.query) || Vr(this.query))
          )
            for (; r.size > this.query.limit; ) {
              const e = Ur(this.query) ? r.last() : r.first()
              ;(r = r.delete(e.key)),
                (i = i.delete(e.key)),
                n.track({ type: 1, doc: e })
            }
          return { Ro: r, vo: n, Bn: o, mutatedKeys: i }
        }
        Vo (e, t) {
          return (
            e.hasLocalMutations &&
            t.hasCommittedMutations &&
            !t.hasLocalMutations
          )
        }
        applyChanges (e, t, n) {
          const s = this.Ro
          ;(this.Ro = e.Ro), (this.mutatedKeys = e.mutatedKeys)
          const i = e.vo.no()
          i.sort(
            (e, t) =>
              (function (e, t) {
                const n = e => {
                  switch (e) {
                    case 0:
                      return 1
                    case 2:
                    case 3:
                      return 2
                    case 1:
                      return 0
                    default:
                      return fi()
                  }
                }
                return n(e) - n(t)
              })(e.type, t.type) || this.Ao(e.doc, t.doc)
          ),
            this.So(n)
          const r = t ? this.Do() : [],
            o = 0 === this.Io.size && this.current ? 1 : 0,
            a = o !== this.Eo
          return (
            (this.Eo = o),
            0 !== i.length || a
              ? {
                  snapshot: new gl(
                    this.query,
                    e.Ro,
                    s,
                    i,
                    e.mutatedKeys,
                    0 === o,
                    a,
                    !1
                  ),
                  Co: r
                }
              : { Co: r }
          )
        }
        ro (e) {
          return this.current && 'Offline' === e
            ? ((this.current = !1),
              this.applyChanges(
                {
                  Ro: this.Ro,
                  vo: new ml(),
                  mutatedKeys: this.mutatedKeys,
                  Bn: !1
                },
                !1
              ))
            : { Co: [] }
        }
        No (e) {
          return (
            !this.To.has(e) &&
            !!this.Ro.has(e) &&
            !this.Ro.get(e).hasLocalMutations
          )
        }
        So (e) {
          e &&
            (e.addedDocuments.forEach(e => (this.To = this.To.add(e))),
            e.modifiedDocuments.forEach(e => {}),
            e.removedDocuments.forEach(e => (this.To = this.To.delete(e))),
            (this.current = e.current))
        }
        Do () {
          if (!this.current) return []
          const e = this.Io
          ;(this.Io = Bo()),
            this.Ro.forEach(e => {
              this.No(e.key) && (this.Io = this.Io.add(e.key))
            })
          const t = []
          return (
            e.forEach(e => {
              this.Io.has(e) || t.push(new _l(e))
            }),
            this.Io.forEach(n => {
              e.has(n) || t.push(new bl(n))
            }),
            t
          )
        }
        ko (e) {
          ;(this.To = e.zn), (this.Io = Bo())
          const t = this.Po(e.documents)
          return this.applyChanges(t, !0)
        }
        xo () {
          return gl.fromInitialDocuments(
            this.query,
            this.Ro,
            this.mutatedKeys,
            0 === this.Eo
          )
        }
      }
      class kl {
        constructor (e, t, n) {
          ;(this.query = e), (this.targetId = t), (this.view = n)
        }
      }
      class Al {
        constructor (e) {
          ;(this.key = e), (this.$o = !1)
        }
      }
      class Cl {
        constructor (e, t, n, s, i, r) {
          ;(this.localStore = e),
            (this.remoteStore = t),
            (this.eventManager = n),
            (this.sharedClientState = s),
            (this.currentUser = i),
            (this.maxConcurrentLimboResolutions = r),
            (this.Oo = {}),
            (this.Mo = new ic(e => Kr(e), Hr)),
            (this.Fo = new Map()),
            (this.Lo = new Set()),
            (this.Bo = new Oo(Yi.comparator)),
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
      async function Nl (e, t) {
        const n = (function (e) {
          const t = mi(e)
          return (
            (t.remoteStore.remoteSyncer.applyRemoteEvent = Dl.bind(null, t)),
            (t.remoteStore.remoteSyncer.getRemoteKeysForTarget = Kl.bind(
              null,
              t
            )),
            (t.remoteStore.remoteSyncer.rejectListen = Ll.bind(null, t)),
            (t.Oo.br = wl.bind(null, t.eventManager)),
            (t.Oo.zo = Il.bind(null, t.eventManager)),
            t
          )
        })(e)
        let s, i
        const r = n.Mo.get(t)
        if (r)
          (s = r.targetId),
            n.sharedClientState.addLocalQueryTarget(s),
            (i = r.view.xo())
        else {
          const e = await (function (e, t) {
              const n = mi(e)
              return n.persistence
                .runTransaction('Allocate target', 'readwrite', e => {
                  let s
                  return n.He.getTargetData(e, t).next(i =>
                    i
                      ? ((s = i), za.resolve(s))
                      : n.He.allocateTargetId(e).next(
                          i => (
                            (s = new Xa(t, i, 0, e.currentSequenceNumber)),
                            n.He.addTargetData(e, s).next(() => s)
                          )
                        )
                  )
                })
                .then(e => {
                  const s = n.qn.get(e.targetId)
                  return (
                    (null === s ||
                      e.snapshotVersion.compareTo(s.snapshotVersion) > 0) &&
                      ((n.qn = n.qn.insert(e.targetId, e)),
                      n.Kn.set(t, e.targetId)),
                    e
                  )
                })
            })(n.localStore, Br(t)),
            r = n.sharedClientState.addLocalQueryTarget(e.targetId)
          ;(s = e.targetId),
            (i = await (async function (e, t, n, s) {
              e.Go = (t, n, s) =>
                (async function (e, t, n, s) {
                  let i = t.view.Po(n)
                  i.Bn &&
                    (i = await fc(e.localStore, t.query, !1).then(
                      ({ documents: e }) => t.view.Po(e, i)
                    ))
                  const r = s && s.targetChanges.get(t.targetId),
                    o = t.view.applyChanges(i, e.isPrimaryClient, r)
                  return ql(e, t.targetId, o.Co), o.snapshot
                })(e, t, n, s)
              const i = await fc(e.localStore, t, !0),
                r = new Sl(t, i.zn),
                o = r.Po(i.documents),
                a = Go.createSynthesizedTargetChangeForCurrentChange(
                  n,
                  s && 'Offline' !== e.onlineState
                ),
                c = r.applyChanges(o, e.isPrimaryClient, a)
              ql(e, n, c.Co)
              const l = new kl(t, n, r)
              return (
                e.Mo.set(t, l),
                e.Fo.has(n) ? e.Fo.get(n).push(t) : e.Fo.set(n, [t]),
                c.snapshot
              )
            })(n, t, s, 'current' === r)),
            n.isPrimaryClient && jc(n.remoteStore, e)
        }
        return i
      }
      async function Rl (e, t) {
        const n = mi(e),
          s = n.Mo.get(t),
          i = n.Fo.get(s.targetId)
        if (i.length > 1)
          return (
            n.Fo.set(
              s.targetId,
              i.filter(e => !Hr(e, t))
            ),
            void n.Mo.delete(t)
          )
        n.isPrimaryClient
          ? (n.sharedClientState.removeLocalQueryTarget(s.targetId),
            n.sharedClientState.isActiveQueryTarget(s.targetId) ||
              (await dc(n.localStore, s.targetId, !1)
                .then(() => {
                  n.sharedClientState.clearQueryState(s.targetId),
                    Bc(n.remoteStore, s.targetId),
                    Vl(n, s.targetId)
                })
                .catch(sc)))
          : (Vl(n, s.targetId), await dc(n.localStore, s.targetId, !0))
      }
      async function Dl (e, t) {
        const n = mi(e)
        try {
          const e = await (function (e, t) {
            const n = mi(e),
              s = t.snapshotVersion
            let i = n.qn
            return n.persistence
              .runTransaction('Apply remote event', 'readwrite-primary', e => {
                const r = n.Qn.newChangeBuffer({ trackRemovals: !0 })
                i = n.qn
                const o = []
                t.targetChanges.forEach((r, a) => {
                  const c = i.get(a)
                  if (!c) return
                  o.push(
                    n.He.removeMatchingKeys(e, r.removedDocuments, a).next(() =>
                      n.He.addMatchingKeys(e, r.addedDocuments, a)
                    )
                  )
                  let l = c.withSequenceNumber(e.currentSequenceNumber)
                  t.targetMismatches.has(a)
                    ? (l = l
                        .withResumeToken($i.EMPTY_BYTE_STRING, Oi.min())
                        .withLastLimboFreeSnapshotVersion(Oi.min()))
                    : r.resumeToken.approximateByteSize() > 0 &&
                      (l = l.withResumeToken(r.resumeToken, s)),
                    (i = i.insert(a, l)),
                    (function (e, t, n) {
                      return (
                        0 === e.resumeToken.approximateByteSize() ||
                        t.snapshotVersion.toMicroseconds() -
                          e.snapshotVersion.toMicroseconds() >=
                          3e8 ||
                        n.addedDocuments.size +
                          n.modifiedDocuments.size +
                          n.removedDocuments.size >
                          0
                      )
                    })(c, l, r) && o.push(n.He.updateTargetData(e, l))
                })
                let a = Vo()
                if (
                  (t.documentUpdates.forEach((s, i) => {
                    t.resolvedLimboDocuments.has(s) &&
                      o.push(
                        n.persistence.referenceDelegate.updateLimboDocument(
                          e,
                          s
                        )
                      )
                  }),
                  o.push(
                    (function (e, t, n, s, i) {
                      let r = Bo()
                      return (
                        n.forEach(e => (r = r.add(e))),
                        t.getEntries(e, r).next(e => {
                          let r = Vo()
                          return (
                            n.forEach((n, o) => {
                              const a = e.get(n),
                                c = (null == i ? void 0 : i.get(n)) || s
                              o.isNoDocument() && o.version.isEqual(Oi.min())
                                ? (t.removeEntry(n, c), (r = r.insert(n, o)))
                                : !a.isValidDocument() ||
                                  o.version.compareTo(a.version) > 0 ||
                                  (0 === o.version.compareTo(a.version) &&
                                    a.hasPendingWrites)
                                ? (t.addEntry(o, c), (r = r.insert(n, o)))
                                : li(
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
                    })(e, r, t.documentUpdates, s, void 0).next(e => {
                      a = e
                    })
                  ),
                  !s.isEqual(Oi.min()))
                ) {
                  const t = n.He.getLastRemoteSnapshotVersion(e).next(t =>
                    n.He.setTargetsMetadata(e, e.currentSequenceNumber, s)
                  )
                  o.push(t)
                }
                return za
                  .waitFor(o)
                  .next(() => r.apply(e))
                  .next(() => n.Wn.Vn(e, a))
                  .next(() => a)
              })
              .then(e => ((n.qn = i), e))
          })(n.localStore, t)
          t.targetChanges.forEach((e, t) => {
            const s = n.Uo.get(t)
            s &&
              (pi(
                e.addedDocuments.size +
                  e.modifiedDocuments.size +
                  e.removedDocuments.size <=
                  1
              ),
              e.addedDocuments.size > 0
                ? (s.$o = !0)
                : e.modifiedDocuments.size > 0
                ? pi(s.$o)
                : e.removedDocuments.size > 0 && (pi(s.$o), (s.$o = !1)))
          }),
            await Bl(n, e, t)
        } catch (e) {
          await sc(e)
        }
      }
      function Ol (e, t, n) {
        const s = mi(e)
        if ((s.isPrimaryClient && 0 === n) || (!s.isPrimaryClient && 1 === n)) {
          const e = []
          s.Mo.forEach((n, s) => {
            const i = s.view.ro(t)
            i.snapshot && e.push(i.snapshot)
          }),
            (function (e, t) {
              const n = mi(e)
              n.onlineState = t
              let s = !1
              n.queries.forEach((e, n) => {
                for (const e of n.listeners) e.ro(t) && (s = !0)
              }),
                s && Tl(n)
            })(s.eventManager, t),
            e.length && s.Oo.br(e),
            (s.onlineState = t),
            s.isPrimaryClient && s.sharedClientState.setOnlineState(t)
        }
      }
      async function Ll (e, t, n) {
        const s = mi(e)
        s.sharedClientState.updateQueryState(t, 'rejected', n)
        const i = s.Uo.get(t),
          r = i && i.key
        if (r) {
          let e = new Oo(Yi.comparator)
          e = e.insert(r, pr.newNoDocument(r, Oi.min()))
          const n = Bo().add(r),
            i = new zo(Oi.min(), new Map(), new Mo(Ni), e, n)
          await Dl(s, i), (s.Bo = s.Bo.remove(r)), s.Uo.delete(t), jl(s)
        } else
          await dc(s.localStore, t, !1)
            .then(() => Vl(s, t, n))
            .catch(sc)
      }
      async function Pl (e, t) {
        const n = mi(e),
          s = t.batch.batchId
        try {
          const e = await (function (e, t) {
            const n = mi(e)
            return n.persistence.runTransaction(
              'Acknowledge batch',
              'readwrite-primary',
              e => {
                const s = t.batch.keys(),
                  i = n.Qn.newChangeBuffer({ trackRemovals: !0 })
                return (function (e, t, n, s) {
                  const i = n.batch,
                    r = i.keys()
                  let o = za.resolve()
                  return (
                    r.forEach(e => {
                      o = o
                        .next(() => s.getEntry(t, e))
                        .next(t => {
                          const r = n.docVersions.get(e)
                          pi(null !== r),
                            t.version.compareTo(r) < 0 &&
                              (i.applyToRemoteDocument(t, n),
                              t.isValidDocument() &&
                                s.addEntry(t, n.commitVersion))
                        })
                    }),
                    o.next(() => e.An.removeMutationBatch(t, i))
                  )
                })(n, e, t, i)
                  .next(() => i.apply(e))
                  .next(() => n.An.performConsistencyCheck(e))
                  .next(() => n.Wn.vn(e, s))
              }
            )
          })(n.localStore, t)
          Ul(n, s, null),
            xl(n, s),
            n.sharedClientState.updateMutationState(s, 'acknowledged'),
            await Bl(n, e)
        } catch (e) {
          await sc(e)
        }
      }
      async function Ml (e, t, n) {
        const s = mi(e)
        try {
          const e = await (function (e, t) {
            const n = mi(e)
            return n.persistence.runTransaction(
              'Reject batch',
              'readwrite-primary',
              e => {
                let s
                return n.An.lookupMutationBatch(e, t)
                  .next(
                    t => (
                      pi(null !== t),
                      (s = t.keys()),
                      n.An.removeMutationBatch(e, t)
                    )
                  )
                  .next(() => n.An.performConsistencyCheck(e))
                  .next(() => n.Wn.vn(e, s))
              }
            )
          })(s.localStore, t)
          Ul(s, t, n),
            xl(s, t),
            s.sharedClientState.updateMutationState(t, 'rejected', n),
            await Bl(s, e)
        } catch (n) {
          await sc(n)
        }
      }
      function xl (e, t) {
        ;(e.jo.get(t) || []).forEach(e => {
          e.resolve()
        }),
          e.jo.delete(t)
      }
      function Ul (e, t, n) {
        const s = mi(e)
        let i = s.Ko[s.currentUser.toKey()]
        if (i) {
          const e = i.get(t)
          e && (n ? e.reject(n) : e.resolve(), (i = i.remove(t))),
            (s.Ko[s.currentUser.toKey()] = i)
        }
      }
      function Vl (e, t, n = null) {
        e.sharedClientState.removeLocalQueryTarget(t)
        for (const s of e.Fo.get(t)) e.Mo.delete(s), n && e.Oo.zo(s, n)
        e.Fo.delete(t),
          e.isPrimaryClient &&
            e.qo.us(t).forEach(t => {
              e.qo.containsKey(t) || Fl(e, t)
            })
      }
      function Fl (e, t) {
        e.Lo.delete(t.path.canonicalString())
        const n = e.Bo.get(t)
        null !== n &&
          (Bc(e.remoteStore, n), (e.Bo = e.Bo.remove(t)), e.Uo.delete(n), jl(e))
      }
      function ql (e, t, n) {
        for (const s of n)
          s instanceof bl
            ? (e.qo.addReference(s.key, t), $l(e, s))
            : s instanceof _l
            ? (li('SyncEngine', 'Document no longer in limbo: ' + s.key),
              e.qo.removeReference(s.key, t),
              e.qo.containsKey(s.key) || Fl(e, s.key))
            : fi()
      }
      function $l (e, t) {
        const n = t.key,
          s = n.path.canonicalString()
        e.Bo.get(n) ||
          e.Lo.has(s) ||
          (li('SyncEngine', 'New document in limbo: ' + n), e.Lo.add(s), jl(e))
      }
      function jl (e) {
        for (; e.Lo.size > 0 && e.Bo.size < e.maxConcurrentLimboResolutions; ) {
          const t = e.Lo.values().next().value
          e.Lo.delete(t)
          const n = new Yi(Ui.fromString(t)),
            s = e.Qo.next()
          e.Uo.set(s, new Al(n)),
            (e.Bo = e.Bo.insert(n, s)),
            jc(e.remoteStore, new Xa(Br(xr(n.path)), s, 2, ki.I))
        }
      }
      async function Bl (e, t, n) {
        const s = mi(e),
          i = [],
          r = [],
          o = []
        s.Mo.isEmpty() ||
          (s.Mo.forEach((e, a) => {
            o.push(
              s.Go(a, t, n).then(e => {
                if (e) {
                  s.isPrimaryClient &&
                    s.sharedClientState.updateQueryState(
                      a.targetId,
                      e.fromCache ? 'not-current' : 'current'
                    ),
                    i.push(e)
                  const t = oc.$n(a.targetId, e)
                  r.push(t)
                }
              })
            )
          }),
          await Promise.all(o),
          s.Oo.br(i),
          await (async function (e, t) {
            const n = mi(e)
            try {
              await n.persistence.runTransaction(
                'notifyLocalViewChanges',
                'readwrite',
                e =>
                  za.forEach(t, t =>
                    za
                      .forEach(t.kn, s =>
                        n.persistence.referenceDelegate.addReference(
                          e,
                          t.targetId,
                          s
                        )
                      )
                      .next(() =>
                        za.forEach(t.xn, s =>
                          n.persistence.referenceDelegate.removeReference(
                            e,
                            t.targetId,
                            s
                          )
                        )
                      )
                  )
              )
            } catch (e) {
              if (!Ga(e)) throw e
              li('LocalStore', 'Failed to update sequence numbers: ' + e)
            }
            for (const e of t) {
              const t = e.targetId
              if (!e.fromCache) {
                const e = n.qn.get(t),
                  s = e.snapshotVersion,
                  i = e.withLastLimboFreeSnapshotVersion(s)
                n.qn = n.qn.insert(t, i)
              }
            }
          })(s.localStore, r))
      }
      async function Hl (e, t) {
        const n = mi(e)
        if (!n.currentUser.isEqual(t)) {
          li('SyncEngine', 'User change. New user:', t.toKey())
          const e = await lc(n.localStore, t)
          ;(n.currentUser = t),
            (function (e, t) {
              e.jo.forEach(e => {
                e.forEach(e => {
                  e.reject(
                    new yi(
                      gi.CANCELLED,
                      "'waitForPendingWrites' promise is rejected due to a user change."
                    )
                  )
                })
              }),
                e.jo.clear()
            })(n),
            n.sharedClientState.handleUserChange(
              t,
              e.removedBatchIds,
              e.addedBatchIds
            ),
            await Bl(n, e.Gn)
        }
      }
      function Kl (e, t) {
        const n = mi(e),
          s = n.Uo.get(t)
        if (s && s.$o) return Bo().add(s.key)
        {
          let e = Bo()
          const s = n.Fo.get(t)
          if (!s) return e
          for (const t of s) {
            const s = n.Mo.get(t)
            e = e.unionWith(s.view.bo)
          }
          return e
        }
      }
      function zl (e) {
        const t = mi(e)
        return (
          (t.remoteStore.remoteSyncer.applySuccessfulWrite = Pl.bind(null, t)),
          (t.remoteStore.remoteSyncer.rejectFailedWrite = Ml.bind(null, t)),
          t
        )
      }
      class Gl {
        constructor () {
          this.synchronizeTabs = !1
        }
        async initialize (e) {
          ;(this.k = Oc(e.databaseInfo.databaseId)),
            (this.sharedClientState = this.Jo(e)),
            (this.persistence = this.Yo(e)),
            await this.persistence.start(),
            (this.gcScheduler = this.Xo(e)),
            (this.localStore = this.Zo(e))
        }
        Xo (e) {
          return null
        }
        Zo (e) {
          return (function (e, t, n, s) {
            return new cc(e, t, n, s)
          })(this.persistence, new ac(), e.initialUser, this.k)
        }
        Yo (e) {
          return new Tc(bc.ks, this.k)
        }
        Jo (e) {
          return new Sc()
        }
        async terminate () {
          this.gcScheduler && this.gcScheduler.stop(),
            await this.sharedClientState.shutdown(),
            await this.persistence.shutdown()
        }
      }
      class Wl {
        async initialize (e, t) {
          this.localStore ||
            ((this.localStore = e.localStore),
            (this.sharedClientState = e.sharedClientState),
            (this.datastore = this.createDatastore(t)),
            (this.remoteStore = this.createRemoteStore(t)),
            (this.eventManager = this.createEventManager(t)),
            (this.syncEngine = this.createSyncEngine(t, !e.synchronizeTabs)),
            (this.sharedClientState.onlineStateHandler = e =>
              Ol(this.syncEngine, e, 1)),
            (this.remoteStore.remoteSyncer.handleCredentialChange = Hl.bind(
              null,
              this.syncEngine
            )),
            await (async function (e, t) {
              const n = mi(e)
              t
                ? (n.Gr.delete(2), await qc(n))
                : t || (n.Gr.add(2), await $c(n), n.Jr.set('Unknown'))
            })(this.remoteStore, this.syncEngine.isPrimaryClient))
        }
        createEventManager (e) {
          return new vl()
        }
        createDatastore (e) {
          const t = Oc(e.databaseInfo.databaseId),
            n = ((s = e.databaseInfo), new Rc(s))
          var s
          return (function (e, t, n, s) {
            return new Uc(e, t, n, s)
          })(e.authCredentials, e.appCheckCredentials, n, t)
        }
        createRemoteStore (e) {
          return (
            (t = this.localStore),
            (n = this.datastore),
            (s = e.asyncQueue),
            (i = e => Ol(this.syncEngine, e, 0)),
            (r = Ac.Pt() ? new Ac() : new kc()),
            new Fc(t, n, s, i, r)
          )
          var t, n, s, i, r
        }
        createSyncEngine (e, t) {
          return (function (e, t, n, s, i, r, o) {
            const a = new Cl(e, t, n, s, i, r)
            return o && (a.Wo = !0), a
          })(
            this.localStore,
            this.remoteStore,
            this.eventManager,
            this.sharedClientState,
            e.initialUser,
            e.maxConcurrentLimboResolutions,
            t
          )
        }
        terminate () {
          return (async function (e) {
            const t = mi(e)
            li('RemoteStore', 'RemoteStore shutting down.'),
              t.Gr.add(5),
              await $c(t),
              t.Hr.shutdown(),
              t.Jr.set('Unknown')
          })(this.remoteStore)
        }
      }
      class Ql {
        constructor (e) {
          ;(this.observer = e), (this.muted = !1)
        }
        next (e) {
          this.observer.next && this.ec(this.observer.next, e)
        }
        error (e) {
          this.observer.error
            ? this.ec(this.observer.error, e)
            : console.error('Uncaught Error in snapshot listener:', e)
        }
        nc () {
          this.muted = !0
        }
        ec (e, t) {
          this.muted ||
            setTimeout(() => {
              this.muted || e(t)
            }, 0)
        }
      }
      class Xl {
        constructor (e, t, n, s) {
          ;(this.authCredentials = e),
            (this.appCheckCredentials = t),
            (this.asyncQueue = n),
            (this.databaseInfo = s),
            (this.user = ri.UNAUTHENTICATED),
            (this.clientId = Ci.A()),
            (this.authCredentialListener = () => Promise.resolve()),
            this.authCredentials.start(n, async e => {
              li('FirestoreClient', 'Received user=', e.uid),
                await this.authCredentialListener(e),
                (this.user = e)
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
        setCredentialChangeListener (e) {
          this.authCredentialListener = e
        }
        verifyNotTerminated () {
          if (this.asyncQueue.isShuttingDown)
            throw new yi(
              gi.FAILED_PRECONDITION,
              'The client has already been terminated.'
            )
        }
        terminate () {
          this.asyncQueue.enterRestrictedMode()
          const e = new vi()
          return (
            this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
              try {
                this.onlineComponents &&
                  (await this.onlineComponents.terminate()),
                  this.offlineComponents &&
                    (await this.offlineComponents.terminate()),
                  this.authCredentials.shutdown(),
                  this.appCheckCredentials.shutdown(),
                  e.resolve()
              } catch (t) {
                const n = fl(t, 'Failed to shutdown persistence')
                e.reject(n)
              }
            }),
            e.promise
          )
        }
      }
      async function Yl (e, t) {
        e.asyncQueue.verifyOperationInProgress()
        const n = await (async function (e) {
          return (
            e.offlineComponents ||
              (li('FirestoreClient', 'Using default OfflineComponentProvider'),
              await (async function (e, t) {
                e.asyncQueue.verifyOperationInProgress(),
                  li('FirestoreClient', 'Initializing OfflineComponentProvider')
                const n = await e.getConfiguration()
                await t.initialize(n)
                let s = n.initialUser
                e.setCredentialChangeListener(async e => {
                  s.isEqual(e) || (await lc(t.localStore, e), (s = e))
                }),
                  t.persistence.setDatabaseDeletedListener(() => e.terminate()),
                  (e.offlineComponents = t)
              })(e, new Gl())),
            e.offlineComponents
          )
        })(e)
        li('FirestoreClient', 'Initializing OnlineComponentProvider')
        const s = await e.getConfiguration()
        await t.initialize(n, s),
          e.setCredentialChangeListener(e =>
            (async function (e, t) {
              const n = mi(e)
              n.asyncQueue.verifyOperationInProgress(),
                li('RemoteStore', 'RemoteStore received new credentials')
              const s = Wc(n)
              n.Gr.add(3),
                await $c(n),
                s && n.Jr.set('Unknown'),
                await n.remoteSyncer.handleCredentialChange(t),
                n.Gr.delete(3),
                await qc(n)
            })(t.remoteStore, e)
          ),
          (e.onlineComponents = t)
      }
      async function Jl (e) {
        return (
          e.onlineComponents ||
            (li('FirestoreClient', 'Using default OnlineComponentProvider'),
            await Yl(e, new Wl())),
          e.onlineComponents
        )
      }
      async function Zl (e) {
        const t = await Jl(e),
          n = t.eventManager
        return (
          (n.onListen = Nl.bind(null, t.syncEngine)),
          (n.onUnlisten = Rl.bind(null, t.syncEngine)),
          n
        )
      }
      class eu {
        constructor (e, t, n, s, i, r, o, a) {
          ;(this.databaseId = e),
            (this.appId = t),
            (this.persistenceKey = n),
            (this.host = s),
            (this.ssl = i),
            (this.forceLongPolling = r),
            (this.autoDetectLongPolling = o),
            (this.useFetchStreams = a)
        }
      }
      class tu {
        constructor (e, t) {
          ;(this.projectId = e), (this.database = t || '(default)')
        }
        get isDefaultDatabase () {
          return '(default)' === this.database
        }
        isEqual (e) {
          return (
            e instanceof tu &&
            e.projectId === this.projectId &&
            e.database === this.database
          )
        }
      }
      const nu = new Map()
      function su (e, t, n) {
        if (!n)
          throw new yi(
            gi.INVALID_ARGUMENT,
            `Function ${e}() cannot be called with an empty ${t}.`
          )
      }
      function iu (e) {
        if (!Yi.isDocumentKey(e))
          throw new yi(
            gi.INVALID_ARGUMENT,
            `Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`
          )
      }
      function ru (e) {
        if (Yi.isDocumentKey(e))
          throw new yi(
            gi.INVALID_ARGUMENT,
            `Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`
          )
      }
      function ou (e) {
        if (void 0 === e) return 'undefined'
        if (null === e) return 'null'
        if ('string' == typeof e)
          return (
            e.length > 20 && (e = `${e.substring(0, 20)}...`), JSON.stringify(e)
          )
        if ('number' == typeof e || 'boolean' == typeof e) return '' + e
        if ('object' == typeof e) {
          if (e instanceof Array) return 'an array'
          {
            const t = (function (e) {
              return e.constructor ? e.constructor.name : null
            })(e)
            return t ? `a custom ${t} object` : 'an object'
          }
        }
        return 'function' == typeof e ? 'a function' : fi()
      }
      function au (e, t) {
        if (('_delegate' in e && (e = e._delegate), !(e instanceof t))) {
          if (t.name === e.constructor.name)
            throw new yi(
              gi.INVALID_ARGUMENT,
              'Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?'
            )
          {
            const n = ou(e)
            throw new yi(
              gi.INVALID_ARGUMENT,
              `Expected type '${t.name}', but it was: ${n}`
            )
          }
        }
        return e
      }
      class cu {
        constructor (e) {
          var t
          if (void 0 === e.host) {
            if (void 0 !== e.ssl)
              throw new yi(
                gi.INVALID_ARGUMENT,
                "Can't provide ssl option if host option is not set"
              )
            ;(this.host = 'firestore.googleapis.com'), (this.ssl = !0)
          } else
            (this.host = e.host),
              (this.ssl = null === (t = e.ssl) || void 0 === t || t)
          if (
            ((this.credentials = e.credentials),
            (this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties),
            void 0 === e.cacheSizeBytes)
          )
            this.cacheSizeBytes = 41943040
          else {
            if (-1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576)
              throw new yi(
                gi.INVALID_ARGUMENT,
                'cacheSizeBytes must be at least 1048576'
              )
            this.cacheSizeBytes = e.cacheSizeBytes
          }
          ;(this.experimentalForceLongPolling = !!e.experimentalForceLongPolling),
            (this.experimentalAutoDetectLongPolling = !!e.experimentalAutoDetectLongPolling),
            (this.useFetchStreams = !!e.useFetchStreams),
            (function (e, t, n, s) {
              if (!0 === t && !0 === s)
                throw new yi(
                  gi.INVALID_ARGUMENT,
                  'experimentalForceLongPolling and experimentalAutoDetectLongPolling cannot be used together.'
                )
            })(
              0,
              e.experimentalForceLongPolling,
              0,
              e.experimentalAutoDetectLongPolling
            )
        }
        isEqual (e) {
          return (
            this.host === e.host &&
            this.ssl === e.ssl &&
            this.credentials === e.credentials &&
            this.cacheSizeBytes === e.cacheSizeBytes &&
            this.experimentalForceLongPolling ===
              e.experimentalForceLongPolling &&
            this.experimentalAutoDetectLongPolling ===
              e.experimentalAutoDetectLongPolling &&
            this.ignoreUndefinedProperties === e.ignoreUndefinedProperties &&
            this.useFetchStreams === e.useFetchStreams
          )
        }
      }
      class lu {
        constructor (e, t, n) {
          ;(this._authCredentials = t),
            (this._appCheckCredentials = n),
            (this.type = 'firestore-lite'),
            (this._persistenceKey = '(lite)'),
            (this._settings = new cu({})),
            (this._settingsFrozen = !1),
            e instanceof tu
              ? (this._databaseId = e)
              : ((this._app = e),
                (this._databaseId = (function (e) {
                  if (
                    !Object.prototype.hasOwnProperty.apply(e.options, [
                      'projectId'
                    ])
                  )
                    throw new yi(
                      gi.INVALID_ARGUMENT,
                      '"projectId" not provided in firebase.initializeApp.'
                    )
                  return new tu(e.options.projectId)
                })(e)))
        }
        get app () {
          if (!this._app)
            throw new yi(
              gi.FAILED_PRECONDITION,
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
        _setSettings (e) {
          if (this._settingsFrozen)
            throw new yi(
              gi.FAILED_PRECONDITION,
              'Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.'
            )
          ;(this._settings = new cu(e)),
            void 0 !== e.credentials &&
              (this._authCredentials = (function (e) {
                if (!e) return new Ii()
                switch (e.type) {
                  case 'gapi':
                    const t = e.client
                    return (
                      pi(
                        !(
                          'object' != typeof t ||
                          null === t ||
                          !t.auth ||
                          !t.auth.getAuthHeaderValueForFirstParty
                        )
                      ),
                      new bi(t, e.sessionIndex || '0', e.iamToken || null)
                    )
                  case 'provider':
                    return e.client
                  default:
                    throw new yi(
                      gi.INVALID_ARGUMENT,
                      'makeAuthCredentialsProvider failed due to invalid credential type'
                    )
                }
              })(e.credentials))
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
            (function (e) {
              const t = nu.get(e)
              t &&
                (li('ComponentProvider', 'Removing Datastore'),
                nu.delete(e),
                t.terminate())
            })(this),
            Promise.resolve()
          )
        }
      }
      class uu {
        constructor (e, t, n) {
          ;(this.converter = t),
            (this._key = n),
            (this.type = 'document'),
            (this.firestore = e)
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
          return new du(
            this.firestore,
            this.converter,
            this._key.path.popLast()
          )
        }
        withConverter (e) {
          return new uu(this.firestore, e, this._key)
        }
      }
      class hu {
        constructor (e, t, n) {
          ;(this.converter = t),
            (this._query = n),
            (this.type = 'query'),
            (this.firestore = e)
        }
        withConverter (e) {
          return new hu(this.firestore, e, this._query)
        }
      }
      class du extends hu {
        constructor (e, t, n) {
          super(e, t, xr(n)), (this._path = n), (this.type = 'collection')
        }
        get id () {
          return this._query.path.lastSegment()
        }
        get path () {
          return this._query.path.canonicalString()
        }
        get parent () {
          const e = this._path.popLast()
          return e.isEmpty() ? null : new uu(this.firestore, null, new Yi(e))
        }
        withConverter (e) {
          return new du(this.firestore, e, this._path)
        }
      }
      function fu (e, t, ...n) {
        if (((e = v(e)), su('collection', 'path', t), e instanceof lu)) {
          const s = Ui.fromString(t, ...n)
          return ru(s), new du(e, null, s)
        }
        {
          if (!(e instanceof uu || e instanceof du))
            throw new yi(
              gi.INVALID_ARGUMENT,
              'Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore'
            )
          const s = e._path.child(Ui.fromString(t, ...n))
          return ru(s), new du(e.firestore, null, s)
        }
      }
      function pu (e, t, ...n) {
        if (
          ((e = v(e)),
          1 === arguments.length && (t = Ci.A()),
          su('doc', 'path', t),
          e instanceof lu)
        ) {
          const s = Ui.fromString(t, ...n)
          return iu(s), new uu(e, null, new Yi(s))
        }
        {
          if (!(e instanceof uu || e instanceof du))
            throw new yi(
              gi.INVALID_ARGUMENT,
              'Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore'
            )
          const s = e._path.child(Ui.fromString(t, ...n))
          return (
            iu(s),
            new uu(e.firestore, e instanceof du ? e.converter : null, new Yi(s))
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
              const e = Dc()
              e &&
                li(
                  'AsyncQueue',
                  'Visibility state changed to ' + e.visibilityState
                ),
                this.ur.er()
            })
          const e = Dc()
          e &&
            'function' == typeof e.addEventListener &&
            e.addEventListener('visibilitychange', this.bc)
        }
        get isShuttingDown () {
          return this.yc
        }
        enqueueAndForget (e) {
          this.enqueue(e)
        }
        enqueueAndForgetEvenWhileRestricted (e) {
          this.Pc(), this.vc(e)
        }
        enterRestrictedMode (e) {
          if (!this.yc) {
            ;(this.yc = !0), (this.Ac = e || !1)
            const t = Dc()
            t &&
              'function' == typeof t.removeEventListener &&
              t.removeEventListener('visibilitychange', this.bc)
          }
        }
        enqueue (e) {
          if ((this.Pc(), this.yc)) return new Promise(() => {})
          const t = new vi()
          return this.vc(() =>
            this.yc && this.Ac
              ? Promise.resolve()
              : (e().then(t.resolve, t.reject), t.promise)
          ).then(() => t.promise)
        }
        enqueueRetryable (e) {
          this.enqueueAndForget(() => (this.gc.push(e), this.Vc()))
        }
        async Vc () {
          if (0 !== this.gc.length) {
            try {
              await this.gc[0](), this.gc.shift(), this.ur.reset()
            } catch (e) {
              if (!Ga(e)) throw e
              li('AsyncQueue', 'Operation failed with retryable error: ' + e)
            }
            this.gc.length > 0 && this.ur.Zi(() => this.Vc())
          }
        }
        vc (e) {
          const t = this.mc.then(
            () => (
              (this.Ic = !0),
              e()
                .catch(e => {
                  ;(this.Ec = e), (this.Ic = !1)
                  const t = (function (e) {
                    let t = e.message || ''
                    return (
                      e.stack &&
                        (t = e.stack.includes(e.message)
                          ? e.stack
                          : e.message + '\n' + e.stack),
                      t
                    )
                  })(e)
                  throw (ui('INTERNAL UNHANDLED ERROR: ', t), e)
                })
                .then(e => ((this.Ic = !1), e))
            )
          )
          return (this.mc = t), t
        }
        enqueueAfterDelay (e, t, n) {
          this.Pc(), this.Rc.indexOf(e) > -1 && (t = 0)
          const s = dl.createAndSchedule(this, e, t, n, e => this.Sc(e))
          return this.Tc.push(s), s
        }
        Pc () {
          this.Ec && fi()
        }
        verifyOperationInProgress () {}
        async Dc () {
          let e
          do {
            ;(e = this.mc), await e
          } while (e !== this.mc)
        }
        Cc (e) {
          for (const t of this.Tc) if (t.timerId === e) return !0
          return !1
        }
        Nc (e) {
          return this.Dc().then(() => {
            this.Tc.sort((e, t) => e.targetTimeMs - t.targetTimeMs)
            for (const t of this.Tc)
              if ((t.skipDelay(), 'all' !== e && t.timerId === e)) break
            return this.Dc()
          })
        }
        kc (e) {
          this.Rc.push(e)
        }
        Sc (e) {
          const t = this.Tc.indexOf(e)
          this.Tc.splice(t, 1)
        }
      }
      function gu (e) {
        return (function (e, t) {
          if ('object' != typeof e || null === e) return !1
          const n = e
          for (const e of ['next', 'error', 'complete'])
            if (e in n && 'function' == typeof n[e]) return !0
          return !1
        })(e)
      }
      class yu extends lu {
        constructor (e, t, n) {
          super(e, t, n),
            (this.type = 'firestore'),
            (this._queue = new mu()),
            (this._persistenceKey = 'name' in e ? e.name : '[DEFAULT]')
        }
        _terminate () {
          return (
            this._firestoreClient || wu(this), this._firestoreClient.terminate()
          )
        }
      }
      function vu (e) {
        return (
          e._firestoreClient || wu(e),
          e._firestoreClient.verifyNotTerminated(),
          e._firestoreClient
        )
      }
      function wu (e) {
        var t
        const n = e._freezeSettings(),
          s = (function (e, t, n, s) {
            return new eu(
              e,
              t,
              n,
              s.host,
              s.ssl,
              s.experimentalForceLongPolling,
              s.experimentalAutoDetectLongPolling,
              s.useFetchStreams
            )
          })(
            e._databaseId,
            (null === (t = e._app) || void 0 === t
              ? void 0
              : t.options.appId) || '',
            e._persistenceKey,
            n
          )
        e._firestoreClient = new Xl(
          e._authCredentials,
          e._appCheckCredentials,
          e._queue,
          s
        )
      }
      class Iu {
        constructor (...e) {
          for (let t = 0; t < e.length; ++t)
            if (0 === e[t].length)
              throw new yi(
                gi.INVALID_ARGUMENT,
                'Invalid field name at argument $(i + 1). Field names must not be empty.'
              )
          this._internalPath = new Fi(e)
        }
        isEqual (e) {
          return this._internalPath.isEqual(e._internalPath)
        }
      }
      class Tu {
        constructor (e) {
          this._byteString = e
        }
        static fromBase64String (e) {
          try {
            return new Tu($i.fromBase64String(e))
          } catch (e) {
            throw new yi(
              gi.INVALID_ARGUMENT,
              'Failed to construct data from Base64 string: ' + e
            )
          }
        }
        static fromUint8Array (e) {
          return new Tu($i.fromUint8Array(e))
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
        isEqual (e) {
          return this._byteString.isEqual(e._byteString)
        }
      }
      class Eu {
        constructor (e) {
          this._methodName = e
        }
      }
      class bu {
        constructor (e, t) {
          if (!isFinite(e) || e < -90 || e > 90)
            throw new yi(
              gi.INVALID_ARGUMENT,
              'Latitude must be a number between -90 and 90, but was: ' + e
            )
          if (!isFinite(t) || t < -180 || t > 180)
            throw new yi(
              gi.INVALID_ARGUMENT,
              'Longitude must be a number between -180 and 180, but was: ' + t
            )
          ;(this._lat = e), (this._long = t)
        }
        get latitude () {
          return this._lat
        }
        get longitude () {
          return this._long
        }
        isEqual (e) {
          return this._lat === e._lat && this._long === e._long
        }
        toJSON () {
          return { latitude: this._lat, longitude: this._long }
        }
        _compareTo (e) {
          return Ni(this._lat, e._lat) || Ni(this._long, e._long)
        }
      }
      const _u = /^__.*__$/
      class Su {
        constructor (e, t, n) {
          ;(this.data = e), (this.fieldMask = t), (this.fieldTransforms = n)
        }
        toMutation (e, t) {
          return null !== this.fieldMask
            ? new Eo(e, this.data, this.fieldMask, t, this.fieldTransforms)
            : new To(e, this.data, t, this.fieldTransforms)
        }
      }
      class ku {
        constructor (e, t, n) {
          ;(this.data = e), (this.fieldMask = t), (this.fieldTransforms = n)
        }
        toMutation (e, t) {
          return new Eo(e, this.data, this.fieldMask, t, this.fieldTransforms)
        }
      }
      function Au (e) {
        switch (e) {
          case 0:
          case 2:
          case 1:
            return !0
          case 3:
          case 4:
            return !1
          default:
            throw fi()
        }
      }
      class Cu {
        constructor (e, t, n, s, i, r) {
          ;(this.settings = e),
            (this.databaseId = t),
            (this.k = n),
            (this.ignoreUndefinedProperties = s),
            void 0 === i && this.xc(),
            (this.fieldTransforms = i || []),
            (this.fieldMask = r || [])
        }
        get path () {
          return this.settings.path
        }
        get $c () {
          return this.settings.$c
        }
        Oc (e) {
          return new Cu(
            Object.assign(Object.assign({}, this.settings), e),
            this.databaseId,
            this.k,
            this.ignoreUndefinedProperties,
            this.fieldTransforms,
            this.fieldMask
          )
        }
        Mc (e) {
          var t
          const n =
              null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
            s = this.Oc({ path: n, Fc: !1 })
          return s.Lc(e), s
        }
        Bc (e) {
          var t
          const n =
              null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
            s = this.Oc({ path: n, Fc: !1 })
          return s.xc(), s
        }
        Uc (e) {
          return this.Oc({ path: void 0, Fc: !0 })
        }
        qc (e) {
          return qu(
            e,
            this.settings.methodName,
            this.settings.Kc || !1,
            this.path,
            this.settings.jc
          )
        }
        contains (e) {
          return (
            void 0 !== this.fieldMask.find(t => e.isPrefixOf(t)) ||
            void 0 !== this.fieldTransforms.find(t => e.isPrefixOf(t.field))
          )
        }
        xc () {
          if (this.path)
            for (let e = 0; e < this.path.length; e++) this.Lc(this.path.get(e))
        }
        Lc (e) {
          if (0 === e.length) throw this.qc('Document fields must not be empty')
          if (Au(this.$c) && _u.test(e))
            throw this.qc('Document fields cannot begin and end with "__"')
        }
      }
      class Nu {
        constructor (e, t, n) {
          ;(this.databaseId = e),
            (this.ignoreUndefinedProperties = t),
            (this.k = n || Oc(e))
        }
        Qc (e, t, n, s = !1) {
          return new Cu(
            {
              $c: e,
              methodName: t,
              jc: n,
              path: Fi.emptyPath(),
              Fc: !1,
              Kc: s
            },
            this.databaseId,
            this.k,
            this.ignoreUndefinedProperties
          )
        }
      }
      function Ru (e) {
        const t = e._freezeSettings(),
          n = Oc(e._databaseId)
        return new Nu(e._databaseId, !!t.ignoreUndefinedProperties, n)
      }
      function Du (e, t, n, s, i, r = {}) {
        const o = e.Qc(r.merge || r.mergeFields ? 2 : 0, t, n, i)
        xu('Data must be an object, but it was:', o, s)
        const a = Pu(s, o)
        let c, l
        if (r.merge) (c = new qi(o.fieldMask)), (l = o.fieldTransforms)
        else if (r.mergeFields) {
          const e = []
          for (const s of r.mergeFields) {
            const i = Uu(t, s, n)
            if (!o.contains(i))
              throw new yi(
                gi.INVALID_ARGUMENT,
                `Field '${i}' is specified in your field mask but missing from your input data.`
              )
            $u(e, i) || e.push(i)
          }
          ;(c = new qi(e)),
            (l = o.fieldTransforms.filter(e => c.covers(e.field)))
        } else (c = null), (l = o.fieldTransforms)
        return new Su(new dr(a), c, l)
      }
      class Ou extends Eu {
        _toFieldTransform (e) {
          if (2 !== e.$c)
            throw 1 === e.$c
              ? e.qc(
                  `${this._methodName}() can only appear at the top level of your update data`
                )
              : e.qc(
                  `${this._methodName}() cannot be used with set() unless you pass {merge:true}`
                )
          return e.fieldMask.push(e.path), null
        }
        isEqual (e) {
          return e instanceof Ou
        }
      }
      function Lu (e, t) {
        if (Mu((e = v(e))))
          return xu('Unsupported field value:', t, e), Pu(e, t)
        if (e instanceof Eu)
          return (
            (function (e, t) {
              if (!Au(t.$c))
                throw t.qc(
                  `${e._methodName}() can only be used with update() and set()`
                )
              if (!t.path)
                throw t.qc(
                  `${e._methodName}() is not currently supported inside arrays`
                )
              const n = e._toFieldTransform(t)
              n && t.fieldTransforms.push(n)
            })(e, t),
            null
          )
        if (void 0 === e && t.ignoreUndefinedProperties) return null
        if ((t.path && t.fieldMask.push(t.path), e instanceof Array)) {
          if (t.settings.Fc && 4 !== t.$c)
            throw t.qc('Nested arrays are not supported')
          return (function (e, t) {
            const n = []
            let s = 0
            for (const i of e) {
              let e = Lu(i, t.Uc(s))
              null == e && (e = { nullValue: 'NULL_VALUE' }), n.push(e), s++
            }
            return { arrayValue: { values: n } }
          })(e, t)
        }
        return (function (e, t) {
          if (null === (e = v(e))) return { nullValue: 'NULL_VALUE' }
          if ('number' == typeof e) return Jr(t.k, e)
          if ('boolean' == typeof e) return { booleanValue: e }
          if ('string' == typeof e) return { stringValue: e }
          if (e instanceof Date) {
            const n = Di.fromDate(e)
            return { timestampValue: ia(t.k, n) }
          }
          if (e instanceof Di) {
            const n = new Di(e.seconds, 1e3 * Math.floor(e.nanoseconds / 1e3))
            return { timestampValue: ia(t.k, n) }
          }
          if (e instanceof bu)
            return {
              geoPointValue: { latitude: e.latitude, longitude: e.longitude }
            }
          if (e instanceof Tu) return { bytesValue: ra(t.k, e._byteString) }
          if (e instanceof uu) {
            const n = t.databaseId,
              s = e.firestore._databaseId
            if (!s.isEqual(n))
              throw t.qc(
                `Document reference is for database ${s.projectId}/${s.database} but should be for database ${n.projectId}/${n.database}`
              )
            return {
              referenceValue: ca(
                e.firestore._databaseId || t.databaseId,
                e._key.path
              )
            }
          }
          throw t.qc(`Unsupported field value: ${ou(e)}`)
        })(e, t)
      }
      function Pu (e, t) {
        const n = {}
        return (
          Mi(e)
            ? t.path && t.path.length > 0 && t.fieldMask.push(t.path)
            : Pi(e, (e, s) => {
                const i = Lu(s, t.Mc(e))
                null != i && (n[e] = i)
              }),
          { mapValue: { fields: n } }
        )
      }
      function Mu (e) {
        return !(
          'object' != typeof e ||
          null === e ||
          e instanceof Array ||
          e instanceof Date ||
          e instanceof Di ||
          e instanceof bu ||
          e instanceof Tu ||
          e instanceof uu ||
          e instanceof Eu
        )
      }
      function xu (e, t, n) {
        if (
          !Mu(n) ||
          !(function (e) {
            return (
              'object' == typeof e &&
              null !== e &&
              (Object.getPrototypeOf(e) === Object.prototype ||
                null === Object.getPrototypeOf(e))
            )
          })(n)
        ) {
          const s = ou(n)
          throw 'an object' === s
            ? t.qc(e + ' a custom object')
            : t.qc(e + ' ' + s)
        }
      }
      function Uu (e, t, n) {
        if ((t = v(t)) instanceof Iu) return t._internalPath
        if ('string' == typeof t) return Fu(e, t)
        throw qu(
          'Field path arguments must be of type string or ',
          e,
          !1,
          void 0,
          n
        )
      }
      const Vu = new RegExp('[~\\*/\\[\\]]')
      function Fu (e, t, n) {
        if (t.search(Vu) >= 0)
          throw qu(
            `Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,
            e,
            !1,
            void 0,
            n
          )
        try {
          return new Iu(...t.split('.'))._internalPath
        } catch (s) {
          throw qu(
            `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
            e,
            !1,
            void 0,
            n
          )
        }
      }
      function qu (e, t, n, s, i) {
        const r = s && !s.isEmpty(),
          o = void 0 !== i
        let a = `Function ${t}() called with invalid data`
        n && (a += ' (via `toFirestore()`)'), (a += '. ')
        let c = ''
        return (
          (r || o) &&
            ((c += ' (found'),
            r && (c += ` in field ${s}`),
            o && (c += ` in document ${i}`),
            (c += ')')),
          new yi(gi.INVALID_ARGUMENT, a + e + c)
        )
      }
      function $u (e, t) {
        return e.some(e => e.isEqual(t))
      }
      class ju {
        constructor (e, t, n, s, i) {
          ;(this._firestore = e),
            (this._userDataWriter = t),
            (this._key = n),
            (this._document = s),
            (this._converter = i)
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
              const e = new Bu(
                this._firestore,
                this._userDataWriter,
                this._key,
                this._document,
                null
              )
              return this._converter.fromFirestore(e)
            }
            return this._userDataWriter.convertValue(this._document.data.value)
          }
        }
        get (e) {
          if (this._document) {
            const t = this._document.data.field(Hu('DocumentSnapshot.get', e))
            if (null !== t) return this._userDataWriter.convertValue(t)
          }
        }
      }
      class Bu extends ju {
        data () {
          return super.data()
        }
      }
      function Hu (e, t) {
        return 'string' == typeof t
          ? Fu(e, t)
          : t instanceof Iu
          ? t._internalPath
          : t._delegate._internalPath
      }
      class Ku {
        constructor (e, t) {
          ;(this.hasPendingWrites = e), (this.fromCache = t)
        }
        isEqual (e) {
          return (
            this.hasPendingWrites === e.hasPendingWrites &&
            this.fromCache === e.fromCache
          )
        }
      }
      class zu extends ju {
        constructor (e, t, n, s, i, r) {
          super(e, t, n, s, r),
            (this._firestore = e),
            (this._firestoreImpl = e),
            (this.metadata = i)
        }
        exists () {
          return super.exists()
        }
        data (e = {}) {
          if (this._document) {
            if (this._converter) {
              const t = new Gu(
                this._firestore,
                this._userDataWriter,
                this._key,
                this._document,
                this.metadata,
                null
              )
              return this._converter.fromFirestore(t, e)
            }
            return this._userDataWriter.convertValue(
              this._document.data.value,
              e.serverTimestamps
            )
          }
        }
        get (e, t = {}) {
          if (this._document) {
            const n = this._document.data.field(Hu('DocumentSnapshot.get', e))
            if (null !== n)
              return this._userDataWriter.convertValue(n, t.serverTimestamps)
          }
        }
      }
      class Gu extends zu {
        data (e = {}) {
          return super.data(e)
        }
      }
      class Wu {
        constructor (e, t, n, s) {
          ;(this._firestore = e),
            (this._userDataWriter = t),
            (this._snapshot = s),
            (this.metadata = new Ku(s.hasPendingWrites, s.fromCache)),
            (this.query = n)
        }
        get docs () {
          const e = []
          return this.forEach(t => e.push(t)), e
        }
        get size () {
          return this._snapshot.docs.size
        }
        get empty () {
          return 0 === this.size
        }
        forEach (e, t) {
          this._snapshot.docs.forEach(n => {
            e.call(
              t,
              new Gu(
                this._firestore,
                this._userDataWriter,
                n.key,
                n,
                new Ku(
                  this._snapshot.mutatedKeys.has(n.key),
                  this._snapshot.fromCache
                ),
                this.query.converter
              )
            )
          })
        }
        docChanges (e = {}) {
          const t = !!e.includeMetadataChanges
          if (t && this._snapshot.excludesMetadataChanges)
            throw new yi(
              gi.INVALID_ARGUMENT,
              'To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().'
            )
          return (
            (this._cachedChanges &&
              this._cachedChangesIncludeMetadataChanges === t) ||
              ((this._cachedChanges = (function (e, t) {
                if (e._snapshot.oldDocs.isEmpty()) {
                  let t = 0
                  return e._snapshot.docChanges.map(n => ({
                    type: 'added',
                    doc: new Gu(
                      e._firestore,
                      e._userDataWriter,
                      n.doc.key,
                      n.doc,
                      new Ku(
                        e._snapshot.mutatedKeys.has(n.doc.key),
                        e._snapshot.fromCache
                      ),
                      e.query.converter
                    ),
                    oldIndex: -1,
                    newIndex: t++
                  }))
                }
                {
                  let n = e._snapshot.oldDocs
                  return e._snapshot.docChanges
                    .filter(e => t || 3 !== e.type)
                    .map(t => {
                      const s = new Gu(
                        e._firestore,
                        e._userDataWriter,
                        t.doc.key,
                        t.doc,
                        new Ku(
                          e._snapshot.mutatedKeys.has(t.doc.key),
                          e._snapshot.fromCache
                        ),
                        e.query.converter
                      )
                      let i = -1,
                        r = -1
                      return (
                        0 !== t.type &&
                          ((i = n.indexOf(t.doc.key)),
                          (n = n.delete(t.doc.key))),
                        1 !== t.type &&
                          ((n = n.add(t.doc)), (r = n.indexOf(t.doc.key))),
                        { type: Qu(t.type), doc: s, oldIndex: i, newIndex: r }
                      )
                    })
                }
              })(this, t)),
              (this._cachedChangesIncludeMetadataChanges = t)),
            this._cachedChanges
          )
        }
      }
      function Qu (e) {
        switch (e) {
          case 0:
            return 'added'
          case 2:
          case 3:
            return 'modified'
          case 1:
            return 'removed'
          default:
            return fi()
        }
      }
      function Xu (e, ...t) {
        for (const n of t) e = n._apply(e)
        return e
      }
      class Yu extends class {} {
        constructor (e, t, n) {
          super(),
            (this.zc = e),
            (this.Hc = t),
            (this.Jc = n),
            (this.type = 'where')
        }
        _apply (e) {
          const t = Ru(e.firestore),
            n = (function (e, t, n, s, i, r, o) {
              let a
              if (i.isKeyField()) {
                if ('array-contains' === r || 'array-contains-any' === r)
                  throw new yi(
                    gi.INVALID_ARGUMENT,
                    `Invalid Query. You can't perform '${r}' queries on documentId().`
                  )
                if ('in' === r || 'not-in' === r) {
                  eh(o, r)
                  const t = []
                  for (const n of o) t.push(Zu(s, e, n))
                  a = { arrayValue: { values: t } }
                } else a = Zu(s, e, o)
              } else
                ('in' !== r && 'not-in' !== r && 'array-contains-any' !== r) ||
                  eh(o, r),
                  (a = (function (e, t, n, s = !1) {
                    return Lu(n, e.Qc(s ? 4 : 3, t))
                  })(n, 'where', o, 'in' === r || 'not-in' === r))
              const c = Ir.create(i, r, a)
              return (
                (function (e, t) {
                  if (t.V()) {
                    const n = qr(e)
                    if (null !== n && !n.isEqual(t.field))
                      throw new yi(
                        gi.INVALID_ARGUMENT,
                        `Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${t.field.toString()}'`
                      )
                    const s = Fr(e)
                    null !== s &&
                      (function (e, t, n) {
                        if (!n.isEqual(t))
                          throw new yi(
                            gi.INVALID_ARGUMENT,
                            `Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${t.toString()}' and so you must also use '${t.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`
                          )
                      })(0, t.field, s)
                  }
                  const n = (function (e, t) {
                    for (const n of e.filters)
                      if (t.indexOf(n.op) >= 0) return n.op
                    return null
                  })(
                    e,
                    (function (e) {
                      switch (e) {
                        case '!=':
                          return ['!=', 'not-in']
                        case 'array-contains':
                          return [
                            'array-contains',
                            'array-contains-any',
                            'not-in'
                          ]
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
                    })(t.op)
                  )
                  if (null !== n)
                    throw n === t.op
                      ? new yi(
                          gi.INVALID_ARGUMENT,
                          `Invalid query. You cannot use more than one '${t.op.toString()}' filter.`
                        )
                      : new yi(
                          gi.INVALID_ARGUMENT,
                          `Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`
                        )
                })(e, c),
                c
              )
            })(
              e._query,
              0,
              t,
              e.firestore._databaseId,
              this.zc,
              this.Hc,
              this.Jc
            )
          return new hu(
            e.firestore,
            e.converter,
            (function (e, t) {
              const n = e.filters.concat([t])
              return new Mr(
                e.path,
                e.collectionGroup,
                e.explicitOrderBy.slice(),
                n,
                e.limit,
                e.limitType,
                e.startAt,
                e.endAt
              )
            })(e._query, n)
          )
        }
      }
      function Ju (e, t, n) {
        const s = t,
          i = Hu('where', e)
        return new Yu(i, s, n)
      }
      function Zu (e, t, n) {
        if ('string' == typeof (n = v(n))) {
          if ('' === n)
            throw new yi(
              gi.INVALID_ARGUMENT,
              'Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.'
            )
          if (!$r(t) && -1 !== n.indexOf('/'))
            throw new yi(
              gi.INVALID_ARGUMENT,
              `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`
            )
          const s = t.path.child(Ui.fromString(n))
          if (!Yi.isDocumentKey(s))
            throw new yi(
              gi.INVALID_ARGUMENT,
              `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`
            )
          return rr(e, new Yi(s))
        }
        if (n instanceof uu) return rr(e, n._key)
        throw new yi(
          gi.INVALID_ARGUMENT,
          `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ou(
            n
          )}.`
        )
      }
      function eh (e, t) {
        if (!Array.isArray(e) || 0 === e.length)
          throw new yi(
            gi.INVALID_ARGUMENT,
            `Invalid Query. A non-empty array is required for '${t.toString()}' filters.`
          )
        if (e.length > 10)
          throw new yi(
            gi.INVALID_ARGUMENT,
            `Invalid Query. '${t.toString()}' filters support a maximum of 10 elements in the value array.`
          )
      }
      class th extends class {
        convertValue (e, t = 'none') {
          switch (Ji(e)) {
            case 0:
              return null
            case 1:
              return e.booleanValue
            case 2:
              return Hi(e.integerValue || e.doubleValue)
            case 3:
              return this.convertTimestamp(e.timestampValue)
            case 4:
              return this.convertServerTimestamp(e, t)
            case 5:
              return e.stringValue
            case 6:
              return this.convertBytes(Ki(e.bytesValue))
            case 7:
              return this.convertReference(e.referenceValue)
            case 8:
              return this.convertGeoPoint(e.geoPointValue)
            case 9:
              return this.convertArray(e.arrayValue, t)
            case 10:
              return this.convertObject(e.mapValue, t)
            default:
              throw fi()
          }
        }
        convertObject (e, t) {
          const n = {}
          return (
            Pi(e.fields, (e, s) => {
              n[e] = this.convertValue(s, t)
            }),
            n
          )
        }
        convertGeoPoint (e) {
          return new bu(Hi(e.latitude), Hi(e.longitude))
        }
        convertArray (e, t) {
          return (e.values || []).map(e => this.convertValue(e, t))
        }
        convertServerTimestamp (e, t) {
          switch (t) {
            case 'previous':
              const n = Gi(e)
              return null == n ? null : this.convertValue(n, t)
            case 'estimate':
              return this.convertTimestamp(Wi(e))
            default:
              return null
          }
        }
        convertTimestamp (e) {
          const t = Bi(e)
          return new Di(t.seconds, t.nanos)
        }
        convertDocumentKey (e, t) {
          const n = Ui.fromString(e)
          pi(Na(n))
          const s = new tu(n.get(1), n.get(3)),
            i = new Yi(n.popFirst(5))
          return (
            s.isEqual(t) ||
              ui(
                `Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`
              ),
            i
          )
        }
      } {
        constructor (e) {
          super(), (this.firestore = e)
        }
        convertBytes (e) {
          return new Tu(e)
        }
        convertReference (e) {
          const t = this.convertDocumentKey(e, this.firestore._databaseId)
          return new uu(this.firestore, null, t)
        }
      }
      function nh (e, t, n) {
        e = au(e, uu)
        const s = au(e.firestore, yu),
          i = (function (e, t, n) {
            let s
            return (
              (s = e
                ? n && (n.merge || n.mergeFields)
                  ? e.toFirestore(t, n)
                  : e.toFirestore(t)
                : t),
              s
            )
          })(e.converter, t, n)
        return rh(s, [
          Du(Ru(s), 'setDoc', e._key, i, null !== e.converter, n).toMutation(
            e._key,
            fo.none()
          )
        ])
      }
      function sh (e, t, n, ...s) {
        e = au(e, uu)
        const i = au(e.firestore, yu),
          r = Ru(i)
        let o
        return (
          (o =
            'string' == typeof (t = v(t)) || t instanceof Iu
              ? (function (e, t, n, s, i, r) {
                  const o = e.Qc(1, t, n),
                    a = [Uu(t, s, n)],
                    c = [i]
                  if (r.length % 2 != 0)
                    throw new yi(
                      gi.INVALID_ARGUMENT,
                      `Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`
                    )
                  for (let e = 0; e < r.length; e += 2)
                    a.push(Uu(t, r[e])), c.push(r[e + 1])
                  const l = [],
                    u = dr.empty()
                  for (let e = a.length - 1; e >= 0; --e)
                    if (!$u(l, a[e])) {
                      const t = a[e]
                      let n = c[e]
                      n = v(n)
                      const s = o.Bc(t)
                      if (n instanceof Ou) l.push(t)
                      else {
                        const e = Lu(n, s)
                        null != e && (l.push(t), u.set(t, e))
                      }
                    }
                  const h = new qi(l)
                  return new ku(u, h, o.fieldTransforms)
                })(r, 'updateDoc', e._key, t, n, s)
              : (function (e, t, n, s) {
                  const i = e.Qc(1, t, n)
                  xu('Data must be an object, but it was:', i, s)
                  const r = [],
                    o = dr.empty()
                  Pi(s, (e, s) => {
                    const a = Fu(t, e, n)
                    s = v(s)
                    const c = i.Bc(a)
                    if (s instanceof Ou) r.push(a)
                    else {
                      const e = Lu(s, c)
                      null != e && (r.push(a), o.set(a, e))
                    }
                  })
                  const a = new qi(r)
                  return new ku(o, a, i.fieldTransforms)
                })(r, 'updateDoc', e._key, t)),
          rh(i, [o.toMutation(e._key, fo.exists(!0))])
        )
      }
      function ih (e, ...t) {
        var n, s, i
        e = v(e)
        let r = { includeMetadataChanges: !1 },
          o = 0
        'object' != typeof t[o] || gu(t[o]) || ((r = t[o]), o++)
        const a = { includeMetadataChanges: r.includeMetadataChanges }
        if (gu(t[o])) {
          const e = t[o]
          ;(t[o] = null === (n = e.next) || void 0 === n ? void 0 : n.bind(e)),
            (t[o + 1] =
              null === (s = e.error) || void 0 === s ? void 0 : s.bind(e)),
            (t[o + 2] =
              null === (i = e.complete) || void 0 === i ? void 0 : i.bind(e))
        }
        let c, l, u
        if (e instanceof uu)
          (l = au(e.firestore, yu)),
            (u = xr(e._key.path)),
            (c = {
              next: n => {
                t[o] &&
                  t[o](
                    (function (e, t, n) {
                      const s = n.docs.get(t._key),
                        i = new th(e)
                      return new zu(
                        e,
                        i,
                        t._key,
                        s,
                        new Ku(n.hasPendingWrites, n.fromCache),
                        t.converter
                      )
                    })(l, e, n)
                  )
              },
              error: t[o + 1],
              complete: t[o + 2]
            })
        else {
          const n = au(e, hu)
          ;(l = au(n.firestore, yu)), (u = n._query)
          const s = new th(l)
          ;(c = {
            next: e => {
              t[o] && t[o](new Wu(l, s, n, e))
            },
            error: t[o + 1],
            complete: t[o + 2]
          }),
            (function (e) {
              if (Vr(e) && 0 === e.explicitOrderBy.length)
                throw new yi(
                  gi.UNIMPLEMENTED,
                  'limitToLast() queries require specifying at least one orderBy() clause'
                )
            })(e._query)
        }
        return (function (e, t, n, s) {
          const i = new Ql(s),
            r = new El(t, i, n)
          return (
            e.asyncQueue.enqueueAndForget(async () =>
              (async function (e, t) {
                const n = mi(e),
                  s = t.query
                let i = !1,
                  r = n.queries.get(s)
                if ((r || ((i = !0), (r = new yl())), i))
                  try {
                    r.so = await n.onListen(s)
                  } catch (e) {
                    const n = fl(
                      e,
                      `Initialization of query '${zr(t.query)}' failed`
                    )
                    return void t.onError(n)
                  }
                n.queries.set(s, r),
                  r.listeners.push(t),
                  t.ro(n.onlineState),
                  r.so && t.oo(r.so) && Tl(n)
              })(await Zl(e), r)
            ),
            () => {
              i.nc(),
                e.asyncQueue.enqueueAndForget(async () =>
                  (async function (e, t) {
                    const n = mi(e),
                      s = t.query
                    let i = !1
                    const r = n.queries.get(s)
                    if (r) {
                      const e = r.listeners.indexOf(t)
                      e >= 0 &&
                        (r.listeners.splice(e, 1),
                        (i = 0 === r.listeners.length))
                    }
                    if (i) return n.queries.delete(s), n.onUnlisten(s)
                  })(await Zl(e), r)
                )
            }
          )
        })(vu(l), u, a, c)
      }
      function rh (e, t) {
        return (function (e, t) {
          const n = new vi()
          return (
            e.asyncQueue.enqueueAndForget(async () =>
              (async function (e, t, n) {
                const s = zl(e)
                try {
                  const e = await (function (e, t) {
                    const n = mi(e),
                      s = Di.now(),
                      i = t.reduce((e, t) => e.add(t.key), Bo())
                    let r
                    return n.persistence
                      .runTransaction(
                        'Locally write mutations',
                        'readwrite',
                        e =>
                          n.Wn.vn(e, i).next(i => {
                            r = i
                            const o = []
                            for (const e of t) {
                              const t = vo(e, r.get(e.key))
                              null != t &&
                                o.push(
                                  new Eo(
                                    e.key,
                                    t,
                                    fr(t.value.mapValue),
                                    fo.exists(!0)
                                  )
                                )
                            }
                            return n.An.addMutationBatch(e, s, o, t)
                          })
                      )
                      .then(
                        e => (
                          e.applyToLocalDocumentSet(r),
                          { batchId: e.batchId, changes: r }
                        )
                      )
                  })(s.localStore, t)
                  s.sharedClientState.addPendingMutation(e.batchId),
                    (function (e, t, n) {
                      let s = e.Ko[e.currentUser.toKey()]
                      s || (s = new Oo(Ni)),
                        (s = s.insert(t, n)),
                        (e.Ko[e.currentUser.toKey()] = s)
                    })(s, e.batchId, n),
                    await Bl(s, e.changes),
                    await tl(s.remoteStore)
                } catch (e) {
                  const t = fl(e, 'Failed to persist write')
                  n.reject(t)
                }
              })(
                await (function (e) {
                  return Jl(e).then(e => e.syncEngine)
                })(e),
                t,
                n
              )
            ),
            n.promise
          )
        })(vu(e), t)
      }
      function oh (e, t) {
        var n = {}
        for (var s in e)
          Object.prototype.hasOwnProperty.call(e, s) &&
            t.indexOf(s) < 0 &&
            (n[s] = e[s])
        if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
          var i = 0
          for (s = Object.getOwnPropertySymbols(e); i < s.length; i++)
            t.indexOf(s[i]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(e, s[i]) &&
              (n[s[i]] = e[s[i]])
        }
        return n
      }
      !(function (e, t = !0) {
        ;(oi = '9.6.3'),
          F(
            new w(
              'firestore',
              (e, { options: n }) => {
                const s = e.getProvider('app').getImmediate(),
                  i = new yu(
                    s,
                    new Ti(e.getProvider('auth-internal')),
                    new Si(e.getProvider('app-check-internal'))
                  )
                return (
                  (n = Object.assign({ useFetchStreams: t }, n)),
                  i._setSettings(n),
                  i
                )
              },
              'PUBLIC'
            )
          ),
          z(ii, '3.4.3', e),
          z(ii, '3.4.3', 'esm2017')
      })(),
        Object.create,
        Object.create
      const ah = function () {
          return {
            'dependent-sdk-initialized-before-auth':
              'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.'
          }
        },
        ch = new l('auth', 'Firebase', {
          'dependent-sdk-initialized-before-auth':
            'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.'
        }),
        lh = new R('@firebase/auth')
      function uh (e, ...t) {
        lh.logLevel <= _.ERROR && lh.error(`Auth (9.6.3): ${e}`, ...t)
      }
      function hh (e, ...t) {
        throw fh(e, ...t)
      }
      function dh (e, ...t) {
        return fh(e, ...t)
      }
      function fh (e, ...t) {
        if ('string' != typeof e) {
          const n = t[0],
            s = [...t.slice(1)]
          return (
            s[0] && (s[0].appName = e.name), e._errorFactory.create(n, ...s)
          )
        }
        return ch.create(e, ...t)
      }
      function ph (e, t, ...n) {
        if (!e) throw fh(t, ...n)
      }
      function mh (e) {
        const t = 'INTERNAL ASSERTION FAILED: ' + e
        throw (uh(t), new Error(t))
      }
      function gh (e, t) {
        e || mh(t)
      }
      const yh = new Map()
      function vh (e) {
        gh(e instanceof Function, 'Expected a class definition')
        let t = yh.get(e)
        return t
          ? (gh(
              t instanceof e,
              'Instance stored in cache mismatched with class'
            ),
            t)
          : ((t = new e()), yh.set(e, t), t)
      }
      function wh () {
        var e
        return (
          ('undefined' != typeof self &&
            (null === (e = self.location) || void 0 === e ? void 0 : e.href)) ||
          ''
        )
      }
      function Ih () {
        var e
        return (
          ('undefined' != typeof self &&
            (null === (e = self.location) || void 0 === e
              ? void 0
              : e.protocol)) ||
          null
        )
      }
      class Th {
        constructor (e, t) {
          ;(this.shortDelay = e),
            (this.longDelay = t),
            gh(t > e, 'Short delay should be less than long delay!'),
            (this.isMobile = i() || o())
        }
        get () {
          return 'undefined' != typeof navigator &&
            navigator &&
            'onLine' in navigator &&
            'boolean' == typeof navigator.onLine &&
            ('http:' === Ih() ||
              'https:' === Ih() ||
              r() ||
              'connection' in navigator) &&
            !navigator.onLine
            ? Math.min(5e3, this.shortDelay)
            : this.isMobile
            ? this.longDelay
            : this.shortDelay
        }
      }
      function Eh (e, t) {
        gh(e.emulator, 'Emulator should always be set here')
        const { url: n } = e.emulator
        return t ? `${n}${t.startsWith('/') ? t.slice(1) : t}` : n
      }
      class bh {
        static initialize (e, t, n) {
          ;(this.fetchImpl = e),
            t && (this.headersImpl = t),
            n && (this.responseImpl = n)
        }
        static fetch () {
          return this.fetchImpl
            ? this.fetchImpl
            : 'undefined' != typeof self && 'fetch' in self
            ? self.fetch
            : void mh(
                'Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
              )
        }
        static headers () {
          return this.headersImpl
            ? this.headersImpl
            : 'undefined' != typeof self && 'Headers' in self
            ? self.Headers
            : void mh(
                'Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
              )
        }
        static response () {
          return this.responseImpl
            ? this.responseImpl
            : 'undefined' != typeof self && 'Response' in self
            ? self.Response
            : void mh(
                'Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
              )
        }
      }
      const _h = {
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
        Sh = new Th(3e4, 6e4)
      function kh (e, t) {
        return e.tenantId && !t.tenantId
          ? Object.assign(Object.assign({}, t), { tenantId: e.tenantId })
          : t
      }
      async function Ah (e, t, n, s, i = {}) {
        return Ch(e, i, async () => {
          let i = {},
            r = {}
          s && ('GET' === t ? (r = s) : (i = { body: JSON.stringify(s) }))
          const o = f(Object.assign({ key: e.config.apiKey }, r)).slice(1),
            a = await e._getAdditionalHeaders()
          return (
            (a['Content-Type'] = 'application/json'),
            e.languageCode && (a['X-Firebase-Locale'] = e.languageCode),
            bh.fetch()(
              Rh(e, e.config.apiHost, n, o),
              Object.assign(
                { method: t, headers: a, referrerPolicy: 'no-referrer' },
                i
              )
            )
          )
        })
      }
      async function Ch (e, t, n) {
        e._canInitEmulator = !1
        const s = Object.assign(Object.assign({}, _h), t)
        try {
          const t = new Dh(e),
            i = await Promise.race([n(), t.promise])
          t.clearNetworkTimeout()
          const r = await i.json()
          if ('needConfirmation' in r)
            throw Oh(e, 'account-exists-with-different-credential', r)
          if (i.ok && !('errorMessage' in r)) return r
          {
            const t = i.ok ? r.errorMessage : r.error.message,
              [n, o] = t.split(' : ')
            if ('FEDERATED_USER_ID_ALREADY_LINKED' === n)
              throw Oh(e, 'credential-already-in-use', r)
            if ('EMAIL_EXISTS' === n) throw Oh(e, 'email-already-in-use', r)
            const a = s[n] || n.toLowerCase().replace(/[_\s]+/g, '-')
            if (o)
              throw (function (e, t, n) {
                const s = Object.assign(Object.assign({}, ah()), { [t]: n })
                return new l('auth', 'Firebase', s).create(t, {
                  appName: e.name
                })
              })(e, a, o)
            hh(e, a)
          }
        } catch (t) {
          if (t instanceof c) throw t
          hh(e, 'network-request-failed')
        }
      }
      async function Nh (e, t, n, s, i = {}) {
        const r = await Ah(e, t, n, s, i)
        return (
          'mfaPendingCredential' in r &&
            hh(e, 'multi-factor-auth-required', { _serverResponse: r }),
          r
        )
      }
      function Rh (e, t, n, s) {
        const i = `${t}${n}?${s}`
        return e.config.emulator
          ? Eh(e.config, i)
          : `${e.config.apiScheme}://${i}`
      }
      class Dh {
        constructor (e) {
          ;(this.auth = e),
            (this.timer = null),
            (this.promise = new Promise((e, t) => {
              this.timer = setTimeout(
                () => t(dh(this.auth, 'timeout')),
                Sh.get()
              )
            }))
        }
        clearNetworkTimeout () {
          clearTimeout(this.timer)
        }
      }
      function Oh (e, t, n) {
        const s = { appName: e.name }
        n.email && (s.email = n.email),
          n.phoneNumber && (s.phoneNumber = n.phoneNumber)
        const i = dh(e, t, s)
        return (i.customData._tokenResponse = n), i
      }
      function Lh (e) {
        if (e)
          try {
            const t = new Date(Number(e))
            if (!isNaN(t.getTime())) return t.toUTCString()
          } catch (e) {}
      }
      function Ph (e) {
        return 1e3 * Number(e)
      }
      function Mh (t) {
        const [n, s, i] = t.split('.')
        if (void 0 === n || void 0 === s || void 0 === i)
          return uh('JWT malformed, contained fewer than 3 sections'), null
        try {
          const t = (function (t) {
            try {
              return e.decodeString(t, !0)
            } catch (e) {
              console.error('base64Decode failed: ', e)
            }
            return null
          })(s)
          return t
            ? JSON.parse(t)
            : (uh('Failed to decode base64 JWT payload'), null)
        } catch (e) {
          return uh('Caught error parsing JWT payload as JSON', e), null
        }
      }
      async function xh (e, t, n = !1) {
        if (n) return t
        try {
          return await t
        } catch (t) {
          throw (t instanceof c &&
            (function ({ code: e }) {
              return (
                'auth/user-disabled' === e || 'auth/user-token-expired' === e
              )
            })(t) &&
            e.auth.currentUser === e &&
            (await e.auth.signOut()),
          t)
        }
      }
      class Uh {
        constructor (e) {
          ;(this.user = e),
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
        getInterval (e) {
          var t
          if (e) {
            const e = this.errorBackoff
            return (
              (this.errorBackoff = Math.min(2 * this.errorBackoff, 96e4)), e
            )
          }
          {
            this.errorBackoff = 3e4
            const e =
              (null !== (t = this.user.stsTokenManager.expirationTime) &&
              void 0 !== t
                ? t
                : 0) -
              Date.now() -
              3e5
            return Math.max(0, e)
          }
        }
        schedule (e = !1) {
          if (!this.isRunning) return
          const t = this.getInterval(e)
          this.timerId = setTimeout(async () => {
            await this.iteration()
          }, t)
        }
        async iteration () {
          try {
            await this.user.getIdToken(!0)
          } catch (e) {
            return void (
              'auth/network-request-failed' === e.code && this.schedule(!0)
            )
          }
          this.schedule()
        }
      }
      class Vh {
        constructor (e, t) {
          ;(this.createdAt = e), (this.lastLoginAt = t), this._initializeTime()
        }
        _initializeTime () {
          ;(this.lastSignInTime = Lh(this.lastLoginAt)),
            (this.creationTime = Lh(this.createdAt))
        }
        _copy (e) {
          ;(this.createdAt = e.createdAt),
            (this.lastLoginAt = e.lastLoginAt),
            this._initializeTime()
        }
        toJSON () {
          return { createdAt: this.createdAt, lastLoginAt: this.lastLoginAt }
        }
      }
      async function Fh (e) {
        var t
        const n = e.auth,
          s = await e.getIdToken(),
          i = await xh(
            e,
            (async function (e, t) {
              return Ah(e, 'POST', '/v1/accounts:lookup', t)
            })(n, { idToken: s })
          )
        ph(null == i ? void 0 : i.users.length, n, 'internal-error')
        const r = i.users[0]
        e._notifyReloadListener(r)
        const o = (null === (t = r.providerUserInfo) || void 0 === t
          ? void 0
          : t.length)
            ? r.providerUserInfo.map(e => {
                var { providerId: t } = e,
                  n = oh(e, ['providerId'])
                return {
                  providerId: t,
                  uid: n.rawId || '',
                  displayName: n.displayName || null,
                  email: n.email || null,
                  phoneNumber: n.phoneNumber || null,
                  photoURL: n.photoUrl || null
                }
              })
            : [],
          a =
            ((c = e.providerData),
            (l = o),
            [
              ...c.filter(e => !l.some(t => t.providerId === e.providerId)),
              ...l
            ])
        var c, l
        const u = e.isAnonymous,
          h = !((e.email && r.passwordHash) || (null == a ? void 0 : a.length)),
          d = !!u && h,
          f = {
            uid: r.localId,
            displayName: r.displayName || null,
            photoURL: r.photoUrl || null,
            email: r.email || null,
            emailVerified: r.emailVerified || !1,
            phoneNumber: r.phoneNumber || null,
            tenantId: r.tenantId || null,
            providerData: a,
            metadata: new Vh(r.createdAt, r.lastLoginAt),
            isAnonymous: d
          }
        Object.assign(e, f)
      }
      class qh {
        constructor () {
          ;(this.refreshToken = null),
            (this.accessToken = null),
            (this.expirationTime = null)
        }
        get isExpired () {
          return !this.expirationTime || Date.now() > this.expirationTime - 3e4
        }
        updateFromServerResponse (e) {
          ph(e.idToken, 'internal-error'),
            ph(void 0 !== e.idToken, 'internal-error'),
            ph(void 0 !== e.refreshToken, 'internal-error')
          const t =
            'expiresIn' in e && void 0 !== e.expiresIn
              ? Number(e.expiresIn)
              : (function (e) {
                  const t = Mh(e)
                  return (
                    ph(t, 'internal-error'),
                    ph(void 0 !== t.exp, 'internal-error'),
                    ph(void 0 !== t.iat, 'internal-error'),
                    Number(t.exp) - Number(t.iat)
                  )
                })(e.idToken)
          this.updateTokensAndExpiration(e.idToken, e.refreshToken, t)
        }
        async getToken (e, t = !1) {
          return (
            ph(!this.accessToken || this.refreshToken, e, 'user-token-expired'),
            t || !this.accessToken || this.isExpired
              ? this.refreshToken
                ? (await this.refresh(e, this.refreshToken), this.accessToken)
                : null
              : this.accessToken
          )
        }
        clearRefreshToken () {
          this.refreshToken = null
        }
        async refresh (e, t) {
          const {
            accessToken: n,
            refreshToken: s,
            expiresIn: i
          } = await (async function (e, t) {
            const n = await Ch(e, {}, async () => {
              const n = f({
                  grant_type: 'refresh_token',
                  refresh_token: t
                }).slice(1),
                { tokenApiHost: s, apiKey: i } = e.config,
                r = Rh(e, s, '/v1/token', `key=${i}`),
                o = await e._getAdditionalHeaders()
              return (
                (o['Content-Type'] = 'application/x-www-form-urlencoded'),
                bh.fetch()(r, { method: 'POST', headers: o, body: n })
              )
            })
            return {
              accessToken: n.access_token,
              expiresIn: n.expires_in,
              refreshToken: n.refresh_token
            }
          })(e, t)
          this.updateTokensAndExpiration(n, s, Number(i))
        }
        updateTokensAndExpiration (e, t, n) {
          ;(this.refreshToken = t || null),
            (this.accessToken = e || null),
            (this.expirationTime = Date.now() + 1e3 * n)
        }
        static fromJSON (e, t) {
          const { refreshToken: n, accessToken: s, expirationTime: i } = t,
            r = new qh()
          return (
            n &&
              (ph('string' == typeof n, 'internal-error', { appName: e }),
              (r.refreshToken = n)),
            s &&
              (ph('string' == typeof s, 'internal-error', { appName: e }),
              (r.accessToken = s)),
            i &&
              (ph('number' == typeof i, 'internal-error', { appName: e }),
              (r.expirationTime = i)),
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
        _assign (e) {
          ;(this.accessToken = e.accessToken),
            (this.refreshToken = e.refreshToken),
            (this.expirationTime = e.expirationTime)
        }
        _clone () {
          return Object.assign(new qh(), this.toJSON())
        }
        _performRefresh () {
          return mh('not implemented')
        }
      }
      function $h (e, t) {
        ph('string' == typeof e || void 0 === e, 'internal-error', {
          appName: t
        })
      }
      class jh {
        constructor (e) {
          var { uid: t, auth: n, stsTokenManager: s } = e,
            i = oh(e, ['uid', 'auth', 'stsTokenManager'])
          ;(this.providerId = 'firebase'),
            (this.emailVerified = !1),
            (this.isAnonymous = !1),
            (this.tenantId = null),
            (this.providerData = []),
            (this.proactiveRefresh = new Uh(this)),
            (this.reloadUserInfo = null),
            (this.reloadListener = null),
            (this.uid = t),
            (this.auth = n),
            (this.stsTokenManager = s),
            (this.accessToken = s.accessToken),
            (this.displayName = i.displayName || null),
            (this.email = i.email || null),
            (this.emailVerified = i.emailVerified || !1),
            (this.phoneNumber = i.phoneNumber || null),
            (this.photoURL = i.photoURL || null),
            (this.isAnonymous = i.isAnonymous || !1),
            (this.tenantId = i.tenantId || null),
            (this.metadata = new Vh(
              i.createdAt || void 0,
              i.lastLoginAt || void 0
            ))
        }
        async getIdToken (e) {
          const t = await xh(this, this.stsTokenManager.getToken(this.auth, e))
          return (
            ph(t, this.auth, 'internal-error'),
            this.accessToken !== t &&
              ((this.accessToken = t),
              await this.auth._persistUserIfCurrent(this),
              this.auth._notifyListenersIfCurrent(this)),
            t
          )
        }
        getIdTokenResult (e) {
          return (async function (e, t = !1) {
            const n = v(e),
              s = await n.getIdToken(t),
              i = Mh(s)
            ph(i && i.exp && i.auth_time && i.iat, n.auth, 'internal-error')
            const r = 'object' == typeof i.firebase ? i.firebase : void 0,
              o = null == r ? void 0 : r.sign_in_provider
            return {
              claims: i,
              token: s,
              authTime: Lh(Ph(i.auth_time)),
              issuedAtTime: Lh(Ph(i.iat)),
              expirationTime: Lh(Ph(i.exp)),
              signInProvider: o || null,
              signInSecondFactor:
                (null == r ? void 0 : r.sign_in_second_factor) || null
            }
          })(this, e)
        }
        reload () {
          return (async function (e) {
            const t = v(e)
            await Fh(t),
              await t.auth._persistUserIfCurrent(t),
              t.auth._notifyListenersIfCurrent(t)
          })(this)
        }
        _assign (e) {
          this !== e &&
            (ph(this.uid === e.uid, this.auth, 'internal-error'),
            (this.displayName = e.displayName),
            (this.photoURL = e.photoURL),
            (this.email = e.email),
            (this.emailVerified = e.emailVerified),
            (this.phoneNumber = e.phoneNumber),
            (this.isAnonymous = e.isAnonymous),
            (this.tenantId = e.tenantId),
            (this.providerData = e.providerData.map(e => Object.assign({}, e))),
            this.metadata._copy(e.metadata),
            this.stsTokenManager._assign(e.stsTokenManager))
        }
        _clone (e) {
          return new jh(
            Object.assign(Object.assign({}, this), {
              auth: e,
              stsTokenManager: this.stsTokenManager._clone()
            })
          )
        }
        _onReload (e) {
          ph(!this.reloadListener, this.auth, 'internal-error'),
            (this.reloadListener = e),
            this.reloadUserInfo &&
              (this._notifyReloadListener(this.reloadUserInfo),
              (this.reloadUserInfo = null))
        }
        _notifyReloadListener (e) {
          this.reloadListener
            ? this.reloadListener(e)
            : (this.reloadUserInfo = e)
        }
        _startProactiveRefresh () {
          this.proactiveRefresh._start()
        }
        _stopProactiveRefresh () {
          this.proactiveRefresh._stop()
        }
        async _updateTokensIfNecessary (e, t = !1) {
          let n = !1
          e.idToken &&
            e.idToken !== this.stsTokenManager.accessToken &&
            (this.stsTokenManager.updateFromServerResponse(e), (n = !0)),
            t && (await Fh(this)),
            await this.auth._persistUserIfCurrent(this),
            n && this.auth._notifyListenersIfCurrent(this)
        }
        async delete () {
          const e = await this.getIdToken()
          return (
            await xh(
              this,
              (async function (e, t) {
                return Ah(e, 'POST', '/v1/accounts:delete', t)
              })(this.auth, { idToken: e })
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
                providerData: this.providerData.map(e => Object.assign({}, e)),
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
        static _fromJSON (e, t) {
          var n, s, i, r, o, a, c, l
          const u = null !== (n = t.displayName) && void 0 !== n ? n : void 0,
            h = null !== (s = t.email) && void 0 !== s ? s : void 0,
            d = null !== (i = t.phoneNumber) && void 0 !== i ? i : void 0,
            f = null !== (r = t.photoURL) && void 0 !== r ? r : void 0,
            p = null !== (o = t.tenantId) && void 0 !== o ? o : void 0,
            m = null !== (a = t._redirectEventId) && void 0 !== a ? a : void 0,
            g = null !== (c = t.createdAt) && void 0 !== c ? c : void 0,
            y = null !== (l = t.lastLoginAt) && void 0 !== l ? l : void 0,
            {
              uid: v,
              emailVerified: w,
              isAnonymous: I,
              providerData: T,
              stsTokenManager: E
            } = t
          ph(v && E, e, 'internal-error')
          const b = qh.fromJSON(this.name, E)
          ph('string' == typeof v, e, 'internal-error'),
            $h(u, e.name),
            $h(h, e.name),
            ph('boolean' == typeof w, e, 'internal-error'),
            ph('boolean' == typeof I, e, 'internal-error'),
            $h(d, e.name),
            $h(f, e.name),
            $h(p, e.name),
            $h(m, e.name),
            $h(g, e.name),
            $h(y, e.name)
          const _ = new jh({
            uid: v,
            auth: e,
            email: h,
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
              (_.providerData = T.map(e => Object.assign({}, e))),
            m && (_._redirectEventId = m),
            _
          )
        }
        static async _fromIdTokenResponse (e, t, n = !1) {
          const s = new qh()
          s.updateFromServerResponse(t)
          const i = new jh({
            uid: t.localId,
            auth: e,
            stsTokenManager: s,
            isAnonymous: n
          })
          return await Fh(i), i
        }
      }
      class Bh {
        constructor () {
          ;(this.type = 'NONE'), (this.storage = {})
        }
        async _isAvailable () {
          return !0
        }
        async _set (e, t) {
          this.storage[e] = t
        }
        async _get (e) {
          const t = this.storage[e]
          return void 0 === t ? null : t
        }
        async _remove (e) {
          delete this.storage[e]
        }
        _addListener (e, t) {}
        _removeListener (e, t) {}
      }
      Bh.type = 'NONE'
      const Hh = Bh
      function Kh (e, t, n) {
        return `firebase:${e}:${t}:${n}`
      }
      class zh {
        constructor (e, t, n) {
          ;(this.persistence = e), (this.auth = t), (this.userKey = n)
          const { config: s, name: i } = this.auth
          ;(this.fullUserKey = Kh(this.userKey, s.apiKey, i)),
            (this.fullPersistenceKey = Kh('persistence', s.apiKey, i)),
            (this.boundEventHandler = t._onStorageEvent.bind(t)),
            this.persistence._addListener(
              this.fullUserKey,
              this.boundEventHandler
            )
        }
        setCurrentUser (e) {
          return this.persistence._set(this.fullUserKey, e.toJSON())
        }
        async getCurrentUser () {
          const e = await this.persistence._get(this.fullUserKey)
          return e ? jh._fromJSON(this.auth, e) : null
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
        async setPersistence (e) {
          if (this.persistence === e) return
          const t = await this.getCurrentUser()
          return (
            await this.removeCurrentUser(),
            (this.persistence = e),
            t ? this.setCurrentUser(t) : void 0
          )
        }
        delete () {
          this.persistence._removeListener(
            this.fullUserKey,
            this.boundEventHandler
          )
        }
        static async create (e, t, n = 'authUser') {
          if (!t.length) return new zh(vh(Hh), e, n)
          const s = (
            await Promise.all(
              t.map(async e => {
                if (await e._isAvailable()) return e
              })
            )
          ).filter(e => e)
          let i = s[0] || vh(Hh)
          const r = Kh(n, e.config.apiKey, e.name)
          let o = null
          for (const n of t)
            try {
              const t = await n._get(r)
              if (t) {
                const s = jh._fromJSON(e, t)
                n !== i && (o = s), (i = n)
                break
              }
            } catch (e) {}
          const a = s.filter(e => e._shouldAllowMigration)
          return i._shouldAllowMigration && a.length
            ? ((i = a[0]),
              o && (await i._set(r, o.toJSON())),
              await Promise.all(
                t.map(async e => {
                  if (e !== i)
                    try {
                      await e._remove(r)
                    } catch (e) {}
                })
              ),
              new zh(i, e, n))
            : new zh(i, e, n)
        }
      }
      function Gh (e) {
        const t = e.toLowerCase()
        if (t.includes('opera/') || t.includes('opr/') || t.includes('opios/'))
          return 'Opera'
        if (Yh(t)) return 'IEMobile'
        if (t.includes('msie') || t.includes('trident/')) return 'IE'
        if (t.includes('edge/')) return 'Edge'
        if (Wh(t)) return 'Firefox'
        if (t.includes('silk/')) return 'Silk'
        if (Zh(t)) return 'Blackberry'
        if (ed(t)) return 'Webos'
        if (Qh(t)) return 'Safari'
        if ((t.includes('chrome/') || Xh(t)) && !t.includes('edge/'))
          return 'Chrome'
        if (Jh(t)) return 'Android'
        {
          const t = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,
            n = e.match(t)
          if (2 === (null == n ? void 0 : n.length)) return n[1]
        }
        return 'Other'
      }
      function Wh (e = s()) {
        return /firefox\//i.test(e)
      }
      function Qh (e = s()) {
        const t = e.toLowerCase()
        return (
          t.includes('safari/') &&
          !t.includes('chrome/') &&
          !t.includes('crios/') &&
          !t.includes('android')
        )
      }
      function Xh (e = s()) {
        return /crios\//i.test(e)
      }
      function Yh (e = s()) {
        return /iemobile/i.test(e)
      }
      function Jh (e = s()) {
        return /android/i.test(e)
      }
      function Zh (e = s()) {
        return /blackberry/i.test(e)
      }
      function ed (e = s()) {
        return /webos/i.test(e)
      }
      function td (e = s()) {
        return /iphone|ipad|ipod/i.test(e)
      }
      function nd (e = s()) {
        return (
          td(e) || Jh(e) || ed(e) || Zh(e) || /windows phone/i.test(e) || Yh(e)
        )
      }
      function sd (e, t = []) {
        let n
        switch (e) {
          case 'Browser':
            n = Gh(s())
            break
          case 'Worker':
            n = `${Gh(s())}-${e}`
            break
          default:
            n = e
        }
        return `${n}/JsCore/9.6.3/${
          t.length ? t.join(',') : 'FirebaseCore-web'
        }`
      }
      class id {
        constructor (e, t) {
          ;(this.app = e),
            (this.config = t),
            (this.currentUser = null),
            (this.emulatorConfig = null),
            (this.operations = Promise.resolve()),
            (this.authStateSubscription = new od(this)),
            (this.idTokenSubscription = new od(this)),
            (this.redirectUser = null),
            (this.isProactiveRefreshEnabled = !1),
            (this._canInitEmulator = !0),
            (this._isInitialized = !1),
            (this._deleted = !1),
            (this._initializationPromise = null),
            (this._popupRedirectResolver = null),
            (this._errorFactory = ch),
            (this.lastNotifiedUid = void 0),
            (this.languageCode = null),
            (this.tenantId = null),
            (this.settings = { appVerificationDisabledForTesting: !1 }),
            (this.frameworks = []),
            (this.name = e.name),
            (this.clientVersion = t.sdkClientVersion)
        }
        _initializeWithPersistence (e, t) {
          return (
            t && (this._popupRedirectResolver = vh(t)),
            (this._initializationPromise = this.queue(async () => {
              var n, s
              if (
                !this._deleted &&
                ((this.persistenceManager = await zh.create(this, e)),
                !this._deleted)
              ) {
                if (
                  null === (n = this._popupRedirectResolver) || void 0 === n
                    ? void 0
                    : n._shouldInitProactively
                )
                  try {
                    await this._popupRedirectResolver._initialize(this)
                  } catch (e) {}
                await this.initializeCurrentUser(t),
                  (this.lastNotifiedUid =
                    (null === (s = this.currentUser) || void 0 === s
                      ? void 0
                      : s.uid) || null),
                  this._deleted || (this._isInitialized = !0)
              }
            })),
            this._initializationPromise
          )
        }
        async _onStorageEvent () {
          if (this._deleted) return
          const e = await this.assertedPersistence.getCurrentUser()
          return this.currentUser || e
            ? this.currentUser && e && this.currentUser.uid === e.uid
              ? (this._currentUser._assign(e),
                void (await this.currentUser.getIdToken()))
              : void (await this._updateCurrentUser(e))
            : void 0
        }
        async initializeCurrentUser (e) {
          var t
          let n = await this.assertedPersistence.getCurrentUser()
          if (e && this.config.authDomain) {
            await this.getOrInitRedirectPersistenceManager()
            const s =
                null === (t = this.redirectUser) || void 0 === t
                  ? void 0
                  : t._redirectEventId,
              i = null == n ? void 0 : n._redirectEventId,
              r = await this.tryRedirectSignIn(e)
            ;(s && s !== i) || !(null == r ? void 0 : r.user) || (n = r.user)
          }
          return n
            ? n._redirectEventId
              ? (ph(this._popupRedirectResolver, this, 'argument-error'),
                await this.getOrInitRedirectPersistenceManager(),
                this.redirectUser &&
                this.redirectUser._redirectEventId === n._redirectEventId
                  ? this.directlySetCurrentUser(n)
                  : this.reloadAndSetCurrentUserOrClear(n))
              : this.reloadAndSetCurrentUserOrClear(n)
            : this.directlySetCurrentUser(null)
        }
        async tryRedirectSignIn (e) {
          let t = null
          try {
            t = await this._popupRedirectResolver._completeRedirectFn(
              this,
              e,
              !0
            )
          } catch (e) {
            await this._setRedirectUser(null)
          }
          return t
        }
        async reloadAndSetCurrentUserOrClear (e) {
          try {
            await Fh(e)
          } catch (e) {
            if ('auth/network-request-failed' !== e.code)
              return this.directlySetCurrentUser(null)
          }
          return this.directlySetCurrentUser(e)
        }
        useDeviceLanguage () {
          this.languageCode = (function () {
            if ('undefined' == typeof navigator) return null
            const e = navigator
            return (e.languages && e.languages[0]) || e.language || null
          })()
        }
        async _delete () {
          this._deleted = !0
        }
        async updateCurrentUser (e) {
          const t = e ? v(e) : null
          return (
            t &&
              ph(
                t.auth.config.apiKey === this.config.apiKey,
                this,
                'invalid-user-token'
              ),
            this._updateCurrentUser(t && t._clone(this))
          )
        }
        async _updateCurrentUser (e) {
          if (!this._deleted)
            return (
              e && ph(this.tenantId === e.tenantId, this, 'tenant-id-mismatch'),
              this.queue(async () => {
                await this.directlySetCurrentUser(e), this.notifyAuthListeners()
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
        setPersistence (e) {
          return this.queue(async () => {
            await this.assertedPersistence.setPersistence(vh(e))
          })
        }
        _getPersistence () {
          return this.assertedPersistence.persistence.type
        }
        _updateErrorMap (e) {
          this._errorFactory = new l('auth', 'Firebase', e())
        }
        onAuthStateChanged (e, t, n) {
          return this.registerStateListener(this.authStateSubscription, e, t, n)
        }
        onIdTokenChanged (e, t, n) {
          return this.registerStateListener(this.idTokenSubscription, e, t, n)
        }
        toJSON () {
          var e
          return {
            apiKey: this.config.apiKey,
            authDomain: this.config.authDomain,
            appName: this.name,
            currentUser:
              null === (e = this._currentUser) || void 0 === e
                ? void 0
                : e.toJSON()
          }
        }
        async _setRedirectUser (e, t) {
          const n = await this.getOrInitRedirectPersistenceManager(t)
          return null === e ? n.removeCurrentUser() : n.setCurrentUser(e)
        }
        async getOrInitRedirectPersistenceManager (e) {
          if (!this.redirectPersistenceManager) {
            const t = (e && vh(e)) || this._popupRedirectResolver
            ph(t, this, 'argument-error'),
              (this.redirectPersistenceManager = await zh.create(
                this,
                [vh(t._redirectPersistence)],
                'redirectUser'
              )),
              (this.redirectUser = await this.redirectPersistenceManager.getCurrentUser())
          }
          return this.redirectPersistenceManager
        }
        async _redirectUserForId (e) {
          var t, n
          return (
            this._isInitialized && (await this.queue(async () => {})),
            (null === (t = this._currentUser) || void 0 === t
              ? void 0
              : t._redirectEventId) === e
              ? this._currentUser
              : (null === (n = this.redirectUser) || void 0 === n
                  ? void 0
                  : n._redirectEventId) === e
              ? this.redirectUser
              : null
          )
        }
        async _persistUserIfCurrent (e) {
          if (e === this.currentUser)
            return this.queue(async () => this.directlySetCurrentUser(e))
        }
        _notifyListenersIfCurrent (e) {
          e === this.currentUser && this.notifyAuthListeners()
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
          var e, t
          if (!this._isInitialized) return
          this.idTokenSubscription.next(this.currentUser)
          const n =
            null !==
              (t =
                null === (e = this.currentUser) || void 0 === e
                  ? void 0
                  : e.uid) && void 0 !== t
              ? t
              : null
          this.lastNotifiedUid !== n &&
            ((this.lastNotifiedUid = n),
            this.authStateSubscription.next(this.currentUser))
        }
        registerStateListener (e, t, n, s) {
          if (this._deleted) return () => {}
          const i = 'function' == typeof t ? t : t.next.bind(t),
            r = this._isInitialized
              ? Promise.resolve()
              : this._initializationPromise
          return (
            ph(r, this, 'internal-error'),
            r.then(() => i(this.currentUser)),
            'function' == typeof t ? e.addObserver(t, n, s) : e.addObserver(t)
          )
        }
        async directlySetCurrentUser (e) {
          this.currentUser &&
            this.currentUser !== e &&
            (this._currentUser._stopProactiveRefresh(),
            e && this.isProactiveRefreshEnabled && e._startProactiveRefresh()),
            (this.currentUser = e),
            e
              ? await this.assertedPersistence.setCurrentUser(e)
              : await this.assertedPersistence.removeCurrentUser()
        }
        queue (e) {
          return (this.operations = this.operations.then(e, e)), this.operations
        }
        get assertedPersistence () {
          return (
            ph(this.persistenceManager, this, 'internal-error'),
            this.persistenceManager
          )
        }
        _logFramework (e) {
          e &&
            !this.frameworks.includes(e) &&
            (this.frameworks.push(e),
            this.frameworks.sort(),
            (this.clientVersion = sd(
              this.config.clientPlatform,
              this._getFrameworks()
            )))
        }
        _getFrameworks () {
          return this.frameworks
        }
        async _getAdditionalHeaders () {
          const e = { 'X-Client-Version': this.clientVersion }
          return (
            this.app.options.appId &&
              (e['X-Firebase-gmpid'] = this.app.options.appId),
            e
          )
        }
      }
      function rd (e) {
        return v(e)
      }
      class od {
        constructor (e) {
          ;(this.auth = e),
            (this.observer = null),
            (this.addObserver = (function (e, t) {
              const n = new g(e, void 0)
              return n.subscribe.bind(n)
            })(e => (this.observer = e)))
        }
        get next () {
          return (
            ph(this.observer, this.auth, 'internal-error'),
            this.observer.next.bind(this.observer)
          )
        }
      }
      class ad {
        constructor (e, t) {
          ;(this.providerId = e), (this.signInMethod = t)
        }
        toJSON () {
          return mh('not implemented')
        }
        _getIdTokenResponse (e) {
          return mh('not implemented')
        }
        _linkToIdToken (e, t) {
          return mh('not implemented')
        }
        _getReauthenticationResolver (e) {
          return mh('not implemented')
        }
      }
      class cd extends ad {
        constructor (e, t, n, s = null) {
          super('password', n),
            (this._email = e),
            (this._password = t),
            (this._tenantId = s)
        }
        static _fromEmailAndPassword (e, t) {
          return new cd(e, t, 'password')
        }
        static _fromEmailAndCode (e, t, n = null) {
          return new cd(e, t, 'emailLink', n)
        }
        toJSON () {
          return {
            email: this._email,
            password: this._password,
            signInMethod: this.signInMethod,
            tenantId: this._tenantId
          }
        }
        static fromJSON (e) {
          const t = 'string' == typeof e ? JSON.parse(e) : e
          if (
            (null == t ? void 0 : t.email) &&
            (null == t ? void 0 : t.password)
          ) {
            if ('password' === t.signInMethod)
              return this._fromEmailAndPassword(t.email, t.password)
            if ('emailLink' === t.signInMethod)
              return this._fromEmailAndCode(t.email, t.password, t.tenantId)
          }
          return null
        }
        async _getIdTokenResponse (e) {
          switch (this.signInMethod) {
            case 'password':
              return (async function (e, t) {
                return Nh(
                  e,
                  'POST',
                  '/v1/accounts:signInWithPassword',
                  kh(e, t)
                )
              })(e, {
                returnSecureToken: !0,
                email: this._email,
                password: this._password
              })
            case 'emailLink':
              return (async function (e, t) {
                return Nh(
                  e,
                  'POST',
                  '/v1/accounts:signInWithEmailLink',
                  kh(e, t)
                )
              })(e, { email: this._email, oobCode: this._password })
            default:
              hh(e, 'internal-error')
          }
        }
        async _linkToIdToken (e, t) {
          switch (this.signInMethod) {
            case 'password':
              return (async function (e, t) {
                return Ah(e, 'POST', '/v1/accounts:update', t)
              })(e, {
                idToken: t,
                returnSecureToken: !0,
                email: this._email,
                password: this._password
              })
            case 'emailLink':
              return (async function (e, t) {
                return Nh(
                  e,
                  'POST',
                  '/v1/accounts:signInWithEmailLink',
                  kh(e, t)
                )
              })(e, { idToken: t, email: this._email, oobCode: this._password })
            default:
              hh(e, 'internal-error')
          }
        }
        _getReauthenticationResolver (e) {
          return this._getIdTokenResponse(e)
        }
      }
      async function ld (e, t) {
        return Nh(e, 'POST', '/v1/accounts:signInWithIdp', kh(e, t))
      }
      class ud extends ad {
        constructor () {
          super(...arguments), (this.pendingToken = null)
        }
        static _fromParams (e) {
          const t = new ud(e.providerId, e.signInMethod)
          return (
            e.idToken || e.accessToken
              ? (e.idToken && (t.idToken = e.idToken),
                e.accessToken && (t.accessToken = e.accessToken),
                e.nonce && !e.pendingToken && (t.nonce = e.nonce),
                e.pendingToken && (t.pendingToken = e.pendingToken))
              : e.oauthToken && e.oauthTokenSecret
              ? ((t.accessToken = e.oauthToken),
                (t.secret = e.oauthTokenSecret))
              : hh('argument-error'),
            t
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
        static fromJSON (e) {
          const t = 'string' == typeof e ? JSON.parse(e) : e,
            { providerId: n, signInMethod: s } = t,
            i = oh(t, ['providerId', 'signInMethod'])
          if (!n || !s) return null
          const r = new ud(n, s)
          return (
            (r.idToken = i.idToken || void 0),
            (r.accessToken = i.accessToken || void 0),
            (r.secret = i.secret),
            (r.nonce = i.nonce),
            (r.pendingToken = i.pendingToken || null),
            r
          )
        }
        _getIdTokenResponse (e) {
          return ld(e, this.buildRequest())
        }
        _linkToIdToken (e, t) {
          const n = this.buildRequest()
          return (n.idToken = t), ld(e, n)
        }
        _getReauthenticationResolver (e) {
          const t = this.buildRequest()
          return (t.autoCreate = !1), ld(e, t)
        }
        buildRequest () {
          const e = { requestUri: 'http://localhost', returnSecureToken: !0 }
          if (this.pendingToken) e.pendingToken = this.pendingToken
          else {
            const t = {}
            this.idToken && (t.id_token = this.idToken),
              this.accessToken && (t.access_token = this.accessToken),
              this.secret && (t.oauth_token_secret = this.secret),
              (t.providerId = this.providerId),
              this.nonce && !this.pendingToken && (t.nonce = this.nonce),
              (e.postBody = f(t))
          }
          return e
        }
      }
      const hd = { USER_NOT_FOUND: 'user-not-found' }
      class dd extends ad {
        constructor (e) {
          super('phone', 'phone'), (this.params = e)
        }
        static _fromVerification (e, t) {
          return new dd({ verificationId: e, verificationCode: t })
        }
        static _fromTokenResponse (e, t) {
          return new dd({ phoneNumber: e, temporaryProof: t })
        }
        _getIdTokenResponse (e) {
          return (async function (e, t) {
            return Nh(e, 'POST', '/v1/accounts:signInWithPhoneNumber', kh(e, t))
          })(e, this._makeVerificationRequest())
        }
        _linkToIdToken (e, t) {
          return (async function (e, t) {
            const n = await Nh(
              e,
              'POST',
              '/v1/accounts:signInWithPhoneNumber',
              kh(e, t)
            )
            if (n.temporaryProof)
              throw Oh(e, 'account-exists-with-different-credential', n)
            return n
          })(e, Object.assign({ idToken: t }, this._makeVerificationRequest()))
        }
        _getReauthenticationResolver (e) {
          return (async function (e, t) {
            return Nh(
              e,
              'POST',
              '/v1/accounts:signInWithPhoneNumber',
              kh(
                e,
                Object.assign(Object.assign({}, t), { operation: 'REAUTH' })
              ),
              hd
            )
          })(e, this._makeVerificationRequest())
        }
        _makeVerificationRequest () {
          const {
            temporaryProof: e,
            phoneNumber: t,
            verificationId: n,
            verificationCode: s
          } = this.params
          return e && t
            ? { temporaryProof: e, phoneNumber: t }
            : { sessionInfo: n, code: s }
        }
        toJSON () {
          const e = { providerId: this.providerId }
          return (
            this.params.phoneNumber &&
              (e.phoneNumber = this.params.phoneNumber),
            this.params.temporaryProof &&
              (e.temporaryProof = this.params.temporaryProof),
            this.params.verificationCode &&
              (e.verificationCode = this.params.verificationCode),
            this.params.verificationId &&
              (e.verificationId = this.params.verificationId),
            e
          )
        }
        static fromJSON (e) {
          'string' == typeof e && (e = JSON.parse(e))
          const {
            verificationId: t,
            verificationCode: n,
            phoneNumber: s,
            temporaryProof: i
          } = e
          return n || t || s || i
            ? new dd({
                verificationId: t,
                verificationCode: n,
                phoneNumber: s,
                temporaryProof: i
              })
            : null
        }
      }
      class fd {
        constructor (e) {
          var t, n, s, i, r, o
          const a = p(m(e)),
            c = null !== (t = a.apiKey) && void 0 !== t ? t : null,
            l = null !== (n = a.oobCode) && void 0 !== n ? n : null,
            u = (function (e) {
              switch (e) {
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
            })(null !== (s = a.mode) && void 0 !== s ? s : null)
          ph(c && l && u, 'argument-error'),
            (this.apiKey = c),
            (this.operation = u),
            (this.code = l),
            (this.continueUrl =
              null !== (i = a.continueUrl) && void 0 !== i ? i : null),
            (this.languageCode =
              null !== (r = a.languageCode) && void 0 !== r ? r : null),
            (this.tenantId =
              null !== (o = a.tenantId) && void 0 !== o ? o : null)
        }
        static parseLink (e) {
          const t = (function (e) {
            const t = p(m(e)).link,
              n = t ? p(m(t)).deep_link_id : null,
              s = p(m(e)).deep_link_id
            return (s ? p(m(s)).link : null) || s || n || t || e
          })(e)
          try {
            return new fd(t)
          } catch (e) {
            return null
          }
        }
      }
      class pd {
        constructor () {
          this.providerId = pd.PROVIDER_ID
        }
        static credential (e, t) {
          return cd._fromEmailAndPassword(e, t)
        }
        static credentialWithLink (e, t) {
          const n = fd.parseLink(t)
          return (
            ph(n, 'argument-error'), cd._fromEmailAndCode(e, n.code, n.tenantId)
          )
        }
      }
      ;(pd.PROVIDER_ID = 'password'),
        (pd.EMAIL_PASSWORD_SIGN_IN_METHOD = 'password'),
        (pd.EMAIL_LINK_SIGN_IN_METHOD = 'emailLink')
      class md {
        constructor (e) {
          ;(this.providerId = e),
            (this.defaultLanguageCode = null),
            (this.customParameters = {})
        }
        setDefaultLanguage (e) {
          this.defaultLanguageCode = e
        }
        setCustomParameters (e) {
          return (this.customParameters = e), this
        }
        getCustomParameters () {
          return this.customParameters
        }
      }
      class gd extends md {
        constructor () {
          super(...arguments), (this.scopes = [])
        }
        addScope (e) {
          return this.scopes.includes(e) || this.scopes.push(e), this
        }
        getScopes () {
          return [...this.scopes]
        }
      }
      class yd extends gd {
        constructor () {
          super('facebook.com')
        }
        static credential (e) {
          return ud._fromParams({
            providerId: yd.PROVIDER_ID,
            signInMethod: yd.FACEBOOK_SIGN_IN_METHOD,
            accessToken: e
          })
        }
        static credentialFromResult (e) {
          return yd.credentialFromTaggedObject(e)
        }
        static credentialFromError (e) {
          return yd.credentialFromTaggedObject(e.customData || {})
        }
        static credentialFromTaggedObject ({ _tokenResponse: e }) {
          if (!e || !('oauthAccessToken' in e)) return null
          if (!e.oauthAccessToken) return null
          try {
            return yd.credential(e.oauthAccessToken)
          } catch (e) {
            return null
          }
        }
      }
      ;(yd.FACEBOOK_SIGN_IN_METHOD = 'facebook.com'),
        (yd.PROVIDER_ID = 'facebook.com')
      class vd extends gd {
        constructor () {
          super('google.com'), this.addScope('profile')
        }
        static credential (e, t) {
          return ud._fromParams({
            providerId: vd.PROVIDER_ID,
            signInMethod: vd.GOOGLE_SIGN_IN_METHOD,
            idToken: e,
            accessToken: t
          })
        }
        static credentialFromResult (e) {
          return vd.credentialFromTaggedObject(e)
        }
        static credentialFromError (e) {
          return vd.credentialFromTaggedObject(e.customData || {})
        }
        static credentialFromTaggedObject ({ _tokenResponse: e }) {
          if (!e) return null
          const { oauthIdToken: t, oauthAccessToken: n } = e
          if (!t && !n) return null
          try {
            return vd.credential(t, n)
          } catch (e) {
            return null
          }
        }
      }
      ;(vd.GOOGLE_SIGN_IN_METHOD = 'google.com'),
        (vd.PROVIDER_ID = 'google.com')
      class wd extends gd {
        constructor () {
          super('github.com')
        }
        static credential (e) {
          return ud._fromParams({
            providerId: wd.PROVIDER_ID,
            signInMethod: wd.GITHUB_SIGN_IN_METHOD,
            accessToken: e
          })
        }
        static credentialFromResult (e) {
          return wd.credentialFromTaggedObject(e)
        }
        static credentialFromError (e) {
          return wd.credentialFromTaggedObject(e.customData || {})
        }
        static credentialFromTaggedObject ({ _tokenResponse: e }) {
          if (!e || !('oauthAccessToken' in e)) return null
          if (!e.oauthAccessToken) return null
          try {
            return wd.credential(e.oauthAccessToken)
          } catch (e) {
            return null
          }
        }
      }
      ;(wd.GITHUB_SIGN_IN_METHOD = 'github.com'),
        (wd.PROVIDER_ID = 'github.com')
      class Id extends gd {
        constructor () {
          super('twitter.com')
        }
        static credential (e, t) {
          return ud._fromParams({
            providerId: Id.PROVIDER_ID,
            signInMethod: Id.TWITTER_SIGN_IN_METHOD,
            oauthToken: e,
            oauthTokenSecret: t
          })
        }
        static credentialFromResult (e) {
          return Id.credentialFromTaggedObject(e)
        }
        static credentialFromError (e) {
          return Id.credentialFromTaggedObject(e.customData || {})
        }
        static credentialFromTaggedObject ({ _tokenResponse: e }) {
          if (!e) return null
          const { oauthAccessToken: t, oauthTokenSecret: n } = e
          if (!t || !n) return null
          try {
            return Id.credential(t, n)
          } catch (e) {
            return null
          }
        }
      }
      ;(Id.TWITTER_SIGN_IN_METHOD = 'twitter.com'),
        (Id.PROVIDER_ID = 'twitter.com')
      class Td {
        constructor (e) {
          ;(this.user = e.user),
            (this.providerId = e.providerId),
            (this._tokenResponse = e._tokenResponse),
            (this.operationType = e.operationType)
        }
        static async _fromIdTokenResponse (e, t, n, s = !1) {
          const i = await jh._fromIdTokenResponse(e, n, s),
            r = Ed(n)
          return new Td({
            user: i,
            providerId: r,
            _tokenResponse: n,
            operationType: t
          })
        }
        static async _forOperation (e, t, n) {
          await e._updateTokensIfNecessary(n, !0)
          const s = Ed(n)
          return new Td({
            user: e,
            providerId: s,
            _tokenResponse: n,
            operationType: t
          })
        }
      }
      function Ed (e) {
        return e.providerId ? e.providerId : 'phoneNumber' in e ? 'phone' : null
      }
      class bd extends c {
        constructor (e, t, n, s) {
          var i
          super(t.code, t.message),
            (this.operationType = n),
            (this.user = s),
            Object.setPrototypeOf(this, bd.prototype),
            (this.customData = {
              appName: e.name,
              tenantId: null !== (i = e.tenantId) && void 0 !== i ? i : void 0,
              _serverResponse: t.customData._serverResponse,
              operationType: n
            })
        }
        static _fromErrorAndOperation (e, t, n, s) {
          return new bd(e, t, n, s)
        }
      }
      function _d (e, t, n, s) {
        return ('reauthenticate' === t
          ? n._getReauthenticationResolver(e)
          : n._getIdTokenResponse(e)
        ).catch(n => {
          if ('auth/multi-factor-auth-required' === n.code)
            throw bd._fromErrorAndOperation(e, n, t, s)
          throw n
        })
      }
      function Sd (e, t, n, s) {
        return v(e).onAuthStateChanged(t, n, s)
      }
      new WeakMap()
      const kd = '__sak'
      class Ad {
        constructor (e, t) {
          ;(this.storageRetriever = e), (this.type = t)
        }
        _isAvailable () {
          try {
            return this.storage
              ? (this.storage.setItem(kd, '1'),
                this.storage.removeItem(kd),
                Promise.resolve(!0))
              : Promise.resolve(!1)
          } catch (e) {
            return Promise.resolve(!1)
          }
        }
        _set (e, t) {
          return this.storage.setItem(e, JSON.stringify(t)), Promise.resolve()
        }
        _get (e) {
          const t = this.storage.getItem(e)
          return Promise.resolve(t ? JSON.parse(t) : null)
        }
        _remove (e) {
          return this.storage.removeItem(e), Promise.resolve()
        }
        get storage () {
          return this.storageRetriever()
        }
      }
      class Cd extends Ad {
        constructor () {
          super(() => window.localStorage, 'LOCAL'),
            (this.boundEventHandler = (e, t) => this.onStorageEvent(e, t)),
            (this.listeners = {}),
            (this.localCache = {}),
            (this.pollTimer = null),
            (this.safariLocalStorageNotSynced =
              (function () {
                const e = s()
                return Qh(e) || td(e)
              })() &&
              (function () {
                try {
                  return !(!window || window === window.top)
                } catch (e) {
                  return !1
                }
              })()),
            (this.fallbackToPolling = nd()),
            (this._shouldAllowMigration = !0)
        }
        forAllChangedKeys (e) {
          for (const t of Object.keys(this.listeners)) {
            const n = this.storage.getItem(t),
              s = this.localCache[t]
            n !== s && e(t, s, n)
          }
        }
        onStorageEvent (e, t = !1) {
          if (!e.key)
            return void this.forAllChangedKeys((e, t, n) => {
              this.notifyListeners(e, n)
            })
          const n = e.key
          if (
            (t ? this.detachListener() : this.stopPolling(),
            this.safariLocalStorageNotSynced)
          ) {
            const s = this.storage.getItem(n)
            if (e.newValue !== s)
              null !== e.newValue
                ? this.storage.setItem(n, e.newValue)
                : this.storage.removeItem(n)
            else if (this.localCache[n] === e.newValue && !t) return
          }
          const s = () => {
              const e = this.storage.getItem(n)
              ;(t || this.localCache[n] !== e) && this.notifyListeners(n, e)
            },
            i = this.storage.getItem(n)
          a() &&
          10 === document.documentMode &&
          i !== e.newValue &&
          e.newValue !== e.oldValue
            ? setTimeout(s, 10)
            : s()
        }
        notifyListeners (e, t) {
          this.localCache[e] = t
          const n = this.listeners[e]
          if (n) for (const e of Array.from(n)) e(t ? JSON.parse(t) : t)
        }
        startPolling () {
          this.stopPolling(),
            (this.pollTimer = setInterval(() => {
              this.forAllChangedKeys((e, t, n) => {
                this.onStorageEvent(
                  new StorageEvent('storage', {
                    key: e,
                    oldValue: t,
                    newValue: n
                  }),
                  !0
                )
              })
            }, 1e3))
        }
        stopPolling () {
          this.pollTimer &&
            (clearInterval(this.pollTimer), (this.pollTimer = null))
        }
        attachListener () {
          window.addEventListener('storage', this.boundEventHandler)
        }
        detachListener () {
          window.removeEventListener('storage', this.boundEventHandler)
        }
        _addListener (e, t) {
          0 === Object.keys(this.listeners).length &&
            (this.fallbackToPolling
              ? this.startPolling()
              : this.attachListener()),
            this.listeners[e] ||
              ((this.listeners[e] = new Set()),
              (this.localCache[e] = this.storage.getItem(e))),
            this.listeners[e].add(t)
        }
        _removeListener (e, t) {
          this.listeners[e] &&
            (this.listeners[e].delete(t),
            0 === this.listeners[e].size && delete this.listeners[e]),
            0 === Object.keys(this.listeners).length &&
              (this.detachListener(), this.stopPolling())
        }
        async _set (e, t) {
          await super._set(e, t), (this.localCache[e] = JSON.stringify(t))
        }
        async _get (e) {
          const t = await super._get(e)
          return (this.localCache[e] = JSON.stringify(t)), t
        }
        async _remove (e) {
          await super._remove(e), delete this.localCache[e]
        }
      }
      Cd.type = 'LOCAL'
      const Nd = Cd
      class Rd extends Ad {
        constructor () {
          super(() => window.sessionStorage, 'SESSION')
        }
        _addListener (e, t) {}
        _removeListener (e, t) {}
      }
      Rd.type = 'SESSION'
      const Dd = Rd
      class Od {
        constructor (e) {
          ;(this.eventTarget = e),
            (this.handlersMap = {}),
            (this.boundEventHandler = this.handleEvent.bind(this))
        }
        static _getInstance (e) {
          const t = this.receivers.find(t => t.isListeningto(e))
          if (t) return t
          const n = new Od(e)
          return this.receivers.push(n), n
        }
        isListeningto (e) {
          return this.eventTarget === e
        }
        async handleEvent (e) {
          const t = e,
            { eventId: n, eventType: s, data: i } = t.data,
            r = this.handlersMap[s]
          if (!(null == r ? void 0 : r.size)) return
          t.ports[0].postMessage({ status: 'ack', eventId: n, eventType: s })
          const o = Array.from(r).map(async e => e(t.origin, i)),
            a = await (function (e) {
              return Promise.all(
                e.map(async e => {
                  try {
                    return { fulfilled: !0, value: await e }
                  } catch (e) {
                    return { fulfilled: !1, reason: e }
                  }
                })
              )
            })(o)
          t.ports[0].postMessage({
            status: 'done',
            eventId: n,
            eventType: s,
            response: a
          })
        }
        _subscribe (e, t) {
          0 === Object.keys(this.handlersMap).length &&
            this.eventTarget.addEventListener(
              'message',
              this.boundEventHandler
            ),
            this.handlersMap[e] || (this.handlersMap[e] = new Set()),
            this.handlersMap[e].add(t)
        }
        _unsubscribe (e, t) {
          this.handlersMap[e] && t && this.handlersMap[e].delete(t),
            (t && 0 !== this.handlersMap[e].size) || delete this.handlersMap[e],
            0 === Object.keys(this.handlersMap).length &&
              this.eventTarget.removeEventListener(
                'message',
                this.boundEventHandler
              )
        }
      }
      function Ld (e = '', t = 10) {
        let n = ''
        for (let e = 0; e < t; e++) n += Math.floor(10 * Math.random())
        return e + n
      }
      Od.receivers = []
      class Pd {
        constructor (e) {
          ;(this.target = e), (this.handlers = new Set())
        }
        removeMessageHandler (e) {
          e.messageChannel &&
            (e.messageChannel.port1.removeEventListener('message', e.onMessage),
            e.messageChannel.port1.close()),
            this.handlers.delete(e)
        }
        async _send (e, t, n = 50) {
          const s =
            'undefined' != typeof MessageChannel ? new MessageChannel() : null
          if (!s) throw new Error('connection_unavailable')
          let i, r
          return new Promise((o, a) => {
            const c = Ld('', 20)
            s.port1.start()
            const l = setTimeout(() => {
              a(new Error('unsupported_event'))
            }, n)
            ;(r = {
              messageChannel: s,
              onMessage (e) {
                const t = e
                if (t.data.eventId === c)
                  switch (t.data.status) {
                    case 'ack':
                      clearTimeout(l),
                        (i = setTimeout(() => {
                          a(new Error('timeout'))
                        }, 3e3))
                      break
                    case 'done':
                      clearTimeout(i), o(t.data.response)
                      break
                    default:
                      clearTimeout(l),
                        clearTimeout(i),
                        a(new Error('invalid_response'))
                  }
              }
            }),
              this.handlers.add(r),
              s.port1.addEventListener('message', r.onMessage),
              this.target.postMessage({ eventType: e, eventId: c, data: t }, [
                s.port2
              ])
          }).finally(() => {
            r && this.removeMessageHandler(r)
          })
        }
      }
      function Md () {
        return window
      }
      function xd () {
        return (
          void 0 !== Md().WorkerGlobalScope &&
          'function' == typeof Md().importScripts
        )
      }
      const Ud = 'firebaseLocalStorageDb',
        Vd = 'firebaseLocalStorage',
        Fd = 'fbase_key'
      class qd {
        constructor (e) {
          this.request = e
        }
        toPromise () {
          return new Promise((e, t) => {
            this.request.addEventListener('success', () => {
              e(this.request.result)
            }),
              this.request.addEventListener('error', () => {
                t(this.request.error)
              })
          })
        }
      }
      function $d (e, t) {
        return e.transaction([Vd], t ? 'readwrite' : 'readonly').objectStore(Vd)
      }
      function jd () {
        const e = indexedDB.open(Ud, 1)
        return new Promise((t, n) => {
          e.addEventListener('error', () => {
            n(e.error)
          }),
            e.addEventListener('upgradeneeded', () => {
              const t = e.result
              try {
                t.createObjectStore(Vd, { keyPath: Fd })
              } catch (e) {
                n(e)
              }
            }),
            e.addEventListener('success', async () => {
              const n = e.result
              n.objectStoreNames.contains(Vd)
                ? t(n)
                : (n.close(),
                  await (function () {
                    const e = indexedDB.deleteDatabase(Ud)
                    return new qd(e).toPromise()
                  })(),
                  t(await jd()))
            })
        })
      }
      async function Bd (e, t, n) {
        const s = $d(e, !0).put({ [Fd]: t, value: n })
        return new qd(s).toPromise()
      }
      function Hd (e, t) {
        const n = $d(e, !0).delete(t)
        return new qd(n).toPromise()
      }
      class Kd {
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
          return this.db || (this.db = await jd()), this.db
        }
        async _withRetries (e) {
          let t = 0
          for (;;)
            try {
              const t = await this._openDb()
              return await e(t)
            } catch (e) {
              if (t++ > 3) throw e
              this.db && (this.db.close(), (this.db = void 0))
            }
        }
        async initializeServiceWorkerMessaging () {
          return xd() ? this.initializeReceiver() : this.initializeSender()
        }
        async initializeReceiver () {
          ;(this.receiver = Od._getInstance(xd() ? self : null)),
            this.receiver._subscribe('keyChanged', async (e, t) => ({
              keyProcessed: (await this._poll()).includes(t.key)
            })),
            this.receiver._subscribe('ping', async (e, t) => ['keyChanged'])
        }
        async initializeSender () {
          var e, t
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
              } catch (e) {
                return null
              }
            })()),
            !this.activeServiceWorker)
          )
            return
          this.sender = new Pd(this.activeServiceWorker)
          const n = await this.sender._send('ping', {}, 800)
          n &&
            (null === (e = n[0]) || void 0 === e ? void 0 : e.fulfilled) &&
            (null === (t = n[0]) || void 0 === t
              ? void 0
              : t.value.includes('keyChanged')) &&
            (this.serviceWorkerReceiverAvailable = !0)
        }
        async notifyServiceWorker (e) {
          if (
            this.sender &&
            this.activeServiceWorker &&
            (function () {
              var e
              return (
                (null ===
                  (e =
                    null === navigator || void 0 === navigator
                      ? void 0
                      : navigator.serviceWorker) || void 0 === e
                  ? void 0
                  : e.controller) || null
              )
            })() === this.activeServiceWorker
          )
            try {
              await this.sender._send(
                'keyChanged',
                { key: e },
                this.serviceWorkerReceiverAvailable ? 800 : 50
              )
            } catch (e) {}
        }
        async _isAvailable () {
          try {
            if (!indexedDB) return !1
            const e = await jd()
            return await Bd(e, kd, '1'), await Hd(e, kd), !0
          } catch (e) {}
          return !1
        }
        async _withPendingWrite (e) {
          this.pendingWrites++
          try {
            await e()
          } finally {
            this.pendingWrites--
          }
        }
        async _set (e, t) {
          return this._withPendingWrite(
            async () => (
              await this._withRetries(n => Bd(n, e, t)),
              (this.localCache[e] = t),
              this.notifyServiceWorker(e)
            )
          )
        }
        async _get (e) {
          const t = await this._withRetries(t =>
            (async function (e, t) {
              const n = $d(e, !1).get(t),
                s = await new qd(n).toPromise()
              return void 0 === s ? null : s.value
            })(t, e)
          )
          return (this.localCache[e] = t), t
        }
        async _remove (e) {
          return this._withPendingWrite(
            async () => (
              await this._withRetries(t => Hd(t, e)),
              delete this.localCache[e],
              this.notifyServiceWorker(e)
            )
          )
        }
        async _poll () {
          const e = await this._withRetries(e => {
            const t = $d(e, !1).getAll()
            return new qd(t).toPromise()
          })
          if (!e) return []
          if (0 !== this.pendingWrites) return []
          const t = [],
            n = new Set()
          for (const { fbase_key: s, value: i } of e)
            n.add(s),
              JSON.stringify(this.localCache[s]) !== JSON.stringify(i) &&
                (this.notifyListeners(s, i), t.push(s))
          for (const e of Object.keys(this.localCache))
            this.localCache[e] &&
              !n.has(e) &&
              (this.notifyListeners(e, null), t.push(e))
          return t
        }
        notifyListeners (e, t) {
          this.localCache[e] = t
          const n = this.listeners[e]
          if (n) for (const e of Array.from(n)) e(t)
        }
        startPolling () {
          this.stopPolling(),
            (this.pollTimer = setInterval(async () => this._poll(), 800))
        }
        stopPolling () {
          this.pollTimer &&
            (clearInterval(this.pollTimer), (this.pollTimer = null))
        }
        _addListener (e, t) {
          0 === Object.keys(this.listeners).length && this.startPolling(),
            this.listeners[e] ||
              ((this.listeners[e] = new Set()), this._get(e)),
            this.listeners[e].add(t)
        }
        _removeListener (e, t) {
          this.listeners[e] &&
            (this.listeners[e].delete(t),
            0 === this.listeners[e].size && delete this.listeners[e]),
            0 === Object.keys(this.listeners).length && this.stopPolling()
        }
      }
      Kd.type = 'LOCAL'
      const zd = Kd
      function Gd (e) {
        return `__${e}${Math.floor(1e6 * Math.random())}`
      }
      Gd('rcb'), new Th(3e4, 6e4)
      class Wd {
        constructor (e) {
          ;(this.providerId = Wd.PROVIDER_ID), (this.auth = rd(e))
        }
        verifyPhoneNumber (e, t) {
          return (async function (e, t, n) {
            var s
            const i = await n.verify()
            try {
              let r
              if (
                (ph('string' == typeof i, e, 'argument-error'),
                ph('recaptcha' === n.type, e, 'argument-error'),
                (r = 'string' == typeof t ? { phoneNumber: t } : t),
                'session' in r)
              ) {
                const t = r.session
                if ('phoneNumber' in r) {
                  ph('enroll' === t.type, e, 'internal-error')
                  const n = await (function (e, t) {
                    return Ah(
                      e,
                      'POST',
                      '/v2/accounts/mfaEnrollment:start',
                      kh(e, t)
                    )
                  })(e, {
                    idToken: t.credential,
                    phoneEnrollmentInfo: {
                      phoneNumber: r.phoneNumber,
                      recaptchaToken: i
                    }
                  })
                  return n.phoneSessionInfo.sessionInfo
                }
                {
                  ph('signin' === t.type, e, 'internal-error')
                  const n =
                    (null === (s = r.multiFactorHint) || void 0 === s
                      ? void 0
                      : s.uid) || r.multiFactorUid
                  ph(n, e, 'missing-multi-factor-info')
                  const o = await (function (e, t) {
                    return Ah(
                      e,
                      'POST',
                      '/v2/accounts/mfaSignIn:start',
                      kh(e, t)
                    )
                  })(e, {
                    mfaPendingCredential: t.credential,
                    mfaEnrollmentId: n,
                    phoneSignInInfo: { recaptchaToken: i }
                  })
                  return o.phoneResponseInfo.sessionInfo
                }
              }
              {
                const { sessionInfo: t } = await (async function (e, t) {
                  return Ah(
                    e,
                    'POST',
                    '/v1/accounts:sendVerificationCode',
                    kh(e, t)
                  )
                })(e, { phoneNumber: r.phoneNumber, recaptchaToken: i })
                return t
              }
            } finally {
              n._reset()
            }
          })(this.auth, e, v(t))
        }
        static credential (e, t) {
          return dd._fromVerification(e, t)
        }
        static credentialFromResult (e) {
          const t = e
          return Wd.credentialFromTaggedObject(t)
        }
        static credentialFromError (e) {
          return Wd.credentialFromTaggedObject(e.customData || {})
        }
        static credentialFromTaggedObject ({ _tokenResponse: e }) {
          if (!e) return null
          const { phoneNumber: t, temporaryProof: n } = e
          return t && n ? dd._fromTokenResponse(t, n) : null
        }
      }
      ;(Wd.PROVIDER_ID = 'phone'), (Wd.PHONE_SIGN_IN_METHOD = 'phone')
      class Qd extends ad {
        constructor (e) {
          super('custom', 'custom'), (this.params = e)
        }
        _getIdTokenResponse (e) {
          return ld(e, this._buildIdpRequest())
        }
        _linkToIdToken (e, t) {
          return ld(e, this._buildIdpRequest(t))
        }
        _getReauthenticationResolver (e) {
          return ld(e, this._buildIdpRequest())
        }
        _buildIdpRequest (e) {
          const t = {
            requestUri: this.params.requestUri,
            sessionId: this.params.sessionId,
            postBody: this.params.postBody,
            tenantId: this.params.tenantId,
            pendingToken: this.params.pendingToken,
            returnSecureToken: !0,
            returnIdpCredential: !0
          }
          return e && (t.idToken = e), t
        }
      }
      function Xd (e) {
        return (async function (e, t, n = !1) {
          const s = 'signIn',
            i = await _d(e, s, t),
            r = await Td._fromIdTokenResponse(e, s, i)
          return n || (await e._updateCurrentUser(r.user)), r
        })(e.auth, new Qd(e), e.bypassAuthState)
      }
      function Yd (e) {
        const { auth: t, user: n } = e
        return (
          ph(n, t, 'internal-error'),
          (async function (e, t, n = !1) {
            const { auth: s } = e,
              i = 'reauthenticate'
            try {
              const r = await xh(e, _d(s, i, t, e), n)
              ph(r.idToken, s, 'internal-error')
              const o = Mh(r.idToken)
              ph(o, s, 'internal-error')
              const { sub: a } = o
              return (
                ph(e.uid === a, s, 'user-mismatch'), Td._forOperation(e, i, r)
              )
            } catch (e) {
              throw ('auth/user-not-found' === (null == e ? void 0 : e.code) &&
                hh(s, 'user-mismatch'),
              e)
            }
          })(n, new Qd(e), e.bypassAuthState)
        )
      }
      async function Jd (e) {
        const { auth: t, user: n } = e
        return (
          ph(n, t, 'internal-error'),
          (async function (e, t, n = !1) {
            const s = await xh(
              e,
              t._linkToIdToken(e.auth, await e.getIdToken()),
              n
            )
            return Td._forOperation(e, 'link', s)
          })(n, new Qd(e), e.bypassAuthState)
        )
      }
      class Zd {
        constructor (e, t, n, s, i = !1) {
          ;(this.auth = e),
            (this.resolver = n),
            (this.user = s),
            (this.bypassAuthState = i),
            (this.pendingPromise = null),
            (this.eventManager = null),
            (this.filter = Array.isArray(t) ? t : [t])
        }
        execute () {
          return new Promise(async (e, t) => {
            this.pendingPromise = { resolve: e, reject: t }
            try {
              ;(this.eventManager = await this.resolver._initialize(this.auth)),
                await this.onExecution(),
                this.eventManager.registerConsumer(this)
            } catch (e) {
              this.reject(e)
            }
          })
        }
        async onAuthEvent (e) {
          const {
            urlResponse: t,
            sessionId: n,
            postBody: s,
            tenantId: i,
            error: r,
            type: o
          } = e
          if (r) return void this.reject(r)
          const a = {
            auth: this.auth,
            requestUri: t,
            sessionId: n,
            tenantId: i || void 0,
            postBody: s || void 0,
            user: this.user,
            bypassAuthState: this.bypassAuthState
          }
          try {
            this.resolve(await this.getIdpTask(o)(a))
          } catch (e) {
            this.reject(e)
          }
        }
        onError (e) {
          this.reject(e)
        }
        getIdpTask (e) {
          switch (e) {
            case 'signInViaPopup':
            case 'signInViaRedirect':
              return Xd
            case 'linkViaPopup':
            case 'linkViaRedirect':
              return Jd
            case 'reauthViaPopup':
            case 'reauthViaRedirect':
              return Yd
            default:
              hh(this.auth, 'internal-error')
          }
        }
        resolve (e) {
          gh(this.pendingPromise, 'Pending promise was never set'),
            this.pendingPromise.resolve(e),
            this.unregisterAndCleanUp()
        }
        reject (e) {
          gh(this.pendingPromise, 'Pending promise was never set'),
            this.pendingPromise.reject(e),
            this.unregisterAndCleanUp()
        }
        unregisterAndCleanUp () {
          this.eventManager && this.eventManager.unregisterConsumer(this),
            (this.pendingPromise = null),
            this.cleanUp()
        }
      }
      const ef = new Th(2e3, 1e4)
      class tf extends Zd {
        constructor (e, t, n, s, i) {
          super(e, t, s, i),
            (this.provider = n),
            (this.authWindow = null),
            (this.pollId = null),
            tf.currentPopupAction && tf.currentPopupAction.cancel(),
            (tf.currentPopupAction = this)
        }
        async executeNotNull () {
          const e = await this.execute()
          return ph(e, this.auth, 'internal-error'), e
        }
        async onExecution () {
          gh(1 === this.filter.length, 'Popup operations only handle one event')
          const e = Ld()
          ;(this.authWindow = await this.resolver._openPopup(
            this.auth,
            this.provider,
            this.filter[0],
            e
          )),
            (this.authWindow.associatedEvent = e),
            this.resolver._originValidation(this.auth).catch(e => {
              this.reject(e)
            }),
            this.resolver._isIframeWebStorageSupported(this.auth, e => {
              e || this.reject(dh(this.auth, 'web-storage-unsupported'))
            }),
            this.pollUserCancellation()
        }
        get eventId () {
          var e
          return (
            (null === (e = this.authWindow) || void 0 === e
              ? void 0
              : e.associatedEvent) || null
          )
        }
        cancel () {
          this.reject(dh(this.auth, 'cancelled-popup-request'))
        }
        cleanUp () {
          this.authWindow && this.authWindow.close(),
            this.pollId && window.clearTimeout(this.pollId),
            (this.authWindow = null),
            (this.pollId = null),
            (tf.currentPopupAction = null)
        }
        pollUserCancellation () {
          const e = () => {
            var t, n
            ;(null ===
              (n =
                null === (t = this.authWindow) || void 0 === t
                  ? void 0
                  : t.window) || void 0 === n
            ? void 0
            : n.closed)
              ? (this.pollId = window.setTimeout(() => {
                  ;(this.pollId = null),
                    this.reject(dh(this.auth, 'popup-closed-by-user'))
                }, 2e3))
              : (this.pollId = window.setTimeout(e, ef.get()))
          }
          e()
        }
      }
      tf.currentPopupAction = null
      const nf = new Map()
      class sf extends Zd {
        constructor (e, t, n = !1) {
          super(
            e,
            [
              'signInViaRedirect',
              'linkViaRedirect',
              'reauthViaRedirect',
              'unknown'
            ],
            t,
            void 0,
            n
          ),
            (this.eventId = null)
        }
        async execute () {
          let e = nf.get(this.auth._key())
          if (!e) {
            try {
              const t = await (async function (e, t) {
                  const n = (function (e) {
                      return Kh('pendingRedirect', e.config.apiKey, e.name)
                    })(t),
                    s = (function (e) {
                      return vh(e._redirectPersistence)
                    })(e)
                  if (!(await s._isAvailable())) return !1
                  const i = 'true' === (await s._get(n))
                  return await s._remove(n), i
                })(this.resolver, this.auth),
                n = t ? await super.execute() : null
              e = () => Promise.resolve(n)
            } catch (t) {
              e = () => Promise.reject(t)
            }
            nf.set(this.auth._key(), e)
          }
          return (
            this.bypassAuthState ||
              nf.set(this.auth._key(), () => Promise.resolve(null)),
            e()
          )
        }
        async onAuthEvent (e) {
          if ('signInViaRedirect' === e.type) return super.onAuthEvent(e)
          if ('unknown' !== e.type) {
            if (e.eventId) {
              const t = await this.auth._redirectUserForId(e.eventId)
              if (t) return (this.user = t), super.onAuthEvent(e)
              this.resolve(null)
            }
          } else this.resolve(null)
        }
        async onExecution () {}
        cleanUp () {}
      }
      async function rf (e, t, n = !1) {
        const s = rd(e),
          i = (function (e, t) {
            return t
              ? vh(t)
              : (ph(e._popupRedirectResolver, e, 'argument-error'),
                e._popupRedirectResolver)
          })(s, t),
          r = new sf(s, i, n),
          o = await r.execute()
        return (
          o &&
            !n &&
            (delete o.user._redirectEventId,
            await s._persistUserIfCurrent(o.user),
            await s._setRedirectUser(null, t)),
          o
        )
      }
      class of {
        constructor (e) {
          ;(this.auth = e),
            (this.cachedEventUids = new Set()),
            (this.consumers = new Set()),
            (this.queuedRedirectEvent = null),
            (this.hasHandledPotentialRedirect = !1),
            (this.lastProcessedEventTime = Date.now())
        }
        registerConsumer (e) {
          this.consumers.add(e),
            this.queuedRedirectEvent &&
              this.isEventForConsumer(this.queuedRedirectEvent, e) &&
              (this.sendToConsumer(this.queuedRedirectEvent, e),
              this.saveEventToCache(this.queuedRedirectEvent),
              (this.queuedRedirectEvent = null))
        }
        unregisterConsumer (e) {
          this.consumers.delete(e)
        }
        onEvent (e) {
          if (this.hasEventBeenHandled(e)) return !1
          let t = !1
          return (
            this.consumers.forEach(n => {
              this.isEventForConsumer(e, n) &&
                ((t = !0), this.sendToConsumer(e, n), this.saveEventToCache(e))
            }),
            this.hasHandledPotentialRedirect ||
              !(function (e) {
                switch (e.type) {
                  case 'signInViaRedirect':
                  case 'linkViaRedirect':
                  case 'reauthViaRedirect':
                    return !0
                  case 'unknown':
                    return cf(e)
                  default:
                    return !1
                }
              })(e) ||
              ((this.hasHandledPotentialRedirect = !0),
              t || ((this.queuedRedirectEvent = e), (t = !0))),
            t
          )
        }
        sendToConsumer (e, t) {
          var n
          if (e.error && !cf(e)) {
            const s =
              (null === (n = e.error.code) || void 0 === n
                ? void 0
                : n.split('auth/')[1]) || 'internal-error'
            t.onError(dh(this.auth, s))
          } else t.onAuthEvent(e)
        }
        isEventForConsumer (e, t) {
          const n =
            null === t.eventId || (!!e.eventId && e.eventId === t.eventId)
          return t.filter.includes(e.type) && n
        }
        hasEventBeenHandled (e) {
          return (
            Date.now() - this.lastProcessedEventTime >= 6e5 &&
              this.cachedEventUids.clear(),
            this.cachedEventUids.has(af(e))
          )
        }
        saveEventToCache (e) {
          this.cachedEventUids.add(af(e)),
            (this.lastProcessedEventTime = Date.now())
        }
      }
      function af (e) {
        return [e.type, e.eventId, e.sessionId, e.tenantId]
          .filter(e => e)
          .join('-')
      }
      function cf ({ type: e, error: t }) {
        return (
          'unknown' === e &&
          'auth/no-auth-event' === (null == t ? void 0 : t.code)
        )
      }
      const lf = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
        uf = /^https?/
      function hf (e) {
        const t = wh(),
          { protocol: n, hostname: s } = new URL(t)
        if (e.startsWith('chrome-extension://')) {
          const i = new URL(e)
          return '' === i.hostname && '' === s
            ? 'chrome-extension:' === n &&
                e.replace('chrome-extension://', '') ===
                  t.replace('chrome-extension://', '')
            : 'chrome-extension:' === n && i.hostname === s
        }
        if (!uf.test(n)) return !1
        if (lf.test(e)) return s === e
        const i = e.replace(/\./g, '\\.')
        return new RegExp('^(.+\\.' + i + '|' + i + ')$', 'i').test(s)
      }
      const df = new Th(3e4, 6e4)
      function ff () {
        const e = Md().___jsl
        if (null == e ? void 0 : e.H)
          for (const t of Object.keys(e.H))
            if (
              ((e.H[t].r = e.H[t].r || []),
              (e.H[t].L = e.H[t].L || []),
              (e.H[t].r = [...e.H[t].L]),
              e.CP)
            )
              for (let t = 0; t < e.CP.length; t++) e.CP[t] = null
      }
      let pf = null
      function mf (e) {
        return (
          (pf =
            pf ||
            (function (e) {
              return new Promise((t, n) => {
                var s, i, r, o
                function a () {
                  ff(),
                    gapi.load('gapi.iframes', {
                      callback: () => {
                        t(gapi.iframes.getContext())
                      },
                      ontimeout: () => {
                        ff(), n(dh(e, 'network-request-failed'))
                      },
                      timeout: df.get()
                    })
                }
                if (
                  null ===
                    (i =
                      null === (s = Md().gapi) || void 0 === s
                        ? void 0
                        : s.iframes) || void 0 === i
                    ? void 0
                    : i.Iframe
                )
                  t(gapi.iframes.getContext())
                else {
                  if (
                    !(null === (r = Md().gapi) || void 0 === r
                      ? void 0
                      : r.load)
                  ) {
                    const t = Gd('iframefcb')
                    return (
                      (Md()[t] = () => {
                        gapi.load ? a() : n(dh(e, 'network-request-failed'))
                      }),
                      ((o = `https://apis.google.com/js/api.js?onload=${t}`),
                      new Promise((e, t) => {
                        const n = document.createElement('script')
                        n.setAttribute('src', o),
                          (n.onload = e),
                          (n.onerror = e => {
                            const n = dh('internal-error')
                            ;(n.customData = e), t(n)
                          }),
                          (n.type = 'text/javascript'),
                          (n.charset = 'UTF-8'),
                          (function () {
                            var e, t
                            return null !==
                              (t =
                                null ===
                                  (e = document.getElementsByTagName('head')) ||
                                void 0 === e
                                  ? void 0
                                  : e[0]) && void 0 !== t
                              ? t
                              : document
                          })().appendChild(n)
                      })).catch(e => n(e))
                    )
                  }
                  a()
                }
              }).catch(e => {
                throw ((pf = null), e)
              })
            })(e)),
          pf
        )
      }
      const gf = new Th(5e3, 15e3),
        yf = {
          style: {
            position: 'absolute',
            top: '-100px',
            width: '1px',
            height: '1px'
          },
          'aria-hidden': 'true',
          tabindex: '-1'
        },
        vf = new Map([
          ['identitytoolkit.googleapis.com', 'p'],
          ['staging-identitytoolkit.sandbox.googleapis.com', 's'],
          ['test-identitytoolkit.sandbox.googleapis.com', 't']
        ])
      function wf (e) {
        const t = e.config
        ph(t.authDomain, e, 'auth-domain-config-required')
        const n = t.emulator
            ? Eh(t, 'emulator/auth/iframe')
            : `https://${e.config.authDomain}/__/auth/iframe`,
          s = { apiKey: t.apiKey, appName: e.name, v: H },
          i = vf.get(e.config.apiHost)
        i && (s.eid = i)
        const r = e._getFrameworks()
        return r.length && (s.fw = r.join(',')), `${n}?${f(s).slice(1)}`
      }
      const If = {
        location: 'yes',
        resizable: 'yes',
        statusbar: 'yes',
        toolbar: 'no'
      }
      class Tf {
        constructor (e) {
          ;(this.window = e), (this.associatedEvent = null)
        }
        close () {
          if (this.window)
            try {
              this.window.close()
            } catch (e) {}
        }
      }
      function Ef (e, t, n, s, i, r) {
        ph(e.config.authDomain, e, 'auth-domain-config-required'),
          ph(e.config.apiKey, e, 'invalid-api-key')
        const o = {
          apiKey: e.config.apiKey,
          appName: e.name,
          authType: n,
          redirectUrl: s,
          v: H,
          eventId: i
        }
        if (t instanceof md) {
          t.setDefaultLanguage(e.languageCode),
            (o.providerId = t.providerId || ''),
            (function (e) {
              for (const t in e)
                if (Object.prototype.hasOwnProperty.call(e, t)) return !1
              return !0
            })(t.getCustomParameters()) ||
              (o.customParameters = JSON.stringify(t.getCustomParameters()))
          for (const [e, t] of Object.entries(r || {})) o[e] = t
        }
        if (t instanceof gd) {
          const e = t.getScopes().filter(e => '' !== e)
          e.length > 0 && (o.scopes = e.join(','))
        }
        e.tenantId && (o.tid = e.tenantId)
        const a = o
        for (const e of Object.keys(a)) void 0 === a[e] && delete a[e]
        return `${(function ({ config: e }) {
          return e.emulator
            ? Eh(e, 'emulator/auth/handler')
            : `https://${e.authDomain}/__/auth/handler`
        })(e)}?${f(a).slice(1)}`
      }
      const bf = 'webStorageSupport',
        _f = class {
          constructor () {
            ;(this.eventManagers = {}),
              (this.iframes = {}),
              (this.originValidationPromises = {}),
              (this._redirectPersistence = Dd),
              (this._completeRedirectFn = rf)
          }
          async _openPopup (e, t, n, i) {
            var r
            return (
              gh(
                null === (r = this.eventManagers[e._key()]) || void 0 === r
                  ? void 0
                  : r.manager,
                '_initialize() not called before _openPopup()'
              ),
              (function (e, t, n, i = 500, r = 600) {
                const o = Math.max(
                    (window.screen.availHeight - r) / 2,
                    0
                  ).toString(),
                  a = Math.max((window.screen.availWidth - i) / 2, 0).toString()
                let c = ''
                const l = Object.assign(Object.assign({}, If), {
                    width: i.toString(),
                    height: r.toString(),
                    top: o,
                    left: a
                  }),
                  u = s().toLowerCase()
                n && (c = Xh(u) ? '_blank' : n),
                  Wh(u) &&
                    ((t = t || 'http://localhost'), (l.scrollbars = 'yes'))
                const h = Object.entries(l).reduce(
                  (e, [t, n]) => `${e}${t}=${n},`,
                  ''
                )
                if (
                  (function (e = s()) {
                    var t
                    return (
                      td(e) &&
                      !!(null === (t = window.navigator) || void 0 === t
                        ? void 0
                        : t.standalone)
                    )
                  })(u) &&
                  '_self' !== c
                )
                  return (
                    (function (e, t) {
                      const n = document.createElement('a')
                      ;(n.href = e), (n.target = t)
                      const s = document.createEvent('MouseEvent')
                      s.initMouseEvent(
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
                        n.dispatchEvent(s)
                    })(t || '', c),
                    new Tf(null)
                  )
                const d = window.open(t || '', c, h)
                ph(d, e, 'popup-blocked')
                try {
                  d.focus()
                } catch (e) {}
                return new Tf(d)
              })(e, Ef(e, t, n, wh(), i), Ld())
            )
          }
          async _openRedirect (e, t, n, s) {
            var i
            return (
              await this._originValidation(e),
              (i = Ef(e, t, n, wh(), s)),
              (Md().location.href = i),
              new Promise(() => {})
            )
          }
          _initialize (e) {
            const t = e._key()
            if (this.eventManagers[t]) {
              const { manager: e, promise: n } = this.eventManagers[t]
              return e
                ? Promise.resolve(e)
                : (gh(n, 'If manager is not set, promise should be'), n)
            }
            const n = this.initAndGetManager(e)
            return (
              (this.eventManagers[t] = { promise: n }),
              n.catch(() => {
                delete this.eventManagers[t]
              }),
              n
            )
          }
          async initAndGetManager (e) {
            const t = await (async function (e) {
                const t = await mf(e),
                  n = Md().gapi
                return (
                  ph(n, e, 'internal-error'),
                  t.open(
                    {
                      where: document.body,
                      url: wf(e),
                      messageHandlersFilter:
                        n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
                      attributes: yf,
                      dontclear: !0
                    },
                    t =>
                      new Promise(async (n, s) => {
                        await t.restyle({ setHideOnLeave: !1 })
                        const i = dh(e, 'network-request-failed'),
                          r = Md().setTimeout(() => {
                            s(i)
                          }, gf.get())
                        function o () {
                          Md().clearTimeout(r), n(t)
                        }
                        t.ping(o).then(o, () => {
                          s(i)
                        })
                      })
                  )
                )
              })(e),
              n = new of(e)
            return (
              t.register(
                'authEvent',
                t => (
                  ph(null == t ? void 0 : t.authEvent, e, 'invalid-auth-event'),
                  { status: n.onEvent(t.authEvent) ? 'ACK' : 'ERROR' }
                ),
                gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
              ),
              (this.eventManagers[e._key()] = { manager: n }),
              (this.iframes[e._key()] = t),
              n
            )
          }
          _isIframeWebStorageSupported (e, t) {
            this.iframes[e._key()].send(
              bf,
              { type: bf },
              n => {
                var s
                const i =
                  null === (s = null == n ? void 0 : n[0]) || void 0 === s
                    ? void 0
                    : s.webStorageSupport
                void 0 !== i && t(!!i), hh(e, 'internal-error')
              },
              gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
            )
          }
          _originValidation (e) {
            const t = e._key()
            return (
              this.originValidationPromises[t] ||
                (this.originValidationPromises[t] = (async function (e) {
                  if (e.config.emulator) return
                  const { authorizedDomains: t } = await (async function (
                    e,
                    t = {}
                  ) {
                    return Ah(e, 'GET', '/v1/projects', t)
                  })(e)
                  for (const e of t)
                    try {
                      if (hf(e)) return
                    } catch (e) {}
                  hh(e, 'unauthorized-domain')
                })(e)),
              this.originValidationPromises[t]
            )
          }
          get _shouldInitProactively () {
            return nd() || Qh() || td()
          }
        }
      var Sf,
        kf = '@firebase/auth',
        Af = '0.19.5'
      class Cf {
        constructor (e) {
          ;(this.auth = e), (this.internalListeners = new Map())
        }
        getUid () {
          var e
          return (
            this.assertAuthConfigured(),
            (null === (e = this.auth.currentUser) || void 0 === e
              ? void 0
              : e.uid) || null
          )
        }
        async getToken (e) {
          return (
            this.assertAuthConfigured(),
            await this.auth._initializationPromise,
            this.auth.currentUser
              ? { accessToken: await this.auth.currentUser.getIdToken(e) }
              : null
          )
        }
        addAuthTokenListener (e) {
          if ((this.assertAuthConfigured(), this.internalListeners.has(e)))
            return
          const t = this.auth.onIdTokenChanged(t => {
            var n
            e(
              (null === (n = t) || void 0 === n
                ? void 0
                : n.stsTokenManager.accessToken) || null
            )
          })
          this.internalListeners.set(e, t), this.updateProactiveRefresh()
        }
        removeAuthTokenListener (e) {
          this.assertAuthConfigured()
          const t = this.internalListeners.get(e)
          t &&
            (this.internalListeners.delete(e),
            t(),
            this.updateProactiveRefresh())
        }
        assertAuthConfigured () {
          ph(
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
      ;(Sf = 'Browser'),
        F(
          new w(
            'auth',
            (e, { options: t }) => {
              const n = e.getProvider('app').getImmediate(),
                { apiKey: s, authDomain: i } = n.options
              return (e => {
                ph(s && !s.includes(':'), 'invalid-api-key', {
                  appName: e.name
                }),
                  ph(
                    !(null == i ? void 0 : i.includes(':')),
                    'argument-error',
                    { appName: e.name }
                  )
                const n = {
                    apiKey: s,
                    authDomain: i,
                    clientPlatform: Sf,
                    apiHost: 'identitytoolkit.googleapis.com',
                    tokenApiHost: 'securetoken.googleapis.com',
                    apiScheme: 'https',
                    sdkClientVersion: sd(Sf)
                  },
                  r = new id(e, n)
                return (
                  (function (e, t) {
                    const n = (null == t ? void 0 : t.persistence) || [],
                      s = (Array.isArray(n) ? n : [n]).map(vh)
                    ;(null == t ? void 0 : t.errorMap) &&
                      e._updateErrorMap(t.errorMap),
                      e._initializeWithPersistence(
                        s,
                        null == t ? void 0 : t.popupRedirectResolver
                      )
                  })(r, t),
                  r
                )
              })(n)
            },
            'PUBLIC'
          )
            .setInstantiationMode('EXPLICIT')
            .setInstanceCreatedCallback((e, t, n) => {
              e.getProvider('auth-internal').initialize()
            })
        ),
        F(
          new w(
            'auth-internal',
            e => (e => new Cf(e))(rd(e.getProvider('auth').getImmediate())),
            'PRIVATE'
          ).setInstantiationMode('EXPLICIT')
        ),
        z(kf, Af, void 0),
        z(kf, Af, 'esm2017'),
        (function (e, t = {}) {
          'object' != typeof t && (t = { name: t })
          const n = Object.assign(
              { name: '[DEFAULT]', automaticDataCollectionEnabled: !1 },
              t
            ),
            s = n.name
          if ('string' != typeof s || !s)
            throw j.create('bad-app-name', { appName: String(s) })
          const i = x.get(s)
          if (i) {
            if (h(e, i.options) && h(n, i.config)) return i
            throw j.create('duplicate-app', { appName: s })
          }
          const r = new E(s)
          for (const e of U.values()) r.addComponent(e)
          const o = new B(e, n, r)
          x.set(s, o)
        })({
          apiKey: 'AIzaSyC5xMwQV50IkgQqmqUvmoztLqohUimy8us',
          authDomain: 'unicctools.firebaseapp.com',
          projectId: 'unicctools',
          storageBucket: 'unicctools.appspot.com',
          messagingSenderId: '220105354397',
          appId: '1:220105354397:web:ba52dae0235e12934d7874'
        })
      const Nf = (function (e = K()) {
          return q(e, 'firestore').getImmediate()
        })(),
        Rf = (function (e = K()) {
          const t = q(e, 'auth')
          return t.isInitialized()
            ? t.getImmediate()
            : (function (e, t) {
                const n = q(e, 'auth')
                if (n.isInitialized()) {
                  const e = n.getImmediate()
                  if (h(n.getOptions(), null != t ? t : {})) return e
                  hh(e, 'already-initialized')
                }
                return n.initialize({ options: t })
              })(e, { popupRedirectResolver: _f, persistence: [zd, Nd, Dd] })
        })(),
        Df = fu(Nf, 'unicctoolsusers'),
        Of = fu(Nf, 'unicctoolshistory'),
        Lf = fu(Nf, 'unicctoolspurchse')
      fu(Nf, 'unicctoolsothers'),
        fu(Nf, 'unicctoolsdashboard'),
        fu(Nf, 'unicctoolscreditcards'),
        fu(Nf, 'unicctoolsshoppingscript'),
        fu(Nf, 'unicctoolslogincredentials'),
        fu(Nf, 'unicctoolstutorials'),
        fu(Nf, 'unicctoolsapikeys'),
        fu(Nf, 'unicctoolsuids'),
        fu(Nf, 'unicctoolssupport')
      var Pf,
        Mf,
        xf,
        Uf,
        Vf = document.getElementById('myModal'),
        Ff = document.getElementById('myLoadingModal'),
        qf = document.getElementById('myMessageModal'),
        $f = document.getElementById('PaymentModal'),
        jf = (document.getElementById('LookupModal'), [])
      function Bf (e, t, n, s) {
        Hf(),
          nh(pu(e, t), n)
            .then(() => {
              Kf(),
                s &&
                  zf(
                    'Success',
                    'Document successfully added',
                    '#009e1a',
                    () => {}
                  )
            })
            .catch(e => {
              Kf(), zf('Error', e, '#b60b0b', () => {})
            })
      }
      function Hf () {
        Ff.style.display = 'block'
      }
      function Kf () {
        Ff.style.display = 'none'
      }
      function zf (e, t, n, s) {
        ;(qf.style.display = 'block'),
          $('#myMessageModal .modal-exit').click(() => {
            ;(qf.style.display = 'none'), s()
          }),
          $('#myMessageModal .modal-cancel').click(() => {
            ;(qf.style.display = 'none'), s()
          }),
          $('#myMessageModal .modal-content').css('color', '#ffffff'),
          $('#myMessageModal .modal-content').css('background', n),
          $('#myMessageModal .modal-content').css('border', 'none'),
          $('#myMessageModal h2').text(e),
          $('#myMessageModal p').text(t),
          (window.onclick = function (e) {
            e.target == Vf && (qf.style.display = 'none')
          })
      }
      function Gf (e, t, n) {
        confirm(t) && n()
      }
      function Wf () {
        Hf(),
          (Vf.style.display = 'none'),
          Bf(Of, Yf(10), {
            history: `You signed out of your account @ ${Date()}`,
            id: Uf.email
          }),
          Rf.signOut().then(() => {
            Kf(),
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
      function Qf () {
        Gf(0, 'Do you really want to logout from this account?', Wf)
      }
      function Xf () {
        location.replace('/auth.html')
      }
      function Yf (e) {
        var t = '0123456789'
        return [...Array(e)].reduce(
          e => e + t[~~(Math.random() * t.length)],
          ''
        )
      }
      function Jf (e) {
        var t = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        return [...Array(e)].reduce(
          e => e + t[~~(Math.random() * t.length)],
          ''
        )
      }
      function Zf () {
        $f.style.display = 'none'
      }
      function ep (e, t) {
        op(e.code, t)
        var n = `\n                    <a class="logo" href="#">Unicc<span class="logo-style">Tools</span></a>\n                    <p class="pay-notice logo-style">PLEASE DO NOT CLOSE THIS WINDOW UNTILL SUCCESSFUL PAYMENT MADE.</p>\n                    <p class="pay-order">ORDER NO. <span class="logo-style order-no">${e.code}</span></p>\n                    <p class="pay-description">${e.description}</p>\n  \n                    <div id="qrcode"></div>\n                    <div class="cs">\n  \n                        \x3c!-- <p>Select your payment type</p> --\x3e\n                        <select id="cccs" class="top-products">\n                            <option value="1">Bitcoin</option>\n                            <option value="2">Ethereum</option>\n                            <option value="3">Litecoin</option>\n                            <option value="4">Bitcoin Cash</option>\n                            <option value="5">Dai</option>\n                            <option value="6">Dogecoin</option>\n                        </select>\n                    </div>\n                    <div class="money-content">\n                        <p class="cn">Crypto <span class="cname logo-style">Bitcoin</span></p>\n                        <p class="amount">$<span\n                                class="amt logo-style">${e.pricing.local.amount}</span>${e.pricing.local.currency}\n                        </p>\n                        <p class="camount">${e.pricing.bitcoin.currency}<span\n                                class="coin logo-style">${e.pricing.bitcoin.amount}</span></p>\n                    </div>\n                    <hr>\n                    <p class="cn">Copy the address below</p>\n                    <p class="amount"><span class="address logo-style">${e.addresses.bitcoin}</span></p>\n                \n                   <br>\n                    <p class="process"></p>\n                    <br>\n                    <p class="statement">Please Pay exactly the Amount stated above to prevent further processing\n                        issues.</p>`
        ;(document.querySelector('#PaymentModal .pay-head').innerHTML = n),
          new QRCode(document.getElementById('qrcode'), {
            text: e.addresses.bitcoin,
            width: 128,
            height: 128,
            colorDark: '#8f1414',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          }),
          document
            .getElementById('cccs')
            .addEventListener('change', function () {
              switch (
                (console.log('You selected: ', parseInt(this.value)),
                parseInt(this.value))
              ) {
                case 1:
                  ep(e, t)
                  break
                case 2:
                  tp(e, t)
                  break
                case 3:
                  np(e, t)
                  break
                case 4:
                  sp(e, t)
                  break
                case 5:
                  ip(e, t)
                  break
                case 6:
                  rp(e, t)
              }
            })
      }
      function tp (e, t) {
        op(e.code, t)
        var n = `\n                    <a class="logo" href="#">Unicc<span class="logo-style">Tools</span></a>\n                    <p class="pay-notice logo-style">PLEASE DO NOT CLOSE THIS WINDOW UNTILL SUCCESSFUL PAYMENT MADE.</p>\n                    <p class="pay-order">ORDER NO. <span class="logo-style order-no">${e.code}</span></p>\n                    <p class="pay-description">${e.description}</p>\n  \n                    <div id="qrcode"></div>\n                    <div class="cs">\n  \n                        \x3c!-- <p>Select your payment type</p> --\x3e\n                        <select id="cccs" class="top-products">\n                        <option value="2">Ethereum</option>\n                            <option value="1">Bitcoin</option>\n                            <option value="3">Litecoin</option>\n                            <option value="4">Bitcoin Cash</option>\n                            <option value="5">Dai</option>\n                            <option value="6">Dogecoin</option>\n                        </select>\n                    </div>\n                    <div class="money-content">\n                        <p class="cn">Crypto <span class="cname logo-style">eEthereum</span></p>\n                        <p class="amount">$<span\n                                class="amt logo-style">${e.pricing.local.amount}</span>${e.pricing.local.currency}\n                        </p>\n                        <p class="camount">${e.pricing.ethereum.currency}<span\n                                class="coin logo-style">${e.pricing.ethereum.amount}</span></p>\n                    </div>\n                    <hr>\n                    <p class="cn">Copy the address below</p>\n                    <p class="amount"><span class="address logo-style">${e.addresses.ethereum}</span></p>\n                    <br>\n                   <br>\n                    <p class="process"></p>\n                    <br>\n                    <p class="statement">Please Pay exactly the Amount stated above to prevent further processing\n                        issues.</p>`
        ;(document.querySelector('#PaymentModal .pay-head').innerHTML = n),
          new QRCode(document.getElementById('qrcode'), {
            text: e.addresses.ethereum,
            width: 128,
            height: 128,
            colorDark: '#8f1414',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          }),
          document
            .getElementById('cccs')
            .addEventListener('change', function () {
              switch (
                (console.log('You selected: ', parseInt(this.value)),
                parseInt(this.value))
              ) {
                case 1:
                  ep(e, t)
                  break
                case 2:
                  tp(e, t)
                  break
                case 3:
                  np(e, t)
                  break
                case 4:
                  sp(e, t)
                  break
                case 5:
                  ip(e, t)
                  break
                case 6:
                  rp(e, t)
              }
            })
      }
      function np (e, t) {
        op(e.code, t)
        var n = `\n                    <a class="logo" href="#">Unicc<span class="logo-style">Tools</span></a>\n                    <p class="pay-notice logo-style">PLEASE DO NOT CLOSE THIS WINDOW UNTILL SUCCESSFUL PAYMENT MADE.</p>\n                    <p class="pay-order">ORDER NO. <span class="logo-style order-no">${e.code}</span></p>\n                    <p class="pay-description">${e.description}</p>\n  \n                    <div id="qrcode"></div>\n                    <div class="cs">\n  \n                        \x3c!-- <p>Select your payment type</p> --\x3e\n                        <select id="cccs" class="top-products">\n                        <option value="3">Litecoin</option>\n                            <option value="1">Bitcoin</option>\n                            <option value="2">Ethereum</option>\n                            <option value="4">Bitcoin Cash</option>\n                            <option value="5">Dai</option>\n                            <option value="6">Dogecoin</option>\n                        </select>\n                    </div>\n                    <div class="money-content">\n                        <p class="cn">Crypto <span class="cname logo-style">Litecoin</span></p>\n                        <p class="amount">$<span\n                                class="amt logo-style">${e.pricing.local.amount}</span>${e.pricing.local.currency}\n                        </p>\n                        <p class="camount">${e.pricing.litecoin.currency}<span\n                                class="coin logo-style">${e.pricing.litecoin.amount}</span></p>\n                    </div>\n                    <hr>\n                    <p class="cn">Copy the address below</p>\n                    <p class="amount"><span class="address logo-style">${e.addresses.litecoin}</span></p>\n                    <br>\n                   <br>\n                    <p class="process"></p>\n                    <br>\n                    <p class="statement">Please Pay exactly the Amount stated above to prevent further processing\n                        issues.</p>`
        ;(document.querySelector('#PaymentModal .pay-head').innerHTML = n),
          new QRCode(document.getElementById('qrcode'), {
            text: e.addresses.litecoin,
            width: 128,
            height: 128,
            colorDark: '#8f1414',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          }),
          document
            .getElementById('cccs')
            .addEventListener('change', function () {
              switch (
                (console.log('You selected: ', parseInt(this.value)),
                parseInt(this.value))
              ) {
                case 1:
                  ep(e, t)
                  break
                case 2:
                  tp(e, t)
                  break
                case 3:
                  np(e, t)
                  break
                case 4:
                  sp(e, t)
                  break
                case 5:
                  ip(e, t)
                  break
                case 6:
                  rp(e, t)
              }
            })
      }
      function sp (e, t) {
        op(e.code, t)
        var n = `\n                    <a class="logo" href="#">Unicc<span class="logo-style">Tools</span></a>\n                    <p class="pay-notice logo-style">PLEASE DO NOT CLOSE THIS WINDOW UNTILL SUCCESSFUL PAYMENT MADE.</p>\n                    <p class="pay-order">ORDER NO. <span class="logo-style order-no">${e.code}</span></p>\n                    <p class="pay-description">${e.description}</p>\n  \n                    <div id="qrcode"></div>\n                    <div class="cs">\n  \n                        \x3c!-- <p>Select your payment type</p> --\x3e\n                        <select id="cccs" class="top-products">\n                        <option value="4">Bitcoin Cash</option>\n                            <option value="1">Bitcoin</option>\n                            <option value="2">Ethereum</option>\n                            <option value="3">Litecoin</option>\n                            <option value="5">Dai</option>\n                            <option value="6">Dogecoin</option>\n                        </select>\n                    </div>\n                    <div class="money-content">\n                        <p class="cn">Crypto <span class="cname logo-style">Bitcoin Cash</span></p>\n                        <p class="amount">$<span\n                                class="amt logo-style">${e.pricing.local.amount}</span>${e.pricing.local.currency}\n                        </p>\n                        <p class="camount">${e.pricing.bitcoincash.currency}<span\n                                class="coin logo-style">${e.pricing.bitcoincash.amount}</span></p>\n                    </div>\n                    <hr>\n                    <p class="cn">Copy the address below</p>\n                    <p class="amount"><span class="address logo-style">${e.addresses.bitcoincash}</span></p>\n                    <br>\n                   <br>\n                    <p class="process"></p>\n                    <br>\n                    <p class="statement">Please Pay exactly the Amount stated above to prevent further processing\n                        issues.</p>`
        ;(document.querySelector('#PaymentModal .pay-head').innerHTML = n),
          new QRCode(document.getElementById('qrcode'), {
            text: e.addresses.bitcoincash,
            width: 128,
            height: 128,
            colorDark: '#8f1414',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          }),
          document
            .getElementById('cccs')
            .addEventListener('change', function () {
              switch (
                (console.log('You selected: ', parseInt(this.value)),
                parseInt(this.value))
              ) {
                case 1:
                  ep(e, t)
                  break
                case 2:
                  tp(e, t)
                  break
                case 3:
                  np(e, t)
                  break
                case 4:
                  sp(e, t)
                  break
                case 5:
                  ip(e, t)
                  break
                case 6:
                  rp(e, t)
              }
            })
      }
      function ip (e, t) {
        op(e.code, t)
        var n = `\n                    <a class="logo" href="#">Unicc<span class="logo-style">Tools</span></a>\n                    <p class="pay-notice logo-style">PLEASE DO NOT CLOSE THIS WINDOW UNTILL SUCCESSFUL PAYMENT MADE.</p>\n                    <p class="pay-order">ORDER NO. <span class="logo-style order-no">${e.code}</span></p>\n                    <p class="pay-description">${e.description}</p>\n  \n                    <div id="qrcode"></div>\n                    <div class="cs">\n  \n                        \x3c!-- <p>Select your payment type</p> --\x3e\n                        <select id="cccs" class="top-products">\n                        <option value="5">Dai</option>\n                            <option value="1">Bitcoin</option>\n                            <option value="2">Ethereum</option>\n                            <option value="3">Litecoin</option>\n                            <option value="4">Bitcoin Cash</option>\n                            <option value="6">Dogecoin</option>\n                        </select>\n                    </div>\n                    <div class="money-content">\n                        <p class="cn">Crypto <span class="cname logo-style">Dai</span></p>\n                        <p class="amount">$<span\n                                class="amt logo-style">${e.pricing.local.amount}</span>${e.pricing.local.currency}\n                        </p>\n                        <p class="camount">${e.pricing.dai.currency}<span\n                                class="coin logo-style">${e.pricing.dai.amount}</span></p>\n                    </div>\n                    <hr>\n                    <p class="cn">Copy the address below</p>\n                    <p class="amount"><span class="address logo-style">${e.addresses.dai}</span></p>\n                    <br>\n                   <br>\n                    <p class="process"></p>\n                    <br>\n                    <p class="statement">Please Pay exactly the Amount stated above to prevent further processing\n                        issues.</p>`
        ;(document.querySelector('#PaymentModal .pay-head').innerHTML = n),
          new QRCode(document.getElementById('qrcode'), {
            text: e.addresses.dai,
            width: 128,
            height: 128,
            colorDark: '#8f1414',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          }),
          document
            .getElementById('cccs')
            .addEventListener('change', function () {
              switch (
                (console.log('You selected: ', parseInt(this.value)),
                parseInt(this.value))
              ) {
                case 1:
                  ep(e, t)
                  break
                case 2:
                  tp(e, t)
                  break
                case 3:
                  np(e, t)
                  break
                case 4:
                  sp(e, t)
                  break
                case 5:
                  ip(e, t)
                  break
                case 6:
                  rp(e, t)
              }
            })
      }
      function rp (e, t) {
        op(e.code, t)
        var n = `\n                    <a class="logo" href="#">Unicc<span class="logo-style">Tools</span></a>\n                    <p class="pay-notice logo-style">PLEASE DO NOT CLOSE THIS WINDOW UNTILL SUCCESSFUL PAYMENT MADE.</p>\n                    <p class="pay-order">ORDER NO. <span class="logo-style order-no">${e.code}</span></p>\n                    <p class="pay-description">${e.description}</p>\n  \n                    <div id="qrcode"></div>\n                    <div class="cs">\n  \n                        \x3c!-- <p>Select your payment type</p> --\x3e\n                        <select id="cccs" class="top-products">\n                        <option value="6">Dogecoin</option>\n                            <option value="1">Bitcoin</option>\n                            <option value="2">Ethereum</option>\n                            <option value="3">Litecoin</option>\n                            <option value="4">Bitcoin Cash</option>\n                            <option value="5">Dai</option>\n                        </select>\n                    </div>\n                    <div class="money-content">\n                        <p class="cn">Crypto <span class="cname logo-style">Dogecoin</span></p>\n                        <p class="amount">$ <span\n                                class="amt logo-style">${e.pricing.local.amount} </span> ${e.pricing.local.currency}\n                        </p>\n                        <p class="camount">${e.pricing.dogecoin.currency}<span\n                                class="coin logo-style">${e.pricing.dogecoin.amount}</span></p>\n                    </div>\n                    <hr>\n                    \n                    <p class="cn">Copy the address below</p>\n                    <p class="amount"><span class="address logo-style">${e.addresses.dogecoin}</span></p>\n                    <br>\n                   <br>\n                    <p class="process"></p>\n                    <br>\n                    <p class="statement">Please Pay exactly the Amount stated above to prevent further processing\n                        issues.</p>`
        ;(document.querySelector('#PaymentModal .pay-head').innerHTML = n),
          new QRCode(document.getElementById('qrcode'), {
            text: e.addresses.dogecoin,
            width: 128,
            height: 128,
            colorDark: '#8f1414',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          }),
          document
            .getElementById('cccs')
            .addEventListener('change', function () {
              switch (
                (console.log('You selected: ', parseInt(this.value)),
                parseInt(this.value))
              ) {
                case 1:
                  ep(e, t)
                  break
                case 2:
                  tp(e, t)
                  break
                case 3:
                  np(e, t)
                  break
                case 4:
                  sp(e, t)
                  break
                case 5:
                  ip(e, t)
                  break
                case 6:
                  rp(e, t)
              }
            })
      }
      function op (e, t) {
        $('#PaymentModal .process').text('Initiate a Payment now!'),
          $('#PaymentModal .process').css('color', '#b60b0b')
        let n = setInterval(() => {
          var e = new XMLHttpRequest()
          e.open('GET', 'https://api.commerce.coinbase.com/charges/HW3NYY22'),
            e.setRequestHeader(
              'X-CC-Api-Key',
              'e5b8792b-a383-4f80-8e8e-df52e0ebaf63'
            ),
            e.setRequestHeader('X-CC-Version', '2018-03-22'),
            (e.onreadystatechange = function () {
              if (4 === e.readyState) {
                var s = JSON.parse(e.responseText).data
                console.log(s.timeline.length)
                var i = s.timeline.length
                s.timeline.forEach(
                  e => (
                    console.log(e.status),
                    'completed' ===
                      e.status
                        .toString()
                        .toLowerCase()
                        .trim() ||
                    'resolved' ===
                      e.status
                        .toString()
                        .toLowerCase()
                        .trim()
                      ? (cp(
                          parseInt(s.pricing.local.amount),
                          ['Topup', '', Jf(8), Date()],
                          t
                        ),
                        Bf(
                          Of,
                          Yf(10),
                          {
                            id: jf[0].email,
                            history: `Successfully paied an amount of $${s.pricing.local.amount} into your account.`
                          },
                          !0
                        ),
                        clearInterval(n),
                        zf(
                          'Successful Payment',
                          'You have successfully completed the payment process.',
                          '#009e1a',
                          Zf
                        ),
                        $('#PaymentModal .process').text('Payment completed'),
                        void $('#PaymentModal .process').css(
                          'color',
                          '#009e1a'
                        ))
                      : 3 === s.timeline.length &&
                        'unresolved' ===
                          s.timeline[2].status
                            .toString()
                            .toLowerCase()
                            .trim() &&
                        'underpaid' ===
                          s.timeline[2].context
                            .toString()
                            .toLowerCase()
                            .trim()
                      ? (clearInterval(n),
                        zf(
                          'Payment Warning',
                          `Your payment is unresolved meaning you paid less than the specified amount. Check the remaining balance $(${s
                            .pricing.local.amount -
                            payments.value.local
                              .amount}) and complete the payment with same crypto wallet address.`,
                          '#fbff00',
                          () => {}
                        ),
                        $('#PaymentModal .process').text('Payment Underpaid!'),
                        void $('#PaymentModal .process').css(
                          'color',
                          '#20272e'
                        ))
                      : 1 === i
                      ? ($('#PaymentModal .process').text('Payment Initiated!'),
                        void $('#PaymentModal .process').css(
                          'color',
                          '#1d0d0d'
                        ))
                      : 2 === i
                      ? ($('#PaymentModal .process').text(
                          'Pending: Waiting for confirmation'
                        ),
                        void $('#PaymentModal .process').css(
                          'color',
                          '#009e1a'
                        ))
                      : void 0
                  )
                )
              }
            }),
            e.send(void 0)
        }, 1e4)
      }
      function ap (e) {
        document.querySelector('nav').innerHTML = e
          ? '\x3c!-- Primary navigation menu --\x3e\n  <input id="close" class="close" type="button" value="X">\n\n  <ul class="primary-nav">\n      <li class="current"><a href="/index.html">Home</a></li>\n      <li><a href="/buy.html">Buy</a></li>\n      <li><a href="/account.html">Account</a></li>\n      <li><a href="/about.html">About</a></li>\n      <li><a href="/support.html">Support</a></li>\n  </ul>\n  \x3c!-- Secondary navigation menu --\x3e\n  <ul class="secondary-nav">\n      \n          <input type="button" id="sign-id" class="auth-class" value="Signout">\n     \n  </ul>'
          : '\x3c!-- Primary navigation menu --\x3e\n  <input id="close" class="close" type="button" value="X">\n\n  <ul class="primary-nav">\n      <li class="current"><a href="/index.html">Home</a></li>\n      <li><a href="/buy.html">Buy</a></li>\n      <li><a href="/about.html">About</a></li>\n      <li><a href="/support.html">Support</a></li>\n  </ul>\n  \x3c!-- Secondary navigation menu --\x3e\n  <ul class="secondary-nav">\n     \n      <input type="button" id="auth-id" class="auth-class" value="Authenticate">\n    \n  </ul>'
      }
      function cp (e, t, n) {
        if (!0 !== n) {
          let n = {
            product: t[0],
            data: t[1],
            order: t[2],
            datetime: t[3],
            id: jf[0].email
          }
          nh(pu(Lf, Yf(15)), n)
            .then(function (n) {
              Bf(
                Of,
                Yf(10),
                {
                  id: jf[0].email,
                  history: `Successfully purchased a(an) ${t[0]} for $${e} with order# ${t[2]} at ${t[3]}`
                },
                !0
              ),
                sh(pu(Df, jf[0].email), { balance: e }).then(function (e) {
                  zf(
                    'SUCCESSFULL PURCHASE',
                    'You have successfully purchased item of order ' +
                      t[2] +
                      '. Check your account pannel for your purchase details.',
                    '#009e1a',
                    () => {
                      location.reload()
                    }
                  )
                })
            })
            .catch(e => {
              Bf(
                Of,
                Yf(10),
                {
                  id: jf[0].email,
                  history: `Order ${t[2]} was not successfull at ${t[3]}`
                },
                !1
              ),
                zf('PURCHASING ERROR', e, '#b60b0b', () => {})
            })
        } else
          sh(pu(Df, jf[0].email), { balance: e + parseInt(jf[0].balance) })
            .then(function (n) {
              zf(
                'Account Fund',
                `You have successfully topped up your account for $${e}. Check your account pannel for your purchase details.`,
                '#009e1a',
                () => {
                  location.reload()
                }
              ),
                Bf(
                  Of,
                  Yf(10),
                  {
                    id: jf[0].email,
                    history: `Account fund order ${t[2]} with amount of $${e} was successfull at ${t[3]}`
                  },
                  !1
                )
            })
            .catch(e => {
              Bf(
                Of,
                Yf(10),
                {
                  id: jf[0].email,
                  history: `Account fund order ${t[2]} was not successfull at ${t[3]}`
                },
                !1
              ),
                zf('PURCHASING ERROR', e, '#b60b0b', () => {})
            })
      }
      Sd(Rf, e => {
        ;(Uf = e),
          e
            ? (ap(e),
              ih(Xu(Df, Ju('email', '==', e.email)), e => {
                e.docs.forEach(e => {
                  jf.push({ ...e.data(), uid: e.id })
                })
              }))
            : (ap(e), console.log('NO!, user detected'))
      }),
        $('#auth-div-on #auth-id').click(e => {
          e.preventDefault(), Qf()
        }),
        $('.telegram').click(() => {
          window.open('https://t.me/betwayx10')
        }),
        $(document).ready(() => {
          !(function () {
            var e = document.querySelector('#auth-id')
            null !== e &&
              e.addEventListener('click', e => {
                location.replace('/auth.html')
              })
            var t = document.querySelector('#sign-id')
            null !== t &&
              t.addEventListener('click', e => {
                Qf()
              })
          })(),
            null !== document.querySelector('.year') &&
              (document.querySelector(
                '.year'
              ).innerHTML = new Date().getFullYear())
        }),
        n(846)
      var lp,
        up,
        hp,
        dp = []
      Sd(Rf, e => {
        e &&
          ih(Xu(Df, Ju('email', '==', e.email)), e => {
            e.docs.forEach(e => {
              dp.push({ ...e.data(), uid: e.id })
            })
          })
      }),
        $(document).ready(function () {
          var e = $('#data-table').DataTable({
            ajax: '/src/file.json',
            columns: [
              {
                data: 'network',
                render: function (e, t, n) {
                  return '<span id="card"  class="card-bin">' + e + '</span>'
                }
              },
              {
                data: 'card',
                render: function (e, t, n) {
                  return (
                    '<span id="card"  class="card-bin">' +
                    e +
                    ' (XXXXXXXXXX)</span>'
                  )
                }
              },
              {
                data: 'balance',
                render: function (e, t, n) {
                  return (
                    '<span id="card" class="card-bin">$' +
                    (e + Yf(1)) +
                    '</span>'
                  )
                }
              },
              {
                data: 'country',
                render: function (e, t, n) {
                  return '<span id="card" class="card-bin">' + e + '</div>'
                }
              },
              {
                data: 'price',
                render: function (e, t, n) {
                  return '<div id="buy" class="buy-now">BUY $' + e + '</div>'
                }
              }
            ]
          })
          $('#data-table tbody').on('click', 'tr', function () {
            ;(lp = e.row(this).index()), (up = e.data())
          }),
            $(document).on(
              'click',
              '#data-table td:nth-child(2)',
              function () {}
            ),
            $(document).on('click', '#data-table td:nth-child(5)', function () {
              Uf
                ? ((hp = up[lp].price),
                  Gf(
                    0,
                    'This card consists of Fullname, CVV/CVV2, State, City, Phone number, SSN, etc.\n Are you sure you want to purchase this item' +
                      $('.top-products').val() +
                      ' for $' +
                      up[lp].price +
                      ' ? | Current balance is $' +
                      dp[0].balance,
                    () => {
                      var e, t, n
                      ;(e = up),
                        (t = lp),
                        (n = hp),
                        (Vf.style.display = 'none'),
                        (Pf = parseInt(jf[0].balance)),
                        (Mf = `network: ${e[t].network}\n\n       card: ${
                          e[t].card
                        }${Yf(10)}\n\n       cvv: ${e[t].cvv}\n\n       pin: ${
                          e[t].pin
                        }\n\n       expiry: ${e[t].expiry}\n\n       bank: ${
                          e[t].bank
                        }\n\n       balance: ${
                          e[t].balance
                        }\n\n       fullname: ${
                          e[t].fullname
                        }\n\n       email: ${e[t].email}\n\n       phone: ${
                          e[t].phone
                        }\n\n       address: ${e[t].address}\n\n       zip: ${
                          e[t].zip
                        }\n\n       country: ${e[t].country}\n\n       state: ${
                          e[t].state
                        }\n\n       city: ${e[t].city}`),
                        (xf = [$('.top-products').val(), Mf, Jf(8), Date()]),
                        Pf < n
                          ? (function (e, t) {
                              console.log('is topup action?:', !1)
                              var n = localStorage.getItem('email'),
                                s =
                                  (localStorage.getItem('uid'),
                                  localStorage.getItem('username')),
                                i =
                                  (localStorage.getItem('balance'),
                                  'https://api.commerce.coinbase.com/charges/'),
                                r = new XMLHttpRequest()
                              r.open('POST', i),
                                r.setRequestHeader(
                                  'Content-Type',
                                  'application/json'
                                ),
                                r.setRequestHeader(
                                  'X-CC-Api-Key',
                                  'e5b8792b-a383-4f80-8e8e-df52e0ebaf63'
                                ),
                                r.setRequestHeader(
                                  'X-CC-Version',
                                  '2018-03-22'
                                ),
                                (r.onreadystatechange = function () {
                                  4 === r.readyState &&
                                    (console.log(r.status),
                                    console.log(
                                      i,
                                      JSON.parse(r.responseText).data
                                    ),
                                    (function (e, t) {
                                      ;($f.style.display = 'block'),
                                        Date.parse(e.created_at)
                                      var n = Date.parse(e.expires_at),
                                        s = Date.parse(Date())
                                      let i = setInterval(() => {
                                        s >= n &&
                                          (zf(
                                            'Time up',
                                            'The allocated time for the payment to be made has ellaped. Payment cancelled',
                                            '#b60b0b',
                                            Zf
                                          ),
                                          clearInterval(i))
                                      }, 6e4)
                                      ep(e, !1)
                                    })(JSON.parse(r.responseText).data))
                                })
                              var o = `{\n       "name": "UNICCSTOOLS",\n       "description": "Make your payment to recieve your Credit Card info for the amount, $${e} placed via any of the crypto wallet address below, you can choose to pay with any of the underlisted cryptocoins below.",\n       "local_price": {\n         "amount": "${e}",\n         "currency": "USD"\n       },\n       "pricing_type": "fixed_price",\n       "metadata": {\n         "customer_id": "${Yf(
                                10
                              )}",\n         "customer_name": "${s}",\n         "customer_email": "${n}",\n         "date_tme": "${Date()}"\n       },\n       "redirect_url": "https://charge/completed/page",\n       "cancel_url": "https://charge/canceled/page"\n     }`
                              console.log('Data:', e, Yf(10), s, n), r.send(o)
                            })(n)
                          : cp(Pf - n, xf, !1)
                    }
                  ))
                : Gf(
                    0,
                    'Please you are required to sign in before you can make purchase.',
                    Xf
                  )
            }),
            $('#table-name').text($('.top-products').val()),
            document
              .querySelector('.top-products')
              .addEventListener('change', function () {
                console.log('You selected: ', this.value),
                  $('#table-name').text(this.value)
              })
        })
    })()
})()
