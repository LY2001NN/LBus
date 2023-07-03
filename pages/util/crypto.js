var e = require("/crypto-js.js"), r = "422556651C7F7B2B5C266EED06068230", t = "skdidhjdksle2345";

r = e.enc.Utf8.parse(r), t = e.enc.Utf8.parse(t), module.exports = {
    encrypted: function(d) {
        var n = e.AES.encrypt(d, r, {
            iv: t,
            mode: e.mode.CBC,
            padding: e.pad.Pkcs7
        });
        return n = n.toString();
    },
    decrypted: function(t) {
        var d = e.AES.decrypt(t, r, {
            mode: e.mode.ECB
        });
        return d = e.enc.Utf8.stringify(d);
    }
};