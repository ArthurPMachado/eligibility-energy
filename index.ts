/* eslint-disable @typescript-eslint/no-unused-vars */
import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'
import * as awsx from '@pulumi/awsx'

const config = new pulumi.Config()
const containerPort = config.getNumber('containerPort') || 80
const cpu = config.getNumber('cpu') || 512
const memory = config.getNumber('memory') || 128

// An ECS cluster to deploy into
const cluster = new aws.ecs.Cluster('lemon-cluster', {})

// An ALB to serve the container endpoint to the internet
const loadbalancer = new awsx.lb.ApplicationLoadBalancer(
  'lemon-loadbalancer',
  {},
)

// An ECR repository to store our application's container image
const ecrRepository = new awsx.ecr.Repository('docker-repo', {
  forceDelete: true,
})

// Build and publish our application's container image from ./ to the ECR repository
const containerImage = new awsx.ecr.Image('docker-image', {
  repositoryUrl: ecrRepository.url,
  context: './',
  platform: 'linux/amd64',
})

// Deploy an ECS Service on Fargate to host the application container
const service = new awsx.ecs.FargateService('service', {
  cluster: cluster.arn,
  assignPublicIp: true,
  taskDefinitionArgs: {
    container: {
      name: 'lemon-energy',
      image: containerImage.imageUri,
      cpu,
      memory,
      essential: true,
      portMappings: [
        {
          containerPort,
          targetGroup: loadbalancer.defaultTargetGroup,
        },
      ],
    },
  },
})

// The URL at which the container's HTTP endpoint will be available
export const url = pulumi.interpolate`http://${loadbalancer.loadBalancer.dnsName}`
