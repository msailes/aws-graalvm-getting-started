# Getting started with AWS Lambda and GraalVM

This repository is meant to help developers to create and migration Java applications to AWS Lambda using GraalVM native-image. It will cover multiple different frameworks and strategies to help you modernize your applications whatever situation you are in.

## Contents
* [Overview of GraalVM native-image](#overview-of-graalvm-native-image)
* [Advantages of using GraalVM native-image](#advantages-of-using-graalvm-native-image)
* Migrating an existing application
* Greenfield applications
  * No framework
  * Micronaut
  * Quarkus
  * Spring
* [GraalVM Dependency considerations](#graalvm-dependency-considerations)
* [Additional Training Resources](#additional-training-resources)

## Overview of GraalVM native-image

GraalVM is a high-performance JDK designed for high performance and low memory utilization. GraalVM can run in two different modes. Firstly, on the HotSpot JVM with the Graal just-in-time (JIT) compiler. Secondly, and more interesting for this repository is the ahead-of-time (AOT) compiled native binaries.

Using the GraalVM native-image tool you can compile Java bytecode into a self contained, platform specific binary file. This executable no longer requires the JVM to run. This and the ahead-of-time compilation mean that the application can start up much faster and consume less memory.

## Advantages of using GraalVM native-image

## GraalVM Dependency considerations

### AWS Dependencies

| Name                   | Supported   | Information                                                                                                                                               |
|:-----------------------|:------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------|
| AWS SDK for Java v2    | Supported   | GraalVM native-image has been supported since [v2.16.1](https://aws.amazon.com/blogs/developer/graalvm-native-image-support-in-the-aws-sdk-for-java-2-x/) |
| AWS Lambda Java Libs   | Config only | Follow the [GitHub issue](https://github.com/aws/aws-lambda-java-libs/issues/272)                                                                         |
| AWS X-Ray SDK for Java | Supported   | GraalVM native-image has been supported since v2.11.0                                                                                                     |

## Additional Training Resources

[Java on AWS Lambda](https://catalog.workshops.aws/java-on-aws-lambda/en-US) - AWS Workshop 
