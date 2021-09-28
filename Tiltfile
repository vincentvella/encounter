# Load and configure NGROK
# load('ext://ngrok', 'ngrok')

k8s_yaml('k8s/config-map.yaml')

k8s_yaml('k8s/redis-deployment.yaml')
k8s_yaml('k8s/postgres-deployment.yaml')
k8s_yaml('k8s/video-deployment.yaml')
# k8s_yaml('k8s/web-deployment.yaml')

k8s_yaml('k8s/ingress-service.yaml')

docker_build('vincentvella/encounter-video', 'video')
# docker_build('vincentvella/encounter-web', 'app')

k8s_resource('video-deployment', port_forwards=9000)
k8s_resource('postgres-deployment', port_forwards=5432)
# k8s_resource('web-deployment', port_forwards=19006)