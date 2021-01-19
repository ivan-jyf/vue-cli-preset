if [[ $SERVICE_API == "dev" ]]
  then
    echo "Current environment is dev"
  sed -i -e "s/BACKEND_API/YOUR_ADDRESS/" /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
elif [[ $SERVICE_API == "qa" ]]
  then
  sed -i -e "s/BACKEND_API/YOUR_ADDRESS/" /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
elif [[ $SERVICE_API == "prod" ]]
then
  sed -i -e "s/BACKEND_API/YOUR_ADDRESS/" /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
fi
