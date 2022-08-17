# Getting started with AWS Lambda and GraalVM

This repository is meant to help developers to create and migration Java applications to AWS Lambda using GraalVM native-image. It will cover multiple different frameworks and strategies to help you modernize your applications whatever situation you are in.

## Contents
* [Overview of GraalVM native-image](#overview-of-graalvm-native-image)
* [Advantages of using GraalVM native-image with AWS Lambda](#advantages-of-using-graalvm-native-image-with-aws-lambda)
* [GraalVM native-image Limitations](#graalvm-native-image-limitations)
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

## Advantages of Using GraalVM native-image with AWS Lambda

AWS Lambda automatically scales to support the rate of incoming requests. When a Lambda function doesn't currently have sufficient capacity to handle a request a new execution environment is created. Each execution environment can handle a single request at once. When a new execution environment is created the Java Virtual Machine is started and the customers code is loaded into it. This is called a cold start. The execution environment can then be re-used for subsequent invocations. This is called a warm start. Execution environments are reused for a nondeterministic period of time.

Each cold start represents hundreds of milliseconds of latency to a function call. Loading your code and executing runtime specific functionality and add even further to the latency. The JVMs JIT compilers work by identifying hot spots of your code by profiling your functions as they run. Peak performance comes after a period of time.

With a GraalVM native executable, your Lambda function no longer needs a JVM in order to run so it doesn't need to be started. It also comes pre-optimized, so there is no period of profiling before it reaches peak performance. 

## GraalVM native-image Limitations

### Java language incompatibilities

GraalVM native-image is an optimization, and with this optimization comes trade-offs. To produce the native executable the native-image tool statically analyses all reachable code from the entry point of the application. Only classes and methods found like this are included into the native executable. This limits your application to code which is known at build time. Nothing new can be loaded at runtime. This means that common functionality like dynamic class loading and reflection is not supported. The GraalVM manually documents an in-depth list of [limitations](https://www.graalvm.org/22.0/reference-manual/native-image/Limitations/).

To work around these limitations you create additional configuration files which the native-image tool uses to find additional resources for inclusion. 

For example, the Java class which implements the `RequestHandler` or `RequestStreamHandler` interface is loaded using reflection. This would need to be configured using additional configuration.

reflect-config.json
```json
[
  {
    "name": "com.retail.UpdateOrderHandler",
    "allDeclaredConstructors": true,
    "allPublicConstructors": true,
    "allDeclaredMethods": true,
    "allPublicMethods": true,
    "allDeclaredClasses": true,
    "allPublicClasses": true
  }
]
```

### Increased Build Complexity

The ahead-of-time compilation done by the native-image tool is much more resource intensive than that done by the JVM. Builds take longer and require more memory. The resultant binary executable is also platform specific.

Lambda supports two CPU architectures x86 and ARM. You must ensure that the product of your build process matches that of your target Lambda function. In the same way, the build must target the Linux operating system.

If you are using a different OS or CPU architecture to your desired target then you can use [Docker](https://www.docker.com/) to produce a suitable build.

TODO: error message example

For example:

| Project                                                                           | JVM (Java 17) | AOT (GraalVM 22.1.0) |
|-----------------------------------------------------------------------------------|---------------|----------------------|
| [graalvm-serverless-demo](https://github.com/aws-samples/serverless-graalvm-demo) | xxs           | xxxs                 |


## GraalVM Dependency Considerations

External dependencies are often used to add additional capabilities to our application which might be lengthy or complex to write yourself. They can also give productivity boosts by simplifying processes. To do this, they often use the very functionality which is not supported in GraalVM native-image. For example the Jackson databind library uses reflection to serialise and deserialise objects to JSON. Serialising complex objects to JSON is a non-trivial operation, so it make sense to use a high quality external dependency. 

Not all external dependencies currently support GraalVM native-image. When you use them in your application and compile them with native-image you can have runtime exceptions due to `ClassNotFoundExceptions`. This is the worst time to have errors surface, in the testing section, strategies for avoiding this will be covered. (TODO: Link)

TODO: example error message

Adoption of GraalVM native-image is increasing. The eco-systems largest framework, Spring has stated that [Spring Boot 3 and Spring Framework 6 will have built-in support](https://www.infoq.com/articles/native-java-spring-boot/) by the end of 2022.



The following table is a list of common dependencies and information about what support they provide for GraalVM native-image.

### AWS Dependencies

| Name                   | Supported                         | Information                                                                                                                |
|:-----------------------|:----------------------------------|:---------------------------------------------------------------------------------------------------------------------------|
| AWS SDK for Java v2    | :white_check_mark: Supported      | Supported from [v2.16.1](https://aws.amazon.com/blogs/developer/graalvm-native-image-support-in-the-aws-sdk-for-java-2-x/) |
| AWS Lambda Java Libs   | :page_facing_up: Config available | Follow the [GitHub issue](https://github.com/aws/aws-lambda-java-libs/issues/272)                                          |
| AWS X-Ray SDK for Java | :white_check_mark: Supported      | Supported from v2.11.0                                                                                                     |

### 3rd Party Dependencies



### GraalVM Reachability Metadata Repository 

https://github.com/oracle/graalvm-reachability-metadata



## Additional Training Resources

[Java on AWS Lambda](https://catalog.workshops.aws/java-on-aws-lambda/en-US) - AWS Workshop 
