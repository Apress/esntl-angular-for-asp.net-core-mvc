const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');

const { NoEmitOnErrorsPlugin, SourceMapDevToolPlugin, NamedModulesPlugin } = require('webpack');
const { NamedLazyChunksWebpackPlugin, BaseHrefWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'ClientApp', '$$_gendir', 'node_modules');
const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
const minimizeCss = false;
const baseHref = "";
const deployUrl = "";
const postcssPlugins = function () {
        // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
        const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
        const minimizeOptions = {
            autoprefixer: false,
            safe: true,
            mergeLonghand: false,
            discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
        };
        return [
            postcssUrl({
                url: (URL) => {
                    // Only convert root relative URLs, which CSS-Loader won't process into require().
                    if (!URL.startsWith('/') || URL.startsWith('//')) {
                        return URL;
                    }
                    if (deployUrl.match(/:\/\//)) {
                        // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
                        return `${deployUrl.replace(/\/$/, '')}${URL}`;
                    }
                    else if (baseHref.match(/:\/\//)) {
                        // If baseHref contains a scheme, include it as is.
                        return baseHref.replace(/\/$/, '') +
                            `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                    }
                    else {
                        // Join together base-href, deploy-url and the original URL.
                        // Also dedupe multiple slashes into single ones.
                        return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                    }
                }
            }),
            autoprefixer(),
            customProperties({ preserve: true })
        ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
    };




module.exports = {
  "resolve": {
    "extensions": [
      ".ts",
      ".js"
    ],
    "modules": [
      "./node_modules",
      "./node_modules"
    ],
    "symlinks": true,
    "alias": {
      "rxjs/AsyncSubject": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\AsyncSubject.js",
      "rxjs/BehaviorSubject": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\BehaviorSubject.js",
      "rxjs/InnerSubscriber": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\InnerSubscriber.js",
      "rxjs/Notification": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\Notification.js",
      "rxjs/Observable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\Observable.js",
      "rxjs/Observer": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\Observer.js",
      "rxjs/Operator": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\Operator.js",
      "rxjs/OuterSubscriber": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\OuterSubscriber.js",
      "rxjs/ReplaySubject": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\ReplaySubject.js",
      "rxjs/Rx": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\Rx.js",
      "rxjs/Scheduler": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\Scheduler.js",
      "rxjs/Subject": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\Subject.js",
      "rxjs/SubjectSubscription": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\SubjectSubscription.js",
      "rxjs/Subscriber": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\Subscriber.js",
      "rxjs/Subscription": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\Subscription.js",
      "rxjs/add/observable/bindCallback": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\bindCallback.js",
      "rxjs/add/observable/bindNodeCallback": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\bindNodeCallback.js",
      "rxjs/add/observable/combineLatest": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\combineLatest.js",
      "rxjs/add/observable/concat": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\concat.js",
      "rxjs/add/observable/defer": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\defer.js",
      "rxjs/add/observable/dom/ajax": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\dom\\ajax.js",
      "rxjs/add/observable/dom/webSocket": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\dom\\webSocket.js",
      "rxjs/add/observable/empty": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\empty.js",
      "rxjs/add/observable/forkJoin": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\forkJoin.js",
      "rxjs/add/observable/from": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\from.js",
      "rxjs/add/observable/fromEvent": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\fromEvent.js",
      "rxjs/add/observable/fromEventPattern": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\fromEventPattern.js",
      "rxjs/add/observable/fromPromise": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\fromPromise.js",
      "rxjs/add/observable/generate": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\generate.js",
      "rxjs/add/observable/if": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\if.js",
      "rxjs/add/observable/interval": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\interval.js",
      "rxjs/add/observable/merge": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\merge.js",
      "rxjs/add/observable/never": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\never.js",
      "rxjs/add/observable/of": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\of.js",
      "rxjs/add/observable/onErrorResumeNext": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\onErrorResumeNext.js",
      "rxjs/add/observable/pairs": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\pairs.js",
      "rxjs/add/observable/race": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\race.js",
      "rxjs/add/observable/range": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\range.js",
      "rxjs/add/observable/throw": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\throw.js",
      "rxjs/add/observable/timer": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\timer.js",
      "rxjs/add/observable/using": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\using.js",
      "rxjs/add/observable/zip": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\observable\\zip.js",
      "rxjs/add/operator/audit": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\audit.js",
      "rxjs/add/operator/auditTime": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\auditTime.js",
      "rxjs/add/operator/buffer": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\buffer.js",
      "rxjs/add/operator/bufferCount": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\bufferCount.js",
      "rxjs/add/operator/bufferTime": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\bufferTime.js",
      "rxjs/add/operator/bufferToggle": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\bufferToggle.js",
      "rxjs/add/operator/bufferWhen": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\bufferWhen.js",
      "rxjs/add/operator/catch": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\catch.js",
      "rxjs/add/operator/combineAll": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\combineAll.js",
      "rxjs/add/operator/combineLatest": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\combineLatest.js",
      "rxjs/add/operator/concat": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\concat.js",
      "rxjs/add/operator/concatAll": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\concatAll.js",
      "rxjs/add/operator/concatMap": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\concatMap.js",
      "rxjs/add/operator/concatMapTo": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\concatMapTo.js",
      "rxjs/add/operator/count": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\count.js",
      "rxjs/add/operator/debounce": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\debounce.js",
      "rxjs/add/operator/debounceTime": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\debounceTime.js",
      "rxjs/add/operator/defaultIfEmpty": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\defaultIfEmpty.js",
      "rxjs/add/operator/delay": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\delay.js",
      "rxjs/add/operator/delayWhen": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\delayWhen.js",
      "rxjs/add/operator/dematerialize": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\dematerialize.js",
      "rxjs/add/operator/distinct": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\distinct.js",
      "rxjs/add/operator/distinctUntilChanged": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\distinctUntilChanged.js",
      "rxjs/add/operator/distinctUntilKeyChanged": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\distinctUntilKeyChanged.js",
      "rxjs/add/operator/do": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\do.js",
      "rxjs/add/operator/elementAt": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\elementAt.js",
      "rxjs/add/operator/every": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\every.js",
      "rxjs/add/operator/exhaust": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\exhaust.js",
      "rxjs/add/operator/exhaustMap": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\exhaustMap.js",
      "rxjs/add/operator/expand": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\expand.js",
      "rxjs/add/operator/filter": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\filter.js",
      "rxjs/add/operator/finally": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\finally.js",
      "rxjs/add/operator/find": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\find.js",
      "rxjs/add/operator/findIndex": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\findIndex.js",
      "rxjs/add/operator/first": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\first.js",
      "rxjs/add/operator/groupBy": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\groupBy.js",
      "rxjs/add/operator/ignoreElements": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\ignoreElements.js",
      "rxjs/add/operator/isEmpty": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\isEmpty.js",
      "rxjs/add/operator/last": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\last.js",
      "rxjs/add/operator/let": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\let.js",
      "rxjs/add/operator/map": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\map.js",
      "rxjs/add/operator/mapTo": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\mapTo.js",
      "rxjs/add/operator/materialize": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\materialize.js",
      "rxjs/add/operator/max": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\max.js",
      "rxjs/add/operator/merge": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\merge.js",
      "rxjs/add/operator/mergeAll": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\mergeAll.js",
      "rxjs/add/operator/mergeMap": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\mergeMap.js",
      "rxjs/add/operator/mergeMapTo": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\mergeMapTo.js",
      "rxjs/add/operator/mergeScan": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\mergeScan.js",
      "rxjs/add/operator/min": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\min.js",
      "rxjs/add/operator/multicast": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\multicast.js",
      "rxjs/add/operator/observeOn": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\observeOn.js",
      "rxjs/add/operator/onErrorResumeNext": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\onErrorResumeNext.js",
      "rxjs/add/operator/pairwise": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\pairwise.js",
      "rxjs/add/operator/partition": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\partition.js",
      "rxjs/add/operator/pluck": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\pluck.js",
      "rxjs/add/operator/publish": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\publish.js",
      "rxjs/add/operator/publishBehavior": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\publishBehavior.js",
      "rxjs/add/operator/publishLast": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\publishLast.js",
      "rxjs/add/operator/publishReplay": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\publishReplay.js",
      "rxjs/add/operator/race": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\race.js",
      "rxjs/add/operator/reduce": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\reduce.js",
      "rxjs/add/operator/repeat": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\repeat.js",
      "rxjs/add/operator/repeatWhen": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\repeatWhen.js",
      "rxjs/add/operator/retry": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\retry.js",
      "rxjs/add/operator/retryWhen": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\retryWhen.js",
      "rxjs/add/operator/sample": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\sample.js",
      "rxjs/add/operator/sampleTime": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\sampleTime.js",
      "rxjs/add/operator/scan": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\scan.js",
      "rxjs/add/operator/sequenceEqual": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\sequenceEqual.js",
      "rxjs/add/operator/share": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\share.js",
      "rxjs/add/operator/shareReplay": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\shareReplay.js",
      "rxjs/add/operator/single": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\single.js",
      "rxjs/add/operator/skip": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\skip.js",
      "rxjs/add/operator/skipLast": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\skipLast.js",
      "rxjs/add/operator/skipUntil": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\skipUntil.js",
      "rxjs/add/operator/skipWhile": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\skipWhile.js",
      "rxjs/add/operator/startWith": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\startWith.js",
      "rxjs/add/operator/subscribeOn": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\subscribeOn.js",
      "rxjs/add/operator/switch": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\switch.js",
      "rxjs/add/operator/switchMap": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\switchMap.js",
      "rxjs/add/operator/switchMapTo": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\switchMapTo.js",
      "rxjs/add/operator/take": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\take.js",
      "rxjs/add/operator/takeLast": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\takeLast.js",
      "rxjs/add/operator/takeUntil": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\takeUntil.js",
      "rxjs/add/operator/takeWhile": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\takeWhile.js",
      "rxjs/add/operator/throttle": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\throttle.js",
      "rxjs/add/operator/throttleTime": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\throttleTime.js",
      "rxjs/add/operator/timeInterval": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\timeInterval.js",
      "rxjs/add/operator/timeout": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\timeout.js",
      "rxjs/add/operator/timeoutWith": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\timeoutWith.js",
      "rxjs/add/operator/timestamp": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\timestamp.js",
      "rxjs/add/operator/toArray": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\toArray.js",
      "rxjs/add/operator/toPromise": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\toPromise.js",
      "rxjs/add/operator/window": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\window.js",
      "rxjs/add/operator/windowCount": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\windowCount.js",
      "rxjs/add/operator/windowTime": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\windowTime.js",
      "rxjs/add/operator/windowToggle": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\windowToggle.js",
      "rxjs/add/operator/windowWhen": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\windowWhen.js",
      "rxjs/add/operator/withLatestFrom": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\withLatestFrom.js",
      "rxjs/add/operator/zip": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\zip.js",
      "rxjs/add/operator/zipAll": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\add\\operator\\zipAll.js",
      "rxjs/interfaces": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\interfaces.js",
      "rxjs/observable/ArrayLikeObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\ArrayLikeObservable.js",
      "rxjs/observable/ArrayObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\ArrayObservable.js",
      "rxjs/observable/BoundCallbackObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\BoundCallbackObservable.js",
      "rxjs/observable/BoundNodeCallbackObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\BoundNodeCallbackObservable.js",
      "rxjs/observable/ConnectableObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\ConnectableObservable.js",
      "rxjs/observable/DeferObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\DeferObservable.js",
      "rxjs/observable/EmptyObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\EmptyObservable.js",
      "rxjs/observable/ErrorObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\ErrorObservable.js",
      "rxjs/observable/ForkJoinObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\ForkJoinObservable.js",
      "rxjs/observable/FromEventObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\FromEventObservable.js",
      "rxjs/observable/FromEventPatternObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\FromEventPatternObservable.js",
      "rxjs/observable/FromObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\FromObservable.js",
      "rxjs/observable/GenerateObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\GenerateObservable.js",
      "rxjs/observable/IfObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\IfObservable.js",
      "rxjs/observable/IntervalObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\IntervalObservable.js",
      "rxjs/observable/IteratorObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\IteratorObservable.js",
      "rxjs/observable/NeverObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\NeverObservable.js",
      "rxjs/observable/PairsObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\PairsObservable.js",
      "rxjs/observable/PromiseObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\PromiseObservable.js",
      "rxjs/observable/RangeObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\RangeObservable.js",
      "rxjs/observable/ScalarObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\ScalarObservable.js",
      "rxjs/observable/SubscribeOnObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\SubscribeOnObservable.js",
      "rxjs/observable/TimerObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\TimerObservable.js",
      "rxjs/observable/UsingObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\UsingObservable.js",
      "rxjs/observable/bindCallback": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\bindCallback.js",
      "rxjs/observable/bindNodeCallback": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\bindNodeCallback.js",
      "rxjs/observable/combineLatest": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\combineLatest.js",
      "rxjs/observable/concat": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\concat.js",
      "rxjs/observable/defer": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\defer.js",
      "rxjs/observable/dom/AjaxObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\dom\\AjaxObservable.js",
      "rxjs/observable/dom/WebSocketSubject": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\dom\\WebSocketSubject.js",
      "rxjs/observable/dom/ajax": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\dom\\ajax.js",
      "rxjs/observable/dom/webSocket": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\dom\\webSocket.js",
      "rxjs/observable/empty": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\empty.js",
      "rxjs/observable/forkJoin": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\forkJoin.js",
      "rxjs/observable/from": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\from.js",
      "rxjs/observable/fromEvent": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\fromEvent.js",
      "rxjs/observable/fromEventPattern": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\fromEventPattern.js",
      "rxjs/observable/fromPromise": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\fromPromise.js",
      "rxjs/observable/generate": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\generate.js",
      "rxjs/observable/if": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\if.js",
      "rxjs/observable/interval": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\interval.js",
      "rxjs/observable/merge": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\merge.js",
      "rxjs/observable/never": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\never.js",
      "rxjs/observable/of": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\of.js",
      "rxjs/observable/onErrorResumeNext": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\onErrorResumeNext.js",
      "rxjs/observable/pairs": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\pairs.js",
      "rxjs/observable/race": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\race.js",
      "rxjs/observable/range": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\range.js",
      "rxjs/observable/throw": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\throw.js",
      "rxjs/observable/timer": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\timer.js",
      "rxjs/observable/using": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\using.js",
      "rxjs/observable/zip": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\observable\\zip.js",
      "rxjs/operator/audit": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\audit.js",
      "rxjs/operator/auditTime": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\auditTime.js",
      "rxjs/operator/buffer": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\buffer.js",
      "rxjs/operator/bufferCount": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\bufferCount.js",
      "rxjs/operator/bufferTime": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\bufferTime.js",
      "rxjs/operator/bufferToggle": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\bufferToggle.js",
      "rxjs/operator/bufferWhen": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\bufferWhen.js",
      "rxjs/operator/catch": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\catch.js",
      "rxjs/operator/combineAll": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\combineAll.js",
      "rxjs/operator/combineLatest": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\combineLatest.js",
      "rxjs/operator/concat": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\concat.js",
      "rxjs/operator/concatAll": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\concatAll.js",
      "rxjs/operator/concatMap": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\concatMap.js",
      "rxjs/operator/concatMapTo": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\concatMapTo.js",
      "rxjs/operator/count": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\count.js",
      "rxjs/operator/debounce": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\debounce.js",
      "rxjs/operator/debounceTime": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\debounceTime.js",
      "rxjs/operator/defaultIfEmpty": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\defaultIfEmpty.js",
      "rxjs/operator/delay": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\delay.js",
      "rxjs/operator/delayWhen": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\delayWhen.js",
      "rxjs/operator/dematerialize": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\dematerialize.js",
      "rxjs/operator/distinct": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\distinct.js",
      "rxjs/operator/distinctUntilChanged": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\distinctUntilChanged.js",
      "rxjs/operator/distinctUntilKeyChanged": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\distinctUntilKeyChanged.js",
      "rxjs/operator/do": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\do.js",
      "rxjs/operator/elementAt": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\elementAt.js",
      "rxjs/operator/every": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\every.js",
      "rxjs/operator/exhaust": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\exhaust.js",
      "rxjs/operator/exhaustMap": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\exhaustMap.js",
      "rxjs/operator/expand": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\expand.js",
      "rxjs/operator/filter": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\filter.js",
      "rxjs/operator/finally": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\finally.js",
      "rxjs/operator/find": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\find.js",
      "rxjs/operator/findIndex": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\findIndex.js",
      "rxjs/operator/first": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\first.js",
      "rxjs/operator/groupBy": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\groupBy.js",
      "rxjs/operator/ignoreElements": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\ignoreElements.js",
      "rxjs/operator/isEmpty": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\isEmpty.js",
      "rxjs/operator/last": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\last.js",
      "rxjs/operator/let": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\let.js",
      "rxjs/operator/map": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\map.js",
      "rxjs/operator/mapTo": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\mapTo.js",
      "rxjs/operator/materialize": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\materialize.js",
      "rxjs/operator/max": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\max.js",
      "rxjs/operator/merge": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\merge.js",
      "rxjs/operator/mergeAll": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\mergeAll.js",
      "rxjs/operator/mergeMap": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\mergeMap.js",
      "rxjs/operator/mergeMapTo": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\mergeMapTo.js",
      "rxjs/operator/mergeScan": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\mergeScan.js",
      "rxjs/operator/min": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\min.js",
      "rxjs/operator/multicast": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\multicast.js",
      "rxjs/operator/observeOn": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\observeOn.js",
      "rxjs/operator/onErrorResumeNext": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\onErrorResumeNext.js",
      "rxjs/operator/pairwise": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\pairwise.js",
      "rxjs/operator/partition": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\partition.js",
      "rxjs/operator/pluck": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\pluck.js",
      "rxjs/operator/publish": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\publish.js",
      "rxjs/operator/publishBehavior": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\publishBehavior.js",
      "rxjs/operator/publishLast": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\publishLast.js",
      "rxjs/operator/publishReplay": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\publishReplay.js",
      "rxjs/operator/race": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\race.js",
      "rxjs/operator/reduce": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\reduce.js",
      "rxjs/operator/repeat": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\repeat.js",
      "rxjs/operator/repeatWhen": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\repeatWhen.js",
      "rxjs/operator/retry": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\retry.js",
      "rxjs/operator/retryWhen": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\retryWhen.js",
      "rxjs/operator/sample": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\sample.js",
      "rxjs/operator/sampleTime": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\sampleTime.js",
      "rxjs/operator/scan": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\scan.js",
      "rxjs/operator/sequenceEqual": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\sequenceEqual.js",
      "rxjs/operator/share": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\share.js",
      "rxjs/operator/shareReplay": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\shareReplay.js",
      "rxjs/operator/single": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\single.js",
      "rxjs/operator/skip": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\skip.js",
      "rxjs/operator/skipLast": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\skipLast.js",
      "rxjs/operator/skipUntil": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\skipUntil.js",
      "rxjs/operator/skipWhile": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\skipWhile.js",
      "rxjs/operator/startWith": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\startWith.js",
      "rxjs/operator/subscribeOn": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\subscribeOn.js",
      "rxjs/operator/switch": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\switch.js",
      "rxjs/operator/switchMap": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\switchMap.js",
      "rxjs/operator/switchMapTo": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\switchMapTo.js",
      "rxjs/operator/take": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\take.js",
      "rxjs/operator/takeLast": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\takeLast.js",
      "rxjs/operator/takeUntil": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\takeUntil.js",
      "rxjs/operator/takeWhile": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\takeWhile.js",
      "rxjs/operator/throttle": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\throttle.js",
      "rxjs/operator/throttleTime": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\throttleTime.js",
      "rxjs/operator/timeInterval": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\timeInterval.js",
      "rxjs/operator/timeout": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\timeout.js",
      "rxjs/operator/timeoutWith": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\timeoutWith.js",
      "rxjs/operator/timestamp": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\timestamp.js",
      "rxjs/operator/toArray": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\toArray.js",
      "rxjs/operator/toPromise": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\toPromise.js",
      "rxjs/operator/window": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\window.js",
      "rxjs/operator/windowCount": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\windowCount.js",
      "rxjs/operator/windowTime": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\windowTime.js",
      "rxjs/operator/windowToggle": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\windowToggle.js",
      "rxjs/operator/windowWhen": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\windowWhen.js",
      "rxjs/operator/withLatestFrom": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\withLatestFrom.js",
      "rxjs/operator/zip": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\zip.js",
      "rxjs/operator/zipAll": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operator\\zipAll.js",
      "rxjs/operators/audit": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\audit.js",
      "rxjs/operators/auditTime": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\auditTime.js",
      "rxjs/operators/buffer": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\buffer.js",
      "rxjs/operators/bufferCount": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\bufferCount.js",
      "rxjs/operators/bufferTime": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\bufferTime.js",
      "rxjs/operators/bufferToggle": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\bufferToggle.js",
      "rxjs/operators/bufferWhen": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\bufferWhen.js",
      "rxjs/operators/catchError": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\catchError.js",
      "rxjs/operators/combineAll": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\combineAll.js",
      "rxjs/operators/combineLatest": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\combineLatest.js",
      "rxjs/operators/concat": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\concat.js",
      "rxjs/operators/concatAll": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\concatAll.js",
      "rxjs/operators/concatMap": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\concatMap.js",
      "rxjs/operators/concatMapTo": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\concatMapTo.js",
      "rxjs/operators/count": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\count.js",
      "rxjs/operators/debounce": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\debounce.js",
      "rxjs/operators/debounceTime": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\debounceTime.js",
      "rxjs/operators/defaultIfEmpty": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\defaultIfEmpty.js",
      "rxjs/operators/delay": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\delay.js",
      "rxjs/operators/delayWhen": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\delayWhen.js",
      "rxjs/operators/dematerialize": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\dematerialize.js",
      "rxjs/operators/distinct": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\distinct.js",
      "rxjs/operators/distinctUntilChanged": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\distinctUntilChanged.js",
      "rxjs/operators/distinctUntilKeyChanged": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\distinctUntilKeyChanged.js",
      "rxjs/operators/elementAt": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\elementAt.js",
      "rxjs/operators/every": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\every.js",
      "rxjs/operators/exhaust": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\exhaust.js",
      "rxjs/operators/exhaustMap": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\exhaustMap.js",
      "rxjs/operators/expand": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\expand.js",
      "rxjs/operators/filter": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\filter.js",
      "rxjs/operators/finalize": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\finalize.js",
      "rxjs/operators/find": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\find.js",
      "rxjs/operators/findIndex": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\findIndex.js",
      "rxjs/operators/first": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\first.js",
      "rxjs/operators/groupBy": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\groupBy.js",
      "rxjs/operators/ignoreElements": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\ignoreElements.js",
      "rxjs/operators/index": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\index.js",
      "rxjs/operators/isEmpty": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\isEmpty.js",
      "rxjs/operators/last": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\last.js",
      "rxjs/operators/map": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\map.js",
      "rxjs/operators/mapTo": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\mapTo.js",
      "rxjs/operators/materialize": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\materialize.js",
      "rxjs/operators/max": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\max.js",
      "rxjs/operators/merge": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\merge.js",
      "rxjs/operators/mergeAll": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\mergeAll.js",
      "rxjs/operators/mergeMap": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\mergeMap.js",
      "rxjs/operators/mergeMapTo": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\mergeMapTo.js",
      "rxjs/operators/mergeScan": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\mergeScan.js",
      "rxjs/operators/min": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\min.js",
      "rxjs/operators/multicast": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\multicast.js",
      "rxjs/operators/observeOn": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\observeOn.js",
      "rxjs/operators/onErrorResumeNext": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\onErrorResumeNext.js",
      "rxjs/operators/pairwise": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\pairwise.js",
      "rxjs/operators/partition": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\partition.js",
      "rxjs/operators/pluck": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\pluck.js",
      "rxjs/operators/publish": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\publish.js",
      "rxjs/operators/publishBehavior": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\publishBehavior.js",
      "rxjs/operators/publishLast": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\publishLast.js",
      "rxjs/operators/publishReplay": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\publishReplay.js",
      "rxjs/operators/race": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\race.js",
      "rxjs/operators/reduce": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\reduce.js",
      "rxjs/operators/refCount": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\refCount.js",
      "rxjs/operators/repeat": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\repeat.js",
      "rxjs/operators/repeatWhen": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\repeatWhen.js",
      "rxjs/operators/retry": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\retry.js",
      "rxjs/operators/retryWhen": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\retryWhen.js",
      "rxjs/operators/sample": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\sample.js",
      "rxjs/operators/sampleTime": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\sampleTime.js",
      "rxjs/operators/scan": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\scan.js",
      "rxjs/operators/sequenceEqual": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\sequenceEqual.js",
      "rxjs/operators/share": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\share.js",
      "rxjs/operators/shareReplay": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\shareReplay.js",
      "rxjs/operators/single": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\single.js",
      "rxjs/operators/skip": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\skip.js",
      "rxjs/operators/skipLast": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\skipLast.js",
      "rxjs/operators/skipUntil": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\skipUntil.js",
      "rxjs/operators/skipWhile": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\skipWhile.js",
      "rxjs/operators/startWith": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\startWith.js",
      "rxjs/operators/subscribeOn": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\subscribeOn.js",
      "rxjs/operators/switchAll": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\switchAll.js",
      "rxjs/operators/switchMap": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\switchMap.js",
      "rxjs/operators/switchMapTo": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\switchMapTo.js",
      "rxjs/operators/take": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\take.js",
      "rxjs/operators/takeLast": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\takeLast.js",
      "rxjs/operators/takeUntil": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\takeUntil.js",
      "rxjs/operators/takeWhile": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\takeWhile.js",
      "rxjs/operators/tap": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\tap.js",
      "rxjs/operators/throttle": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\throttle.js",
      "rxjs/operators/throttleTime": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\throttleTime.js",
      "rxjs/operators/timeInterval": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\timeInterval.js",
      "rxjs/operators/timeout": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\timeout.js",
      "rxjs/operators/timeoutWith": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\timeoutWith.js",
      "rxjs/operators/timestamp": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\timestamp.js",
      "rxjs/operators/toArray": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\toArray.js",
      "rxjs/operators/window": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\window.js",
      "rxjs/operators/windowCount": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\windowCount.js",
      "rxjs/operators/windowTime": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\windowTime.js",
      "rxjs/operators/windowToggle": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\windowToggle.js",
      "rxjs/operators/windowWhen": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\windowWhen.js",
      "rxjs/operators/withLatestFrom": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\withLatestFrom.js",
      "rxjs/operators/zip": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\zip.js",
      "rxjs/operators/zipAll": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\zipAll.js",
      "rxjs/scheduler/Action": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\scheduler\\Action.js",
      "rxjs/scheduler/AnimationFrameAction": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\scheduler\\AnimationFrameAction.js",
      "rxjs/scheduler/AnimationFrameScheduler": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\scheduler\\AnimationFrameScheduler.js",
      "rxjs/scheduler/AsapAction": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\scheduler\\AsapAction.js",
      "rxjs/scheduler/AsapScheduler": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\scheduler\\AsapScheduler.js",
      "rxjs/scheduler/AsyncAction": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\scheduler\\AsyncAction.js",
      "rxjs/scheduler/AsyncScheduler": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\scheduler\\AsyncScheduler.js",
      "rxjs/scheduler/QueueAction": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\scheduler\\QueueAction.js",
      "rxjs/scheduler/QueueScheduler": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\scheduler\\QueueScheduler.js",
      "rxjs/scheduler/VirtualTimeScheduler": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\scheduler\\VirtualTimeScheduler.js",
      "rxjs/scheduler/animationFrame": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\scheduler\\animationFrame.js",
      "rxjs/scheduler/asap": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\scheduler\\asap.js",
      "rxjs/scheduler/async": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\scheduler\\async.js",
      "rxjs/scheduler/queue": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\scheduler\\queue.js",
      "rxjs/symbol/iterator": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\symbol\\iterator.js",
      "rxjs/symbol/observable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\symbol\\observable.js",
      "rxjs/symbol/rxSubscriber": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\symbol\\rxSubscriber.js",
      "rxjs/testing/ColdObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\testing\\ColdObservable.js",
      "rxjs/testing/HotObservable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\testing\\HotObservable.js",
      "rxjs/testing/SubscriptionLog": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\testing\\SubscriptionLog.js",
      "rxjs/testing/SubscriptionLoggable": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\testing\\SubscriptionLoggable.js",
      "rxjs/testing/TestMessage": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\testing\\TestMessage.js",
      "rxjs/testing/TestScheduler": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\testing\\TestScheduler.js",
      "rxjs/util/AnimationFrame": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\AnimationFrame.js",
      "rxjs/util/ArgumentOutOfRangeError": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\ArgumentOutOfRangeError.js",
      "rxjs/util/EmptyError": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\EmptyError.js",
      "rxjs/util/FastMap": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\FastMap.js",
      "rxjs/util/Immediate": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\Immediate.js",
      "rxjs/util/Map": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\Map.js",
      "rxjs/util/MapPolyfill": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\MapPolyfill.js",
      "rxjs/util/ObjectUnsubscribedError": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\ObjectUnsubscribedError.js",
      "rxjs/util/Set": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\Set.js",
      "rxjs/util/TimeoutError": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\TimeoutError.js",
      "rxjs/util/UnsubscriptionError": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\UnsubscriptionError.js",
      "rxjs/util/applyMixins": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\applyMixins.js",
      "rxjs/util/assign": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\assign.js",
      "rxjs/util/errorObject": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\errorObject.js",
      "rxjs/util/identity": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\identity.js",
      "rxjs/util/isArray": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\isArray.js",
      "rxjs/util/isArrayLike": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\isArrayLike.js",
      "rxjs/util/isDate": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\isDate.js",
      "rxjs/util/isFunction": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\isFunction.js",
      "rxjs/util/isNumeric": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\isNumeric.js",
      "rxjs/util/isObject": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\isObject.js",
      "rxjs/util/isPromise": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\isPromise.js",
      "rxjs/util/isScheduler": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\isScheduler.js",
      "rxjs/util/noop": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\noop.js",
      "rxjs/util/not": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\not.js",
      "rxjs/util/pipe": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\pipe.js",
      "rxjs/util/root": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\root.js",
      "rxjs/util/subscribeToResult": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\subscribeToResult.js",
      "rxjs/util/toSubscriber": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\toSubscriber.js",
      "rxjs/util/tryCatch": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\util\\tryCatch.js",
      "rxjs/operators": "C:\\Users\\adam\\Documents\\Books\\Essential Angular 5 Update\\Source Code\\Chapter 03\\SportsStore\\node_modules\\rxjs\\_esm5\\operators\\index.js"
    },
    "mainFields": [
      "browser",
      "module",
      "main"
    ]
  },
  "resolveLoader": {
    "modules": [
      "./node_modules",
      "./node_modules"
    ]
  },
  "entry": {
    "main": [
      "./ClientApp\\boot.ts"
    ],
    "polyfills": [
      "./ClientApp\\polyfills.ts"
    ],
    "styles": [
      "./ClientApp\\styles.css",
      "./wwwroot/lib/bootstrap/dist/css/bootstrap.min.css"      
    ]
  },
  "output": {
    "path": path.join(process.cwd(), "wwwroot/dist"),
    "filename": "[name].bundle.js",
    "chunkFilename": "[id].chunk.js",
    "crossOriginLoading": false,
    "publicPath": "/app/"
  },
  "module": {
    "rules": [
      {
        "test": /\.html$/,
        "loader": "raw-loader"
      },
      {
        "test": /\.(eot|svg|cur)$/,
        "loader": "file-loader",
        "options": {
          "name": "[name].[hash:20].[ext]",
          "limit": 10000
        }
      },
      {
        "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        "loader": "url-loader",
        "options": {
          "name": "[name].[hash:20].[ext]",
          "limit": 10000
        }
      },
      {
        "exclude": [
          path.join(process.cwd(), "ClientApp\\styles.css")
        ],
        "test": /\.css$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "ClientApp\\styles.css")
        ],
        "test": /\.scss$|\.sass$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "ClientApp\\styles.css")
        ],
        "test": /\.less$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "less-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "ClientApp\\styles.css")
        ],
        "test": /\.styl$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "ClientApp\\styles.css")
        ],
        "test": /\.css$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "ClientApp\\styles.css")
        ],
        "test": /\.scss$|\.sass$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "ClientApp\\styles.css")
        ],
        "test": /\.less$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "less-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "ClientApp\\styles.css")
        ],
        "test": /\.styl$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },
      {
        "test": /\.ts$/,
        "loader": "@ngtools/webpack"
      }
    ]
  },
  "plugins": [
    new NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        "context": "ClientApp",
        "to": "",
        "from": {
          "glob": "assets/**/*",
          "dot": true
        }
      },
      {
        "context": "ClientApp",
        "to": "",
        "from": {
          "glob": "favicon.ico",
          "dot": true
        }
      }
    ], {
      "ignore": [
        ".gitkeep"
      ],
      "debug": "warning"
    }),
    new ProgressPlugin(),
    new CircularDependencyPlugin({
      "exclude": /(\\|\/)node_modules(\\|\/)/,
      "failOnError": false
    }),
    new NamedLazyChunksWebpackPlugin(),
    new HtmlWebpackPlugin({
      "template": "./ClientApp\\index.html",
      "filename": "./index.html",
      "hash": false,
      "inject": true,
      "compile": true,
      "favicon": false,
      "minify": false,
      "cache": true,
      "showErrors": true,
      "chunks": "all",
      "excludeChunks": [],
      "title": "Webpack App",
      "xhtml": true,
      "chunksSortMode": function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
            return 1;
        }
        else if (leftIndex < rightindex) {
            return -1;
        }
        else {
            return 0;
        }
    }
    }),
    new BaseHrefWebpackPlugin({}),
    new CommonsChunkPlugin({
      "name": [
        "inline"
      ],
      "minChunks": null
    }),
    new CommonsChunkPlugin({
      "name": [
        "vendor"
      ],
      "minChunks": (module) => {
                return module.resource
                    && (module.resource.startsWith(nodeModules)
                        || module.resource.startsWith(genDirNodeModules)
                        || module.resource.startsWith(realNodeModules));
            },
      "chunks": [
        "main"
      ]
    }),
    new SourceMapDevToolPlugin({
      "filename": "[file].map[query]",
      "moduleFilenameTemplate": "[resource-path]",
      "fallbackModuleFilenameTemplate": "[resource-path]?[hash]",
      "sourceRoot": "webpack:///"
    }),
    new CommonsChunkPlugin({
      "name": [
        "main"
      ],
      "minChunks": 2,
      "async": "common"
    }),
    new NamedModulesPlugin({}),
    new AngularCompilerPlugin({
      "mainPath": "main.ts",
      "platform": 0,
      "hostReplacementPaths": {
        "environments\\environment.ts": "environments\\environment.ts"
      },
      "sourceMap": true,
      "tsConfigPath": "ClientApp\\tsconfig.app.json",
      "skipCodeGeneration": true,
      "compilerOptions": {}
    })
  ],
  "node": {
    "fs": "empty",
    "global": true,
    "crypto": "empty",
    "tls": "empty",
    "net": "empty",
    "process": true,
    "module": false,
    "clearImmediate": false,
    "setImmediate": false
  },
  "devServer": {
    "historyApiFallback": true
  }
};
