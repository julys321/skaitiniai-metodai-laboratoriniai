clear all
x=[1 3 4 5 7 8 9 10];
y=[0.230	0.228	0.226	0.222	0.223	0.218	0.206	0.202];
M=length(x); %x(i) kiekis.  Zinoma galima ir tiesiogiai nurodyti.
N=M-1;  %Daugianario eile.

for k=1:M
   f{k,1}=y(k); 
end 
for j=1:N
    for i=j:N
        f{i+1,j+1}=(f{i,j}-f{i+1,j})/(x(i+1-j)-x(i+1));  
    end
end

 for i=1:M
     for j=i:N
 f{i,j+1}='-'; 
     end 
 end
Skirtumupav=[{'y'} 'f1' 'f2' 'f3' 'f4' 'f5' 'f6' 'f7'];
Skirtumulent=[Skirtumupav; f]
X=2;
Y=0.231;
% Visu eiliu Daugianariu sudarymas:
LL(1)=y(1); %Sumavimui
     p=1;  %Daugybai     
 for i=1:N
  p=p*(X-x(i));
  LL(i+1)=LL(i)+f{i+1,i+1}*p;
  L{i,1}=LL(i+1);
  rpakl{i,1}=abs(L{i,1}-Y);
   Eilnr{i,1}=i;
 end 
 pakliv{1,1}='-';
for i=1:N-1
    pakliv{i+1,1}=abs(L{i,1}-L{i+1,1});

end
Atspav=[{'Eil.'} 'Artinys' 'Reali paklaida' 'Paklaidos ivertis'];
Lentelei=[Atspav; Eilnr L rpakl pakliv]

