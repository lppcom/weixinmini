import java.net.InetSocketAddress;
import java.util.concurrent.Executors;

import org.jboss.netty.bootstrap.ServerBootstrap;
import org.jboss.netty.channel.ChannelFactory;
import org.jboss.netty.channel.ChannelPipeline;
import org.jboss.netty.channel.ChannelPipelineFactory;
import org.jboss.netty.channel.Channels;
import org.jboss.netty.channel.socket.nio.NioServerSocketChannelFactory;

public class RobotsServer {
    public static void main(String[] args){
        ChannelFactory factory = new NioServerSocketChannelFactory(Executors.newCachedThreadPool(),Executors.newCachedThreadPool());
        ServerBootstrap bootstrap = new ServerBootstrap(factory);
        bootstrap.setPipelineFactory(new ChannelPipelineFactory() {
            public ChannelPipeline getPipeline() throws Exception {
                //机器人进行语义分析，然后返回给客户
                return Channels.pipeline(new RobotsServerHandler());
            }
        });
        bootstrap.setOption("child.tcpNoDelay",true);
        bootstrap.setOption("child.keepAlive",true);
        bootstrap.bind(new InetSocketAddress(8080));
    }
}
