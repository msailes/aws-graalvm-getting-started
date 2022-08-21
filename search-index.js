znaiSearchData = [["@@index@@getting-started-with-aws-lambda-and-graalvm","","AWS Lambda and GraalVM","Getting started with AWS Lambda and GraalVM","This repository is to help developers to create and migration Java applications to AWS Lambda using GraalVM native-image. It will cover multiple different frameworks and strategies to help you modernize your applications whatever situation you are in."],["getting-started@@summary@@overview","Getting Started","GraalVM on AWS Lambda","Overview","GraalVM is a high-performance JDK designed for high performance and low memory utilization. GraalVM can run in two different modes. Firstly, on the HotSpot JVM with the Graal just-in-time (JIT) compiler. Secondly, and more interesting for this repository is the ahead-of-time (AOT) compiled native binaries.Using the GraalVM native-image tool you can compile Java bytecode into a self contained, platform specific binary file. This executable no longer requires the JVM to run. This and the ahead-of-time compilation mean that the application can start up much faster and consume less memory."],["getting-started@@summary@@advantages","Getting Started","GraalVM on AWS Lambda","Advantages","AWS Lambda automatically scales to support the rate of incoming requests. When a Lambda function doesn't currently have sufficient capacity to handle a request a new execution environment is created. Each execution environment can handle a single request at once. When a new execution environment is created, the Java Virtual Machine (JVM) is started and the your code is loaded into it. This is called a cold start. The execution environment can then be re-used for subsequent invocations. This is called a warm start. Execution environments are reused for a nondeterministic period of time, before they are shutdown.Each cold start represents hundreds of milliseconds of latency to a function call. Loading your code and executing runtime specific functionality and add even further to the latency. The JVMs JIT compilers work by identifying hot spots of your code by profiling your functions as they run. Peak performance comes after a period of time.With a GraalVM native executable, your Lambda function no longer needs a JVM in order to run so it doesn't need to be started. It also comes pre-optimized, so there is no period of profiling before it reaches peak performance."],["chapter-one@@getting-started@@main-concepts","Chapter One","Getting Started","Main Concepts","Znai has three levels of documentation organization:Chapters Pages Page Sections Znai encourages authors to split their content across multiple pages.If you feel like you need to use nested headings, consider moving your content hierarchy one level up:Split overlong page into multiple ones Introduce chapters Focus on one thing at a time It may help to show parallel with OOP conceptsChapters as packages Pages as classes Page Sections as methods It is a bad practice to have a class with loosely related methods. Similarly, it is a bad practice to have a long page with loosely related sections. https://testingisdocumenting.org/znai/flow/structure Read more"],["chapter-one@@getting-started@@table-of-contents","Chapter One","Getting Started","Table of Contents","Each documentation must have toc file in its root. This file contains chapters and pages.This is a toc file for this auto generated documentation. getting-started summary chapter-one getting-started page-two chapter-two page-three page-four Take a look at the left side bar and compare it with the file content.The top entry, Chapter One , corresponds to the directory chapter-one . The nested entries like Page Two , corresponds to the file page-two.md ."],["chapter-one@@getting-started@@embedding-content","Chapter One","Getting Started","Embedding Content","To reduce documentation maintenance burden avoid copy and paste of code snippets. Embed content by referencing existing files using :include-file: plugin instead. :include-file: file-name.js {title: \"Optional Title\"} class JsClass { constructor() { } } export default JsClass File will be looked up using following rules:directory with a markup file root directory of a documentation all lookup paths listed in a lookup-paths file https://testingisdocumenting.org/znai/snippets/external-code-snippets Read more"],["chapter-one@@getting-started@@meta","Chapter One","Getting Started","Meta","Each documentation must have the meta.json file in its root. This JSON file contains documentation display name, type, and optional View On information. { \"title\": \"AWS Lambda and GraalVM\", \"type\": \"Guide\", \"viewOn\": { \"link\": \"your-custom-base-url\", \"title\": \"View On Label\" } }"]]
/*
 * Copyright 2019 TWO SIGMA OPEN SOURCE, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

znaiSearchIdx = lunr(function () {
    this.ref('id')
    this.field('section')
    this.field('pageTitle')
    this.field('pageSection')
    this.field('text')

    this.metadataWhitelist = ['position']

    znaiSearchData.forEach(function (e) {
        this.add({
            id: e[0],
            section: e[1],
            pageTitle: e[2],
            pageSection: e[3],
            text: e[4],
        })
    }, this)
})
