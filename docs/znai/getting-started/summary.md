---
title: GraalVM on AWS Lambda
---

# Overview

GraalVM is a high-performance JDK designed for high performance and low memory utilization. GraalVM can run in two different modes. Firstly, on the HotSpot JVM with the Graal just-in-time (JIT) compiler. Secondly, and more interesting for this repository is the ahead-of-time (AOT) compiled native binaries.

Using the GraalVM native-image tool you can compile Java bytecode into a self contained, platform specific binary file. This executable no longer requires the JVM to run. This and the ahead-of-time compilation mean that the application can start up much faster and consume less memory.

# Advantages

AWS Lambda automatically scales to support the rate of incoming requests. When a Lambda function doesn't currently have sufficient capacity to handle a request a new execution environment is created. Each execution environment can handle a single request at once. When a new execution environment is created, the Java Virtual Machine (JVM) is started and the your code is loaded into it. This is called a cold start. The execution environment can then be re-used for subsequent invocations. This is called a warm start. Execution environments are reused for a nondeterministic period of time, before they are shutdown.

Each cold start represents hundreds of milliseconds of latency to a function call. Loading your code and executing runtime specific functionality and add even further to the latency. The JVMs JIT compilers work by identifying hot spots of your code by profiling your functions as they run. Peak performance comes after a period of time.

With a GraalVM native executable, your Lambda function no longer needs a JVM in order to run so it doesn't need to be started. It also comes pre-optimized, so there is no period of profiling before it reaches peak performance. 
